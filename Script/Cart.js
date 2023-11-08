<<<<<<< HEAD
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
        const name = charname.replace(/%/g, ' ');
        // console.log(name);

        const total_price = parseInt(objects.price)*parseInt(objects.sl)
        // Tạo các phần tử con và đặt giá trị từ đối tượng sản phẩm



        itemElement.innerHTML = `
            <input type="checkbox" >
            <img src=".\\Images\\products\\main_products\\${modifiedString}" alt="">
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
                <p id="n">${objects.sl}</p>
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
            
            let price = (div.querySelector('#price'))
            let num = (div.querySelector('#n'))
            calc(price, num, element);
        })
    
    })
}

Read_file_user();

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





=======
>>>>>>> f3ce1376949ee80872e32e994ce70391b27e4450
