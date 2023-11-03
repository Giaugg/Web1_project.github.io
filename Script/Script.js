
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
////////////// CREATE MAIN DATA////////////
var Read_file_maindata = function () {
    // Đọc nội dung của file1.txt
    fetch('../filedata/main_data.txt')
        .then(response => response.text())
        .then(data => {
            main_data = data; // Lưu dữ liệu vào biến main_data
            console.log(main_data);
            getobjects();
        })
        .catch(error => {
            console.error(error);
        });
}

var getobjects = function () {
    const lines = main_data.split('\n'); // Tách tệp thành từng dòng

    objects = lines.map(line => {
        const [productId, brand, name, price, sl] = line.split(' '); // Tách dấu cách
        return {
            productId,
            brand,
            name,
            price,
            sl
        };
    });
    console.log(objects)
    create_user_cart();
}