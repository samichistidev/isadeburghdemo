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
      trigger: ".about",
      start: "top 100%",
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

//

(() => {
  const rows = document.querySelectorAll(".text-carousel");

  rows.forEach((row) => {
    const isLeft = row.classList.contains("left");

    if (isLeft) {
      gsap.to(row, {
        x: "-100%",
        duration: 30,
        ease: "linear",
        repeat: -1,
      });
    } else {
      gsap.fromTo(
        row,
        {
          x: "-100%",
          duration: 30,
          ease: "linear",
          repeat: -1,
        },
        {
          x: "0%",
          duration: 30,
          ease: "linear",
          repeat: -1,
        }
      );
    }
  });
})();

//

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

//

let aboutImage1 = document.querySelector(".abt-img-1");
let aboutImage2 = document.querySelector(".abt-img-2");
let aboutImage3 = document.querySelector(".abt-img-3");
let aboutImage5 = document.querySelector(".abt-img-5");
let aboutImage7 = document.querySelector(".abt-img-7");
let aboutImage8 = document.querySelector(".abt-img-8");
let aboutImage10 = document.querySelector(".abt-img-10");

// config
const images = [
  { el: aboutImage1, hoverTransform: "-50px, -50px, 30deg", normalZ: 0 },
  { el: aboutImage2, hoverTransform: "-50px, -50px, -30deg", normalZ: 1 },
  { el: aboutImage3, hoverTransform: "-50px, -50px, -15deg", normalZ: 2 },
  { el: aboutImage5, hoverTransform: "95px, -140px, -30deg", normalZ: 2 },
  { el: aboutImage7, hoverTransform: "80px, -120px, -45deg", normalZ: 1 },
  { el: aboutImage8, hoverTransform: "90px, -220px, 0deg", normalZ: 0 },
  { el: aboutImage10, hoverTransform: "70px, 70px, 15deg", normalZ: 0 },
];

let activeCard = null;
let isResetting = false;

images.forEach((img) => {
  const el = img.el;
  const [x, y, deg] = img.hoverTransform.split(",").map((s) => s.trim());

  function fullyResetCard(card, data) {
    return new Promise((resolve) => {
      const [rx, ry, rdeg] = data.hoverTransform
        .split(",")
        .map((s) => s.trim());

      gsap.killTweensOf(card);

      gsap.to(card, {
        duration: 0.12,
        transform: `translateX(${rx}) translateY(${ry}) rotate(${rdeg})`,
      });

      gsap.to(card, {
        delay: 0.12,
        duration: 0.12,
        zIndex: data.normalZ,
      });

      gsap.to(card, {
        delay: 0.24,
        duration: 0.12,
        transform: `translateX(0) translateY(0) rotate(${rdeg})`,
        onComplete: resolve,
      });
    });
  }

  function animateIn() {
    gsap.killTweensOf(el);

    gsap.to(el, {
      duration: 0.12,
      transform: `translateX(${x}) translateY(${y}) rotate(${deg})`,
    });

    gsap.to(el, {
      delay: 0.12,
      duration: 0.12,
      zIndex: 5,
      boxShadow: "4px 4px 120px rgba(0, 0, 0, 0.08)",
    });

    gsap.to(el, {
      delay: 0.24,
      duration: 0.12,
      transform: `translateX(0) translateY(0) rotate(${deg})`,
      boxShadow: "4px 4px 120px rgba(0, 0, 0, 0.08)",
      onComplete: () => {
        activeCard = el;
      },
    });
  }

  async function handleEnter() {
    if (isResetting || activeCard === el) return;

    if (activeCard) {
      isResetting = true;
      const prev = activeCard;
      const prevData = images.find((i) => i.el === prev);

      await fullyResetCard(prev, prevData); // <= FULL RESET FIRST
      activeCard = null;
      isResetting = false;
    }

    animateIn(); // now animate new one
  }

  function handleLeave() {
    if (activeCard !== el) return;

    const [lx, ly, ldeg] = img.hoverTransform.split(",").map((s) => s.trim());

    gsap.killTweensOf(el);

    gsap.to(el, {
      duration: 0.12,
      transform: `translateX(${lx}) translateY(${ly}) rotate(${ldeg})`,
      boxShadow: "4px 4px 120px rgba(0, 0, 0, 0.08)",
    });

    gsap.to(el, {
      delay: 0.12,
      duration: 0.12,
      zIndex: img.normalZ,
      boxShadow: "none",
    });

    gsap.to(el, {
      delay: 0.24,
      duration: 0.12,
      transform: `translateX(0) translateY(0) rotate(${ldeg})`,
      boxShadow: "none",
      onComplete: () => {
        if (activeCard === el) activeCard = null;
      },
    });
  }
  el.addEventListener("mouseenter", handleEnter);
  el.addEventListener("mouseleave", handleLeave);
});

let menuLinks = document.querySelectorAll(".menu li");

menuLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    gsap.to(link, {
      fontSize: 64,
      duration: 0.4,
      ease: "power4.out",
    });
  });
  link.addEventListener("mouseleave", () => {
    gsap.to(link, {
      fontSize: 24,
      duration: 0.4,
      ease: "power4.out",
    });
  });
});

let menuBtn = document.querySelector(".menu-btn");
let menu = document.querySelector(".menu");

menuBtn.addEventListener("click", () => {
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
    menuBtn.innerHTML = `<rect width="16" height="2" fill="black" />
              <rect y="10" width="16" height="2" fill="black" />`;
  } else {
    menu.classList.add("active");
    menuBtn.innerHTML = `
      <rect width="15.0807" height="1.88508" transform="matrix(0.707272 0.706941 -0.707272 0.706941 1.33301 0)" fill="black"/>
  <rect width="15.0807" height="1.88508" transform="matrix(0.707272 -0.706941 0.707272 0.706941 0 10.668)" fill="black"/>
    `;
  }
});

// document.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
// });

let scrollToTopBtn = document.querySelector(".scroll-to-top-btn");

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scrolling
  });
});

const copyBtn = document.getElementById("copyBtn");
const textToCopy = document.getElementById("textToCopy").innerText;
const popup = document.getElementById("popup");

copyBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      popup.classList.add("show");

      setTimeout(() => {
        popup.classList.remove("show");
      }, 1500);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
});

const menuItems = document.querySelectorAll(".menu li");

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    const targetId = item.getAttribute("data-target");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

//

const products = document.querySelectorAll(".product");

// attach click to ALL p elements inside product
products.forEach((product) => {
  const nextBtn = product.querySelector("p");
  nextBtn.addEventListener("click", rotateProducts);
});

const prevBtn = document.querySelector(".previous-btn");
prevBtn.addEventListener("click", goToPreviousCard);

function rotateProducts() {
  const active = document.querySelector(".product.active");
  const next = document.querySelector(".product.next");
  const afterNext = document.querySelector(".product.after-next");

  // Remove old classes
  active.classList.remove("active");
  next.classList.remove("next");
  afterNext.classList.remove("after-next");

  // Add new classes (rotate)
  active.classList.add("after-next");
  next.classList.add("active");
  afterNext.classList.add("next");
}

function goToPreviousCard() {
  const active = document.querySelector(".product.active");
  const next = document.querySelector(".product.next");
  const afterNext = document.querySelector(".product.after-next");

  // Remove old classes
  active.classList.remove("active");
  next.classList.remove("next");
  afterNext.classList.remove("after-next");

  // Add new classes (rotate)
  active.classList.add("next");
  next.classList.add("after-next");
  afterNext.classList.add("active");
}
