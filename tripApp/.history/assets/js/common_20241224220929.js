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
document.addEventListener('DOMContentLoaded', () => {
    const bottomSheet = document.querySelector('.bottom-sheet');
    let startY;
    let currentTranslate = 80; // 초기 위치 (80%)
  
    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      bottomSheet.style.transition = 'none';
    };
  
    const handleTouchMove = (e) => {
      if (!startY) return;
      
      const deltaY = e.touches[0].clientY - startY;
      const newTranslate = currentTranslate + (deltaY / window.innerHeight * 100);
      
      if (newTranslate >= 20 && newTranslate <= 80) {
        bottomSheet.style.transform = `translateY(${newTranslate}%)`;
      }
    };
  
    const handleTouchEnd = () => {
      bottomSheet.style.transition = 'transform 0.3s ease-out';
      const currentY = parseInt(bottomSheet.style.transform.replace('translateY(', ''));
      
      if (currentY < 50) {
        bottomSheet.style.transform = 'translateY(20%)';
        currentTranslate = 20;
      } else {
        bottomSheet.style.transform = 'translateY(80%)';
        currentTranslate = 80;
      }
      
      startY = null;
    };
  
    bottomSheet.addEventListener('touchstart', handleTouchStart);
    bottomSheet.addEventListener('touchmove', handleTouchMove);
    bottomSheet.addEventListener('touchend', handleTouchEnd);
  });