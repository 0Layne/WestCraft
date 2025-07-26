// header Java
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const logos = document.querySelectorAll('.logo');
  const hero = document.querySelector('.hero-section');
  let lastScrollY = window.scrollY;
  let observer;

  const maxScroll = 650;
  const maxPadding = 55;
  const minPadding = 45;
  const maxLogo = 95;
  const minLogo = 70;

  let isLargeScreen = window.innerWidth > 900;

  function applyDesktopHeaderBehavior() {
    window.addEventListener('scroll', onScrollResizeHeader);
    window.addEventListener('scroll', onScrollHideHeader);
    window.addEventListener('scroll', onScrollToggleHeaderBackground);

    observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        header.classList.add('header--fixed');
      } else {
        header.classList.remove('header--fixed');
      }
    }, { threshold: 0 });

    observer.observe(hero);
  }

  function applyMobileHeaderBehavior() {
    header.style.padding = '0.1rem 0.5rem';

    window.addEventListener('scroll', onScrollToggleHeaderBackground);

    observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        header.classList.add('header--fixed');
      } else {
        header.classList.remove('header--fixed');
      }
    }, {
      rootMargin: '0px',
      threshold: 0
    });

    observer.observe(hero);
  }

  function onScrollResizeHeader() {
    const scrollY = Math.min(window.scrollY, maxScroll);
    const scrollRatio = scrollY / maxScroll;
    const currentPadding = maxPadding - (maxPadding - minPadding) * scrollRatio;
    const currentLogo = maxLogo - (maxLogo - minLogo) * scrollRatio;

    header.style.padding = `${currentPadding}px 1rem`;
    logos.forEach(logo => logo.style.height = `${currentLogo}px`);
  }

  function onScrollHideHeader() {
    const currentScroll = window.scrollY;
    if (currentScroll > 1100) {
      if (currentScroll > lastScrollY) {
        header.classList.add('header--hide');
      } else {
        header.classList.remove('header--hide');
      }
    } else {
      header.classList.remove('header--hide');
    }
    lastScrollY = currentScroll;
  }

  function onScrollToggleHeaderBackground() {
    if (window.scrollY > 500) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  function cleanup() {
    if (observer) observer.disconnect();
    window.removeEventListener('scroll', onScrollResizeHeader);
    window.removeEventListener('scroll', onScrollHideHeader);
    window.removeEventListener('scroll', onScrollToggleHeaderBackground);
    header.classList.remove('header--fixed', 'header--hide', 'header--scrolled');
    header.style.padding = '';
    logos.forEach(logo => logo.style.height = '');
  }

  function checkWidthAndApplyBehavior() {
    const nowLarge = window.innerWidth > 900;
    if (nowLarge && !isLargeScreen) {
      cleanup();
      isLargeScreen = true;
      applyDesktopHeaderBehavior();
    } else if (!nowLarge && isLargeScreen) {
      cleanup();
      isLargeScreen = false;
      applyMobileHeaderBehavior();
    }
  }
 
  window.addEventListener('load', () => {
    if (isLargeScreen) {
      onScrollResizeHeader(); // ensure logo starts at correct enlargement
    }
  });

  // Initial run
  if (isLargeScreen) {
    applyDesktopHeaderBehavior();
    requestAnimationFrame(() => {
      onScrollResizeHeader();
    });
  } else {
    applyMobileHeaderBehavior();
  }


  window.addEventListener('resize', checkWidthAndApplyBehavior);

  // Hamburger menu logic
  const toggleMenu = document.getElementById('nav-toggle');
  const closeMenu = document.getElementById('nav-close');
  const navMenu = document.getElementById('nav-menu');

  toggleMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  closeMenu.addEventListener('click', () => {
    navMenu.classList.remove('show');
  });

  const navLink = document.querySelectorAll('.nav__link');
  navLink.forEach(n =>
    n.addEventListener('click', function () {
      navLink.forEach(n => n.classList.remove('active'));
      this.classList.add('active');
      navMenu.classList.remove('show');
    })
  );

  // ScrollTo Section
  window.scrollToSection = function (sectionClass) {
    const section = document.querySelector(`.${sectionClass}`);
    if (section) {
      const offset = 50;
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
  };
});






document.addEventListener('DOMContentLoaded', () => {
  // GSAP Timeline for entrance
  const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });

  // Animate the logo
  tl.from(".logo", { y: -50, opacity: 0 });

  // Stagger in the nav links
  tl.from(".nav__link", { y: -30, opacity: 0, stagger: 0.15 }, "-=0.7");

  // Animate the 'Schedule Now' button
  tl.from(".nav-social", { scale: 0.5, opacity: 0 }, "-=0.5");
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
document.addEventListener("scroll", () => {
  const isMobile = window.innerWidth <= 768;

  document.querySelectorAll(".scroll-animateY").forEach((el) => {
    const elementPosition = el.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.1;

    if (elementPosition < screenPosition) {
      el.classList.add("active");
    } else if (!isMobile) {
      el.classList.remove("active");
    }
  });
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
    const offset = 150;
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













  

//java for the Architectural Legacy
const regionWrapper = document.querySelector(".region-wrapper");
const regionSidebar = document.querySelector(".region-sidebar");
const navItems = document.querySelectorAll(".region-sidebar li");
const sections = document.querySelectorAll(".region-content-block");

function handleScroll() {
  const scrollY = window.scrollY;
  const regionTop = regionWrapper.offsetTop;
  const regionHeight = regionWrapper.offsetHeight;
  const regionBottom = regionTop + regionHeight;

  // Show/hide sidebar when inside/outside region
  if (scrollY + window.innerHeight / 2 >= regionTop && scrollY <= regionBottom - window.innerHeight / 2) {
    regionSidebar.classList.add("visible");
  } else {
    regionSidebar.classList.remove("visible");
    navItems.forEach(li => li.classList.remove("active")); // clear highlight
    return;
  }

  // Highlight the correct nav item
  let currentId = "";
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const middleY = rect.top + rect.height / 2;
    if (middleY >= 0 && middleY <= window.innerHeight) {
      currentId = section.id;
    }
  });

  navItems.forEach(li => {
    li.classList.remove("active");
    if (li.dataset.target === currentId) {
      li.classList.add("active");
    }
  });
}

// Smooth scroll on click
navItems.forEach(li => {
  li.addEventListener("click", () => {
    const id = li.dataset.target;
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);  
