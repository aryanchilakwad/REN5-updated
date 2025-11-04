// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // ===== Hero Section Animations =====
    gsap.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
    });
    
    gsap.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.4,
        ease: 'power3.out'
    });
    
    // ===== Slider Functionality =====
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const slideIndicatorsContainer = document.querySelector('.slide-indicators');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDelay = 5000; // 5 seconds between slides
    
    // Create slide indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        
        indicator.addEventListener('click', () => {
            goToSlide(index);
            resetSlideInterval();
        });
        
        slideIndicatorsContainer.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.indicator');
    
    // Initialize slide animations when the slide is active
    function animateSlideContent() {
        const currentSlideContent = slides[currentSlide].querySelector('.slide-content');
        if (!currentSlideContent) return;
        
        const title = currentSlideContent.querySelector('.slide-title');
        const location = currentSlideContent.querySelector('.slide-location');
        const description = currentSlideContent.querySelector('.slide-description');
        
        // Reset animations
        title.style.opacity = 0;
        title.style.transform = 'translateY(30px)';
        location.style.opacity = 0;
        location.style.transform = 'translateY(30px)';
        description.style.opacity = 0;
        description.style.transform = 'translateY(30px)';
        
        // Apply animations with delay
        setTimeout(() => {
            title.style.opacity = 1;
            title.style.transform = 'translateY(0)';
            title.style.transition = 'all 0.8s ease-out';
        }, 300);
        
        setTimeout(() => {
            location.style.opacity = 1;
            location.style.transform = 'translateY(0)';
            location.style.transition = 'all 0.8s ease-out';
        }, 500);
        
        setTimeout(() => {
            description.style.opacity = 1;
            description.style.transform = 'translateY(0)';
            description.style.transition = 'all 0.8s ease-out';
        }, 700);
    }
    
    function goToSlide(index) {
        // Remove active class from current slide and indicator
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        
        // Update currentSlide index
        currentSlide = index;
        
        // If we go past the last slide, loop back to the first
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        
        // If we go before the first slide, loop to the last
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        
        // Add active class to new current slide and indicator
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        
        // Animate the content of the current slide
        animateSlideContent();
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    function resetSlideInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDelay);
    }
    
    // Set up event listeners for next and previous buttons
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetSlideInterval();
    });
    
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetSlideInterval();
    });
    
    // Start automatic slideshow
    slideInterval = setInterval(nextSlide, slideDelay);
    
    // Initialize the first slide content animations
    animateSlideContent();
    
    // ===== Scroll Animations with GSAP =====
    
    // Tech Cards Animation
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                },
                delay: index * 0.2
            }
        );
    });
    
    // Tech Stats Animation
    const techStatItems = document.querySelectorAll('.tech-stat-item');
    techStatItems.forEach((item, index) => {
        gsap.fromTo(item,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                },
                delay: index * 0.2
            }
        );
    });
    
    // Impact Cards Animation
    const impactCards = document.querySelectorAll('.impact-card');
    impactCards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                },
                delay: index * 0.2
            }
        );
    });
    
    // Case Study Animation
    gsap.fromTo('.case-study',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.case-study',
                start: 'top 90%',
            }
        }
    );
    
    // Project Items Animation
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
        gsap.fromTo(item,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                },
                delay: index * 0.1
            }
        );
    });
    
    // View All Button Animation
    gsap.fromTo('.view-all-container',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.view-all-container',
                start: 'top 90%',
            }
        }
    );
    
    // Timeline Items Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        gsap.fromTo(item,
            { 
                opacity: 0, 
                x: index % 2 === 0 ? -50 : 50
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                },
                delay: index * 0.2
            }
        );
    });
    
    // Innovation Model Animation
    gsap.fromTo('.innovation-showcase',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.innovation-showcase',
                start: 'top 85%',
            }
        }
    );
    
    // Sustainability Animations
    gsap.fromTo('.sustainability-image',
        { opacity: 0, x: -30 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.sustainability-image',
                start: 'top 85%',
            }
        }
    );
    
    gsap.fromTo('.sustainability-text',
        { opacity: 0, x: 30 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.sustainability-text',
                start: 'top 85%',
            }
        }
    );
    
    // Contact Form Animation
    gsap.fromTo('.contact-form-container',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contact-form-container',
                start: 'top 85%',
            }
        }
    );
    
    gsap.fromTo('.contact-info',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contact-info',
                start: 'top 85%',
            }
        }
    );
    
    // ===== Counter Animations =====
    // Function to animate counters
    function animateCounter(element, target, duration, prefix = '', suffix = '') {
        let start = 0;
        const increment = target / 100;
        const stepTime = Math.abs(Math.floor(duration / 100));
        const obj = { value: start };
        
        const counterAnimation = gsap.to(obj, {
            value: target,
            duration: duration / 1000,
            ease: 'power2.inOut',
            onUpdate: function() {
                const value = Math.round(obj.value);
                element.textContent = prefix + value.toLocaleString() + suffix;
            },
            scrollTrigger: {
                trigger: element,
                start: 'top 90%',
            }
        });
    }
    
    // Animate Impact Numbers
    document.querySelectorAll('.impact-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        animateCounter(counter, target, 2000);
    });
    
    // Animate Tech Stats
    document.querySelectorAll('.stat-counter').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        let suffix = '';
        if (counter.textContent.indexOf('%') !== -1 || (target < 100 && target !== 0)) {
            suffix = '%';
        } else if (target > 1000000) {
            suffix = 'M';
        }
        animateCounter(counter, target, 2000, '', suffix);
    });
    
    // ===== Model Controls (Placeholder functionality) =====
    const modelButtons = document.querySelectorAll('.model-button');
    modelButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Placeholder functionality - in a real implementation, this would control the 3D model
            alert('3D model control - this would manipulate the model in a real implementation');
        });
    });
    
    // ===== Form Submission =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const message = document.getElementById('message').value;
            
            // Validation (basic example)
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Placeholder for form submission
            alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // ===== Engineering Section Animations =====
    const engineeringCards = document.querySelectorAll('.engineering-card');
    engineeringCards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                },
                delay: index * 0.2
            }
        );
    });

    // Engineering showcase animation
    gsap.fromTo('.engineering-showcase',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.engineering-showcase',
                start: 'top 85%',
            }
        }
    );

    // ===== Global Operations Animations =====
    const operationMarkers = document.querySelectorAll('.operation-marker');
    operationMarkers.forEach((marker, index) => {
        gsap.fromTo(marker,
            { opacity: 0, scale: 0 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: marker,
                    start: 'top 90%',
                },
                delay: index * 0.3
            }
        );
    });

    const regionalStats = document.querySelectorAll('.stat-region');
    regionalStats.forEach((stat, index) => {
        gsap.fromTo(stat,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 90%',
                },
                delay: index * 0.2
            }
        );
    });

    // ===== Research Lab Interactive Functionality =====
    const labCards = document.querySelectorAll('.lab-card');
    const labContents = document.querySelectorAll('.lab-content');

    labCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards and contents
            labCards.forEach(c => c.classList.remove('active'));
            labContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Show corresponding content
            const labType = this.getAttribute('data-lab');
            const targetContent = document.getElementById(labType + '-content');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Research cards animation
    labCards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                },
                delay: index * 0.15
            }
        );
    });

    // ===== Testimonials Carousel Functionality =====
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.dot');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide
        testimonialSlides[index].classList.add('active');
        testimonialDots[index].classList.add('active');
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
    }
    
    // Event listeners for testimonial controls
    if (testimonialNext) {
        testimonialNext.addEventListener('click', nextTestimonial);
    }
    
    if (testimonialPrev) {
        testimonialPrev.addEventListener('click', prevTestimonial);
    }
    
    // Dot navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto-advance testimonials
    setInterval(nextTestimonial, 7000);

    // Testimonials animation
    gsap.fromTo('.testimonials-carousel',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.testimonials-carousel',
                start: 'top 85%',
            }
        }
    );

    // ===== Enhanced Counter Animations for New Sections =====
    // Animate Research Stats
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''), 10);
        if (target && target > 0) {
            animateCounter(counter, target, 2000);
        }
    });

    // Animate Regional Numbers
    document.querySelectorAll('.region-numbers .number').forEach(counter => {
        const text = counter.textContent;
        const target = parseInt(text.replace(/[^\d]/g, ''), 10);
        if (target && target > 0) {
            let suffix = '';
            if (text.includes('GW')) suffix = ' GW';
            animateCounter(counter, target, 2000, '', suffix);
        }
    });

    // ===== Enhanced Scroll Animations =====
    
    // Map container animation
    gsap.fromTo('.map-container',
        { opacity: 0, scale: 0.9 },
        {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.map-container',
                start: 'top 80%',
            }
        }
    );

    // Research lab details animation
    gsap.fromTo('.lab-details',
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.lab-details',
                start: 'top 85%',
            }
        }
    );

    // ===== Enhanced Interactive Features =====
    
    // Smooth scroll for navigation (if navigation exists)
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });

    // Enhanced engineering card interactions
    const engCards = document.querySelectorAll('.engineering-card');
    engCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Operation marker enhanced interactions
    operationMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            const pulse = this.querySelector('.marker-pulse');
            if (pulse) {
                pulse.style.animationDuration = '0.5s';
            }
        });
        
        marker.addEventListener('mouseleave', function() {
            const pulse = this.querySelector('.marker-pulse');
            if (pulse) {
                pulse.style.animationDuration = '2s';
            }
        });
    });
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

addEventListener('resize', removeStyle)

