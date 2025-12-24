const copyPopup = document.getElementById("popup");
const copyBtn = document.getElementById("copyBtn");
const textToCopy = document.getElementById("textToCopy");
let navigationLogo = document.querySelector(".navigation .logo");
let menuBtn = document.querySelector(".menu-btn");
let menu = document.querySelector(".menu");
let logoTween = null;

function createTransformAnimations() {
  const logoEl = document.querySelector(".navigation .logo");
  if (!logoEl) return;

  let biggerSize = 1056;
  let smallerSize = 256;

  function updateSizes() {
    const w = window.innerWidth;

    if (w > 1921) {
      biggerSize = "53.854vw";
      smallerSize = "13.333vw";
    } else if (w < 601) {
      biggerSize = "160px";
      smallerSize = "160px";
    } else if (w < 825) {
      biggerSize = "424px";
      smallerSize = "212px";
    } else if (w < 1024) {
      biggerSize = "530px";
      smallerSize = "265px";
    } else if (w < 1711) {
      biggerSize = "53.854vw";
      smallerSize = "13.333vw";
    } else if (w < 1921) {
      biggerSize = "1056px";
      smallerSize = "256px";
    } else {
      return;
    }
  }

  updateSizes();
  console.log(biggerSize, smallerSize);

  window.addEventListener("resize", updateSizes);

  gsap.to(logoEl, {
    maxWidth: smallerSize,
    ease: "power4.out",
    duration: 0.5,
    scrollTrigger: {
      trigger: ".carousel",
      start: "bottom bottom",
      scrub: true,
    },
    onComplete: function () {
      gsap.to(logoEl, {
        maxWidth: biggerSize,
        ease: "power4.out",
        duration: 0.5,
        scrollTrigger: {
          trigger: ".about",
          start: "top bottom",
          end: "top 30%",
          scrub: true,
        },
        onComplete: function () {
          gsap.to(logoEl, {
            maxWidth: smallerSize,
            ease: "power4.out",
            duration: 0.5,
            scrollTrigger: {
              trigger: ".about",
              start: "top top",
              end: "+=300",
              scrub: 1,
            },
            onComplete: function () {
              gsap.to(logoEl, {
                maxWidth: biggerSize,
                ease: "power4.out",
                duration: 0.5,
                scrollTrigger: {
                  trigger: ".footer",
                  start: "top bottom",
                  scrub: true,
                },
              });

              gsap.to(".navigation .of-h .dot", {
                opacity: 0,
                pointerEvents: "none",
                filter: "blur(10px)",
                duration: 1,
                scrollTrigger: {
                  trigger: ".footer",
                  start: "top bottom",
                  end: "+=300",
                  scrub: true,
                },
                ease: "power4.out",
              });

              gsap.to(".navigation .of-h .about-text", {
                display: "none",
                opacity: 0,
                pointerEvents: "none",
                filter: "blur(10px)",
                duration: 1,
                scrollTrigger: {
                  trigger: ".footer",
                  start: "top bottom",
                  end: "+=300",
                  scrub: true,
                },
                ease: "power4.out",
              });
            },
          });
        },
      });
    },
  });

  gsap.to(".navigation .of-h .dot", {
    opacity: 1,
    pointerEvents: "auto",
    filter: "blur(0px)",
    duration: 1,
    scrollTrigger: {
      trigger: ".carousel",
      start: "top top",
      scrub: true,
    },
    ease: "power4.out",
  });

  // SHOW work-text on carousel
  gsap.to(".navigation .of-h .work-text", {
    opacity: 1,
    display: "block",
    pointerEvents: "auto",
    filter: "blur(0px)",
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".carousel",
      start: "top top",
      scrub: true,
    },
    onComplete: function () {
      gsap.to(".navigation .of-h .dot", {
        opacity: 0,
        pointerEvents: "none",
        filter: "blur(10px)",
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about",
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      });

      // HIDE work-text on about
      gsap.to(".navigation .of-h .work-text", {
        opacity: 0,
        pointerEvents: "none",
        filter: "blur(10px)",
        display: "none",
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about",
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      });
    },
  });

  // HIDE dot on about

  gsap.to(".navigation .of-h .dot", {
    opacity: 1,
    pointerEvents: "auto",
    filter: "blur(0px)",
    duration: 1,
    scrollTrigger: {
      trigger: ".about",
      start: "top top",
      scrub: true,
    },
    ease: "power4.out",
  });

  gsap.to(".navigation .of-h .about-text", {
    display: "block",
    opacity: 1,
    pointerEvents: "auto",
    filter: "blur(0px)",
    duration: 1,
    scrollTrigger: {
      trigger: ".about",
      start: "top top",
      scrub: true,
    },
    ease: "power4.out",
  });

  gsap.to(".list-of-year", {
    xPercent: -100.1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".list-of-year-wrapper",
      scroller: "body",
      start: "bottom bottom",
      pin: true,
      scrub: 1,
    },
  });
}

