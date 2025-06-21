/*hamburger menu*/
const navMenu = document.getElementById('nav-menu'),
  toggleMenu = document.getElementById('nav-toggle'),
  closeMenu = document.getElementById('nav-close')

/*SHOW*/
toggleMenu.addEventListener('click', () => {
  navMenu.classList.toggle('show')
})

/*HIDDEN*/
closeMenu.addEventListener('click', () => {
  navMenu.classList.remove('show')
})

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  /*Active link*/
  navLink.forEach(n => n.classList.remove('active'));
  this.classList.add('active');

  /*Remove menu mobile*/
  navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction));


/*nav bar sliding*/
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 400) {
    if (currentScroll > lastScrollY) {
      // Scrolling down
      header.classList.add('header--hide');
    } else {
      // Scrolling up
      header.classList.remove('header--hide');
    }
  }

  lastScrollY = currentScroll;
});




/*scrolling animation*/
  document.addEventListener("scroll", () => {
    const isMobile = window.innerWidth <= 768; // Adjust breakpoint if needed

    document.querySelectorAll(".scroll-animate").forEach((el) => {
      const elementPosition = el.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.1;

      if (elementPosition < screenPosition) {
        el.classList.add("active");
        el.classList.remove("scroll-out"); // Ensure scroll-out is removed
      } else if (!isMobile) {
        el.classList.remove("active"); // Reset animation only on larger screens
      }
    });

    if (!isMobile) {
      document.querySelectorAll(".scroll-out-100").forEach((el) => {
        const elementPosition = el.getBoundingClientRect().top;
        const scrollOutTrigger = 30;
        if (elementPosition < scrollOutTrigger) {
          el.classList.add("scroll-out");
          el.classList.remove("active");
        }
      });

      document.querySelectorAll(".scroll-out-20").forEach((el) => {
        const elementPosition = el.getBoundingClientRect().top;
        const scrollOutTrigger = -25;
        if (elementPosition < scrollOutTrigger) {
          el.classList.add("scroll-out");
          el.classList.remove("active");
        }
      });
    }
  });

  // Home-screen animation: Slide logo up from bottom
  window.addEventListener("load", () => {
    document.querySelectorAll(".title-animate").forEach((el) => {
      setTimeout(() => {
        el.classList.add("title-active");
      }, 5);
    });
  });



/*scrolling animation for the title*/
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll('.animate-section');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('title-active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });
});



/*scroll down button at the section1*/ 
function scrollToSection(sectionClass) {
  const section = document.querySelector(`.${sectionClass}`);
  if (section) {
    const offset = 130;
    const sectionPosition = section.offsetTop - offset;
    const currentPosition = window.scrollY;
    const distance = sectionPosition - currentPosition;
    const duration = 1000;
    const startTime = performance.now();

    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeInOutQuad =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      window.scrollTo(0, currentPosition + distance * easeInOutQuad);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  }
}




/*scroll up button at the footer*/ 
function scrollToTop() {
  const duration = 1000;
  const start = window.scrollY;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeInOutQuad =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(0, start * (1 - easeInOutQuad));

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}






/*testinmonials auto scroll*/ 
  const track = document.getElementById("carousel-track");
  const carousel = document.getElementById("carousel");
  let index = 0;
  let isPaused = false;

  const visibleCount = 3;
  const testimonials = Array.from(track.children);

  // Clone the first few to loop
  for (let i = 0; i < visibleCount; i++) {
    const clone = testimonials[i].cloneNode(true);
  track.appendChild(clone);
  }

  function slideNext() {
    if (isPaused) return;

  const testimonialCard = track.querySelector(".testimonial");
  const cardWidth = testimonialCard.offsetWidth;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;

  const slideAmount = cardWidth + gap;

  index++;
  track.style.transform = `translateX(-${index * slideAmount}px)`;

    if (index >= testimonials.length) {
    setTimeout(() => {
      track.style.transition = "none";
      index = 0;
      track.style.transform = "translateX(0)";
      void track.offsetWidth;
      track.style.transition = "transform 0.5s ease-in-out";
    }, 500);
    }
  }

  let interval = setInterval(slideNext, 3000);

  carousel.addEventListener("mouseenter", () => (isPaused = true));
  carousel.addEventListener("mouseleave", () => (isPaused = false));




