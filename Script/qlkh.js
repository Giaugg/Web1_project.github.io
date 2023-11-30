const cartTable = document.getElementById("cart-table");
let modifiedItems = [];
document.addEventListener("DOMContentLoaded", function () {
    start();
});
function start() {
    getdata(renderData);
    console.log(modifiedItems);
    const saveButton = document.getElementsByClassName("save-button")[0];
    saveButton.addEventListener('click', function () {
        saveData(modifiedItems);
    });
}


function getdata(callback) {
    fetch('http://localhost:3000/accout')
        .then(response => response.json())
        .then(callback);
}

function renderData(Items) {
    var list_tbody = cartTable.querySelector('tbody');
    Items.map(function (item) {
        if(!item.admin){
            const total = parseFloat(item.price) * parseFloat(item.quantity);
            const row = document.createElement('tr');
            row.innerHTML = `
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.email}</td>
                        <td>${item.password}</td>
                        <td>${item.address}</td>
                        <td>
                            <button class="delete-button">Xoá người dùng</button>
                        </td>
                    `;
            list_tbody.appendChild(row);
    
            // cài đặt tính năng cho nút delete
            const deleteButton = row.querySelector('.delete-button');
            deleteButton.addEventListener('click', function () {
                delete_item(item);                
            });
        }
    })
}


function delete_item(item) {
        const url = `http://localhost:3000/accout/${item.id}`;
        fetch(url, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log(`Dữ liệu đã được cập nhật cho item có id ${item.id}:`, data);
        })
        .catch(error => {
            console.error(`Lỗi khi cập nhật dữ liệu cho item có id ${item.id}:`, error);
        });
        console.log(item.id, item.admin);
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