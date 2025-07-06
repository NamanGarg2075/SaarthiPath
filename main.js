
// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
});

// Mobile Menu Toggle
document.getElementById('mobile-menu-button').addEventListener('click', function () {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// FAQ Toggles with Animation
document.querySelectorAll('.faq-toggle').forEach(toggle => {
    toggle.addEventListener('click', function () {
        const content = this.nextElementSibling;
        const icon = this.querySelector('i');

        // Toggle hidden class to show/hide content
        content.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');

        // Close other FAQs
        document.querySelectorAll('.faq-content').forEach(item => {
            if (item !== content && !item.classList.contains('hidden')) {
                item.classList.add('hidden');
                item.previousElementSibling.querySelector('i').classList.remove('rotate-180');
            }
        });

        // Scroll into view if opening
        if (!content.classList.contains('hidden')) {
            setTimeout(() => {
                content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
        }
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Video Modal
const videoModal = document.getElementById('video-modal');
const playVideoBtn = document.getElementById('play-video-btn');
const closeVideoBtn = document.getElementById('close-video');
const youtubeIframe = document.getElementById('youtube-iframe');

playVideoBtn.addEventListener('click', () => {
    // Replace with your actual YouTube video ID
    youtubeIframe.src = 'https://www.youtube.com/embed/jGztGfRujSE?autoplay=1';
    videoModal.classList.add('active');
});

closeVideoBtn.addEventListener('click', () => {
    youtubeIframe.src = '';
    videoModal.classList.remove('active');
});

// Initialize Carousels
function initCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    const carouselInner = carousel.querySelector('.carousel-inner');
    const slides = Array.from(carouselInner.children);
    const totalSlides = slides.length;
    const slidesPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    const slideWidth = 100 / slidesPerView;
    let currentIndex = 0;

    // Set up indicators
    const indicatorsContainer = document.getElementById(carouselId + '-indicators');
    const totalGroups = Math.ceil(totalSlides / slidesPerView);

    for (let i = 0; i < totalGroups; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.dataset.index = i;
        indicatorsContainer.appendChild(indicator);

        indicator.addEventListener('click', () => {
            goToSlide(i * slidesPerView);
        });
    }

    // Set up slides
    slides.forEach(slide => {
        slide.classList.add('carousel-item');
        slide.style.flexBasis = slideWidth + '%';
    });

    // Controls
    const prevBtn = carousel.querySelector('.prev-slide');
    const nextBtn = carousel.querySelector('.next-slide');

    prevBtn.addEventListener('click', () => {
        goToSlide(Math.max(0, currentIndex - slidesPerView));
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(Math.min(totalSlides - slidesPerView, currentIndex + slidesPerView));
    });

    function goToSlide(index) {
        currentIndex = index;
        carouselInner.style.transform = `translateX(-${(index / totalSlides) * 100}%)`;

        // Update indicators
        const activeGroup = Math.floor(index / slidesPerView);
        document.querySelectorAll(`#${carouselId}-indicators .carousel-indicator`).forEach((ind, i) => {
            if (i === activeGroup) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });
    }

    // Auto-rotate every 5 seconds
    setInterval(() => {
        const nextIndex = (currentIndex + slidesPerView) % totalSlides;
        goToSlide(nextIndex);
    }, 5000);
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCarousel('experts-carousel');
    initCarousel('testimonials-carousel');
});
