// common.js
document.addEventListener('bottomSheetInit', () => {
    // 지도 초기화
    initMap();
 
    // 바텀시트 코드
    const bottomSheet = document.getElementById('bottomSheet');
    const handleBar = document.getElementById('handleBar');
 
    if (bottomSheet && handleBar) {
        let startY;
        let startHeight;
        let isDragging = false;
 
        const BOTTOM_NAV_HEIGHT = 60;
        const SHEET_POSITIONS = {
            EXPANDED: 80,
            DEFAULT: 45,
            COLLAPSED: 15
        };
 
        function calculateActualHeight(percentage) {
            return (window.innerHeight - BOTTOM_NAV_HEIGHT) * (percentage / 100);
        }
 
        function setSheetHeight(percentage) {
            const actualHeight = calculateActualHeight(percentage);
            bottomSheet.style.height = `${actualHeight}px`;
        }
 
        setSheetHeight(SHEET_POSITIONS.DEFAULT);
 
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
            const availableHeight = window.innerHeight - BOTTOM_NAV_HEIGHT;
            const heightPercentage = (newHeight / availableHeight) * 100;
            
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
            
            if (currentPercentage < 30) {
                setSheetHeight(SHEET_POSITIONS.COLLAPSED);
            } else if (currentPercentage > 60) {
                setSheetHeight(SHEET_POSITIONS.EXPANDED);
            } else {
                setSheetHeight(SHEET_POSITIONS.DEFAULT);
            }
        }
 
        handleBar.addEventListener('mousedown', startDragging);
        handleBar.addEventListener('touchstart', startDragging, { passive: true });
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchend', stopDragging);
 
        window.addEventListener('resize', () => {
            const currentPercentage = parseInt(bottomSheet.style.height) / 
                (window.innerHeight - BOTTOM_NAV_HEIGHT) * 100;
            setSheetHeight(currentPercentage);
        });
    }
 });
 
 // 구글 맵 초기화
 function initMap() {
    const seoulCoords = { lat: 37.5665, lng: 126.9780 };
    
    const map = new google.maps.Map(document.getElementById('map'), {
        center: seoulCoords,
        zoom: 17,
        disableDefaultUI: true,
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "transit",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ]
    });
 
    // 서울 마커 추가
    const marker = new google.maps.Marker({
        position: seoulCoords,
        map: map,
        title: '서울'
    });
 }
 
 // 알림벨 클래스
 class NotificationBell {
    constructor() {
        this.bellElement = document.querySelector('.notification-bell');
        if (this.bellElement) {
            this.bindEvents();
            this.checkNotifications();
        }
    }
    
    bindEvents() {
        this.bellElement.addEventListener('click', () => {
            this.handleNotificationClick();
        });
    }
    
    async checkNotifications() {
        try {
            const hasUnread = Math.random() > 0.5;
            this.updateNotificationStatus(hasUnread);
        } catch (error) {
            console.error('Failed to check notifications:', error);
        }
    }
    
    updateNotificationStatus(hasNotification) {
        if (hasNotification) {
            this.bellElement.classList.add('has-notification');
        } else {
            this.bellElement.classList.remove('has-notification');
        }
    }
    
    handleNotificationClick() {
        console.log('Notification clicked');
        this.updateNotificationStatus(false);
    }
 }
 
 new NotificationBell();