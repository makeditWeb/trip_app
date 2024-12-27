class Layout {
    constructor() {
        this.loadCommonLayout();
    }
 
    async loadCommonLayout() {
        try {
            const response = await fetch('../pages/layout/common_layout.html');
            const layout = await response.text();
            
            const temp = document.createElement('div');
            temp.innerHTML = layout;
            
            const layoutContent = temp.querySelector('.app');
            
            if (layoutContent) {
                const currentContent = document.querySelector('.app');
                const mainContent = currentContent.innerHTML;
                
                const layoutHTML = layoutContent.innerHTML.replace(/src="\.\.\/\.\./g, 'src="..');
                
                currentContent.innerHTML = layoutHTML;
                document.getElementById('mainContent').innerHTML = mainContent;
 
                this.initializeNavigation();
                this.initializeBottomSheet(); // 바텀시트 초기화 추가
                this.initializeNotificationBell(); // 알림벨 초기화 추가
            }
        } catch (error) {
            console.error('Error loading layout:', error);
        }
    }
 
    initializeNavigation() {
        const bottomNavItems = document.querySelectorAll('.bottom-nav__item');
        bottomNavItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                bottomNavItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                this.loadContent(item.getAttribute('href'));
            });
        });
    }
 
    initializeBottomSheet() {
        const bottomSheet = document.getElementById('bottomSheet');
        const handleBar = document.getElementById('handleBar');
        
        if (!bottomSheet || !handleBar) return;
 
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
 
    initializeNotificationBell() {
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
    }
 
    async loadContent(path) {
        try {
            const pagePath = path === '/' ? '../pages/index.html' : `../pages${path}/index.html`;
            const response = await fetch(pagePath);
            const content = await response.text();
            
            const temp = document.createElement('div');
            temp.innerHTML = content;
            
            const pageContent = temp.querySelector('.app');
            if (pageContent) {
                document.getElementById('mainContent').innerHTML = pageContent.innerHTML;
            }
        } catch (error) {
            console.error('Error loading content:', error);
        }
    }
 }
 
 document.addEventListener('DOMContentLoaded', () => {
    new Layout();
 });