class NotificationBell {
    constructor() {
        this.bellElement = document.querySelector('.notification-bell');
        this.bindEvents();
        this.checkNotifications();
    }
    
    bindEvents() {
        // 알림 클릭 이벤트
        this.bellElement.addEventListener('click', () => {
            this.handleNotificationClick();
        });
    }
    
    // 알림 상태 체크 (서버에서 데이터를 받아온다고 가정)
    async checkNotifications() {
        try {
            // API 호출 예시
            // const response = await fetch('/api/notifications/unread');
            // const { hasUnread } = await response.json();
            
            // 테스트를 위해 임시로 랜덤하게 알림 상태 설정
            const hasUnread = Math.random() > 0.5;
            
            this.updateNotificationStatus(hasUnread);
        } catch (error) {
            console.error('Failed to check notifications:', error);
        }
    }
    
    // 알림 상태 업데이트
    updateNotificationStatus(hasNotification) {
        if (hasNotification) {
            this.bellElement.classList.add('has-notification');
        } else {
            this.bellElement.classList.remove('has-notification');
        }
    }
    
    // 알림 클릭 처리
    handleNotificationClick() {
        // 알림 목록 표시 로직
        console.log('Notification clicked');
        // 알림을 확인했으므로 빨간 점 제거
        this.updateNotificationStatus(false);
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    new NotificationBell();
});



// main
const bottomSheet = document.getElementById('bottomSheet');
const handleBar = document.getElementById('handleBar');
let startY;
let startHeight;
let isDragging = false;

// 정확한 위치값 설정
const BOTTOM_NAV_HEIGHT = 60;
const SHEET_POSITIONS = {
    EXPANDED: 80,  // 최대 확장 높이
    DEFAULT: 45,   // 기본 높이
    COLLAPSED: 15  // 최소 높이
};

// 시트의 실제 높이를 계산 (bottom nav 높이 제외)
function calculateActualHeight(percentage) {
    return (window.innerHeight - BOTTOM_NAV_HEIGHT) * (percentage / 100);
}

function setSheetHeight(percentage) {
    const actualHeight = calculateActualHeight(percentage);
    bottomSheet.style.height = `${actualHeight}px`;
}

// 초기 높이 설정
setSheetHeight(SHEET_POSITIONS.DEFAULT);

handleBar.addEventListener('mousedown', startDragging);
handleBar.addEventListener('touchstart', startDragging);
document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag);
document.addEventListener('mouseup', stopDragging);
document.addEventListener('touchend', stopDragging);

function startDragging(e) {
    isDragging = true;
    startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    startHeight = parseInt(getComputedStyle(bottomSheet).height, 10);
    
    bottomSheet.style.transition = 'none';
    handleBar.style.cursor = 'grabbing';
}

function drag(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    const y = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
    const walk = startY - y;
    const newHeight = startHeight + walk;
    
    // 사용 가능한 전체 높이에서의 비율 계산
    const availableHeight = window.innerHeight - BOTTOM_NAV_HEIGHT;
    const heightPercentage = (newHeight / availableHeight) * 100;
    
    // 최소, 최대 높이 제한
    if (heightPercentage >= SHEET_POSITIONS.COLLAPSED && 
        heightPercentage <= SHEET_POSITIONS.EXPANDED) {
        bottomSheet.style.height = `${newHeight}px`;
    }
}

function stopDragging() {
    if (!isDragging) return;
    
    isDragging = false;
    handleBar.style.cursor = 'grab';
    bottomSheet.style.transition = 'height 0.3s ease-out';
    
    const availableHeight = window.innerHeight - BOTTOM_NAV_HEIGHT;
    const currentHeight = parseInt(getComputedStyle(bottomSheet).height, 10);
    const currentPercentage = (currentHeight / availableHeight) * 100;
    
    // 가장 가까운 위치로 스냅
    if (currentPercentage < 30) {
        setSheetHeight(SHEET_POSITIONS.COLLAPSED);
    } else if (currentPercentage > 60) {
        setSheetHeight(SHEET_POSITIONS.EXPANDED);
    } else {
        setSheetHeight(SHEET_POSITIONS.DEFAULT);
    }
}

// 윈도우 리사이즈 시 높이 재계산
window.addEventListener('resize', () => {
    const currentPercentage = parseInt(bottomSheet.style.height) / 
        (window.innerHeight - BOTTOM_NAV_HEIGHT) * 100;
    setSheetHeight(currentPercentage);
});