function initCarouselScrollAnimation() {
  let currentScroll = window.pageYOffset;
  let isScrollingDown = true;

  let tween1 = gsap
    .to(".text-carousel.left", {
      xPercent: -100,
      repeat: -1,
      duration: 35,
      ease: "linear",
    })
    .totalProgress(0.5);

  let tween2 = gsap
    .to(".text-carousel.right", {
      xPercent: -100,
      repeat: -1,
      duration: 35,
      ease: "linear",
    })
    .totalProgress(0.5);
  tween2.timeScale(-1);

  window.addEventListener("wheel", function (e) {
    const newScroll = e.deltaY;
    const scrollingDown = newScroll > currentScroll;

    // only update if direction changed
    if (newScroll > 0) {
      if (scrollingDown !== isScrollingDown) {
        tween1.timeScale(1);
        tween2.timeScale(-1);
        isScrollingDown = scrollingDown;
      }
    } else {
      tween1.timeScale(-1);
      tween2.timeScale(1);
      isScrollingDown = scrollingDown;
    }

    currentScroll = newScroll;
  });
}

function scrollToSection(target) {
  const section = document.querySelector(target);
  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function addHeroScrollHandlers() {
  function scrollToWork() {
    const workEl = document.querySelector(".work");
    if (!workEl) return;

    if (typeof lenis !== "undefined" && typeof lenis.scrollTo === "function") {
      try {
        lenis.scrollTo(workEl, { offset: 0, duration: 1.2 });
      } catch (err) {
        const top = workEl.getBoundingClientRect().top + window.pageYOffset;
        lenis.scrollTo(top, { duration: 1.2 });
      }
      return;
    }

    const top = workEl.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  function attachListeners() {
    const triggers = document.querySelectorAll(
      ".hero-cta, .hero .right-content .icon-text"
    );
    if (!triggers || triggers.length === 0) return;
    triggers.forEach((el) =>
      el.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToWork();
      })
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachListeners);
  } else {
    attachListeners();
  }
}

