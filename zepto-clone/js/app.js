```javascript
/*
=========================================================
 ZEPTO CLONE - COMMON APPLICATION
 File: js/app.js
=========================================================

Purpose:
- Common website functionality
- Location selection
- Login interaction
- Search controls
- Navbar behaviour
- Footer year
- Smooth scrolling
- Common UI initialization
=========================================================
*/


// ========================================================
// APPLICATION CONFIGURATION
// ========================================================

const APP_CONFIG = {

    defaultLocation: "Select location",

    storageKeys: {
        location: "zeptoLocation",
        login: "zeptoLogin"
    }

};


function findFirstElement(...selectors) {

    for (const selector of selectors) {

        if (!selector) {
            continue;
        }

        const element = document.querySelector(selector);

        if (element) {
            return element;
        }

    }

    return null;
}

function getLocationModal() {

    return findFirstElement(
        "#locationModal",
        ".modal",
        ".modal-overlay",
        ".location-modal"
    );

}

function getLocationInput() {

    return findFirstElement(
        "#locationInput",
        "#locationModal input",
        ".modal input",
        ".location-modal input"
    );

}

function getLocationSaveButton() {

    return findFirstElement(
        "#saveLocation",
        ".save-location"
    );

}

function getLocationDetectButton() {

    return findFirstElement(
        "#detectLocation",
        ".detect-location",
        ".detect-location-btn"
    );

}

function getLocationButton() {

    return findFirstElement(
        "#locationBtn",
        "#locationSelector",
        ".location-btn",
        ".location-selector"
    );

}

function getLoginButton() {

    return findFirstElement(
        "#loginBtn",
        "#loginLink",
        ".login-btn",
        ".login-link"
    );

}


// ========================================================
// GET SAVED LOCATION
// ========================================================

function getSavedLocation() {

    return localStorage.getItem(
        APP_CONFIG.storageKeys.location
    ) || APP_CONFIG.defaultLocation;

}


// ========================================================
// SAVE LOCATION
// ========================================================

function saveLocation(location) {

    if (!location || !location.trim()) {
        return false;
    }

    localStorage.setItem(
        APP_CONFIG.storageKeys.location,
        location.trim()
    );

    return true;
}


// ========================================================
// UPDATE LOCATION DISPLAY
// ========================================================

function updateLocationDisplay() {

    const locationElements =
        document.querySelectorAll(
            "#selectedLocation"
        );

    const location =
        getSavedLocation();


    locationElements.forEach(element => {

        element.textContent =
            location;

    });

}


// ========================================================
// OPEN LOCATION MODAL
// ========================================================

function openLocationModal() {

    const modal =
        getLocationModal();

    if (!modal) {
        return;
    }

    modal.classList.add("open", "active", "show");

    if (modal.matches(".modal, .modal-overlay, .location-modal")) {
        modal.style.display = "flex";
    }

    modal.removeAttribute("hidden");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    const input =
        getLocationInput();


    if (input) {

        input.value =
            getSavedLocation() ===
            APP_CONFIG.defaultLocation
                ? ""
                : getSavedLocation();

        setTimeout(() => {
            input.focus();
        }, 100);
    }

}


// ========================================================
// CLOSE LOCATION MODAL
// ========================================================

function closeLocationModal() {

    const modal =
        getLocationModal();

    if (!modal) {
        return;
    }

    modal.classList.remove("open", "active", "show");
    modal.style.display = "none";
    modal.setAttribute("hidden", "true");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}


// ========================================================
// INITIALIZE LOCATION BUTTON
// ========================================================

function initializeLocationButton() {

    const locationButtons =
        document.querySelectorAll(
            "#locationBtn, #locationSelector, .location-btn, .location-selector"
        );


    locationButtons.forEach(button => {

        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                openLocationModal();

            }
        );

    });

}


// ========================================================
// SAVE LOCATION BUTTON
// ========================================================

function initializeSaveLocation() {

    const saveButton =
        getLocationSaveButton();


    if (!saveButton) {
        return;
    }


    saveButton.addEventListener(
        "click",
        function() {

            const input =
                getLocationInput();


            if (!input) {
                return;
            }


            const location =
                input.value.trim();


            if (!location) {

                showAppToast(
                    "Please enter your location"
                );

                input.focus();

                return;
            }


            saveLocation(location);

            updateLocationDisplay();

            closeLocationModal();

            showAppToast(
                "Location saved successfully"
            );

        }
    );

}


// ========================================================
// DETECT LOCATION
// ========================================================

function initializeDetectLocation() {

    const detectButton =
        getLocationDetectButton();


    if (!detectButton) {
        return;
    }


    detectButton.addEventListener(
        "click",
        function() {

            /*
            Browser geolocation can only provide
            coordinates. We do not automatically
            convert them into an address here.

            This is a static GitHub Pages demo.
            */

            if (!navigator.geolocation) {

                showAppToast(
                    "Location detection is not supported by your browser"
                );

                return;
            }


            detectButton.disabled =
                true;

            detectButton.textContent =
                "Detecting...";


            navigator.geolocation.getCurrentPosition(

                function(position) {

                    const latitude =
                        position.coords.latitude;

                    const longitude =
                        position.coords.longitude;


                    /*
                    For the static demo, save coordinates
                    as the detected location.

                    A production application would use
                    a reverse-geocoding API.
                    */

                    const detectedLocation =
                        "Detected location (" +
                        latitude.toFixed(4) +
                        ", " +
                        longitude.toFixed(4) +
                        ")";


                    const input =
                        getLocationInput();


                    if (input) {

                        input.value =
                            detectedLocation;
                    }


                    detectButton.disabled =
                        false;

                    detectButton.textContent =
                        "Detect My Location";


                    showAppToast(
                        "Location detected"
                    );

                },


                function(error) {

                    console.warn(
                        "Geolocation error:",
                        error
                    );


                    detectButton.disabled =
                        false;

                    detectButton.textContent =
                        "Detect My Location";


                    showAppToast(
                        "Unable to detect location. Please enter it manually."
                    );

                },

                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000
                }

            );

        }
    );

}


// ========================================================
// CLOSE MODAL BUTTON
// ========================================================

function initializeLocationModalClose() {

    const modal =
        getLocationModal();


    if (!modal) {
        return;
    }


    const closeButtons =
        modal.querySelectorAll(
            ".modal-close, #closeLocation"
        );


    closeButtons.forEach(button => {

        button.addEventListener(
            "click",
            closeLocationModal
        );

    });


    /*
    Close when clicking the modal background.
    */

    modal.addEventListener(
        "click",
        function(event) {

            if (
                event.target === modal ||
                event.target.classList.contains("modal-overlay")
            ) {

                closeLocationModal();

            }

        }
    );


    /*
    Close using Escape.
    */

    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains("open")
            ) {

                closeLocationModal();

            }

        }
    );

}


// ========================================================
// LOCATION ENTER KEY
// ========================================================

function initializeLocationInput() {

    const input =
        getLocationInput();


    if (!input) {
        return;
    }


    input.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                const saveButton =
                    getLocationSaveButton();


                if (saveButton) {

                    saveButton.click();

                }

            }

        }
    );

}


// ========================================================
// LOGIN BUTTON
// ========================================================

function initializeLogin() {

    const loginButton =
        getLoginButton();


    if (!loginButton) {
        return;
    }


    loginButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            /*
            This is a static frontend demo.
            There is no real authentication backend.
            */

            const loggedIn =
                localStorage.getItem(
                    APP_CONFIG.storageKeys.login
                );


            if (loggedIn === "true") {

                showAppToast(
                    "You are already logged in"
                );

                return;
            }


            const name =
                prompt(
                    "Enter your name:"
                );


            if (!name || !name.trim()) {

                return;
            }


            localStorage.setItem(
                APP_CONFIG.storageKeys.login,
                "true"
            );


            localStorage.setItem(
                "zeptoUserName",
                name.trim()
            );


            loginButton.textContent =
                "Hi, " + name.trim();


            showAppToast(
                "Welcome, " + name.trim() + "!"
            );

        }
    );

}


// ========================================================
// UPDATE LOGIN BUTTON
// ========================================================

function updateLoginButton() {

    const loginButton =
        getLoginButton();


    if (!loginButton) {
        return;
    }


    const loggedIn =
        localStorage.getItem(
            APP_CONFIG.storageKeys.login
        );


    const userName =
        localStorage.getItem(
            "zeptoUserName"
        );


    if (
        loggedIn === "true" &&
        userName
    ) {

        loginButton.textContent =
            "Hi, " + userName;

    }

}


// ========================================================
// SEARCH CLEAR BUTTON
// ========================================================

function initializeSearchClear() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (!searchInput) {
        return;
    }


    /*
    Find an existing clear button.
    */

    const searchBox =
        searchInput.closest(
            ".search-box"
        );


    if (!searchBox) {
        return;
    }


    let clearButton =
        searchBox.querySelector(
            ".search-clear"
        );


    /*
    Create clear button if it doesn't exist.
    */

    if (!clearButton) {

        clearButton =
            document.createElement(
                "button"
            );

        clearButton.type =
            "button";

        clearButton.className =
            "search-clear";

        clearButton.innerHTML =
            "×";

        clearButton.setAttribute(
            "aria-label",
            "Clear search"
        );

        searchBox.appendChild(
            clearButton
        );

    }


    function updateClearButton() {

        clearButton.style.display =
            searchInput.value
                ? "flex"
                : "none";

    }


    searchInput.addEventListener(
        "input",
        updateClearButton
    );


    clearButton.addEventListener(
        "click",
        function() {

            searchInput.value = "";

            if (
                typeof window.clearSearch ===
                "function"
            ) {

                window.clearSearch();

            } else {

                searchInput.dispatchEvent(
                    new Event("input")
                );

            }


            searchInput.focus();

            updateClearButton();

        }
    );


    updateClearButton();

}


// ========================================================
// NAVIGATION LINKS
// ========================================================

function initializeNavigation() {

    const navLinks =
        document.querySelectorAll(
            "a[href]"
        );


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (!href) {
            return;
        }


        /*
        Do not interfere with:
        - external links
        - anchors
        - mailto
        - tel
        - javascript
        */

        if (
            href.startsWith("http") ||
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            href.startsWith("javascript:")
        ) {

            return;
        }


        /*
        Navigation remains normal browser
        navigation for GitHub Pages compatibility.
        */

    });

}


// ========================================================
// SMOOTH SCROLL
// ========================================================

function initializeSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });

}


// ========================================================
// FOOTER YEAR
// ========================================================

function initializeFooterYear() {

    const yearElements =
        document.querySelectorAll(
            "#currentYear"
        );


    const currentYear =
        new Date().getFullYear();


    yearElements.forEach(
        element => {

            element.textContent =
                currentYear;

        }
    );

}


// ========================================================
// APP TOAST
// ========================================================

function showAppToast(message) {

    let toast =
        document.getElementById(
            "appToast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "appToast";

        toast.className =
            "app-toast";

        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.appToastTimer
    );


    window.appToastTimer =
        setTimeout(
            function() {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


// ========================================================
// BACK TO TOP
// ========================================================

function initializeBackToTop() {

    let button =
        document.getElementById(
            "backToTop"
        );


    /*
    Only create button if page is long enough.
    */

    if (
        !button &&
        document.body.scrollHeight > window.innerHeight * 1.5
    ) {

        button =
            document.createElement(
                "button"
            );

        button.id =
            "backToTop";

        button.className =
            "back-to-top";

        button.innerHTML =
            "↑";

        button.setAttribute(
            "aria-label",
            "Back to top"
        );

        document.body.appendChild(
            button
        );

    }


    if (!button) {
        return;
    }


    window.addEventListener(
        "scroll",
        function() {

            if (
                window.scrollY > 400
            ) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );

            }

        }
    );


    button.addEventListener(
        "click",
        function() {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


// ========================================================
// HANDLE IMAGE ERRORS
// ========================================================

function initializeImageFallbacks() {

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                function() {

                    /*
                    Hide broken image rather than
                    showing browser broken-image icon.
                    */

                    this.style.display =
                        "none";

                }
            );

        });

}


// ========================================================
// MOBILE MENU
// ========================================================

function initializeMobileMenu() {

    const menuButton =
        document.querySelector(
            ".mobile-menu-btn"
        );


    const navigation =
        document.querySelector(
            ".nav-menu"
        );


    /*
    Our current navbar may not have a mobile
    menu. Therefore safely exit.
    */

    if (
        !menuButton ||
        !navigation
    ) {

        return;
    }


    menuButton.addEventListener(
        "click",
        function() {

            navigation.classList.toggle(
                "open"
            );


            const expanded =
                navigation.classList.contains(
                    "open"
                );


            menuButton.setAttribute(
                "aria-expanded",
                expanded
            );

        }
    );

}


// ========================================================
// PAGE VISIBILITY
// ========================================================

function initializePageVisibility() {

    document.documentElement.classList.add(
        "app-ready"
    );

}


// ========================================================
// COMMON APPLICATION INITIALIZATION
// ========================================================

function initializeApp() {

    /*
    Location
    */

    updateLocationDisplay();

    initializeLocationButton();

    initializeSaveLocation();

    initializeDetectLocation();

    initializeLocationModalClose();

    initializeLocationInput();


    /*
    Login
    */

    initializeLogin();

    updateLoginButton();


    /*
    Search
    */

    initializeSearchClear();


    /*
    Navigation
    */

    initializeNavigation();

    initializeSmoothScroll();

    initializeMobileMenu();


    /*
    General UI
    */

    initializeFooterYear();

    initializeBackToTop();

    initializeImageFallbacks();

    initializePageVisibility();


    console.log(
        "Zepto Clone application initialized successfully."
    );

}


// ========================================================
// START APPLICATION
// ========================================================

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);


// ========================================================
// GLOBAL FUNCTIONS
// ========================================================

window.openLocationModal =
    openLocationModal;

window.closeLocationModal =
    closeLocationModal;

window.saveLocation =
    saveLocation;

window.getSavedLocation =
    getSavedLocation;

window.updateLocationDisplay =
    updateLocationDisplay;

window.showAppToast =
    showAppToast;
```
