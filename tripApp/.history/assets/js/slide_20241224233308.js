let mainSwiper = null;

document.addEventListener('DOMContentLoaded', function() {
    mainSwiper = new Swiper(".main_slide", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
});