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

acceptButton.addEventListener('click', function () {
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
ignoreButton.addEventListener('click', function () {
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