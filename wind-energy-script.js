document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP and ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Carousel data
  const carouselData = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop",
      title: "Mountain Wind Farms",
      description: "Sustainable energy generation in pristine environments"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop",
      title: "Forest Integration",
      description: "Harmonious coexistence with natural ecosystems"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&h=600&fit=crop",
      title: "Clean Technology",
      description: "Advanced wind turbine technology for maximum efficiency"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
      title: "Renewable Infrastructure",
      description: "Building the foundation for a sustainable future"
    }
  ];

  // Stats data
  const statsData = [
    {
      value: 150,
      suffix: '+',
      label: 'Wind Projects',
      description: 'Successfully deployed across multiple regions',
      icon: 'ri-windy-line',
      color: 'rgb(30, 136, 229)'
    },
    {
      value: 2500,
      suffix: 'MW',
      label: 'Total Capacity',
      description: 'Clean energy generation capacity installed',
      icon: 'ri-windy-line',
      color: 'rgb(46, 204, 113)'
    },
    {
      value: 1200,
      suffix: 'K tons',
      label: 'CO₂ Reduced',
      description: 'Annual carbon emissions prevented',
      icon: 'ri-windy-line',
      color: 'rgb(52, 152, 219)'
    },
    {
      value: 85,
      suffix: '+',
      label: 'Communities',
      description: 'Local communities empowered with clean energy',
      icon: 'ri-windy-line',
      color: 'rgb(142, 68, 173)'
    }
  ];

  // Progress data
  const progressData = [
    { label: 'Renewable Energy Capacity', progress: 75, target: '5,000 MW' },
    { label: 'Carbon Reduction', progress: 60, target: '2,000K tons' },
    { label: 'Community Partnerships', progress: 85, target: '200 communities' }
  ];

  // Features data
  const featuresData = [
    {
      title: 'Advanced Turbine Technology',
      description: 'State-of-the-art wind turbines with maximum efficiency and minimal environmental impact.',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop',
      benefits: ['98% efficiency rating', 'Smart grid integration', '25-year lifespan']
    },
    {
      title: 'Environmental Harmony',
      description: 'Sustainable installations that work in harmony with local ecosystems and wildlife.',
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop',
      benefits: ['Zero emissions', 'Wildlife protection', 'Ecosystem preservation']
    },
    {
      title: 'Community Empowerment',
      description: 'Creating local jobs and economic opportunities while providing clean energy.',
      image: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=600&h=400&fit=crop',
      benefits: ['Local job creation', 'Community ownership', 'Economic development']
    }
  ];

  // Process steps data
  const processData = [
    {
      step: '01',
      title: 'Consultation',
      description: 'Free assessment of your energy needs and site evaluation'
    },
    {
      step: '02',
      title: 'Planning',
      description: 'Custom design and engineering for optimal performance'
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'Professional installation and ongoing maintenance'
    }
  ];

  // CTA stats data
  const ctaStatsData = [
    { label: 'Years Experience', value: '15+' },
    { label: 'Projects Completed', value: '150+' },
    { label: 'MW Installed', value: '2,500+' },
    { label: 'Countries', value: '12+' }
  ];

  // Initialize carousel
  function initCarousel() {
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselDots = document.querySelector('.carousel-dots');
    const carouselThumbnails = document.querySelector('.carousel-thumbnails');
    
    // Create slides
    carouselData.forEach((slide, index) => {
      const slideElement = document.createElement('div');
      slideElement.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
      
      slideElement.innerHTML = `
        <img src="${slide.url}" alt="${slide.title}">
        <div class="overlay">
          <h3>${slide.title}</h3>
          <p>${slide.description}</p>
        </div>
      `;
      
      carouselInner.appendChild(slideElement);
      
      // Create dots
      const dot = document.createElement('div');
      dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
      dot.dataset.index = index;
      carouselDots.appendChild(dot);
      
      // Create thumbnails
      const thumbnail = document.createElement('div');
      thumbnail.className = `carousel-thumbnail ${index === 0 ? 'active' : ''}`;
      thumbnail.dataset.index = index;
      thumbnail.innerHTML = `<img src="${slide.url}" alt="${slide.title}">`;
      carouselThumbnails.appendChild(thumbnail);
    });
    
    // Add event listeners
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const thumbnails = document.querySelectorAll('.carousel-thumbnail');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function goToSlide(index) {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      thumbnails[currentSlide].classList.remove('active');
      
      currentSlide = (index + totalSlides) % totalSlides;
      
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
      thumbnails[currentSlide].classList.add('active');
    }
    
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    
    dots.forEach(dot => {
      dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index)));
    });
    
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => goToSlide(parseInt(thumbnail.dataset.index)));
    });
    
    // Auto slide
    setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  }

  // Initialize stats with GSAP animations
  function initStats() {
    const statsGrid = document.querySelector('.stats-grid');
    
    statsData.forEach((stat, index) => {
      const statCard = document.createElement('div');
      statCard.className = 'stat-card';
      
      statCard.innerHTML = `
        <div class="stat-icon">
          <i class="${stat.icon}" style="color: ${stat.color};"></i>
        </div>
        <div class="stat-value" data-value="${stat.value}" style="color: ${stat.color};">0</div>
        <span class="stat-suffix">${stat.suffix}</span>
        <h3>${stat.label}</h3>
        <p>${stat.description}</p>
      `;
      
      statsGrid.appendChild(statCard);
      
      // GSAP Animation
      gsap.from(statCard, {
        scrollTrigger: {
          trigger: statCard,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2
      });
    });
    
    // Animate stat values
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(value => {
      const finalValue = parseInt(value.dataset.value);
      
      ScrollTrigger.create({
        trigger: value,
        start: "top 80%",
        onEnter: () => {
          gsap.to(value, {
            duration: 2,
            textContent: finalValue,
            roundProps: "textContent"
          });
        }
      });
    });
  }

  // Initialize progress bars with GSAP
  function initProgress() {
    const progressItems = document.querySelector('.progress-items');
    
    progressData.forEach((item, index) => {
      const progressItem = document.createElement('div');
      progressItem.className = 'progress-item';
      
      progressItem.innerHTML = `
        <div class="progress-info">
          <span>${item.label}</span>
          <span>Target: ${item.target}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" data-progress="${item.progress}"></div>
        </div>
        <div class="progress-percent">${item.progress}% Complete</div>
      `;
      
      progressItems.appendChild(progressItem);
      
      // GSAP Animation for progress bars
      const progressFill = progressItem.querySelector('.progress-fill');
      
      gsap.set(progressFill, {
        scaleX: 0,
        transformOrigin: "left center"
      });
      
      ScrollTrigger.create({
        trigger: progressFill,
        start: "top 85%",
        onEnter: () => {
          gsap.to(progressFill, {
            scaleX: item.progress / 100,
            duration: 1.5,
            ease: "power3.out"
          });
        }
      });
    });
  }

  // Initialize features with GSAP
  function initFeatures() {
    const featuresGrid = document.querySelector('.features-grid');
    
    featuresData.forEach((feature, index) => {
      const featureCard = document.createElement('div');
      featureCard.className = 'feature-card';
      
      let benefitsHTML = '';
      feature.benefits.forEach(benefit => {
        benefitsHTML += `
          <div class="feature-benefit">
            <div class="benefit-dot"></div>
            <span>${benefit}</span>
          </div>
        `;
      });
      
      featureCard.innerHTML = `
        <div class="feature-image">
          <img src="${feature.image}" alt="${feature.title}">
          <div class="feature-icon">
            <i class="ri-windy-line"></i>
          </div>
        </div>
        <div class="feature-content">
          <h3>${feature.title}</h3>
          <p>${feature.description}</p>
          <div class="feature-benefits">
            ${benefitsHTML}
          </div>
          <button class="feature-button">Learn More</button>
        </div>
      `;
      
      featuresGrid.appendChild(featureCard);
      
      // GSAP Animation
      gsap.from(featureCard, {
        scrollTrigger: {
          trigger: featureCard,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.3
      });
    });
  }

  // Initialize process steps with GSAP
  function initProcess() {
    const processSteps = document.querySelector('.process-steps');
    
    processData.forEach((step, index) => {
      const processStep = document.createElement('div');
      processStep.className = 'process-step';
      
      processStep.innerHTML = `
        <div class="step-number">${step.step}</div>
        <h3>${step.title}</h3>
        <p>${step.description}</p>
      `;
      
      processSteps.appendChild(processStep);
      
      // GSAP Animation
      gsap.from(processStep, {
        scrollTrigger: {
          trigger: processStep,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: index * 0.2
      });
    });
  }

  // Initialize CTA stats with GSAP
  function initCTAStats() {
    const ctaStats = document.querySelector('.cta-stats');
    
    ctaStatsData.forEach(stat => {
      const ctaStat = document.createElement('div');
      ctaStat.className = 'cta-stat';
      
      ctaStat.innerHTML = `
        <div class="cta-stat-value">${stat.value}</div>
        <div class="cta-stat-label">${stat.label}</div>
      `;
      
      ctaStats.appendChild(ctaStat);
    });
  }

  // GSAP Hero Animations
  function initHeroAnimations() {
    const tl = gsap.timeline();
    
    tl.from(".icon-container", { opacity: 0, scale: 0.5, duration: 1, ease: "back.out(1.7)" })
      .from(".main-heading", { opacity: 0, y: 30, duration: 0.8 }, "-=0.5")
      .from(".subtitle", { opacity: 0, y: 30, duration: 0.8 }, "-=0.5")
      .from(".button-container button", { opacity: 0, y: 20, duration: 0.8, stagger: 0.2 }, "-=0.5");
      
    // Parallax effects for bubbles
    const bubbles = document.querySelectorAll('.bg-bubble');
    bubbles.forEach(bubble => {
      gsap.to(bubble, {
        y: "random(-40, 40)",
        x: "random(-20, 20)",
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }

  // Main sections animations
  function initSectionAnimations() {
    const sections = document.querySelectorAll('section:not(.hero-section)');
    
    sections.forEach(section => {
      gsap.from(section.querySelector('.section-header'), {
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1
      });
    });
  }

  // Initialize everything
  initCarousel();
  initStats();
  initProgress();
  initFeatures();
  initProcess();
  initCTAStats();
  initHeroAnimations();
  initSectionAnimations();
});

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

function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#hero-section"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#hero-section", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#hero-section").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
loco()

