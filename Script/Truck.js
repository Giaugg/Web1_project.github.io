

var objects;    
var logged = [];



document.addEventListener("DOMContentLoaded", function() {
    // Lấy các phần tử HTML
    const toggleSticketButton = document.getElementById("show-truck");
    const sticket = document.getElementById("truck-modal");
    const closeButtons = document.getElementById('close-truck');
    // console.log(closeButtons);
    
    // Sự kiện khi nhấn nút "Hiển thị Sticket" hoặc dấu x
    toggleSticketButton.addEventListener("click", function() {

        logged = JSON.parse(localStorage.getItem("userlogin"));
        if(logged.length === 0){
            alert("đăng nhập để xem các sp đã đặt")
        }else{
            sticket.style.display = "flex"; // Hiển thị Sticket
            Read_data_truck();

        }

    });
    
    closeButtons.addEventListener("click", function() {
        sticket.style.display = "none"; // Ẩn Sticket
        const divElement = document.getElementById("truck-item-list");
        while (divElement.firstChild) {
            divElement.removeChild(divElement.firstChild);
        }
    });
});

var Read_data_truck = function(){
    objects = JSON.parse(localStorage.getItem("cart_admin"));
    create_truck();
}



var create_truck = function(){

    
    objects.forEach(function(objects) {
        // Tạo một phần tử .item
        create_truck_line(objects);
    });

    // empty_cart();
};

var create_truck_line = function(object){
    const itemContainer = document.getElementById("truck-item-list");

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
            <div>
                <td>${object.status === 1 ? 'Được Chấp nhận' : object.status === 2 ? 'Bị Từ chối' : 'Chưa xử lý'}</td>
            </div>
                `;
                
                
                // Thêm phần tử .item vào phần tử gốc
                itemContainer.appendChild(itemElement);


 
    }
