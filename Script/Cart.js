var main_data;
var objects; // Khai báo biến objects ở ngoài để truy cập sau này

document.addEventListener("DOMContentLoaded", function() {
    // Lấy các phần tử HTML
    const toggleSticketButton = document.getElementById("show-cart");
    const sticket = document.getElementById("cart-user-modal");
    const closeButtons = document.getElementById("close-logo");


    // Sự kiện khi nhấn nút "Hiển thị Sticket" hoặc dấu x
    toggleSticketButton.addEventListener("click", function() {
        sticket.style.display = "flex"; // Hiển thị Sticket
        Read_data_cart();
        
    });

    closeButtons.addEventListener("click", function() {
        sticket.style.display = "none"; // Ẩn Sticket
        const divElement = document.getElementById("item-list");
        while (divElement.firstChild) {
            divElement.removeChild(divElement.firstChild);
        }
    });
});

// var Read_file_user = function () {
//     // Đọc nội dung của file1.txt
//     fetch('../filedata/cart_for_user.txt')
//         .then(response => response.text())
//         .then(data => {
//             main_data = data; // Lưu dữ liệu vào biến main_data
//             // console.log(main_data);
//             getobjects();
//         })
//         .catch(error => {
//             console.error(error);
//         });
// }

var Read_data_cart = function(){
    var cart = JSON.parse(localStorage.getItem("cart"));
    // console.log(cart);
    objects=cart;
    create_user_cart();
    console.log(objects)
}
 


var create_user_cart = function(){
    const itemContainer = document.getElementById("item-list");

    objects.forEach(function(objects,index) {
        // Tạo một phần tử .item
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");

        const originalString = "ID_Products001.jpg";
        const modifiedString = originalString.replace(/001/g, (index+1).toString().padStart(3, "0"));

        const charname = objects.name;
        const name = charname.replace(/%/g, ' ');
        // console.log(name);

        const total_price = parseInt(objects.price)*parseInt(objects.quality)
        // Tạo các phần tử con và đặt giá trị từ đối tượng sản phẩm

        // console.log(objects)

        itemElement.innerHTML = `
            <input type="checkbox" >
            <img src=".\\Images\\products\\${modifiedString}" alt="" class="item_img">
            <div>
                <p> Tên sản phẩm </p>
                <p>${name}</p>
            </div>
            <div>
                <p> Giá sản phẩm </p>
                <p id="price">${objects.price}</p>
            </div>
            <div>
                <p>Số lượng</p>
                <p id="n">${objects.quality}</p>
            </div>
            <div>
                <p> Tổng tiền </p> 
                <p id="total-price">${total_price}</p>
            </div>
        `;

 
        // Thêm phần tử .item vào phần tử gốc
        itemContainer.appendChild(itemElement);
    });

    const allcheckbox = document.querySelectorAll('.item');
    // console.log(allcheckbox)
    allcheckbox.forEach(div => {
        // console.log(div)
        div.addEventListener('click', function(){
            const element = div.querySelector('input[type="checkbox"]'); // Lấy phần tử input có type là "text"
            element.checked = !element.checked;
            
            let price = (div.querySelector('#total-price'))
            let num = (div.querySelector('#n'))
            calc(price, num, element);
        })
    
    })
}

// Read_file_user();

var calc = function(price, num, check){
    var total = document.getElementById('total-item');
    var total_cost = document.getElementById('total-cost')

    // console.log(price)
    if(check.checked){
        // alert(total.textContent)
        total.textContent = parseInt(total.textContent) + 1; 
        total_cost.textContent = parseInt(total_cost.textContent)+ parseInt(price.textContent);
    } 
    else {
        total.textContent = parseInt(total.textContent) - 1;
        total_cost.textContent = parseInt(total_cost.textContent)- parseInt(price.textContent);
    }
}





