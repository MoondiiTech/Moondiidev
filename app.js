function pageTransitionIn() {
  var tl = gsap.timeline();
  tl.to("ul.transition li", {
    duration: 0.5,
    scaleY: 1,
    stagger: 0.2,
    transformOrigin: "bottom left",
    onStart: () => console.log("Animating in"),
    onComplete: () => console.log("Animation in complete"),
  });
  return tl;
}

function pageTransitionOut() {
  var tl = gsap.timeline();
  tl.to("ul.transition li", {
    duration: 0.5,
    scaleY: 0,
    stagger: 0.1,
    delay: 0.1,
    transformOrigin: "bottom left",
    onStart: () => console.log("Animating out"),
    onComplete: () => console.log("Animation out complete"),
  });
  return tl;
}

function contentAnimation() {
  gsap.from(".menu", { duration: 1, y: 30, opacity: 0, ease: "power2.inOut" });
}

barba.init({
  transitions: [
    {
      name: "default-transition",
      once(data) {
        contentAnimation();
      },
      leave(data) {
        const done = this.async();
        pageTransitionIn().eventCallback("onComplete", done);
      },
      enter(data) {
        contentAnimation();
      },
      afterEnter(data) {
        pageTransitionOut();
      },
    },
  ],
});
