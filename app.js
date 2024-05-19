function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

function pageTransition() {
  console.log("Starting page transition...");
  var tl = gsap.timeline({
    onStart: () => console.log("Timeline started"),
    onComplete: () => console.log("Timeline completed"),
  });

  tl.to("ul li", {
    duration: 0.5,
    scaleY: 1,
    transformOrigin: "bottom left",
    stagger: 0.2,
    onStart: () => console.log("Animating in"),
    onComplete: () => console.log("Animation in complete"),
  }).to("ul li", {
    duration: 0.5,
    scaleY: 0,
    transformOrigin: "bottom left",
    stagger: 0.1,
    delay: 0.1,
    onStart: () => console.log("Animating out"),
    onComplete: () => console.log("Animation out complete"),
  });
}

barba.init({
  sync: true,
  transitions: [
    {
      async leave(data) {
        const done = this.async();
        pageTransition();
        await delay(1000);
        done();
      },
      async enter(data) {
        contentAnimation();
      },
      async once(data) {
        contentAnimation();
      },
    },
  ],
});
