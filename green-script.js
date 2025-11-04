// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initHeroAnimations();
    initScrollAnimations();
    initSlider();
    initPipelineAnimation();
    initTechnologyPage();
    initApplicationsPage();
    
    // Auto-advance slider
    setInterval(nextSlide, 5000);
});

// Hero Section Animations
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    tl.to('.molecule-animation', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    })
    .to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.5')
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.7')
    .to('.cta-button', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out'
    }, '-=0.5');
}

// Scroll-triggered animations
function initScrollAnimations() {
    // Benefits cards animation
    gsap.fromTo('.benefit-card', {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.benefits-section',
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Process steps animation
    gsap.fromTo('.process-step', {
        opacity: 0,
        scale: 0.8
    }, {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.pipeline-section',
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Project cards animation
    gsap.fromTo('.project-card', {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.projects-section',
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // CTA section animation
    gsap.fromTo('.cta-content', {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Pipeline flow animation
function initPipelineAnimation() {
    ScrollTrigger.create({
        trigger: '.pipeline-section',
        start: 'top 70%',
        onEnter: () => {
            gsap.fromTo('.flow-particle', {
                left: '-5px',
                opacity: 0
            }, {
                left: '95px',
                opacity: 1,
                duration: 2,
                stagger: 0.5,
                repeat: -1,
                ease: 'power2.inOut',
                yoyo: false
            });
        }
    });
}

// Slider functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function initSlider() {
    if(slides.length > 0) {
        showSlide(0);
    }
}

function showSlide(index) {
    if(!slides.length) return;
    
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if(dots[i]) dots[i].classList.remove('active');
    });
    
    slides[index].classList.add('active');
    if(dots[index]) dots[index].classList.add('active');
    currentSlideIndex = index;
}

function nextSlide() {
    if(!slides.length) return;
    
    const nextIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(nextIndex);
}

function previousSlide() {
    if(!slides.length) return;
    
    const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
}

function currentSlide(index) {
    if(!slides.length) return;
    
    showSlide(index - 1);
}

// Technology page interactions
function initTechnologyPage() {
    // Animate tech progress bars
    const progressBars = document.querySelectorAll('.spec-progress');
    
    if(progressBars.length > 0) {
        gsap.fromTo(progressBars, {
            width: '0%'
        }, {
            width: function(index) {
                const percentage = progressBars[index].getAttribute('data-percentage');
                return percentage + '%';
            },
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.tech-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if(timelineItems.length > 0) {
        timelineItems.forEach((item, index) => {
            const isEven = index % 2 === 0;
            const direction = isEven ? -30 : 30;
            
            gsap.fromTo(item, {
                opacity: 0,
                x: direction
            }, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }
}

// Applications page interactions
function initApplicationsPage() {
    // Tab switching for industries section
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if(tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                const targetContent = document.getElementById(`${targetTab}-content`);
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and target content
                button.classList.add('active');
                targetContent.classList.add('active');
            });
        });
    }
    
    // Case study card animations
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    
    if(caseStudyCards.length > 0) {
        gsap.fromTo(caseStudyCards, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.case-studies-grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }
    
    // Map marker interactions
    const mapMarkers = document.querySelectorAll('.map-marker');
    const regionInfos = document.querySelectorAll('.map-region-info');
    
    if(mapMarkers.length > 0) {
        mapMarkers.forEach(marker => {
            marker.addEventListener('click', () => {
                const location = marker.getAttribute('data-location');
                
                // Hide all region infos
                regionInfos.forEach(info => info.classList.remove('active'));
                
                // Show selected region info
                const targetInfo = document.querySelector(`.map-region-info[data-region="${location}"]`);
                if(targetInfo) {
                    targetInfo.classList.add('active');
                }
            });
        });
    }
}

// Smooth scrolling for navigation
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Add hover effects to cards
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.benefit-card')) {
        gsap.to(e.target.closest('.benefit-card'), {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
    
    if (e.target.closest('.project-card')) {
        gsap.to(e.target.closest('.project-card'), {
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.benefit-card')) {
        gsap.to(e.target.closest('.benefit-card'), {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
    
    if (e.target.closest('.project-card')) {
        gsap.to(e.target.closest('.project-card'), {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
});

// Parallax effect for hero background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const rate = scrolled * -0.5;
    
    if (heroSection) {
        heroSection.style.transform = `translateY(${rate}px)`;
    }
});

// Add click handlers for CTA buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button') || 
        e.target.classList.contains('btn-primary') || 
        e.target.classList.contains('btn-outline')) {
        
        // Add ripple effect
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Cleanup ScrollTrigger on page unload
window.addEventListener('beforeunload', function() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
