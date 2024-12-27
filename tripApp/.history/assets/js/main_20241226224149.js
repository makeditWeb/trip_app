
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


// 게시물 상세 보기 관련 기능
function showPostDetail(imageSrc) {
    // 이미지 그리드 숨기기
    document.querySelector('.image-grid').style.display = 'none';
    
    // 상세 페이지 표시
    const postDetail = document.getElementById('postDetail');
    postDetail.style.display = 'block';
    
    // 메인 슬라이더 초기화
    initMainSlider();
    
    // 추천 게시물 슬라이더 초기화 (하단 슬라이더)
    initRecommendationSlider();

    // 더보기 버튼 이벤트 리스너 다시 등록
    initMoreButton();
}

// 텍스트 더보기 기능
function initMoreButton() {
    const moreBtn = document.querySelector('.post-detail .more-btn');
    const textContent = document.querySelector('.post-detail .text-content');
    const fullText = document.querySelector('.post-detail .full-text');
    
    if (moreBtn && textContent && fullText) {
        moreBtn.addEventListener('click', function(e) {
            e.preventDefault(); // 이벤트 기본 동작 방지
            textContent.style.display = 'none';
            fullText.style.display = 'block';
        });
    } else {
        console.log('More button or text elements not found');
    }
}

// 메인 슬라이더 초기화 (게시물 이미지)
function initMainSlider() {
    new Swiper('.main_slide', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });
}

// 추천 게시물 슬라이더 초기화 (하단 슬라이더)
function initRecommendationSlider() {
    const recommendationSliderHTML = `
        <div class="swiper recommendation_slide">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="../assets/images/post_list01.png">
                </div>
                <div class="swiper-slide">
                    <img src="../assets/images/post_list02.png">
                </div>
                <div class="swiper-slide">
                    <img src="../assets/images/post_list03.png">
                </div>
                <div class="swiper-slide">
                    <img src="../assets/images/post_list02.png">
                </div>
                <div class="swiper-slide">
                    <img src="../assets/images/post_list01.png">
                </div>
                <div class="swiper-slide">
                    <img src="../assets/images/post_list03.png">
                </div>                
            </div>
            <div class="swiper-pagination"></div>
        </div>
    `;
    
    // 추천 슬라이더 HTML 추가
    document.querySelector('.post-content').insertAdjacentHTML('beforeend', recommendationSliderHTML);
    
    // 추천 슬라이더 초기화
    new Swiper('.recommendation_slide', {
        slidesPerView: 2.8,
        spaceBetween: 10,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });
}

// 뒤로가기 기능 추가 (필요한 경우)
function goBack() {
    document.querySelector('.image-grid').style.display = 'grid';
    document.getElementById('postDetail').style.display = 'none';
    
    // 추천 슬라이더 제거
    const recommendationSlide = document.querySelector('.recommendation_slide');
    if (recommendationSlide) {
        recommendationSlide.remove();
    }
}

// CSS 스타일 추가
const style = document.createElement('style');
style.textContent = `
    .text-content {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    
    .full-text {
        display: none;
    }
    
    .more-btn {
        color: #666;
        cursor: pointer;
    }
    
    .recommendation_slide {
        margin-top: 20px;
    }
    
    .recommendation_slide .swiper-slide {
        width: 150px;
    }
    
    .recommendation_slide img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 8px;
    }
`;

document.head.appendChild(style);