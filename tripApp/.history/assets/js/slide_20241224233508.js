document.addEventListener('DOMContentLoaded', function() {
    const mainSwiper = new Swiper(".main_slide", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        observer: true,
        observeParents: true
    });

    // showPostDetail 함수 정의
    window.showPostDetail = function(imgSrc) {
        document.querySelector('.image-grid').style.display = 'none';
        document.querySelector('.dropdown').style.display = 'none';
        document.getElementById('postDetail').style.display = 'block';
        
        mainSwiper.update();
        mainSwiper.slideTo(0);
    }
});