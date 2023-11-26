var main_data;
var objects; // Khai báo biến objects ở ngoài để truy cập sau này
var map = new Map();
var admin_cart = [];

document.addEventListener("DOMContentLoaded", function() {
    // Lấy các phần tử HTML


});



var Read_data_cart = function(){
    objects = JSON.parse(localStorage.getItem("cart_admin"));
    console.log(objects);
    create_admin_cart();
}



var create_admin_cart = function(){

    
    objects.forEach(function(objects) {
        // Tạo một phần tử .item
        create_admin_cart_line(objects);
    });
    // delete_item();
    // choose_item_to_add();
    // calc_money();
    // add = document.querySelector("#Add-to-admin-cart").addEventListener("click",function(){
    //     add_to_admin_cart();
    //     delete_choosen();
    //     // alert("ĐƠN ĐẶT THÀNH CÔNG, SẢN PHẨM SẼ ĐƯỢC GIAO TRONG THỜI GIAN SỚM NHẤT. XIN CẢM ƠN!")
    // })
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

var create_admin_cart_line = function(object){
    // console.log(object);
    const itemContainer = document.getElementById("itemlist");

    const itemElement = document.createElement("tr");
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
            <th>001</th>
            <th>${object.id}</th>
            <th>${object.quality}</th>
            <th>${total_price}</th>
            <th>${object.Date}</th>
            <th>${object.status}</th>
            <th>Action</th>
                `;
                
                // Thêm phần tử .item vào phần tử gốc
            console.log(itemContainer);
            itemContainer.appendChild(itemElement);


 
    }

var delete_choosen = function(){
    delete_HTML_choosen();
    delete_cart_choosen();

}

var delete_HTML_choosen = function(){
    const allitemHTML = document.querySelectorAll(".item");
    allitemHTML.forEach(div =>{
        const element = div.querySelector('input[type="checkbox"]');
        if(element.checked == true){
            element.parentNode.remove();
            empty_cart();
        }
        
    })
}
    
var delete_cart_choosen = function(){
    let newobjects = []
    objects.forEach(object =>{
        if(map[parseInt(object.id)] == undefined)
            newobjects.push(object);
    })
    console.log({newobjects});
    localStorage.setItem("cart", JSON.stringify(newobjects));
    newobjects = [];
}


    var add_to_admin_cart = function(){
        objects.forEach(object => {
            if(map[parseInt(object.id)] !== undefined && map[parseInt(object.id)] %2 !== 0 ) {
                var currentDate = new Date();
                object.Date = currentDate;
                object.status = 0;
                admin_cart.push(object);
            console.log(admin_cart)
            }
        })
        var cart_admin = JSON.parse(localStorage.getItem("cart-admin"));
        if (cart_admin == null) {
            cart_admin = admin_cart;
            // console.log(cart_admin)
        } else {
            cart_admin = cart_admin.concat(admin_cart);
            admin_cart = [];
        }
        
        localStorage.setItem("cart_admin", JSON.stringify(cart_admin));
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
        btn = item.querySelector(".delete-item")
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

Read_data_cart();


// const cartTable = document.getElementById("cart-table");
// let modifiedItems = [];
// document.addEventListener("DOMContentLoaded", function () {
//     start();
// });
// function start() {
//     getdata(renderData);
//     console.log(modifiedItems);
//     const saveButton = document.getElementsByClassName("save-button")[0];
//     saveButton.addEventListener('click', function () {
//         saveData(modifiedItems);
//     });
// }


// function getdata(callback) {
//     fetch('http://localhost:3000/Items')
//         .then(response => response.json())
//         .then(callback);
// }

// function renderData(Items) {
//     var list_tbody = cartTable.querySelector('tbody');
//     Items.map(function (item) {
//         const total = parseFloat(item.price) * parseFloat(item.quantity);
//         const row = document.createElement('tr');
//         row.innerHTML = `
//                     <td>${item.admin_id}</td>
//                     <td>${item.prod_id}</td>
//                     <td>${item.brand}</td>
//                     <td>${item.quantity}</td>
//                     <td>${total}</td>
//                     <td>${item.timeOrder}</td>
//                     <td>${item.status === 1 ? 'Chấp nhận' : item.status === 2 ? 'Từ chối' : 'Chưa xử lý'}</td>
//                     <td>
//                         <button class="accept-button">Chấp nhận</button>
//                         <button class="ignore-button">Từ chối</button>
//                     </td>
//                 `;

//         list_tbody.appendChild(row);

//         // cài đặt tính năng cho nút accept và nút ignore
//         const acceptButton = row.querySelector('.accept-button');
//         const ignoreButton = row.querySelector('.ignore-button');
//         const statusCell = row.querySelector('td:nth-child(7)');

//         if (item.status === 1) {
//             acceptButton.disabled = true;
//             ignoreButton.disabled = true;
//             statusCell.classList.add('accept_status');
//         }
//         else if(item.status === 2){
//             acceptButton.disabled = true;
//             ignoreButton.disabled = true;
//             statusCell.classList.add('ignore_status');
//         }

//         acceptButton.addEventListener('click', function () {
//             statusCell.textContent = 'Chấp nhận';
//             statusCell.classList.add('accept_status'); // thêm class tạo hiệu ứng sau khi ấn
//             acceptButton.disabled = true; // chỉ ấn được một lần
//             ignoreButton.disabled = true;
//             item.status = 1;
//             if (!modifiedItems.includes(item)) {
//                 modifiedItems.push(item);
//             }
//         });
//         ignoreButton.addEventListener('click', function () {
//             statusCell.textContent = 'Từ chối';
//             statusCell.classList.add('ignore_status');
//             acceptButton.disabled = true;
//             ignoreButton.disabled = true;
//             item.status = 2;
//             if (!modifiedItems.includes(item)) {
//                 modifiedItems.push(item);
//             }
//         });
//     })

// }


// function saveData(items) {
//     items.map(function(item){
//         const url = `http://localhost:3000/Items/${item.id}`;

//         fetch(url, {
//             method: 'PUT',  // Sử dụng phương thức PATCH để cập nhật chỉ một số thuộc tính
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(item),
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(`Dữ liệu đã được cập nhật cho item có id ${item.id}:`, data);
//         })
//         .catch(error => {
//             console.error(`Lỗi khi cập nhật dữ liệu cho item có id ${item.id}:`, error);
//         });
//         console.log(item.id, item.status);
//     });

//     // Sau khi lưu, đặt lại danh sách modifiedItems
//     modifiedItems = [];
// }