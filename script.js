/* =========================================================
   PAGE LOADER
   ========================================================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("page-loader");

    if (loader) {

        setTimeout(function () {

            loader.classList.add("loader-hidden");

        }, 700);

    }

});


/* =========================================================
   WEBSITE SYSTEM
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       GET SECTIONS AND NAVIGATION LINKS
       ===================================================== */

    const sections = document.querySelectorAll("main > section");

    const navLinks = document.querySelectorAll(".nav-menu a");

    let navigationClick = false;
    let selectedSection = null;


    /* =====================================================
       NORMAL SECTION REVEAL
       ===================================================== */

    function checkSections() {

        sections.forEach(function (section) {

            const rect = section.getBoundingClientRect();

            const visible =
                rect.top < window.innerHeight * 0.85 &&
                rect.bottom > window.innerHeight * 0.15;

            if (visible) {

                section.classList.add("section-visible");

            } else {

                section.classList.remove("section-visible");

            }

        });

    }

        function checkSections() {

        sections.forEach(function (section) {

            const rect = section.getBoundingClientRect();

            const visible =
                rect.top < window.innerHeight * 0.85 &&
                rect.bottom > window.innerHeight * 0.15;

            if (visible) {

                section.classList.add("section-visible");

            } else {

                section.classList.remove("section-visible");

            }

        });

    }

    /* =====================================================
   CENTER ABOUT AND EDUCATION
   ===================================================== */

function centerSpecialSection(section) {

    const sectionTop =
        section.getBoundingClientRect().top +
        window.scrollY;

    const sectionHeight =
        section.offsetHeight;

    const navbar =
        document.querySelector(".navbar");

    const navbarHeight =
        navbar ? navbar.offsetHeight : 0;

    const targetPosition =
        sectionTop +
        (sectionHeight / 2) -
        (window.innerHeight / 2) -
        (navbarHeight / 2);

    window.scrollTo({

        top: Math.max(0, targetPosition),

        behavior: "smooth"

    });

}

    function showOnlyCurrentSection() {

    let currentSection = null;


    /* =====================================================
       WHEN A NAVIGATION BUTTON WAS CLICKED
       ===================================================== */

    if (navigationClick && selectedSection) {

        currentSection = selectedSection;

    } else {

        /* =================================================
           FIND SECTION CURRENTLY BEING VIEWED
           ================================================= */

        const activationPoint = window.innerHeight * 0.35;

        sections.forEach(function (section) {

            const rect = section.getBoundingClientRect();

            if (
                rect.top <= activationPoint &&
                rect.bottom > activationPoint
            ) {

                currentSection = section;

            }

        });


        /* =================================================
           HOME AT TOP
           ================================================= */

        if (window.scrollY < 100) {

            currentSection = document.querySelector("#home");

        }


        /* =================================================
           LAST SECTION AT BOTTOM
           ================================================= */

        const atBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 5;

        if (atBottom) {

            currentSection = sections[sections.length - 1];

        }

    }


    if (!currentSection) {
        return;
    }


    /* =====================================================
       HIDE ALL SECTIONS
       ===================================================== */

    sections.forEach(function (section) {

        section.classList.remove("section-current");

        section.classList.add("section-hidden");

    });


    /* =====================================================
       SHOW ONLY CURRENT SECTION
       ===================================================== */

    currentSection.classList.remove("section-hidden");

    currentSection.classList.add("section-current");

}

    /* =====================================================
       FIND CURRENT ACTIVE SECTION
       ===================================================== */

    function updateActiveNavigation() {

    let currentSection = null;

    const activationPoint = 180;

    /* Find the section closest to the activation point */

    let closestDistance = Infinity;

    sections.forEach(function (section) {

        const rect = section.getBoundingClientRect();

        const distance = Math.abs(rect.top - activationPoint);

        if (distance < closestDistance) {

            closestDistance = distance;
            currentSection = section;

        }

    });


    /* =====================================================
       ALWAYS MAKE THE LAST SECTION ACTIVE AT PAGE BOTTOM
       ===================================================== */

    const pageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

    if (pageBottom) {

        currentSection = sections[sections.length - 1];

    }


    /* =====================================================
       HOME AT THE VERY TOP
       ===================================================== */

    if (window.scrollY < 100) {

        currentSection = document.querySelector("#home");

    }


    /* =====================================================
       REMOVE ACTIVE FROM ALL NAVIGATION BUTTONS
       ===================================================== */

    navLinks.forEach(function (link) {

        link.classList.remove("active");

    });


    /* =====================================================
       ACTIVATE CURRENT SECTION
       ===================================================== */

    if (currentSection) {

        const activeLink = document.querySelector(
            '.nav-menu a[href="#' + currentSection.id + '"]'
        );

        if (activeLink) {

            activeLink.classList.add("active");

        }

    }

}


    /* =====================================================
       NAVIGATION CLICK
       ===================================================== */

    navLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = link.getAttribute("href");

        if (
            !targetId ||
            !targetId.startsWith("#")
        ) {
            return;
        }


        
