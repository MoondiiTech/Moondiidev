// Global variable to store the current transition type
let currentTransitionType = "type1";

function showOverlay() {
  console.log("Showing overlay");
  document.getElementById("overlay").style.display = "block";
}

function hideOverlay() {
  console.log("Hiding overlay");
  document.getElementById("overlay").style.display = "none";
}

// Define transition functions for each type
function pageTransitionType1() {
  console.log("Starting pageTransitionType1");
  showOverlay();
  const elements = document.querySelectorAll("ul.transition--1 li");
  console.log("Elements to animate:", elements);
  return gsap
    .timeline({
      onComplete: () => {
        console.log("Completed pageTransitionType1");
        hideOverlay();
      },
    })
    .to(elements, {
      duration: 0.3,
      scaleY: 1,
      stagger: 0.1,
      transformOrigin: "bottom left",
    });
}

function pageTransitionTypeOut1() {
  console.log("Starting pageTransitionTypeOut1");
  showOverlay();
  const elements = document.querySelectorAll("ul.transition--1 li");
  console.log("Elements to animate:", elements);
  return gsap
    .timeline({
      onComplete: () => {
        console.log("Completed pageTransitionTypeOut1");
        hideOverlay();
      },
    })
    .to(elements, {
      duration: 0.3,
      scaleY: 0,
      stagger: 0.08,
      delay: 0.1,
      transformOrigin: "bottom left",
    });
}

function pageTransitionType2() {
  console.log("Starting pageTransitionType2");
  showOverlay();
  const elements = document.querySelectorAll("ul.transition--2 li");
  console.log("Elements to animate:", elements);
  return gsap
    .timeline({
      onComplete: () => {
        console.log("Completed pageTransitionType2");
        hideOverlay();
      },
    })
    .to(elements, {
      duration: 0.7,
      scaleX: 1,
      transformOrigin: "bottom left",
      ease: "Power2.easeInOut",
    });
}

function pageTransitionTypeOut2() {
  console.log("Starting pageTransitionTypeOut2");
  showOverlay();
  const elements = document.querySelectorAll("ul.transition--2 li");
  console.log("Elements to animate:", elements);
  return gsap
    .timeline({
      onComplete: () => {
        console.log("Completed pageTransitionTypeOut2");
        hideOverlay();
      },
    })
    .to(elements, {
      duration: 0.7,
      scaleX: 0,
      transformOrigin: "bottom right",
      ease: "Power2.easeInOut",
    });
}

const transitions = {
  type1: pageTransitionType1,
  type2: pageTransitionType2,
};

// Content animation function for general page content
function contentAnimation() {
  console.log("Animating content");
  gsap.from(".menu", { duration: 1, y: 30, opacity: 0, ease: "power2.inOut" });
}

function contentAnimationForSkills() {
  console.log("Animating skills content");
  gsap.from("main", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power1.out",
  });
}

function contentAnimationForWebsites() {
  console.log("Animating websites content");
  gsap.from("main", {
    duration: 1,
    opacity: 0,
    ease: "power2.inOut",
  });
}

function initializePage() {
  console.log("Initializing page...");
  initSwiper();
  initVideoControls();
  console.log("Page initialized.");
}

function initSwiper() {
  console.log("Initializing Swiper...");
  const swiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    initialSlide: 1, // Start from the second slide (index 1)
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  console.log("Swiper initialized.");
}
function initVideoControls() {
  console.log("Initializing video controls...");
  const videos = document.querySelectorAll(".custom-video");
  console.log("Found videos:", videos);

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  videos.forEach((video) => {
    video.play();

    // Autoplay handling for iOS devices
    if (isIOS) {
      video.autoplay = true;
      video.muted = true;
    } else {
      video.removeAttribute("autoplay");
    }

    // Handle video loaded metadata event
    video.addEventListener("loadedmetadata", () => {
      if (video.readyState > 2) {
        // readyState 3 means the video is ready to play
        video.style.display = "block";
        if (!isIOS) {
          video.play().catch(() => {});
        }
      }
    });

    // Handle video can play event
    video.addEventListener("canplay", () => {
      video.style.display = "block";
      if (!isIOS) {
        video.play().catch(() => {});
      }
    });

    // Fallback to hide loader after a certain time
    setTimeout(() => {
      video.style.display = "block";
    }, 5000); // 5 seconds timeout as a fallback

    // Event listener for click to go fullscreen
    video.addEventListener("click", () => {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen(); // Firefox
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen(); // Chrome, Safari and Opera
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen(); // IE/Edge
      }
      video.muted = false; // Unmute the video
      video.play();
    });
  });

  console.log("Video controls initialized.");
}

// Ensure page initialization after Barba.js transitions
barba.hooks.afterEnter((data) => {
  console.log("Barba.js afterEnter hook called. Reinitializing page...");
  initializePage();
});

// Barba.js initialization
barba.init({
  transitions: [
    {
      name: "default-transition",
      leave(data) {
        const done = this.async();
        currentTransitionType = data.trigger.dataset.transitionType || "type1";
        console.log("Leave transition type:", currentTransitionType);
        let timeline = transitions[currentTransitionType]();
        timeline.eventCallback("onComplete", done);
      },
      enter(data) {
        console.log("Enter namespace:", data.next.namespace);
        switch (data.next.namespace) {
          case "skills":
            contentAnimationForSkills();
            break;
          case "websites":
            contentAnimationForWebsites();
            break;
          default:
            contentAnimation();
            break;
        }
      },
      afterEnter(data) {
        console.log("After enter transition type:", currentTransitionType);
        let timelineOut =
          currentTransitionType === "type1"
            ? pageTransitionTypeOut1()
            : pageTransitionTypeOut2();
        timelineOut.play();
      },
    },
  ],
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed.");
  initializePage();
});
