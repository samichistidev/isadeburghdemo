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
      start: "top 110%",
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

const popup = document.getElementById("popup");
const copyBtn = document.getElementById("copyBtn");
const textToCopy = document.getElementById("textToCopy");

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(textToCopy.textContent);
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
});

const container = document.querySelector(".about-images");
const images = container.querySelectorAll("img");

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

    img.classList.add("floating"); // start animation again
  }

  // MOUSE SUPPORT
  img.addEventListener("mousedown", startDrag);

  // TOUCH SUPPORT
  img.addEventListener("touchstart", startDrag, { passive: false });
});
