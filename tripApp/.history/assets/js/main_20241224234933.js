
// 드롭다운
function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function selectOption(option) {
    document.querySelector('.dropdown-text').textContent = option;
    document.getElementById("myDropdown").classList.remove("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-header') && !event.target.matches('.dropdown-text') && !event.target.matches('.dropdown-arrow')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


// 포스트 리스트 페이지
let mainSwiper; // 전역 변수로 선언

document.addEventListener('DOMContentLoaded', function() {
    mainSwiper = new Swiper(".main_slide", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        observer: true,
        observeParents: true
    });
});

function showPostDetail(imgSrc) {
    document.querySelector('.image-grid').style.display = 'none';
    document.querySelector('.dropdown').style.display = 'none';
    document.getElementById('postDetail').style.display = 'block';
    
    // 모든 슬라이드 이미지 업데이트
    const slides = document.querySelectorAll('.main_slide .swiper-slide img');
    if (slides.length > 0) {
        // 클릭한 이미지의 인덱스 찾기
        const images = ['post_list01.png', 'post_list02.png', 'post_list03.png'];
        const clickedIndex = images.findIndex(img => imgSrc.includes(img));
        
        // 슬라이드 순서 재배열
        slides.forEach((slide, i) => {
            const newIndex = (clickedIndex + i) % images.length;
            slide.src = `../assets/images/${images[newIndex]}`;
        });
    }
    
    if (mainSwiper) {
        mainSwiper.update();
        mainSwiper.slideTo(0);
    }
}