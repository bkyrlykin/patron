document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    let currentPage = 0;

    // инициализация страниц
    pages.forEach((page, index) => {
        page.style.transform = index === currentPage ? 'rotateY(0deg)' : 'rotateY(180deg)';
    });

//////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // перелистывание на след стр с помощью кнопки
    document.querySelectorAll('.next-page').forEach(button => {
        button.addEventListener('click', () => {
            if (currentPage < pages.length - 1) {
                pages[currentPage].style.transform = 'rotateY(-180deg)';
                currentPage++;
                pages[currentPage].style.transform = 'rotateY(0deg)';
            }
        });
    });

    // перелистывание на пред стр с помощью кнопки
    document.querySelectorAll('.prev-page').forEach(button => {
        button.addEventListener('click', () => {
            if (currentPage > 0) {
                pages[currentPage].style.transform = 'rotateY(180deg)';
                currentPage--;
                pages[currentPage].style.transform = 'rotateY(0deg)';
            }
        });
    });

//////////////////////////////////////////////////////////////////////////////////////////////////////

    // функциональность свайпов для мобильных
    let startX;
    const book = document.querySelector('.book');

    book.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;  // сохр нач позицию касания
    });

    book.addEventListener('touchmove', (e) => {
        if (!startX) return;

        const endX = e.touches[0].clientX;
        const diffX = startX - endX;

        // если движение пальца больше определенного порога, перелистываем
        if (diffX > 50) {
            // свайп влево — следующая страница
            if (currentPage < pages.length - 1) {
                pages[currentPage].style.transform = 'rotateY(-180deg)';
                currentPage++;
                pages[currentPage].style.transform = 'rotateY(0deg)';
            }
            startX = null; // сбрасываем нач положение
        } else if (diffX < -50) {
            // свайп вправо — пред стр
            if (currentPage > 0) {
                pages[currentPage].style.transform = 'rotateY(180deg)';
                currentPage--;
                pages[currentPage].style.transform = 'rotateY(0deg)';
            }
            startX = null;
        }
    });
});