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
        ease: "power2.out",
        duration: 0.1,
        scrollTrigger: {
          trigger: ".about",
          start: "top 80%",
          end: "+=400",
          scrub: true,
          onUpdate(self) {
            const progress = self.progress; // 0 → 1
            const width = biggerSize - progress * (biggerSize - smallerSize);

            gsap.set(".logo", { maxWidth: width });
          },
        },

        onComplete: function () {
          gsap.to(logoEl, {
            maxWidth: smallerSize,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ".about",
              start: "top -10%",
              end: "+=300",
              scrub: 1,
            },
            onComplete: function () {
              gsap.to(logoEl, {
                maxWidth: biggerSize,
                ease: "power4.out",
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
    transform: "translateY(0%)",
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
        transform: "translateY(-100%)",
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
      start: "top -30%",
      end: "+=200",
      scrub: true,
    },
    ease: "power4.out",
  });

  gsap.to(".navigation .of-h .about-text", {
    display: "block",
    opacity: 1,
    pointerEvents: "auto",
    filter: "blur(0px)",
    transform: "translateY(0%)",
    duration: 1,
    scrollTrigger: {
      trigger: ".about",
      start: "top -30%",
      end: "+=200",
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
    const heroCta = document.querySelector(".hero-cta");
    heroCta.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToWork();
    });

    const heroCtaArrows = document.querySelectorAll(
      ".right-content .arrows .icon-font"
    );
    heroCtaArrows.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToWork();
      });
    });
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

      infiniteTween = gsap.from(groups, {
        x: -width,
        duration: 3,
        ease: "linear",
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

      gsap.killTweensOf(groups);
      gsap.set(groups, { x: 0 });

      infiniteTween = gsap.from(groups, {
        x: -width + 32,
        duration: 3,
        ease: "linear",
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
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
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

function scrollToTopOnRefresh() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.scrollTo(0, 0);
}

function scrollToSection(target, offset = 0, duration = 800) {
  const element =
    typeof target === "string" ? document.querySelector(target) : target;

  if (!element) return;

  const startY = window.pageYOffset;
  const targetY =
    element.getBoundingClientRect().top + window.pageYOffset - offset;

  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // easeInOut
    const ease =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(0, startY + (targetY - startY) * ease);

    if (progress < 1) requestAnimationFrame(animateScroll);
  }

  requestAnimationFrame(animateScroll);
}

let workContents = {
  magic_mind: {
    headline: "MAGIC MIND",
    year: "2020-PRESENT",
    client: "MAGIC MIND",
    disciplines: [
      "ART DIRECTION",
      "PAID + ORGANIC DIGITAL CREATIVE STRATEGY",
      "FIELD MARKETING DISPLAY DESIGN",
      "RETAIL DISPLAY DESIGN",
      "PHOTOGRAPHY DIRECTION & STYLING",
      "DIGITAL COMMUNICATION STRATEGY (EMAIL+SOCIAL)",
    ],
    project_text:
      "Magic Mind approached me ahead of their 2020 launch to help bring their brand to life digitally. What began as digital brand support evolved into a long-term creative partnership spanning print design, art direction, and marketing creative direction. Over time, I helped shape the visual and strategic foundation behind their direct-to-consumer growth—now serving over 35,000 daily customers—and their retail expansion into 800+ stores nationwide. The collaboration has been rooted in elevating Magic Mind’s mission through consistent, cohesive, and emotionally resonant creative.",
    bottle_image: "magic_mind_bottle.png",
  },
  little_saints: {
    headline: "LITTLE SAINTS",
    year: "2022-2023 ",
    client: "LITTLE SAINTS",
    disciplines: [
      "PHOTO DIRECTION & STYLING",
      "ART DIRECTION",
      "ORGAMIC DIGITAL CREATIVE STRATEGY",
      "GRAPHIC DESIGN",
      "DIGITAL COMMUNICATION STRATEGY (EMAIL+SOCIAL)",
    ],
    project_text:
      "Little Saints combines fast-acting CBD, aromatic terpenes, and adaptogenic reishi to support relaxation, clarity, and emotional balance, naturally. The Paloma blend leans into the crisp zip of grapefruit and lime, softened with subtle herbal notes that linger just long enough to remind you to breathe deeper. It’s sugar-free, alcohol-free, and crafted for those who want the ritual of a drink without the crash that follows. Sip it after a long day, with friends at a gathering, or during your creative hours when you want your mind to flow without fog. Every can is a small ceremony—light, mindful, and modern—designed to help you tap into the best version of yourself.",
    bottle_image: "little_saints.png",
  },
  sidedish: {
    headline: "SIDEDISH",
    year: "2020-PRESENT",
    client: "SIDEDISH",
    disciplines: [
      "ART DIRECTION",
      "PAID + ORGANIC DIGITAL CREATIVE STRATEGY",
      "FIELD MARKETING DISPLAY DESIGN",
      "RETAIL DISPLAY DESIGN",
      "PHOTOGRAPHY DIRECTION & STYLING",
      "DIGITAL COMMUNICATION STRATEGY (EMAIL+SOCIAL)",
    ],
    project_text:
      "Magic Mind approached me ahead of their 2020 launch to help bring their brand to life digitally. What began as digital brand support evolved into a long-term creative partnership spanning print design, art direction, and marketing creative direction. Over time, I helped shape the visual and strategic foundation behind their direct-to-consumer growth—now serving over 35,000 daily customers—and their retail expansion into 800+ stores nationwide. The collaboration has been rooted in elevating Magic Mind’s mission through consistent, cohesive, and emotionally resonant creative.",
    bottle_image: "sidedish.png",
  },
  wild_elements: {
    headline: "WILD ELEMENTS",
    year: "2020-PRESENT",
    client: "WILD ELEMENTS",
    disciplines: [
      "ART DIRECTION",
      "PAID + ORGANIC DIGITAL CREATIVE STRATEGY",
      "FIELD MARKETING DISPLAY DESIGN",
      "RETAIL DISPLAY DESIGN",
      "PHOTOGRAPHY DIRECTION & STYLING",
      "DIGITAL COMMUNICATION STRATEGY (EMAIL+SOCIAL)",
    ],
    project_text:
      "Magic Mind approached me ahead of their 2020 launch to help bring their brand to life digitally. What began as digital brand support evolved into a long-term creative partnership spanning print design, art direction, and marketing creative direction. Over time, I helped shape the visual and strategic foundation behind their direct-to-consumer growth—now serving over 35,000 daily customers—and their retail expansion into 800+ stores nationwide. The collaboration has been rooted in elevating Magic Mind’s mission through consistent, cohesive, and emotionally resonant creative.",
    bottle_image: "wild_elements.png",
  },
  de_soi: {
    headline: "DE SOI",
    year: "2020-PRESENT",
    client: "DE SOI",
    disciplines: [
      "ART DIRECTION",
      "PAID + ORGANIC DIGITAL CREATIVE STRATEGY",
      "FIELD MARKETING DISPLAY DESIGN",
      "RETAIL DISPLAY DESIGN",
      "PHOTOGRAPHY DIRECTION & STYLING",
      "DIGITAL COMMUNICATION STRATEGY (EMAIL+SOCIAL)",
    ],
    project_text:
      "Magic Mind approached me ahead of their 2020 launch to help bring their brand to life digitally. What began as digital brand support evolved into a long-term creative partnership spanning print design, art direction, and marketing creative direction. Over time, I helped shape the visual and strategic foundation behind their direct-to-consumer growth—now serving over 35,000 daily customers—and their retail expansion into 800+ stores nationwide. The collaboration has been rooted in elevating Magic Mind’s mission through consistent, cohesive, and emotionally resonant creative.",
    bottle_image: "de_soi.png",
  },
  earth_bar: {
    headline: "EARTH BAR",
    year: "2020-PRESENT",
    client: "EARTH BAR",
    disciplines: [
      "ART DIRECTION",
      "PAID + ORGANIC DIGITAL CREATIVE STRATEGY",
      "FIELD MARKETING DISPLAY DESIGN",
      "RETAIL DISPLAY DESIGN",
      "PHOTOGRAPHY DIRECTION & STYLING",
      "DIGITAL COMMUNICATION STRATEGY (EMAIL+SOCIAL)",
    ],
    project_text:
      "Magic Mind approached me ahead of their 2020 launch to help bring their brand to life digitally. What began as digital brand support evolved into a long-term creative partnership spanning print design, art direction, and marketing creative direction. Over time, I helped shape the visual and strategic foundation behind their direct-to-consumer growth—now serving over 35,000 daily customers—and their retail expansion into 800+ stores nationwide. The collaboration has been rooted in elevating Magic Mind’s mission through consistent, cohesive, and emotionally resonant creative.",
    bottle_image: "earth_bar.png",
  },
  symboime: {
    headline: "SYMBOIME",
    year: "2020-PRESENT",
    client: "SYMBOIME",
    disciplines: [
      "ART DIRECTION",
      "PAID + ORGANIC DIGITAL CREATIVE STRATEGY",
      "FIELD MARKETING DISPLAY DESIGN",
      "RETAIL DISPLAY DESIGN",
      "PHOTOGRAPHY DIRECTION & STYLING",
      "DIGITAL COMMUNICATION STRATEGY (EMAIL+SOCIAL)",
    ],
    project_text:
      "Magic Mind approached me ahead of their 2020 launch to help bring their brand to life digitally. What began as digital brand support evolved into a long-term creative partnership spanning print design, art direction, and marketing creative direction. Over time, I helped shape the visual and strategic foundation behind their direct-to-consumer growth—now serving over 35,000 daily customers—and their retail expansion into 800+ stores nationwide. The collaboration has been rooted in elevating Magic Mind’s mission through consistent, cohesive, and emotionally resonant creative.",
    bottle_image: "symboime.png",
  },
  fx_chocolate: {
    headline: "FX CHOCOLATE",
    year: "2020-PRESENT",
    client: "FX CHOCOLATE",
    disciplines: [
      "ART DIRECTION",
      "PAID + ORGANIC DIGITAL CREATIVE STRATEGY",
      "FIELD MARKETING DISPLAY DESIGN",
      "RETAIL DISPLAY DESIGN",
      "PHOTOGRAPHY DIRECTION & STYLING",
      "DIGITAL COMMUNICATION STRATEGY (EMAIL+SOCIAL)",
    ],
    project_text:
      "Magic Mind approached me ahead of their 2020 launch to help bring their brand to life digitally. What began as digital brand support evolved into a long-term creative partnership spanning print design, art direction, and marketing creative direction. Over time, I helped shape the visual and strategic foundation behind their direct-to-consumer growth—now serving over 35,000 daily customers—and their retail expansion into 800+ stores nationwide. The collaboration has been rooted in elevating Magic Mind’s mission through consistent, cohesive, and emotionally resonant creative.",
    bottle_image: "fx_chocolate.png",
  },
  brami: {
    headline: "BRAMI",
    year: "2020-PRESENT",
    client: "BRAMI",
    disciplines: [
      "ART DIRECTION",
      "PAID + ORGANIC DIGITAL CREATIVE STRATEGY",
      "FIELD MARKETING DISPLAY DESIGN",
      "RETAIL DISPLAY DESIGN",
      "PHOTOGRAPHY DIRECTION & STYLING",
      "DIGITAL COMMUNICATION STRATEGY (EMAIL+SOCIAL)",
    ],
    project_text:
      "Magic Mind approached me ahead of their 2020 launch to help bring their brand to life digitally. What began as digital brand support evolved into a long-term creative partnership spanning print design, art direction, and marketing creative direction. Over time, I helped shape the visual and strategic foundation behind their direct-to-consumer growth—now serving over 35,000 daily customers—and their retail expansion into 800+ stores nationwide. The collaboration has been rooted in elevating Magic Mind’s mission through consistent, cohesive, and emotionally resonant creative.",
    bottle_image: "brami.png",
  },
  quicksilver_scientific: {
    headline: "QUICKSILVER SCIENTIFIC",
    year: "2020-PRESENT",
    client: "QUICKSILVER SCIENTIFIC",
    disciplines: [
      "ART DIRECTION",
      "PAID + ORGANIC DIGITAL CREATIVE STRATEGY",
      "FIELD MARKETING DISPLAY DESIGN",
      "RETAIL DISPLAY DESIGN",
      "PHOTOGRAPHY DIRECTION & STYLING",
      "DIGITAL COMMUNICATION STRATEGY (EMAIL+SOCIAL)",
    ],
    project_text:
      "Magic Mind approached me ahead of their 2020 launch to help bring their brand to life digitally. What began as digital brand support evolved into a long-term creative partnership spanning print design, art direction, and marketing creative direction. Over time, I helped shape the visual and strategic foundation behind their direct-to-consumer growth—now serving over 35,000 daily customers—and their retail expansion into 800+ stores nationwide. The collaboration has been rooted in elevating Magic Mind’s mission through consistent, cohesive, and emotionally resonant creative.",
    bottle_image: "quicksilver_scientific.png",
  },
  faherty: {
    headline: "FAHERTY",
    year: "2020-PRESENT",
    client: "FAHERTY",
    disciplines: [
      "ART DIRECTION",
      "PAID + ORGANIC DIGITAL CREATIVE STRATEGY",
      "FIELD MARKETING DISPLAY DESIGN",
      "RETAIL DISPLAY DESIGN",
      "PHOTOGRAPHY DIRECTION & STYLING",
      "DIGITAL COMMUNICATION STRATEGY (EMAIL+SOCIAL)",
    ],
    project_text:
      "Magic Mind approached me ahead of their 2020 launch to help bring their brand to life digitally. What began as digital brand support evolved into a long-term creative partnership spanning print design, art direction, and marketing creative direction. Over time, I helped shape the visual and strategic foundation behind their direct-to-consumer growth—now serving over 35,000 daily customers—and their retail expansion into 800+ stores nationwide. The collaboration has been rooted in elevating Magic Mind’s mission through consistent, cohesive, and emotionally resonant creative.",
    bottle_image: "faherty.png",
  },
  colgate: {
    headline: "COLGATE",
    year: "2020-PRESENT",
    client: "COLGATE",
    disciplines: [
      "ART DIRECTION",
      "PAID + ORGANIC DIGITAL CREATIVE STRATEGY",
      "FIELD MARKETING DISPLAY DESIGN",
      "RETAIL DISPLAY DESIGN",
      "PHOTOGRAPHY DIRECTION & STYLING",
      "DIGITAL COMMUNICATION STRATEGY (EMAIL+SOCIAL)",
    ],
    project_text:
      "Magic Mind approached me ahead of their 2020 launch to help bring their brand to life digitally. What began as digital brand support evolved into a long-term creative partnership spanning print design, art direction, and marketing creative direction. Over time, I helped shape the visual and strategic foundation behind their direct-to-consumer growth—now serving over 35,000 daily customers—and their retail expansion into 800+ stores nationwide. The collaboration has been rooted in elevating Magic Mind’s mission through consistent, cohesive, and emotionally resonant creative.",
    bottle_image: "colgate.png",
  },
};

let is2k = window.innerWidth > 1920;
let isTablet = window.innerWidth >= 768 && window.innerWidth < 1200;
let isMobile = window.innerWidth < 768;

window.addEventListener("resize", () => {
  isTablet = window.innerWidth >= 768 && window.innerWidth < 1200;
  isMobile = window.innerWidth < 768;
  is2k = window.innerWidth > 1920;
});

function workSectionBottleAnimation() {
  const nextProjectBtns = document.querySelectorAll(".next-project");

  const projectKeys = Object.keys(workContents);
  let activeIndex = 0;
  let isAnimating = false;

  const projectMainHeading = document.querySelector("#work h2");
  const year = document.querySelector("#work .year p:last-child");
  const client = document.querySelector("#work .client p:last-child");
  const disciplines = document.querySelector("#work .disciplines div");
  const projectText = document.querySelector("#work .project-text");

  // MAIN IMAGE (LEFT SIDE)
  const mainBottleImage = document.querySelector("#work .left > img");

  function getProject(index) {
    return workContents[
      projectKeys[(index + projectKeys.length) % projectKeys.length]
    ];
  }

  /* ---------------- CONTENT ---------------- */
  function updateProjectContent(content) {
    projectMainHeading.innerHTML = `
      ${content.headline}
      <p class="previous-btn mh-effect">
        <span class="mh-effect">PREVIOUS PROJECT</span>
        <span class="icon-font mh-effect">→</span>
        <span class="liquid-bg"></span>
      </p>
    `;

    year.innerHTML = content.year;
    client.innerHTML = content.client;

    disciplines.innerHTML = "";
    content.disciplines.forEach((text, i) => {
      const p = document.createElement("p");
      p.innerHTML = text;
      if (i === 0) p.classList.add("end-last");
      disciplines.appendChild(p);
    });

    projectText.innerHTML = content.project_text;
  }

  /* ---------------- MAIN IMAGE ---------------- */
  function updateMainImage(content) {
    if (!mainBottleImage || !content?.bottle_image) return;

    gsap.killTweensOf(mainBottleImage);

    gsap.fromTo(
      mainBottleImage,
      { opacity: 0, filter: "blur(16px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power4.out",
        onStart: () => {
          mainBottleImage.src = `./images/${content.bottle_image}`;
        },
      }
    );
  }

  /* ---------------- CARD HELPERS ---------------- */
  function resetProduct(product) {
    if (!product) return;

    gsap.set(product, { clearProps: "all" });

    const btnP = product.querySelector("p");
    const heading = product.querySelector("h2");
    const img = product.querySelector("img");

    if (btnP && heading) {
      gsap.set([btnP, heading], {
        opacity: 1,
        display: "flex",
        pointerEvents: "auto",
      });
    }

    if (img) gsap.set(img, { filter: "blur(16px)" });
  }

  function updateCard(card, content) {
    if (!card || !content) return;

    const img = card.querySelector("img");
    const heading = card.querySelector("h2");

    if (img) img.src = `./images/${content.bottle_image}`;
    if (heading) heading.textContent = content.headline;
    if (content.card_width) card.style.width = content.card_width;
  }

  /* ---------------- NEXT PROJECT ---------------- */
  nextProjectBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (isAnimating) return;
      isAnimating = true;

      gsap.killTweensOf("#work .left");
      gsap.killTweensOf("#work .right:not(.mobile) > *");

      activeIndex = (activeIndex + 1) % projectKeys.length;

      const firstContent = getProject(activeIndex);
      const secondContent = getProject(activeIndex + 1);
      const thirdContent = getProject(activeIndex + 2);

      updateProjectContent(firstContent);
      updateMainImage(firstContent);

      const first = document.querySelector(".first");
      const second = document.querySelector(".second");
      const third = document.querySelector(".third");

      resetProduct(first);
      resetProduct(second);
      resetProduct(third);

      first.classList.replace("first", "third");
      updateCard(first, thirdContent);

      gsap.set(first, { opacity: 0, display: "none" });

      const secondImg = second.querySelector("img");
      const secondBtn = second.querySelector("p");
      const secondHeading = second.querySelector("h2");

      gsap.to([secondBtn, secondHeading], {
        opacity: 0,
        display: "none",
        duration: 0.2,
      });

      gsap.to(secondImg, { rotate: 15, duration: 0.2, delay: 0.2 });

      setTimeout(() => {
        scrollToSection("#work", -100);

        gsap.to(second, {
          top: 0,
          left: 0,
          right: "unset",
          bottom: "unset",
          width: isTablet
            ? "auto"
            : isMobile
            ? "100%"
            : is2k
            ? "21.771vw"
            : "418px",
          maxWidth: isMobile ? "100%" : "",
          rotate: 360,
          duration: 2,
          ease: "power4.out",
        });

        gsap.to(secondImg, {
          filter: "blur(0px)",
          duration: 1,
          onComplete: () => {
            second.classList.replace("second", "first");
            third.classList.replace("third", "second");

            updateCard(second, firstContent);
            resetProduct(third);
            updateCard(third, secondContent);

            gsap.to(first, {
              opacity: 1,
              display: "flex",
              duration: 0.3,
            });

            isAnimating = false;
          },
        });
      }, 400);

      const left = document.querySelector("#work .left");
      const rightItems = document.querySelectorAll(
        "#work .right:not(.mobile) > *"
      );

      gsap.from(left, {
        left: "-150%",
        delay: 1,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(rightItems, {
        scale: 0,
        filter: "blur(16px)",
        duration: 1,
        delay: 1,
        ease: "power4.out",
      });
    });
  });

  /* ---------------- PREVIOUS PROJECT ---------------- */
  document.addEventListener("click", (e) => {
    const prevBtn = e.target.closest(".previous-btn");
    if (!prevBtn || isAnimating) return;

    isAnimating = true;

    gsap.killTweensOf("#work .left");
    gsap.killTweensOf("#work .right:not(.mobile) > *");

    // move index backward
    activeIndex = (activeIndex - 1 + projectKeys.length) % projectKeys.length;

    const firstContent = getProject(activeIndex);
    const secondContent = getProject(activeIndex + 1);
    const thirdContent = getProject(activeIndex + 2);

    // update text + main image
    updateProjectContent(firstContent);
    updateMainImage(firstContent);

    const first = document.querySelector(".first");
    const second = document.querySelector(".second");
    const third = document.querySelector(".third");

    resetProduct(first);
    resetProduct(second);
    resetProduct(third);

    /* -------- BACKWARD CARD ROTATION -------- */

    // third -> first
    gsap.set(second, {
      left: is2k ? "-52.083vw" : "-1000px",
      top: is2k ? "-52.083vw" : "-1000px",
      bottom: "unset",
      right: "unset",
      duration: 0,
    });

    gsap.to(first, {
      top: "unset",
      left: isMobile ? "8px" : "unset",
      bottom: "180px",
      right: isTablet
        ? "225px"
        : isMobile
        ? "unset"
        : is2k
        ? "32.292vw"
        : "620px",
      width: isMobile ? "70%" : "fit-content",
      rotate: 360,
      duration: 2,
      ease: "power4.out",
    });

    gsap.to(first.querySelector("img"), {
      rotate: -15,
    });

    setTimeout(() => {
      first.classList.replace("first", "second");
      resetProduct(first);
    }, [1800]);

    gsap.to(second, {
      top: 0,
      left: 0,
      right: "unset",
      bottom: "unset",
      width: isTablet
        ? "auto"
        : isMobile
        ? "100%"
        : is2k
        ? "21.771vw"
        : "418px",
      rotate: 360,
      duration: 2,
      ease: "power4.out",
    });

    const secondImg = second.querySelector("img");
    const secondBtn = second.querySelector("p");
    const secondHeading = second.querySelector("h2");

    gsap.to([secondBtn, secondHeading], {
      opacity: 0,
      display: "none",
      duration: 0.2,
    });

    gsap.to(secondImg, {
      rotate: 15,
      filter: "blur(0px)",
      duration: 0.2,
      delay: 0.2,
    });

    updateCard(third, thirdContent);

    // // first -> second
    updateCard(first, secondContent);

    // // second -> third
    updateCard(second, firstContent);

    /* -------- LEFT / RIGHT CONTENT ANIMATION -------- */

    const left = document.querySelector("#work .left");
    const rightItems = document.querySelectorAll("#work .right *");

    gsap.set(left, { left: "-150%" });
    gsap.set(rightItems, { scale: 0, filter: "blur(16px)" });

    gsap.to(left, {
      left: "0%",
      delay: 1,
      duration: 1,
      ease: "power4.out",
    });

    gsap.to(rightItems, {
      scale: 1,
      filter: "blur(0px)",
      delay: 1,
      duration: 1,
      ease: "power4.out",
      onComplete: () => {
        isAnimating = false;
      },
    });

    second.classList.replace("second", "first");
  });
}

workSectionBottleAnimation();

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
  scrollToTopOnRefresh();
});

window.addEventListener("load", createTransformAnimations);

// document.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
// });

// Function to disable dragging for images
function disableImageDrag(img) {
  img.setAttribute("draggable", "false");
}

// Initially disable for all existing images
document.querySelectorAll("img").forEach(disableImageDrag);

// Observe the document for new images
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.tagName === "IMG") disableImageDrag(node);
      else if (node.querySelectorAll) {
        node.querySelectorAll("img").forEach(disableImageDrag);
      }
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });
