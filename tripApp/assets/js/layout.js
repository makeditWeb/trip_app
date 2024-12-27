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
                
                const event = new Event('bottomSheetInit');
                document.dispatchEvent(event);
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