document.addEventListener("DOMContentLoaded", function () {
  // all your current script content goes here
  // ================ script for loader ====================

  var loader = document.querySelector("#loader");
  setTimeout(() => {
    loader.style.top = "-100%";
  }, 7000);

  // ================ script for loader ====================
  Shery.imageEffect("#back", {
    style: 2,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: -0.91, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 1.4634994206257241 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: true },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.1, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: false },
      onMouse: { value: 0 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.2, range: [0, 2], _gsap: { id: 3 } },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
    gooey: true,
  });

  // script for navbar
  const menuBtn = document.getElementById("menu-toggle");
  const navOverlay = document.getElementById("fullscreen-nav");
  const navLinks = document.querySelectorAll(".elem");

  let isNavOpen = false;

  menuBtn.addEventListener("click", () => {
    if (!isNavOpen) {
      navOverlay.classList.add("active");
      menuBtn.classList.add("open");

      gsap.from(navLinks, {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      isNavOpen = true;
    } else {
      gsap.to(navOverlay, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          navOverlay.classList.remove("active");
          navOverlay.style.opacity = ""; // reset inline style
          isNavOpen = false;
        },
      });
      menuBtn.classList.remove("open");
    }
  });

  navLinks.forEach((elem) => {
    elem.addEventListener("click", () => {
      // Get the target section name (from <li> text or href inside <a>)
      let targetText = elem.querySelector("li")?.innerText.toLowerCase();

      // Special case for the one that uses an anchor tag with href
      const anchor = elem.querySelector("a");
      if (anchor && anchor.getAttribute("href").startsWith("#")) {
        const id = anchor.getAttribute("href").slice(1);
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Fallback: Use innerText to match section ID
        const section = document.getElementById(targetText);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }

      // Animate closing the overlay
      gsap.to(navOverlay, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          navOverlay.classList.remove("active");
          navOverlay.style.opacity = "";
          isNavOpen = false;
        },
      });

      // Reset hamburger button
      menuBtn.classList.remove("open");
    });
  });

  // js for copying email and number
  // Email functionality
  // Email functionality
  const emailElement = document.getElementById("email1");
  emailElement.addEventListener("click", () => {
    const email = emailElement.textContent;
    window.location.href = `mailto:${email}`;
  });

  // Mobile number copy functionality
  const mobileElement = document.getElementById("mobile");
  const popup = document.getElementById("popup");

  mobileElement.addEventListener("click", () => {
    const mobileNumber = mobileElement.textContent;

    // Copy to clipboard
    navigator.clipboard
      .writeText(mobileNumber)
      .then(() => {
        // Show popup notification
        popup.classList.remove("hidden");
        popup.classList.add("show");

        // Hide popup after 2 seconds
        setTimeout(() => {
          popup.classList.remove("show");
          popup.classList.add("hidden");
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  });

  // ===================script for contact section =====================
  // Init EmailJS
  emailjs.init("t6HLEF4dIH-9KL74O"); // Replace this with your actual public key

  document
    .getElementById("contact-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !phone || !message) {
        Swal.fire({
          icon: "warning",
          title: "Oops!",
          text: "Please fill out all fields.",
          background: "#1e1e1e",
          color: "#fff",
          confirmButtonColor: "#3085d6",
        });
        return;
      }

      emailjs.sendForm("service_5qc1eig", "template_2bk33hc", this).then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Thanks! I will get back to you shortly.",
            background: "#1e1e1e",
            color: "#fff",
            confirmButtonColor: "#00b894",
          });
          this.reset();
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Failed to send!",
            text: "Please try again later.",
            background: "#1e1e1e",
            color: "#fff",
            confirmButtonColor: "#e74c3c",
          });
        }
      );
    });

  // GSAP Scroll Animations
  gsap.registerPlugin(ScrollTrigger);

  gsap.from("#contact-card", {
    opacity: 0,
    y: 100,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#contact-card",
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });

  gsap.from("#contact-title", {
    opacity: 0,
    x: -50,
    duration: 1,
    delay: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#contact-title",
      start: "top 90%",
    },
  });
});

// =========script for about section
const canvas2 = document.querySelector("#frames_canvas");
const context = canvas2.getContext("2d");

const frames = {
  currentIndex: 0,
  maxIndex: 70,
};

let imagesLoaded = 0;
const images = [];

function preloadImages() {
  for (let i = 1; i <= frames.maxIndex; i++) {
    const imageUrl = `./frames2/frame_${i.toString().padStart(4, "0")}.jpg`;
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === frames.maxIndex) {
        loadImage(frames.currentIndex);
        startAnimation();
        animateTimeline();
      }
    };
    images.push(img);
  }
}

// let lastDrawnFrame = -1;
function loadImage(index) {
  if (index >= 0 && index <= frames.maxIndex) {
    const img = images[index];

    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

    const scaleX = canvas2.width / img.width;
    const scaleY = canvas2.height / img.height;
    const scale = Math.max(scaleX, scaleY);

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const offsetX = (canvas2.width - newWidth) / 2;
    const offsetY = (canvas2.height - newHeight) / 2;

    context.clearRect(0, 0, canvas2.width, canvas2.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
    frames.currentIndex = index;
  }
}

function startAnimation() {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#parentt",
        start: "top top",
        scrub: 7,
        end: "bottom bottom",
      },
    })
    .to(frames, {
      currentIndex: frames.maxIndex,
      onUpdate: () => loadImage(Math.floor(frames.currentIndex)),
    });
}

function animateTimeline() {
  gsap.utils.toArray(".glass-card").forEach((card, index) => {
    gsap.fromTo(
      card,
      { x: -120, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top center+=100",
          end: "bottom center",
          scrub: true,
        },
      }
    );
  });
}

window.addEventListener("resize", () => {
  loadImage(frames.currentIndex);
});

preloadImages();

// pop up for canvas2
// Show popup when canvas2 section enters
ScrollTrigger.create({
  trigger: "#parentt",
  start: "top center",
  once: true,
  onEnter: () => {
    const popup = document.getElementById("scrollPopup");
    popup.classList.remove("opacity-0");
    popup.classList.add("opacity-100");

    setTimeout(() => {
      popup.classList.remove("opacity-100");
      popup.classList.add("opacity-0");
    }, 2500); // Hide after 3 seconds
  },
});

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animate all project cards
gsap.utils.toArray(".project-card").forEach((card, index) => {
  gsap.from(card, {
    opacity: 0,
    y: 50,
    scale: 0.95,
    duration: 0.8,
    delay: index * 0.1, // stagger-like delay
    ease: "power2.out",
    scrollTrigger: {
      trigger: card,
      start: "top 90%", // when top of card hits 90% of viewport
      toggleActions: "play none none none",
    },
  });
});
