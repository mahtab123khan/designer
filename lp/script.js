const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const backTop = document.getElementById("backTop");

/* =========================
   MOBILE MENU
========================= */

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});


/* =========================
   HEADER ON SCROLL
========================= */

function handleScroll() {

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (window.scrollY > 500) {
    backTop.classList.add("show");
  } else {
    backTop.classList.remove("show");
  }
}

window.addEventListener("scroll", handleScroll);

handleScroll();


/* =========================
   BACK TO TOP
========================= */

backTop.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const revealObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);


document.querySelectorAll(".reveal").forEach(element => {

  revealObserver.observe(element);

});


/* =========================
   NUMBER COUNTERS
========================= */

const counters = document.querySelectorAll("[data-count]");

let countersStarted = false;


function animateCounters() {

  if (countersStarted) return;

  countersStarted = true;


  counters.forEach(counter => {

    const target = Number(counter.dataset.count);

    const duration = 1500;

    const start = performance.now();


    function updateCounter(currentTime) {

      const progress = Math.min(
        (currentTime - start) / duration,
        1
      );


      /* Smooth easing */

      const eased =
        1 - Math.pow(1 - progress, 3);


      const value =
        Math.floor(target * eased);


      if (target === 100) {

        counter.textContent =
          value + "%";

      } else {

        counter.textContent =
          value.toLocaleString() + "+";

      }


      if (progress < 1) {

        requestAnimationFrame(updateCounter);

      }

    }


    requestAnimationFrame(updateCounter);

  });

}


/* Start counters when stats become visible */

const statsRow =
  document.querySelector(".stats-row");


if (statsRow) {

  const statsObserver =
    new IntersectionObserver(
      entries => {

        if (entries[0].isIntersecting) {

          animateCounters();

          statsObserver.disconnect();

        }

      },
      {
        threshold: 0.4
      }
    );


  statsObserver.observe(statsRow);

}


/* =========================
   GALLERY FILTER
========================= */

const filterButtons =
  document.querySelectorAll(".filter");

const galleryItems =
  document.querySelectorAll(".gallery-item");


filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    /* Remove active state */

    filterButtons.forEach(btn => {

      btn.classList.remove("active");

    });


    /* Add active state */

    button.classList.add("active");


    const filter =
      button.dataset.filter;


    galleryItems.forEach(item => {

      if (
        filter === "all" ||
        item.classList.contains(filter)
      ) {

        item.classList.remove("hidden");

      } else {

        item.classList.add("hidden");

      }

    });

  });

});


/* =========================
   FAQ ACCORDION
========================= */

const faqQuestions =
  document.querySelectorAll(".faq-question");


faqQuestions.forEach(question => {

  question.addEventListener("click", () => {

    const currentItem =
      question.closest(".faq-item");


    /* Close other FAQs */

    document.querySelectorAll(".faq-item")
      .forEach(item => {

        if (item !== currentItem) {

          item.classList.remove("open");

        }

      });


    /* Toggle current FAQ */

    currentItem.classList.toggle("open");

  });

});


/* =========================
   TESTIMONIAL SLIDER
========================= */

const reviews = [

  {
    text:
      "They made the entire renovation process simple and transparent. The team understood our requirements and delivered a beautiful home.",

    name:
      "Rakesh Sharma",

    meta:
      "Complete Home Interior · Mumbai",

    initials:
      "RS"
  },


  {
    text:
      "From design ideas to final execution, the team was extremely supportive. The finish quality and attention to detail were excellent.",

    name:
      "Priya Mehta",

    meta:
      "3 BHK Renovation · Thane",

    initials:
      "PM"
  },


  {
    text:
      "We wanted a practical home without compromising on style. Everything was planned carefully and the final result feels completely ours.",

    name:
      "Abhishek Das",

    meta:
      "Home Renovation · Mira Road",

    initials:
      "AD"
  },


  {
    text:
      "The kitchen and living room transformation exceeded our expectations. Communication was clear and the work stayed on track.",

    name:
      "Melwyn Mohite",

    meta:
      "Interior Upgrade · Mumbai",

    initials:
      "MM"
  }

];


let reviewIndex = 0;


const reviewText =
  document.getElementById("reviewText");

const reviewName =
  document.getElementById("reviewName");

const reviewMeta =
  document.getElementById("reviewMeta");

const reviewAvatar =
  document.getElementById("reviewAvatar");


function renderReview() {

  const review =
    reviews[reviewIndex];


  /* Fade out */

  reviewText.style.opacity = "0";


  setTimeout(() => {

    reviewText.textContent =
      review.text;

    reviewName.textContent =
      review.name;

    reviewMeta.textContent =
      review.meta;

    reviewAvatar.textContent =
      review.initials;


    /* Fade in */

    reviewText.style.opacity = "1";

  }, 150);

}


/* Previous review */

document
  .getElementById("prevReview")
  .addEventListener("click", () => {

    reviewIndex =
      (reviewIndex - 1 + reviews.length)
      % reviews.length;

    renderReview();

  });


/* Next review */

document
  .getElementById("nextReview")
  .addEventListener("click", () => {

    reviewIndex =
      (reviewIndex + 1)
      % reviews.length;

    renderReview();

  });


/* Automatic testimonial slider */

setInterval(() => {

  reviewIndex =
    (reviewIndex + 1)
    % reviews.length;

  renderReview();

}, 7000);


/* =========================
   RESIZE HANDLER
========================= */

window.addEventListener("resize", () => {

  if (window.innerWidth > 720) {

    navMenu.classList.remove("open");

    document.body.classList.remove("menu-open");

  }

});


/* =========================
   ESC KEY
========================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    navMenu.classList.remove("open");

    document.body.classList.remove("menu-open");

  }

});