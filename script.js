gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

let mm = gsap.matchMedia();

// --- GLOBAL - RELOAD AT THE TOP
$(window).on("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// --- GLOBAL FADE
function fade() {
  let elements = gsap.utils.toArray("[fade]");
  gsap.set(elements, { autoAlpha: 0, y: "5em" });

  ScrollTrigger.batch(elements, {
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 1.6,
        ease: "power3.out",
        stagger: 0.1,
      });
    },
  });
}

// --- GLOBAL - LINE ANIMATION
function drawLine() {
  // Draw line
  gsap.set("[draw-line]", {
    opacity: 1,
    scaleX: 0,
    transformOrigin: "top left",
  });

  ScrollTrigger.batch("[draw-line]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        scaleX: 1,
        delay: 0.1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
        markers: true,
      }),
  });
}

// --- GLOBAL - VERTICAL LINE ANIMATION
function drawVerticalLine() {
  // Draw line
  gsap.set("[draw-vertical-line]", {
    opacity: 1,
    scaleY: 0,
    transformOrigin: "top top",
  });

  ScrollTrigger.batch("[draw-vertical-line]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        scaleY: 1,
        delay: 0.2,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
      }),
  });
}

// CURRENT YEAR
let currentYear = document.querySelector("[current-year]");
if (currentYear) {
  currentYear.innerHTML = new Date().getFullYear();
}

// --- PILLARS SLIDER
let swiper = new Swiper(".swiper.pillars", {
  slidesPerView: "auto",
  spaceBetween: 40,
  speed: 600,
  grabCursor: true,
  navigation: {
    nextEl: ".swiper-next.pillars",
    prevEl: ".swiper-prev.pillars",
  },
  breakpoints: {
    320: {
      slidesPerView: 1.25,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: "auto",
      spaceBetween: 24,
    },
    992: {
      slidesPerView: "auto",
      spaceBetween: 40,
    },
  },
});

// --- FUNDING CARDS - HOVER
function fundingCards() {
  $(".c-funding-card").each(function () {
    let cardTrigger = $(this).find(".c-funding-card-link");
    let cardActive = $(this).find(".c-funding-card.is-active");
    let cardCloseButton = $(this).find(".c-funding-card-close");

    let tl = gsap.timeline({
      paused: true,
      defaults: { ease: "expo.inOut", duration: 0.6 },
    });

    tl.to(cardActive, { autoAlpha: 1 });

    cardTrigger.on("click", function () {
      tl.restart();
    });

    cardActive.on("click", function () {
      tl.reverse();
    });
  });
}

// --- HEADER THEME
function headerTheme() {
  ScrollTrigger.create({
    trigger: $("[hero-section]"),
    start: "top top",
    end: "90% top",
    onLeave: () => {
      $(".c-header").attr("data-theme", "dark");
      $(".c-header-gradient").css("opacity", "0");
    },
    onEnterBack: () => {
      $(".c-header").removeAttr("data-theme", "dark");
      $(".c-header-gradient").css("opacity", "1");
    },
  });
}

// --- HEADER DROPDOWN
function headerDropdown() {
  $(".c-dd-link").each(function () {
    let container = $(this);
    let dropdownList = container.find(".c-dd-list");
    let isOpened = false; // Flag to track if dropdown has been opened before

    let tl = gsap.timeline({ paused: true });
    tl.to(dropdownList, { autoAlpha: 1, ease: "power3.inOut", duration: 0.4 });

    container.on("mouseenter", function () {
      // Close all dropdowns only if this dropdown has been opened before
      if (isOpened) {
        $(".c-dd-list")
          .not(dropdownList)
          .each(function () {
            gsap.timeline().to($(this), { autoAlpha: 0, duration: 0.4 });
          });
      }
      // Open the current dropdown
      tl.restart();
      isOpened = true; // Set the flag to true after opening
    });

    container.on("mouseleave", function (event) {
      // Check if mouse is leaving both container and list content
      if (!$(event.relatedTarget).closest(container).length) {
        tl.reverse();
      }
    });
  });
}

