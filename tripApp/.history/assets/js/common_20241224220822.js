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
document.addEventListener('DOMContentLoaded', function() {
    const bottomSheet = document.querySelector('.bottom-sheet');
    const handler = document.querySelector('.bottom-sheet__handler');
    
    let isDragging = false;
    let startY = 0;
    let startHeight = 0;
    
    handler.addEventListener('touchstart', dragStart);
    handler.addEventListener('touchmove', drag);
    handler.addEventListener('touchend', dragEnd);
    
    function dragStart(e) {
        isDragging = true;
        startY = e.touches[0].clientY;
        startHeight = parseInt(getComputedStyle(bottomSheet).height, 10);
        
        bottomSheet.style.transition = 'none';
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        const deltaY = e.touches[0].clientY - startY;
        const currentHeight = startHeight - deltaY;
        const windowHeight = window.innerHeight;
        
        // 20% ~ 80% 범위로 제한
        if (currentHeight >= windowHeight * 0.2 && currentHeight <= windowHeight * 0.8) {
            bottomSheet.style.height = `${currentHeight}px`;
        }
    }
    
    function dragEnd() {
        isDragging = false;
        bottomSheet.style.transition = 'height 0.3s ease-out';
        
        const currentHeight = parseInt(getComputedStyle(bottomSheet).height, 10);
        const windowHeight = window.innerHeight;
        
        // 드래그 후 위치 결정
        if (currentHeight < windowHeight * 0.5) {
            bottomSheet.style.height = `${windowHeight * 0.2}px`;
        } else {
            bottomSheet.style.height = `${windowHeight * 0.8}px`;
        }
    }
});