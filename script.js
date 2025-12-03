gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

ScrollTrigger.scrollerProxy(document.documentElement, {
  scrollTop(value) {
    if (arguments.length) return lenis.scrollTo(value);
    return lenis.scroll.instance
      ? lenis.scroll.instance.scroll.y
      : window.scrollY;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.documentElement.style.transform ? "transform" : "fixed",
});

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

let navigationLogo = document.querySelector(".navigation .logo");
let logoTween = null;

function setLogoInlineMaxWidth(px) {
  if (!navigationLogo) return;
  if (px == null) return;
  const value =
    typeof px === "number" ? typeof px === "string" && /[a-z%]$/i.test(px) : px;
  navigationLogo.style.maxWidth = value;
}

function createLogoTween() {
  if (logoTween) {
    logoTween.kill();
    logoTween = null;
  }

  const logoEl = document.querySelector(".navigation .logo");
  if (!logoEl) return;

  // Starting value (bigger)
  const startWidth =
    window.innerWidth > 1920
      ? "53.854vw"
      : window.innerWidth > 1024
      ? "1034px"
      : window.innerWidth > 600
      ? "530px"
      : "212px";

  // Target value (smaller)
  const endWidth =
    window.innerWidth > 1920
      ? "13.802vw"
      : window.innerWidth > 600
      ? "265px"
      : "212px";

  logoEl.style.maxWidth = startWidth;

  logoTween = gsap.to(logoEl, {
    maxWidth: endWidth,
    duration: 2,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".carousel",
      start: "top 100%",
      scrub: true,
    },
  });

  logoTween = gsap.to(logoEl, {
    maxWidth: startWidth,
    duration: 2,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".work",
      start: "top -50%",
      scrub: true,
    },
  });
}

function applyResponsiveLogo() {
  // refresh reference (in case DOM changed)
  navigationLogo = document.querySelector(".navigation .logo");
  const px =
    window.innerWidth > 1920
      ? "53.854vw"
      : window.innerWidth > 1024
      ? "1034px"
      : window.innerWidth > 600
      ? "530px"
      : "212px";
  setLogoInlineMaxWidth(px);
  createLogoTween();
  // refresh ScrollTrigger after layout change (Lenis doesn't expose update())
  ScrollTrigger.refresh();
}

let resizeTimer = null;
window.addEventListener("load", applyResponsiveLogo);
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(applyResponsiveLogo, 120);
});

gsap.from(".hero .p span", {
  bottom: "-300px",
  delay: 0.1,
  duration: 1.5,
  ease: "power4.out",
  stagger: 0.1,
});

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

(function addHeroScrollHandlers() {
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
})();

const leftCarousels = document.querySelectorAll(".text-carousel.left");
const rightCarousels = document.querySelectorAll(".text-carousel.right");

window.addEventListener("wheel", (e) => {
  if (e.deltaY > 0) {
    leftCarousels.forEach((carousel) => {
      gsap.to(carousel, {
        animation: "scroll-right 30s linear infinite",
      });
    });
    rightCarousels.forEach((carousel) => {
      gsap.to(carousel, {
        animation: "scroll-left 30s linear infinite",
      });
    });
  } else {
    leftCarousels.forEach((carousel) => {
      gsap.to(carousel, {
        animation: "scroll-left 30s linear infinite",
      });
    });
    rightCarousels.forEach((carousel) => {
      gsap.to(carousel, {
        animation: "scroll-right 30s linear infinite",
      });
    });
  }
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
