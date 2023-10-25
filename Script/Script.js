
function scrollSnapAutoScroll() {
    const container = document.querySelector('.gallery');
    const scrollItems = document.querySelectorAll('.gallery_item');
    let currentIndex = 0;

    function scrollToNextItem() {
        currentIndex = (currentIndex + 1) % scrollItems.length;
        container.scrollTo({
            left: scrollItems[currentIndex].offsetLeft,
            behavior: 'smooth',
        });
    }

    setInterval(scrollToNextItem, 3000); // Tự động cuộn mỗi 3 giây (3000ms)
}

scrollSnapAutoScroll();
