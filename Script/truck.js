var TTDN_user = document.getElementById("user");// true, flase;

var header_my = document.getElementById("header_my");

var objects;    

var truck = document.createElement("a");
truck.classList.add("truck");
truck.innerHTML = `
    <img src=".\\images\\icon\\truck.svg" id="show-truck">
`

header_my.appendChild(truck);

document.addEventListener("DOMContentLoaded", function() {
    // Lấy các phần tử HTML
    const toggleSticketButton = document.getElementById("show-truck");
    const sticket = document.getElementById("truck-user-modal");
    const closeButtons = document.getElementById("close-logo");
    
    
    // Sự kiện khi nhấn nút "Hiển thị Sticket" hoặc dấu x
    toggleSticketButton.addEventListener("click", function() {
        if(TTDN ==="user"){
            sticket.style.display = "flex"; // Hiển thị Sticket
            Read_data_truck();

        }
        else alert(" Đăng nhập để mua hàng!");
    });
    
    closeButtons.addEventListener("click", function() {
        sticket.style.display = "none"; // Ẩn Sticket
        const divElement = document.getElementById("item-list");
        while (divElement.firstChild) {
            divElement.removeChild(divElement.firstChild);
        }
    });
    var Read_data_cart = function(){
        objects = JSON.parse(localStorage.getItem("cart_admin"));
        create_truck();
    }
    
    
    
    var create_truck = function(){
    
        
        objects.forEach(function(objects) {
            // Tạo một phần tử .item
            create_truck_line(objects);
        });
        delete_item();
        choose_item_to_add();
        calc_money();
        add = document.querySelector("#Add-to-admin-cart").addEventListener("click",function(){
            add_to_admin_cart();
            delete_choosen();
            // alert("ĐƠN ĐẶT THÀNH CÔNG, SẢN PHẨM SẼ ĐƯỢC GIAO TRONG THỜI GIAN SỚM NHẤT. XIN CẢM ƠN!")
        })
        empty_cart();
    };

    var create_truck_line = function(object){
        const itemContainer = document.getElementById("item-list");
    
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        const id = object.id;
            const originalString = "ID_Products001.jpg";
            const modifiedString = originalString.replace(/001/g, id.toString().padStart(3, "0"));
                
            const charname = object.name;
            var namesp = charname.replace(/%/g, ' ');
                // console.log(name);
                
            const total_price = parseInt(object.price)*parseInt(object.quality)
                // Tạo các phần tử con và đặt giá trị từ đối tượng sản phẩm
                
                // console.log(objects)
                
            itemElement.innerHTML = `
                <input type="checkbox" >
                <img src=".\\Images\\products\\${modifiedString}" alt="" class="item_img">
                <div>
                <p> Tên sản phẩm </p>
                <p>${namesp}</p>
                </div>
                <div id="item-ID" > ${object.id} </div>
                <div>
                <p> Giá sản phẩm </p>
                <p id="price">${object.price}</p>
                </div>
                <div>
                <p>Số lượng</p>
                <p id="n" class="price">${object.quality}</p>
                </div>
                <div>
                <p> Tổng tiền </p> 
                <p id="total-price" class="price">${total_price}</p>
                </div>
                <div  class="delete-item"> 
                <button>x</button>
                    </div>
                    `;
                    
                    
                    // Thêm phần tử .item vào phần tử gốc
                    itemContainer.appendChild(itemElement);
    
    
     
        }
    
});