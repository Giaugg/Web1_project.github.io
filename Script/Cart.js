var main_data;
var objects; // Khai báo biến objects ở ngoài để truy cập sau này
var map = new Map();
var admin_cart = [];
var logged  = [];
// console.log(logged);
    
document.addEventListener("DOMContentLoaded", function() {
    // Lấy các phần tử HTML
    const toggleSticketButton = document.getElementById("show-cart");
    const sticket = document.getElementById("cart-user-modal");
    const closeButtons = document.getElementById("close-logo");
    
    
    // Sự kiện khi nhấn nút "Hiển thị Sticket" hoặc dấu x
    toggleSticketButton.addEventListener("click", function() {
        logged = JSON.parse(localStorage.getItem("userlogin"));
        // console.log(logged)
        if(logged.length === 0){
            alert(" đăng nhập để mua hàng")
        }else{

            sticket.style.display = "flex"; // Hiển thị Sticket
            // empty_cart();
            Read_data_cart();
        }
      
    });
    
    closeButtons.addEventListener("click", function() {
        sticket.style.display = "none"; // Ẩn Sticket
        const divElement = document.getElementById("item-list");
        while (divElement.firstChild) {
            divElement.removeChild(divElement.firstChild);
        }
        reset_price();
    });
});



var Read_data_cart = function(){
    objects = JSON.parse(localStorage.getItem("cart"));
    create_user_cart();
}



var create_user_cart = function(){

    
    objects.forEach(function(objects) {
        // Tạo một phần tử .item
        create_user_cart_line(objects);
    });
    delete_item();
    choose_item_to_add();
    calc_money();
    add = document.querySelector("#Add-to-admin-cart").addEventListener("click",function(){
        // console.log(1)
        add_to_admin_cart();
        delete_choosen();
        // alert("ĐƠN ĐẶT THÀNH CÔNG, SẢN PHẨM SẼ ĐƯỢC XỬ LÍ TRONG THỜI GIAN SỚM NHẤT. XIN CẢM ƠN!")
    })
    empty_cart();
};
    
var choose_item_to_add = function(){

        const allcheckbox = document.querySelectorAll('.item');
        // console.log(allcheckbox)
        allcheckbox.forEach(div => {
            // console.log(div)
            
            div.addEventListener('click', function(){
                let key = parseInt(parseInt(div.querySelector("#item-ID").textContent));
                    map[key] = (map[key] || 0) + 1;  
                console.log(map);
                
        })
    
    
        // console.log(price)

});
};

var create_user_cart_line = function(object){
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

var delete_choosen = function(){
    delete_HTML_choosen();
    // delete_cart_choosen();

}

var delete_HTML_choosen = function(){
    const allitemHTML = document.querySelectorAll(".item");
    allitemHTML.forEach(div =>{
        const element = div.querySelector('input[type="checkbox"]');
        if(element.checked == true){
            element.parentNode.remove();
            empty_cart();
        }
        var deleteID = element.parentNode.querySelector('#item-ID');
        console.log(deleteID)
        let newobjects = []
        objects.forEach(object =>{
            if(object.id == deleteID.value)
                newobjects.push(object);
        })
        console.log(newobjects);
        localStorage.setItem("cart", JSON.stringify(newobjects));
        newobjects = [];
    })
}
    



    var add_to_admin_cart = function(){
        objects.forEach(object => {
            if(map[parseInt(object.id)] !== undefined && map[parseInt(object.id)] %2 !== 0 ) {
                var currentDate = new Date();
                object.Date = currentDate;
                object.status = 0;
                
                admin_cart.push(object);
                map[parseInt(object.id)] = undefined;
            console.log(admin_cart)
            }
        })
        var truck = JSON.parse(localStorage.getItem("cart_admin"));
        if (truck == null) {
            truck = admin_cart;
            // console.log(truck)
        } else {
            admin_cart.forEach(function(object){
                let item = truck.find((item) => item.id == object.id);
                // console.log(object, item);
                if (item) item.quality+=object.quality;
                else
                    truck.push(object);

            })
        }
        
        localStorage.setItem("cart_admin", JSON.stringify(truck));
        truck =[];
        admin_cart =[];
    }
    
    
    var delete_item = function(){
        delete_all_HTML_item();
        delete_data_item();
    }
    
    var delete_all_HTML_item = function(){
        
        const alldeletebutton = document.querySelectorAll(".delete-item")

    alldeletebutton.forEach(function(btn){
        btn.addEventListener('click', function(){
            btn.parentElement.remove();
        })
    })
}

var delete_data_item = function(){
    const alldeleteitem = document.querySelectorAll(".item")
    alldeleteitem.forEach(item =>{
        btn = document.querySelector(".delete-item")
        // console.log(btn);
        btn.addEventListener('click', function(){

            var cart = JSON.parse(localStorage.getItem("cart"));

            const target = item.querySelector('#item-ID');

            const newcart = cart.filter(function(cart){
                return parseInt(cart.id)!==parseInt(target.textContent);
            })

            if(newcart.length===0) empty_cart();

            // console.log(target.textContent, newcart);
            localStorage.setItem("cart",JSON.stringify(newcart)); 
        })
    })
}

var calc_money = function(){

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
            //////////////////////////////
        })
    
    })
}

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
var reset_price = function(){
    var total = document.getElementById('total-item');
    var total_cost = document.getElementById('total-cost')
    total.textContent = 0;
    total_cost.textContent = 0;
}

var empty_cart = function(){
    const itemContainer = document.getElementById("item-list");
    if(!itemContainer.hasChildNodes()){
        var itemElementEmty = document.createElement("div");
        itemElementEmty.innerHTML = `
        <p id="empty"> Giỏ hàng trống xin vui lòng lựa chọn sản phẩm cần mua! </p> 
        `
        itemContainer.appendChild(itemElementEmty);

    }
    
    }






