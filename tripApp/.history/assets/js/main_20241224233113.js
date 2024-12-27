
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

function showPostDetail(imgSrc) {
    document.querySelector('.image-grid').style.display = 'none';
    document.querySelector('.dropdown').style.display = 'none';
    document.getElementById('postDetail').style.display = 'block';
    
    // Swiper 첫 번째 슬라이드 이미지 업데이트
    const firstSlide = document.querySelector('.main_slide .swiper-slide img');
    if (firstSlide) {
        firstSlide.src = imgSrc;
    }
    
    // Swiper 초기화
    swiper.update();
    swiper.slideTo(0);
}