// --- HEADER DROPDOWN MOBILE
function headerDropdownMobile() {
  $(".c-dd-link").each(function () {
    let container = $(this);
    let dropdownList = container.find(".c-dd-list");

    let tl = gsap.timeline({ paused: true });

    tl.to(dropdownList, {
      height: "auto",
      ease: "power3.inOut",
      duration: 0.4,
    });

    $(this).on("click", function () {
      $(".c-dd-link.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });
  });
}

// --- PARTNER CATEGORY TEXT
function partnerCategoryText() {
  $(".c-partner-item-tag-list").each(function () {
    let lastItem = $(this).find(".c-partner-item-tag-item:last-child");
    let lastItemText = lastItem.text();
    lastItemText = lastItemText.replace(/,([^,]*)$/, "$1");
    lastItem.text(lastItemText);
  });
}

// --- SCROLL TO
$("[scroll-to]").each(function () {
  $(this).click(function () {
    let scrollToElement = $(this).attr("scroll-to");

    gsap.to(window, {
      duration: 0.4,
      scrollTo: { y: scrollToElement, offsetY: 78 },
      delay: 0.2,
    });
  });
});

// --- ARCHIVE
function archive() {
  $(".o-row.archive_top").prependTo(".c-archive");
}

// --- HEADER MOBILE
function menuMobile() {
  let tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power4.inOut", duration: 0.8 },
  });

  let menuLine1 = $(".c-icon.menu rect").eq(0);
  let menuLine2 = $(".c-icon.menu rect").eq(1);
  let menuLine3 = $(".c-icon.menu rect").eq(2);
  let menuEl = $(".c-header-nav");
  let logoEl = $(".c-logo");

  gsap.set(menuLine1, { transformOrigin: "center center" });
  gsap.set(menuLine2, { transformOrigin: "center center" });
  gsap.set(menuLine3, { transformOrigin: "center center" });

  tl.to(menuLine1, { rotation: 45, y: 7 });
  tl.to(menuLine2, { width: 0 }, 0);
  tl.to(menuLine3, { rotation: -45, y: -7 }, 0);
  tl.fromTo(
    menuEl,
    { clipPath: "inset(0% 0% 0% 100%)" },
    { clipPath: "inset(0% 0% 0% 0%)" },
    0
  );

  $(".c-nav-btn").on("click", function () {
    $(".c-header").toggleClass("is-open");
    if ($(".c-header").hasClass("is-open")) {
      tl.restart();
      lenis.stop();
    } else {
      tl.reverse();
      lenis.start();
      $(".c-dd-link.is-open").click();
    }
  });

  // $(".c-nav-link").on("click", function () {
  //   if (!$(this).hasClass("get-started")) {
  //     setTimeout(() => {
  //       $(".c-nav-btn").click();
  //     }, 400);
  //   }
  // });
}

// --- FEATURED PARTNERS
function featuredPartners() {
  let featuredLink = $(".c-partner-tabs-link").eq(0);
  let previouslyFeaturedLink = $(".c-partner-tabs-link").eq(1);

  let featuredLinkActive = $(".c-partner-tabs-inner").eq(0);
  let previouslyFeaturedLinkActive = $(".c-partner-tabs-inner").eq(1);

  let featuredContent = $(".c-partner-tabs").eq(0);
  let previouslyFeaturedContent = $(".c-partner-tabs").eq(1);

  featuredLink.on("click", function () {
    featuredContent.removeClass("hide");
    previouslyFeaturedContent.addClass("hide");
    featuredLinkActive.addClass("is-active");
    previouslyFeaturedLinkActive.removeClass("is-active");
  });

  previouslyFeaturedLink.on("click", function () {
    previouslyFeaturedContent.removeClass("hide");
    featuredContent.addClass("hide");

    previouslyFeaturedLinkActive.addClass("is-active");
    featuredLinkActive.removeClass("is-active");
  });
}

// --- LOADER
function loader() {
  let tl = gsap.timeline({
    defaults: { ease: "power2.out", duration: 1.6, delay: 0.2 },
  });

  tl.to(".o-page-wrapper", { autoAlpha: 1 });
  tl.to(".c-header", { autoAlpha: 1 }, 0);
}

// IOS DISABLE PINCH ZOOM
document.addEventListener("gesturestart", function (e) {
  e.preventDefault();
  document.body.style.zoom = 0.99;
});

document.addEventListener("gesturechange", function (e) {
  e.preventDefault();
  document.body.style.zoom = 0.99;
});

document.addEventListener("gestureend", function (e) {
  e.preventDefault();
  document.body.style.zoom = 0.99;
});

//
////
//////
////
//

// --- INIT
function init() {
  fundingCards();
  headerTheme();
  // partnerCategoryText();
  archive();
  featuredPartners();
  loader();
}
init();

// --- MATCHMEDIA - DESKTOP
mm.add("(min-width: 992px)", () => {
  // headerDropdown();
  fade();
  drawLine();
  drawVerticalLine();
  return () => {
    //
  };
});

// --- MATCHMEDIA - TABLET AND MOBILE
mm.add("(max-width: 991px)", () => {
  headerDropdownMobile();
  menuMobile();
  return () => {
    //
  };
});
