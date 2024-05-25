// Global variable to store the current transition type
let currentTransitionType = "type1";

function showOverlay() {
  // Show the overlay
  document.getElementById("overlay").style.display = "block";
}

function hideOverlay() {
  // Hide the overlay
  document.getElementById("overlay").style.display = "none";
}

// Define transition functions for each type
// Page transition type 1
function pageTransitionType1() {
  showOverlay();

  return gsap
    .timeline({
      onComplete: () => {
        hideOverlay();
      },
    })
    .to("ul.transition--1 li", {
      duration: 0.3,
      scaleY: 1,
      stagger: 0.1,
      transformOrigin: "bottom left",
    });
}

function pageTransitionTypeOut1() {
  showOverlay();

  return gsap
    .timeline({
      onComplete: () => {
        hideOverlay();
      },
    })
    .to("ul.transition--1 li", {
      duration: 0.3,
      scaleY: 0, // Reverse of the 'in' animation
      stagger: 0.08,
      delay: 0.1,
      transformOrigin: "bottom left",
    });
}

// Page transition type 2 - Enter Animation
function pageTransitionType2() {
  showOverlay();

  return gsap
    .timeline({
      onComplete: () => {
        hideOverlay();
      },
    })
    .to("ul.transition--2 li", {
      duration: 0.5,
      scaleX: 1,
      transformOrigin: "bottom left",
      ease: "slow(0.7, 0.7, false)", // Slow start, slow end
    });
}

// Page transition type 2 - Exit Animation
function pageTransitionTypeOut2() {
  showOverlay();

  return gsap
    .timeline({
      onComplete: () => {
        hideOverlay();
      },
    })
    .to("ul.transition--2 li", {
      duration: 0.5,
      scaleX: 0, // Reverse of the 'in' animation
      transformOrigin: "bottom right",
      ease: "slow(0.7, 0.7, true)", // Slow start, slow end, reversed
    });
}

// Object mapping transition types to corresponding functions
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
  gsap.from("main", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power1.out",
  });
}

function contentAnimationForWebsites() {
  gsap.from(".main", {
    duration: 1.5,
    x: 100,
    opacity: 0,
    ease: "power2.inOut",
  });
}

// Initialize Barba.js with transition logic
barba.init({
  transitions: [
    {
      name: "flexible-transition",
      leave(data) {
        const done = this.async();
        currentTransitionType = data.trigger.dataset.transitionType || "type1";
        let timeline = transitions[currentTransitionType]();
        timeline.eventCallback("onComplete", done);
      },
      enter(data) {
        switch (data.next.namespace) {
          case "skills":
            contentAnimationForSkills();
            break;
          case "websites":
            contentAnimationForWebsites();
            break;
          default:
            // Default content animation
            contentAnimation();
            break;
        }
      },
      once(data) {
        // This is for the initial page load
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
        // Choose the corresponding 'out' animation based on stored type
        let timelineOut =
          currentTransitionType === "type1"
            ? pageTransitionTypeOut1()
            : pageTransitionTypeOut2();
        timelineOut.play(); // Start the timeline for the exit animation
      },
    },
  ],
});
