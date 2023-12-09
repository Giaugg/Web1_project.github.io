var objects; 
let modifiedItems = [];
document.addEventListener("DOMContentLoaded", function () {
    start();
});
function start() {
    Read_data_cart();
    
    // console.log(modifiedItems);
    const saveButton = document.getElementsByClassName("save-button")[0];
    saveButton.addEventListener('click', function () {
        saveData();
        console.log(objects);
    });
    const submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", function () {
        filterAndRenderData();
    })
 
}


var Read_data_cart = function(){
    objects = JSON.parse(localStorage.getItem("cart_admin"));
    // console.log(objects);
    create_admin_cart();
}



var create_admin_cart = function(){

    
    objects.forEach(function(objects) {
        // Tạo một phần tử .item
      
        create_admin_cart_line(objects);
    });

};
    


var create_admin_cart_line = function(object){
     console.log(object);
  console.log(object.imgage)
    const itemContainer = document.getElementById("itemlist");

    const itemElement = document.createElement("tr");
    itemElement.classList.add("item");
  
    const id = object.id;
        const originalString = "ID_Products001.jpg";
            
        const charname = object.name;
            // console.log(name);
            
        const total_price = parseInt(object.price)*parseInt(object.quality)
            // Tạo các phần tử con và đặt giá trị từ đối tượng sản phẩm
            
            // console.log(objects)
            var dateObject = new Date(object.Date);
// Lấy ngày, tháng, năm từ đối tượng Date
var year = dateObject.getFullYear();
var month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
var day = dateObject.getDate();

// In kết quả
var dayobject = day + "/" + month + "/" + year;
            
        itemElement.innerHTML = `
            <td>${object.userID}</td>
            <td class="id">${object.id}</td>
            <td>${object.quality}</td>
            <td>${total_price}</td>
            <td>${dayobject}</td>
            <td id="status">${object.status === 1 ? 'Chấp nhận' : object.status === 2 ? 'Từ chối' : 'Chưa xử lý'}</td>
            <td>
                <button class="accept-button"   > xử lí</button>
                <button class="ignore-button"  > hủy </button>

            </td>
                `;
                
                // Thêm phần tử .item vào phần tử gốc
            // console.log(itemContainer);
            itemContainer.appendChild(itemElement);
            var statusElement=document.querySelector('#status');
            var status=statusElement.textContent;
            itemElement.addEventListener('click', function() { chitiet(object.imgage,object.userID,object.quality,object.price,object.Date,object.status); });
const acceptButton = itemElement.querySelector('.accept-button');
// console.log(acceptButton);
const ignoreButton = itemElement.querySelector('.ignore-button');
const statusCell = itemElement.querySelector('td:nth-child(6)');


if (object.status === 1) {
    acceptButton.disabled = true;
    ignoreButton.disabled = true;
    statusCell.classList.add('accept_status');
}
else if(object.status === 2){
    acceptButton.disabled = true;
    ignoreButton.disabled = true;
    statusCell.classList.add('ignore_status');
}

acceptButton.addEventListener('click', function (e) {
    e.stopPropagation();
    statusCell.textContent = 'Chấp nhận';
    statusCell.classList.add('accept_status'); // thêm class tạo hiệu ứng sau khi ấn
    acceptButton.disabled = true; // chỉ ấn được một lần
    ignoreButton.disabled = true;
    object.status = 1;
    // console.log(objects);
    console.log(acceptButton.parentElement)
    if (!modifiedItems.includes(object)) {
        modifiedItems.push(object);
    }
});
ignoreButton.addEventListener('click', function (e) {
    e.stopPropagation();
    statusCell.textContent = 'Từ chối';
    statusCell.classList.add('ignore_status');
    acceptButton.disabled = true;
    ignoreButton.disabled = true;
    object.status = 2;
    if (!modifiedItems.includes(object)) {
        modifiedItems.push(object);
    }
});
 
    }


function saveData() {

    localStorage.setItem("cart_admin",JSON.stringify(objects)); 
    console.log("thanhcong")
    // Sau khi lưu, đặt lại danh sách modifiedItems
    // modifiedItems = [];
}
const logoDiv = document.querySelector('.logo');
const siderDiv = document.querySelector('.sider');

logoDiv.addEventListener('mouseover', () => {
  siderDiv.style.display = 'flex';
});

logoDiv.addEventListener('mouseout', () => {
  siderDiv.style.display = 'none';
});

siderDiv.addEventListener('mouseover', () => {
  siderDiv.style.display = 'flex';
});

siderDiv.addEventListener('mouseout', () => {
  siderDiv.style.display = 'none';
});

function filterAndRenderData() {
    const itemContainer = document.getElementById("itemlist");

    itemContainer.innerHTML="";
    
    const dateStart = document.getElementById("date-start").value;
    const dateEnd = document.getElementById("date-end").value;
    const filteredItems = objects.filter(function (item) {
        const itemTimeOrder = item.Date.split("T")[0];
        console.log(itemTimeOrder);
        console.log(new Date(itemTimeOrder));
        console.log(new Date(dateStart));
        return (
            (dateStart === "" || dateEnd === "" ||
                (new Date(itemTimeOrder) >= new Date(dateStart) &&
                    new Date(itemTimeOrder) <= new Date(dateEnd))
            )
        );
    });
    console.log(filteredItems);
    // renderData(filteredItems);
    create_admin_cart(filteredItems);

}
function chitiet(hinh,userID,soluong,gia,timeOder,status){
 
 
      var total=gia*soluong;
	var chitetElement1 = document.querySelector('.chi-tiet-modal')
	chitetElement1.innerHTML =
    `
    <div class="chi-tiet-modal-container1">
        <div class="modal-close" >
            <button class="annutclose"> <img src=".\\Images\\icon\\close.svg" alt="">
        </div>
        <div class="chi-tiet-header1">
            <div class="item">
                   <img src=${hinh} alt="" >
            </div>
            <div class="divchitiet">
                <div class="header1" style="font-size: 50px;">
                  <div>Userid:${userID}</div>
                    <div class="fornt-write">Số lượng:${soluong}</div>
                    <div>Giá:${total}</div>
                    <div>TimeOder: ${timeOder}</div>
                    <div id="trangthai">Trạng thái:${status === 1 ? 'Chấp nhận' : status === 2 ? 'Từ chối' : 'Chưa xử lý'}</div>
                <div>
                   
                </div>
               </div>
        </div>
      </div>`
      var annutCloseElement1 = document.querySelector('.modal-close');   
          chitetElement1.style.display = "flex";
          annutCloseElement1.addEventListener('click',function(){
            chitetElement1.style.display="none";
          })
}
