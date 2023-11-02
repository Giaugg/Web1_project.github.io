var main_data;
var objects; // Khai báo biến objects ở ngoài để truy cập sau này

var Read_file_user = function () {
    // Đọc nội dung của file1.txt
    fetch('../filedata/cart_for_user.txt')
        .then(response => response.text())
        .then(data => {
            main_data = data; // Lưu dữ liệu vào biến main_data
            console.log(main_data);
            getObjects();
        })
        .catch(error => {
            console.error(error);
        });
}

var getObjects = function () {
    const lines = main_data.split('\n'); // Tách tệp thành từng dòng

    objects = lines.map(line => {
        const [productId, brand, img, name, price] = line.split(' '); // Tách dấu cách
        return {
            productId,
            brand,
            img,
            name,
            price: parseInt(price, 10)
        };
    });

    // console.log(objects[1]);
}

document.addEventListener("DOMContentLoaded", function() {
    // Lấy các phần tử HTML
    const toggleSticketButton = document.getElementById("show-cart");
    const sticket = document.getElementById("cart-user-modal");
    const closeButtons = document.getElementById("close-logo");

    console.log(closeButtons)

    // Sự kiện khi nhấn nút "Hiển thị Sticket" hoặc dấu x
    toggleSticketButton.addEventListener("click", function() {
        sticket.style.display = "flex"; // Hiển thị Sticket
    });

    closeButtons.addEventListener("click", function() {
            sticket.style.display = "none"; // Ẩn Sticket
        });
    
});


Read_file_user();
console.log(objects); // Đây là nơi bạn có thể truy cập biến objects
