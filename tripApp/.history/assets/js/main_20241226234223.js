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

// 좋아요 버튼 기능
function initLikeButton() {
    const likeBtn = document.querySelector('.like_btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            const heartPath = this.querySelector('path');
            if (heartPath) {
                if (heartPath.getAttribute('fill') === 'white') {
                    // 좋아요 활성화
                    heartPath.setAttribute('fill', '#FF5757');
                    heartPath.setAttribute('stroke', '#FF5757');
                } else {
                    // 좋아요 비활성화
                    heartPath.setAttribute('fill', 'white');
                    heartPath.setAttribute('stroke', '#484C52');
                }
            }
        });
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

    // 좋아요 버튼 초기화
    initLikeButton();
}

// 텍스트 더보기 기능
function initMoreButton() {
    const moreBtn = document.querySelector('.post-detail .more-btn');
    const textContent = document.querySelector('.post-detail .text-content');
    const fullText = document.querySelector('.post-detail .full-text');
    
    if (moreBtn && textContent && fullText) {
        moreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            textContent.style.display = 'none';
            fullText.style.display = 'block';
        });
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
    
    document.querySelector('.post-content').insertAdjacentHTML('beforeend', recommendationSliderHTML);
    
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

// 뒤로가기 기능
function goBack() {
    document.querySelector('.image-grid').style.display = 'grid';
    document.getElementById('postDetail').style.display = 'none';
    
    // 추천 슬라이더 제거
    const recommendationSlide = document.querySelector('.recommendation_slide');
    if (recommendationSlide) {
        recommendationSlide.remove();
    }

    // 텍스트 상태 초기화
    const textContent = document.querySelector('.post-detail .text-content');
    const fullText = document.querySelector('.post-detail .full-text');
    if (textContent && fullText) {
        textContent.style.display = 'block';
        fullText.style.display = 'none';
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
        margin-bottom: 10px;
    }
    
    .full-text {
        display: none;
        margin-bottom: 10px;
    }
    
    .more-btn {
        color: #666;
        cursor: pointer;
        display: inline-block;
        margin-left: 4px;
    }
    
    .more-btn:hover {
        text-decoration: underline;
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

    /* Pagination bullet styles */
    .swiper-pagination-bullet {
        width: 5px;
        height: 5px;
        border-radius: 30px;
        transition: all 0.3s ease;
    }

    .swiper-pagination-bullet.swiper-pagination-bullet-active {
        width: 28px;
        border-radius: 30px;
        height: 5px;
    }

    /* 좋아요 버튼 스타일 */
    .like_btn {
        cursor: pointer;
        transition: transform 0.2s ease;
    }
    
    .like_btn:hover {
        transform: scale(1.1);
    }
    
    .like_btn:active {
        transform: scale(0.95);
    }

    /* 액션 아이콘들의 공통 스타일 */
    .action-icons {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 10px 0;
    }

    .action-icons a, 
    .action-icons div {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`;

document.head.appendChild(style);

// DOM이 로드된 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    initMoreButton();
    initLikeButton();
});



// 검색창 탭

document.addEventListener('DOMContentLoaded', function() {
    const tabItems = document.querySelectorAll('.tab-item');
    const tabIndicator = document.querySelector('.tab-indicator');
    
    // 탭 클릭 이벤트
    tabItems.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // 활성 탭 변경
            document.querySelector('.tab-item.active').classList.remove('active');
            tab.classList.add('active');
            
            // 인디케이터 이동
            tabIndicator.style.transform = `translateX(${index * 100}%)`;
        });
    });
    
    // 검색 기능
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    // 검색 버튼 클릭 이벤트
    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });
    
    // 엔터키 검색 이벤트
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
});