/* =================================================
   CONTACT BUTTON — GO TO LET'S CONNECT IN HERO
   ================================================= */

if (targetId === "#contact") {

    event.preventDefault();

    const connectBox =
        document.querySelector(".hero-connect");

    const homeSection =
        document.querySelector("#home");

    if (!connectBox || !homeSection) {
        return;
    }

    /* Make HOME visible because Let's Connect is inside HOME */
    sections.forEach(function (section) {
        section.classList.remove("section-current");
        section.classList.add("section-hidden");
    });

    homeSection.classList.remove("section-hidden");
    homeSection.classList.add("section-current");

    /* Make CONTACT button active */
    navLinks.forEach(function (navLink) {
        navLink.classList.remove("active");
    });

    link.classList.add("active");

    navigationClick = true;
    selectedSection = homeSection;

    /* Move directly to the existing Let's Connect box */
    const navbarHeight =
        document.querySelector(".navbar").offsetHeight;

    const targetPosition =
        connectBox.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        25;

    window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: "smooth"
    });

    /* Return to normal scrolling after navigation */
    setTimeout(function () {
        navigationClick = false;
        selectedSection = null;
    }, 1000);

    return;
}


const targetSection =
    document.querySelector(targetId);

if (!targetSection) {
    return;
}
        event.preventDefault();


        /* =================================================
           ACTIVE NAVIGATION
           ================================================= */

        navLinks.forEach(function (navLink) {

            navLink.classList.remove("active");

        });

        link.classList.add("active");


        /* =================================================
           REMEMBER THE SECTION THAT WAS CLICKED
           ================================================= */

        selectedSection = targetSection;

        navigationClick = true;


        /* =================================================
           SHOW ONLY THE CLICKED SECTION IMMEDIATELY
           ================================================= */

        sections.forEach(function (section) {

            section.classList.remove("section-current");

            section.classList.add("section-hidden");

        });

        targetSection.classList.remove("section-hidden");

        targetSection.classList.add("section-current");


        /* =================================================
           MOVE TO THE SECTION
           ================================================= */

         if (targetId === "#about" || targetId === "#education") {

    centerSpecialSection(targetSection);

} else {

    const navbarHeight =
        document.querySelector(".navbar").offsetHeight;

    const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        40;

    window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: "smooth"
    });
}      

        /* =================================================
           RETURN TO NORMAL SCROLL DETECTION
           ================================================= */

        setTimeout(function () {

    navigationClick = false;

    selectedSection = null;

    updateActiveNavigation();

}, 1000);

    });

});


    /* =====================================================
       SCROLL EVENT
       ===================================================== */

    window.addEventListener("scroll", function () {

    if (navigationClick) return;

    checkSections();

        updateActiveNavigation();
        showOnlyCurrentSection();

    }, {
        passive: true
    });


    /* =====================================================
       RESIZE
       ===================================================== */

    window.addEventListener("resize", function () {

        checkSections();

        updateActiveNavigation();
        showOnlyCurrentSection();

    });


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    checkSections();

    updateActiveNavigation();

    showOnlyCurrentSection();

});