// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initHeroAnimations();
  initScrollAnimations();
  initImageSlider();
  initFaqAccordion();
  initParallaxEffects();
});

// Hero Section Animations
function initHeroAnimations() {
  const tl = gsap.timeline();
  
  tl.fromTo('#hero-title', 
    { opacity: 0, y: 100, scale: 0.8 },
    { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" }
  )
  .fromTo('#hero-subtitle',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
    "-=0.5"
  )
  .fromTo('#cta-buttons',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
    "-=0.3"
  );

  // Floating animation for the sun icon
  gsap.to('.floating-sun', {
    y: -20,
    duration: 3,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1
  });

  // Rotating sun rays
  gsap.to('.sun-rays', {
    rotation: 360,
    duration: 20,
    ease: "none",
    repeat: -1,
    transformOrigin: "center center"
  });
}

// Scroll Triggered Animations
function initScrollAnimations() {
  // Reveal animations for sections
  gsap.utils.toArray('.section-reveal').forEach(section => {
    gsap.fromTo(section, 
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Features section cards animation
  gsap.utils.toArray('.feature-card').forEach((card, index) => {
    gsap.fromTo(card,
      { opacity: 0, y: 80, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        delay: index * 0.2,
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Process section animations
  gsap.fromTo('.process-title',
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.process-section',
        start: 'top 70%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  gsap.utils.toArray('.process-step').forEach((step, index) => {
    gsap.fromTo(step,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        delay: index * 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.process-steps',
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  gsap.fromTo('.process-line',
    { scaleX: 0, transformOrigin: 'left' },
    {
      scaleX: 1,
      duration: 1.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: '.process-steps',
        start: 'top 60%',
        end: 'bottom 40%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // CTA section animation
  gsap.fromTo('.cta-content',
    { opacity: 0, scale: 0.9, y: 50 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // FAQ section animation
  gsap.fromTo('.faq-title',
    { opacity: 0, y: 30 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1,
      scrollTrigger: {
        trigger: '.faq-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    }
  );
  
  gsap.utils.toArray('.faq-item').forEach((item, index) => {
    gsap.fromTo(item,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        delay: index * 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}

// Image Slider Functionality
function initImageSlider() {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  
  // Initialize slider
  updateSlider();
  
  // Auto advance slides
  const slideInterval = setInterval(() => {
    nextSlide();
  }, 5000);
  
  // Event listeners for controls
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      clearInterval(slideInterval);
      prevSlide();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      clearInterval(slideInterval);
      nextSlide();
    });
  }
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      currentSlide = index;
      updateSlider();
    });
  });
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  }
  
  function updateSlider() {
    // Update slides
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add('slide-active');
      } else {
        slide.classList.remove('slide-active');
      }
    });
    
    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
}

// FAQ Accordion Functionality
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const isActive = question.classList.contains('active');
      
      // Close all FAQs
      faqQuestions.forEach(q => {
        q.classList.remove('active');
        const answer = q.nextElementSibling;
        answer.classList.remove('active');
      });
      
      // Open clicked FAQ if it wasn't already open
      if (!isActive) {
        question.classList.add('active');
        const answer = question.nextElementSibling;
        answer.classList.add('active');
      }
    });
  });
}

// Parallax Effects
function initParallaxEffects() {
  // Parallax effect for background elements
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const parallaxSlow = document.querySelectorAll('.parallax-slow');
    const parallaxFast = document.querySelectorAll('.parallax-fast');
    
    parallaxSlow.forEach(element => {
      const speed = 0.5;
      const yPos = -(scrollTop * speed);
      gsap.to(element, {
        y: yPos,
        ease: "none",
        duration: 0.1
      });
    });
    
    parallaxFast.forEach(element => {
      const speed = 1;
      const yPos = -(scrollTop * speed);
      gsap.to(element, {
        y: yPos,
        ease: "none",
        duration: 0.1
      });
    });
  });
  
  // Add hover effects for feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { 
        scale: 1.05, 
        y: -10,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { 
        scale: 1, 
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
}

/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
   const toggle = document.getElementById(toggleId),
         nav = document.getElementById(navId)

   toggle.addEventListener('click', () =>{
       // Add show-menu class to nav menu
       nav.classList.toggle('show-menu')
       // Add show-icon to show and hide menu icon
       toggle.classList.toggle('show-icon')
   })
}

showMenu('nav-toggle','nav-menu')

/*=============== SHOW DROPDOWN MENU ===============*/
const dropdownItems = document.querySelectorAll('.dropdown__item')

// 1. Select each dropdown item
dropdownItems.forEach((item) =>{
    const dropdownButton = item.querySelector('.dropdown__button') 

    // 2. Select each button click
    dropdownButton.addEventListener('click', () =>{
        // 7. Select the current show-dropdown class
        const showDropdown = document.querySelector('.show-dropdown')
        
        // 5. Call the toggleItem function
        toggleItem(item)

        // 8. Remove the show-dropdown class from other items
        if(showDropdown && showDropdown!== item){
            toggleItem(showDropdown)
        }
    })
})

// 3. Create a function to display the dropdown
const toggleItem = (item) =>{
    // 3.1. Select each dropdown content
    const dropdownContainer = item.querySelector('.dropdown__container')

    // 6. If the same item contains the show-dropdown class, remove
    if(item.classList.contains('show-dropdown')){
        dropdownContainer.removeAttribute('style')
        item.classList.remove('show-dropdown')
    } else{
        // 4. Add the maximum height to the dropdown content and add the show-dropdown class
        dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
        item.classList.add('show-dropdown')
    }
}

/*=============== DELETE DROPDOWN STYLES ===============*/
const mediaQuery = matchMedia('(min-width: 1118px)'),
      dropdownContainer = document.querySelectorAll('.dropdown__container')

// Function to remove dropdown styles in mobile mode when browser resizes
const removeStyle = () =>{
    // Validate if the media query reaches 1118px
    if(mediaQuery.matches){
        // Remove the dropdown container height style
        dropdownContainer.forEach((e) =>{
            e.removeAttribute('style')
        })

        // Remove the show-dropdown class from dropdown item
        dropdownItems.forEach((e) =>{
            e.classList.remove('show-dropdown')
        })
    }
}