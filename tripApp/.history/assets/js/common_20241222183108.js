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

class ExploreMap {
    constructor() {
        this.bottomSheet = document.querySelector('.bottom-sheet');
        this.handler = document.querySelector('.bottom-sheet__handler');
        this.postGrid = document.getElementById('postGrid');
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.currentTranslateY = 60; // 초기값 수정
        this.maxTranslateY = 20;  // 최대 확장
        this.minTranslateY = 80;  // 최소 높이

        this.initBottomSheet();
        this.initInfiniteScroll();
        this.bindEvents();
    }

    // transform 적용 시 X축 변환도 포함
    updateTransform(translateY) {
        this.bottomSheet.style.transform = `translate(-50%, ${translateY}%)`;
    }

    expand() {
        this.currentTranslateY = this.maxTranslateY;
        this.updateTransform(this.maxTranslateY);
        this.bottomSheet.classList.add('expanded');
        this.bottomSheet.classList.remove('collapsed');
    }

    collapse() {
        this.currentTranslateY = this.minTranslateY;
        this.updateTransform(this.minTranslateY);
        this.bottomSheet.classList.remove('expanded');
        this.bottomSheet.classList.add('collapsed');
    }

    resetToMiddle() {
        this.currentTranslateY = 60; // 중간 위치
        this.updateTransform(60);
        this.bottomSheet.classList.remove('expanded', 'collapsed');
    }

    // handleMove 함수 내부도 수정
    handleMove(currentY) {
        if (!this.startY) return;

        const deltaY = (this.startY - currentY) / window.innerHeight * 100;
        let newTranslate = this.startTranslate - deltaY;

        // 범위 제한
        newTranslate = Math.max(this.maxTranslateY, Math.min(this.minTranslateY, newTranslate));
        this.updateTransform(newTranslate);
        this.currentTranslateY = newTranslate;
    }
}