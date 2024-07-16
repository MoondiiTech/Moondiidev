// Global variable to store the current transition type
let currentTransitionType = "type1";

// Initialize first swiper with default options
const swiper1Options = {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  initialSlide: 1,
  pagination: {
    el: ".swiper-pagination-1",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next-1",
    prevEl: ".swiper-button-prev-1",
  },
};

// Initialize second swiper with different options
const swiper2Options = {
  slidesPerView: 1, // Default slides per view for mobile
  spaceBetween: 0,
  loop: true,
  initialSlide: 1,
  pagination: {
    el: ".swiper-pagination-2",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next-2",
    prevEl: ".swiper-button-prev-2",
  },
  breakpoints: {
    // Breakpoints for responsive design
    // Show 4 for desktop
    1024: {
      slidesPerView: 3,
      loop: false, // Set to false until there are more than 3 slides. It is causing a bug.
    },
    // Show 3 for tablet
    768: {
      spaceBetween: 40,
      slidesPerView: 2,
    },
  },
};

function showDetails(title, description) {
  document.getElementById("project-title").textContent = title;
  document.getElementById("project-details").textContent = description;
  document.getElementById("project-details-overlay").style.display = "flex";
}

function closeDetails() {
  var overlay = document.getElementById("project-details-overlay");
  if (overlay) {
    overlay.style.display = "none";
  } else {
    console.error("Overlay element not found!");
  }
}

function showOverlay() {
  console.log("Showing overlay");
  document.getElementById("overlay").style.display = "block";
}

function hideOverlay() {
  var overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.style.display = "none";
  }
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

function contentAnimationForGames() {
  console.log("Animating games content");
  gsap.from("main", {
    duration: 1,
    opacity: 0,
    ease: "power2.inOut",
  });
}

function setEqualHeightForSlides() {
  const slides = document.querySelectorAll(".swiper-slide");
  let maxHeight = 0;

  // Calculate the maximum height
  slides.forEach((slide) => {
    const slideHeight = slide.offsetHeight;
    if (slideHeight > maxHeight) {
      maxHeight = slideHeight;
    }
  });

  // Set the height for all slides
  slides.forEach((slide) => {
    slide.style.height = `${maxHeight}px`;
  });
}

// Call the function after the Swiper initialization
function initializePage() {
  console.log("Initializing page...");
  initSwiper(".swiper-container-1", swiper1Options);
  initSwiper(".swiper-container-2", swiper2Options);
  initVideoControls();
  setEqualHeightForSlides(); // Set equal height for slides
  console.log("Page initialized.");
}

function initSwiper(containerSelector, options) {
  console.log("Initializing Swiper...");

  // Ensure the container exists before initializing Swiper
  const containerElement = document.querySelector(containerSelector);
  if (!containerElement) {
    console.error("Swiper container not found:", containerSelector);
    return;
  }

  // Destroy any existing Swiper instances on this container to prevent conflicts
  if (containerElement.swiper) {
    containerElement.swiper.destroy(true, true);
  }

  // Initialize Swiper
  let swiper;
  try {
    swiper = new Swiper(containerSelector, options);
  } catch (error) {
    console.error("Error initializing Swiper:", error);
    return;
  }

  // Access slidesPerView from Swiper instance after initialization
  const slidesPerView = swiper.params.slidesPerView;

  // Cooldown period in milliseconds
  const cooldown = 100;
  let isCooldown = false; // Flag to manage cooldown state

  // Function to handle button click with cooldown
  const handleButtonClick = (button, action) => {
    if (!isCooldown) {
      isCooldown = true;
      button.classList.add("disabled"); // Optionally, add a CSS class to visually disable the button
      setTimeout(() => {
        action();
        button.classList.remove("disabled"); // Remove the CSS class to enable the button
        isCooldown = false;
      }, cooldown);
    }
  };

  // Debounce function to prevent multiple rapid clicks
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Get next and previous button elements
  const nextButton = document.querySelector(".swiper-button-next");
  const prevButton = document.querySelector(".swiper-button-prev");

  if (!nextButton || !prevButton) {
    console.error("Swiper buttons not found");
    return;
  }

  // Remove existing event listeners to ensure only one listener is added
  if (nextButton) {
    nextButton.removeEventListener("click", nextButton._listener);
    const nextButtonHandler = () => {
      handleButtonClick(nextButton, () => {
        try {
          if (swiper.slides && swiper.slides.length > 0) {
            swiper.slideNext(); // Move swiper forward one slide
          } else {
            console.error("Swiper slides not found or empty");
          }
        } catch (error) {
          console.error("Error moving swiper forward:", error);
        }
      });
    };
    nextButton._listener = debounce(nextButtonHandler, 100);
    nextButton.addEventListener("click", nextButton._listener);
  }

  if (prevButton) {
    prevButton.removeEventListener("click", prevButton._listener);
    const prevButtonHandler = () => {
      handleButtonClick(prevButton, () => {
        try {
          if (swiper.slides && swiper.slides.length > 0) {
            swiper.slidePrev(); // Move swiper backward one slide
          } else {
            console.error("Swiper slides not found or empty");
          }
        } catch (error) {
          console.error("Error moving swiper backward:", error);
        }
      });
    };
    prevButton._listener = debounce(prevButtonHandler, 100);
    prevButton.addEventListener("click", prevButton._listener);
  }

  // Log the Swiper instance for debugging
  console.log(swiper);

  console.log("Swiper initialized.");
}

function initVideoControls() {
  console.log("Initializing video controls...");
  const videos = document.querySelectorAll(".custom-video");
  console.log("Found videos:", videos);

  const isComputer = /Windows|Macintosh|Linux/.test(navigator.userAgent);

  videos.forEach((video) => {
    const loader = video.parentElement.querySelector(".loader");

    if (isComputer) {
      video.load();
      video.removeAttribute("autoplay");
    } else {
      video.autoplay = true;
      video.muted = true;
    }

    // Show loader and hide video initially
    video.style.display = "none";
    loader.style.display = "block";

    // Combined event listener for video readiness
    const handleVideoReady = () => {
      if (loader) {
        loader.style.display = "none";
      }
      video.style.display = "block";
      if (isComputer) {
        const playButton = video.parentElement.querySelector(".play-button");
        if (playButton) {
          playButton.style.display = "none";
        }
        video.play().catch(() => {});
      }
    };

    video.addEventListener("canplaythrough", handleVideoReady);

    // Fallback to hide loader after a certain time
    setTimeout(() => {
      if (loader) {
        loader.style.display = "none";
      }
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
      const playButton = video.parentElement.querySelector(".play-button");
      if (playButton) {
        playButton.style.display = "none";
      }
      video.muted = false; // Unmute the video
      video.play();
    });

    // Event listener for exiting fullscreen
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        video.muted = true; // Mute the video
        video.play();
      }
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
        document.getElementById("project-details-overlay").style.display =
          "none";

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
          case "games":
            contentAnimationForGames();
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
