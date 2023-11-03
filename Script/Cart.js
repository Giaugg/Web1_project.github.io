var main_data;
var objects; // Khai báo biến objects ở ngoài để truy cập sau này

var Read_file_user = function () {
    // Đọc nội dung của file1.txt
    fetch('../filedata/cart_for_user.txt')
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
        const [productId, brand, name, price] = line.split(' '); // Tách dấu cách
        return {
            productId,
            brand,
            name,
            price
        };
    });
    console.log(objects)
    create_user_cart();
}

document.addEventListener("DOMContentLoaded", function() {
    // Lấy các phần tử HTML
    const toggleSticketButton = document.getElementById("show-cart");
    const sticket = document.getElementById("cart-user-modal");
    const closeButtons = document.getElementById("close-logo");


    // Sự kiện khi nhấn nút "Hiển thị Sticket" hoặc dấu x
    toggleSticketButton.addEventListener("click", function() {
        sticket.style.display = "flex"; // Hiển thị Sticket
    });

    closeButtons.addEventListener("click", function() {
        sticket.style.display = "none"; // Ẩn Sticket
    });
});

var create_user_cart = function(){
    const itemContainer = document.getElementById("item-list");

    objects.forEach(function(objects,index) {
        // Tạo một phần tử .item
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");

        const originalString = "ID_Products001.jpg";
        const modifiedString = originalString.replace(/001/g, (index+1).toString().padStart(3, "0"));

        const charname = objects.name;
        const name = charname.replace('%', ' ');
        console.log(name);
        // Tạo các phần tử con và đặt giá trị từ đối tượng sản phẩm
        itemElement.innerHTML = `
            <input type="checkbox">
            <img src=".\\Images\\products\\main_products\\${modifiedString}" alt="">
            <p>${name}</p>
            <p>${objects.price}</p>
            <div>
                <div> số lượng</div>
                <input type="number" id="myNumber" value= 1>
            </div>
            <p>${objects.total_price}</p>
        `;

        // Thêm phần tử .item vào phần tử gốc
        itemContainer.appendChild(itemElement);
    });
}

Read_file_user();
// console.log(1)
