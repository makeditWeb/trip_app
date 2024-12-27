

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