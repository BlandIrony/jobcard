import { Card } from "./scripts/card.js";
import { preloadImages } from "./scripts/utils.js";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

const cardWrapper = document.querySelector('.card__wrapper')
const shuffleBtn = document.querySelector('[data-shuffle]')

const cards = [];
[...document.querySelectorAll('.card')].forEach(card => cards.push(new Card(card)))
console.log(cards)

const visibleCards = cards.length;
const order = [0, 1, 2, 3, 4]
let isAnimating = false

class Home {
  constructor() {
    this.initAnimation()

    shuffleBtn.addEventListener('click', () => {
      this.shuffleCards()
    })
  }

  initAnimation() {
    cards.forEach((card, i) => {
      gsap.set(card.DOM.el, { autoAlpha: 0, y: "60%" })
      let pos = order.indexOf(i)

      if(pos < visibleCards) {
        gsap.to(card.DOM.el, {
          y: 8 + 4 * i + "%",
          x: 0,
          zIndex: cards.length - pos,
          autoAlpha: 1,
          duration: 1,
          ease: 'back.inOut',
          delay: i * 0.04
        })
      } else {
        gsap.to(card.DOM.el, {
          autoAlpha: 0,
          zIndex: 0,
          duration: .4
        })
      }
    })
  }

  layoutStack () {
    cards.forEach((card, i) => {
      let pos = order.indexOf(i)

      if(pos < visibleCards) {
        gsap.to(card.DOM.el, {
          y: 8 + 4 * i + "%",
          // z: 8 * i,
          zIndex: cards.length - pos,
          autoAlpha: 1,
          duration: .7,
          ease: 'power3',
          stagger: 0.04
        })
      } else {
        gsap.to(card.DOM.el, {
          autoAlpha: 0,
          zIndex: 0,
          duration: .4
        })
      }
    })
  }

  shuffleCards () {
    if (isAnimating) return;
    isAnimating = true;

    const firstCard = cards.shift();
    cards.push(firstCard)


    const tl = gsap.timeline({
      onComplete: () => {
        this.layoutStack();
        isAnimating = false;
      }
    })


    tl.to(firstCard.DOM.el, {
      // y: "-50%",
      // z: -250,
      // rotationX: 45,
      y: "-=110%",
      rotate: 8,
      duration: .25,
      ease: 'power3.inOut',
    })
    .to(firstCard.DOM.el, {
      y: "0%",
      rotate: 0,
      zIndex: -cards.length,
      duration: .45,
      ease: "power3.in",
      onComplete: () => {
        gsap.set(firstCard.DOM.el, {
          scale: 1,
          y: 0,
          rotate: 0,
        })
      }
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Home()
})