function initScrollToTop() {
  document.getElementById("goToTop").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function initAboutImageAnimation() {
  const evenBoxes = document.querySelectorAll(
    "section.about .photos .photo.even img"
  );

  evenBoxes.forEach((box) => {
    let hoverAnim = null;

    box.addEventListener("mouseenter", () => {
      if (hoverAnim) hoverAnim.kill(); // stop old anim
      hoverAnim = gsap.to(box, {
        rotate: -360,
        duration: 30,
        ease: "none",
      });
    });

    box.addEventListener("mouseleave", () => {
      if (hoverAnim) hoverAnim.kill(); // stop hover animation immediately
      hoverAnim = gsap.to(box, {
        rotate: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });

  const oddBoxes = document.querySelectorAll(
    "section.about .photos .photo.odd img"
  );

  oddBoxes.forEach((box) => {
    let hoverAnim = null;

    box.addEventListener("mouseenter", () => {
      if (hoverAnim) hoverAnim.kill(); // stop old anim
      hoverAnim = gsap.to(box, {
        rotate: 360,
        duration: 30,
        ease: "none",
      });
    });

    box.addEventListener("mouseleave", () => {
      if (hoverAnim) hoverAnim.kill(); // stop hover animation immediately
      hoverAnim = gsap.to(box, {
        rotate: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });
}

function initMenuLinksHoverAnimation() {
  let menuLinks = document.querySelectorAll(".menu li");

  let notHD = window.innerWidth > 1920;

  window.addEventListener("resize", () => {
    notHD = window.innerWidth > 1920;
  });

  menuLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, {
        fontSize: notHD ? "3.333vw" : 64,
        duration: 0.4,
        ease: "power4.out",
      });
    });
    link.addEventListener("mouseleave", () => {
      gsap.to(link, {
        fontSize: notHD ? "1.667vw" : 32,
        duration: 0.4,
        ease: "power4.out",
      });
    });
  });
}

function initAllLoadingAnimations() {
  gsap.fromTo(
    ".hero .p span",
    {
      bottom: "-300px",
      delay: 0.1,
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.1,
    },
    {
      bottom: "-2px",
      delay: 0.1,
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.1,
    }
  );

  gsap.from(".hero .right-content .hero-image", {
    delay: 0.3,
    scale: 1.5,
    rotate: "10deg",
    duration: 1.8,
    ease: "power4.out",
    stagger: 0.1,
  });

  gsap.from(".navigation .logo", {
    bottom: "-300px",
    delay: 0.1,
    duration: 1.5,
    ease: "power4.out",
  });

  gsap.from(".button.of-h span", {
    bottom: "-100px",
    delay: 0.1,
    duration: 1.5,
    ease: "power4.out",
  });
}

function initAboutSectionDrag() {
  const container = document.querySelector(".about-images");
  const images = document.querySelectorAll(".about-images > img");
  const littleSaints = document.querySelector(".about-images .little-saints");

  images.forEach((img) => {
    img.style.position = "absolute";
    img.style.cursor = "grab";
    img.style.userSelect = "none";

    let newX = 0,
      newY = 0,
      startX = 0,
      startY = 0;

    function getClientXY(e) {
      if (e.touches && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      return { x: e.clientX, y: e.clientY };
    }

    function startDrag(e) {
      e.preventDefault();

      img.classList.remove("floating"); // stop animation while dragging

      const pos = getClientXY(e);
      startX = pos.x;
      startY = pos.y;

      img.style.cursor = "grabbing";

      document.addEventListener("mousemove", moveDrag);
      document.addEventListener("mouseup", stopDrag);

      document.addEventListener("touchmove", moveDrag, { passive: false });
      document.addEventListener("touchend", stopDrag);
    }

    function moveDrag(e) {
      e.preventDefault();

      const pos = getClientXY(e);

      newX = startX - pos.x;
      newY = startY - pos.y;

      startX = pos.x;
      startY = pos.y;

      let newLeft = img.offsetLeft - newX;
      let newTop = img.offsetTop - newY;

      const rect = container.getBoundingClientRect();

      // FIX: use offsetWidth/offsetHeight so transform does NOT affect size
      const imgWidth = img.offsetWidth;
      const imgHeight = img.offsetHeight;

      const minLeft = 0;
      const minTop = 0;
      const maxLeft = rect.width - imgWidth;
      const maxTop = rect.height - imgHeight;

      newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
      newTop = Math.max(minTop, Math.min(newTop, maxTop));

      img.style.left = newLeft + "px";
      img.style.top = newTop + "px";
    }

    function stopDrag() {
      img.style.cursor = "grab";

      document.removeEventListener("mousemove", moveDrag);
      document.removeEventListener("mouseup", stopDrag);

      document.removeEventListener("touchmove", moveDrag);
      document.removeEventListener("touchend", stopDrag);

      img.classList.add("floating");
    }

    img.addEventListener("mousedown", startDrag);

    img.addEventListener("touchstart", startDrag, { passive: false });
  });

  littleSaints.style.position = "absolute";
  littleSaints.style.cursor = "grab";
  littleSaints.style.userSelect = "none";

  let newX = 0,
    newY = 0,
    startX = 0,
    startY = 0;

  function getClientXY(e) {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  function startDrag(e) {
    e.preventDefault();

    littleSaints.classList.remove("floating"); // stop animation while dragging

    const pos = getClientXY(e);
    startX = pos.x;
    startY = pos.y;

    littleSaints.style.cursor = "grabbing";

    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("mouseup", stopDrag);

    document.addEventListener("touchmove", moveDrag, { passive: false });
    document.addEventListener("touchend", stopDrag);
  }

  function moveDrag(e) {
    e.preventDefault();

    const pos = getClientXY(e);

    newX = startX - pos.x;
    newY = startY - pos.y;

    startX = pos.x;
    startY = pos.y;

    let newLeft = littleSaints.offsetLeft - newX;
    let newTop = littleSaints.offsetTop - newY;

    const rect = container.getBoundingClientRect();

    // FIX: use offsetWidth/offsetHeight so transform does NOT affect size
    const imgWidth = littleSaints.offsetWidth;
    const imgHeight = littleSaints.offsetHeight;

    const minLeft = 0;
    const minTop = 0;
    const maxLeft = rect.width - imgWidth;
    const maxTop = rect.height - imgHeight;

    newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
    newTop = Math.max(minTop, Math.min(newTop, maxTop));

    littleSaints.style.left = newLeft + "px";
    littleSaints.style.top = newTop + "px";
  }

  function stopDrag() {
    littleSaints.style.cursor = "grab";

    document.removeEventListener("mousemove", moveDrag);
    document.removeEventListener("mouseup", stopDrag);

    document.removeEventListener("touchmove", moveDrag);
    document.removeEventListener("touchend", stopDrag);

    littleSaints.classList.add("floating");
  }

  littleSaints.addEventListener("mousedown", startDrag);

  littleSaints.addEventListener("touchstart", startDrag, { passive: false });
}

function initButtonAnimation() {
  const buttons = document.querySelectorAll(".action-button.button");

  buttons.forEach((button) => {
    const groups = document.querySelectorAll(".group");
    const width = groups[0].offsetWidth;

    let infiniteTween;

    const startInfinite = () => {
      if (infiniteTween) gsap.killTweensOf(groups);

      infiniteTween = gsap.to(groups, {
        x: -width,
        duration: 3,
        ease: "linear",
        modifiers: {
          x: (x) => {
            const val = parseFloat(x);
            return (val <= -width ? 0 : val) + "px";
          },
        },
        repeat: -1,
      });
    };

    startInfinite();

    button.addEventListener("mouseenter", () => {
      gsap.killTweensOf(groups);
      gsap.to(groups, {
        x: -width,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(groups, {
        x: -width,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });

      // kill any temporary tween
      gsap.killTweensOf(groups);
      // reset position to 0 to avoid slow start
      gsap.set(groups, { x: 0 });

      // start infinite animation
      infiniteTween = gsap.to(groups, {
        x: -width + 32,
        duration: 3,
        ease: "linear",
        modifiers: {
          x: (x) => {
            const val = parseFloat(x);
            return (val <= -width ? 0 : val) + "px";
          },
        },
        repeat: -1,
      });
    });
    button.addEventListener("click", () => {
      // stop animation temporarily and move slightly left
      gsap.killTweensOf(groups);
      gsap.to(groups, {
        x: -width + 32,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  });
}

function initCopySystem(modal, target, btn) {
  btn.addEventListener("click", () => {
    navigator.clipboard.writeText(target.textContent);
    modal.classList.add("show");
    setTimeout(() => {
      modal.classList.remove("show");
    }, 2000);
  });
}

function reloadOnResize(delay = 300) {
  let resizeTimer;
  let lastWidth = window.innerWidth;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth !== lastWidth) {
        location.reload();
      }
    }, delay);
  });
}

function initGsapAndLenis() {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    lerp: 0.09,
    wheelMultiplier: 0.9,
    touchMultiplier: 0.9,
    smoothWheel: true,
    smoothTouch: true,
  });
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

function openMenu() {
  menuBtn.classList.add("active");
  gsap.to(".menu", {
    display: "flex",
    transform: "translateX(0%)",
  });
  gsap.to(".menu li", {
    transform: "translateX(0%)",
    stagger: 0.1,
  });
}

function closeMenu() {
  menuBtn.classList.remove("active");
  gsap.to(".menu", {
    transform: "translateX(200%)",
  });
  gsap.to(".menu li", {
    transform: "translateX(200%)",
    stagger: 0.1,
  });
}

function initHandleMenu() {
  let autoCloseTimeout = null;

  menuBtn.addEventListener("click", () => {
    if (menuBtn.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();

      clearTimeout(autoCloseTimeout);
      autoCloseTimeout = setTimeout(() => {
        closeMenu();
      }, 6000);
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initGsapAndLenis();
  initAllLoadingAnimations();
  initAboutSectionDrag();
  initHandleMenu();
  initMenuLinksHoverAnimation();
  initCopySystem(copyPopup, textToCopy, copyBtn);
  initAboutImageAnimation();
  initButtonAnimation();
  initCarouselScrollAnimation();
  initScrollToTop();
  reloadOnResize();
});

window.addEventListener("load", createTransformAnimations);

// document.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
// });
