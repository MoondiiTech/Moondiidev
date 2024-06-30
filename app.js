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
  gsap.from(".menu", {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: "power2.inOut",
  });
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
    duration: 1.5,
    x: 100,
    opacity: 0,
    ease: "power2.inOut",
  });
}

// Function to initialize Swiper.js
function initSwiper() {
  console.log("Initializing Swiper");
  new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// Function to re-enable interactions
function enableInteractions() {
  document.querySelector("body").style.pointerEvents = "auto";
}

barba.init({
  cache: false, // Disable Barba.js cache
  transitions: [
    {
      name: "flexible-transition",
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
        enableInteractions();
      },
      once(data) {
        console.log("Initial load namespace:", data.next.namespace);
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
        enableInteractions();
      },
      afterEnter(data) {
        console.log("After enter transition type:", currentTransitionType);
        let timelineOut =
          currentTransitionType === "type1"
            ? pageTransitionTypeOut1()
            : pageTransitionTypeOut2();
        timelineOut.eventCallback("onComplete", () => {
          if (data.next.namespace === "websites") {
            initSwiper(); // Reinitialize Swiper after transition out completes
          }
          hideOverlay(); // Ensure overlay is hidden after enter transition
        });
        timelineOut.play();
        enableInteractions();
      },
    },
  ],
});
