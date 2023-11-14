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
    fetch('http://localhost:3000/Items')
        .then(response => response.json())
        .then(callback);
}

function renderData(Items) {
    var list_tbody = cartTable.querySelector('tbody');
    Items.map(function (item) {
        const total = parseFloat(item.price) * parseFloat(item.quantity);
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${item.user_id}</td>
                    <td>${item.prod_id}</td>
                    <td>${item.brand}</td>
                    <td>${item.quantity}</td>
                    <td>${total}</td>
                    <td>${item.timeOrder}</td>
                    <td>${item.status === 1 ? 'Chấp nhận' : item.status === 2 ? 'Từ chối' : 'Chưa xử lý'}</td>
                    <td>
                        <button class="accept-button">Chấp nhận</button>
                        <button class="ignore-button">Từ chối</button>
                    </td>
                `;

        list_tbody.appendChild(row);

        // cài đặt tính năng cho nút accept và nút ignore
        const acceptButton = row.querySelector('.accept-button');
        const ignoreButton = row.querySelector('.ignore-button');
        const statusCell = row.querySelector('td:nth-child(7)');

        if (item.status === 1) {
            acceptButton.disabled = true;
            ignoreButton.disabled = true;
            statusCell.classList.add('accept_status');
        }
        else if(item.status === 2){
            acceptButton.disabled = true;
            ignoreButton.disabled = true;
            statusCell.classList.add('ignore_status');
        }

        acceptButton.addEventListener('click', function () {
            statusCell.textContent = 'Chấp nhận';
            statusCell.classList.add('accept_status'); // thêm class tạo hiệu ứng sau khi ấn
            acceptButton.disabled = true; // chỉ ấn được một lần
            ignoreButton.disabled = true;
            item.status = 1;
            if (!modifiedItems.includes(item)) {
                modifiedItems.push(item);
            }
        });
        ignoreButton.addEventListener('click', function () {
            statusCell.textContent = 'Từ chối';
            statusCell.classList.add('ignore_status');
            acceptButton.disabled = true;
            ignoreButton.disabled = true;
            item.status = 2;
            if (!modifiedItems.includes(item)) {
                modifiedItems.push(item);
            }
        });
    })

}


function saveData(items) {
    items.map(function(item){
        const url = `http://localhost:3000/Items/${item.id}`;

        fetch(url, {
            method: 'PUT',  // Sử dụng phương thức PATCH để cập nhật chỉ một số thuộc tính
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        })
        .then(response => response.json())
        .then(data => {
            console.log(`Dữ liệu đã được cập nhật cho item có id ${item.id}:`, data);
        })
        .catch(error => {
            console.error(`Lỗi khi cập nhật dữ liệu cho item có id ${item.id}:`, error);
        });
        console.log(item.id, item.status);
    });

    // Sau khi lưu, đặt lại danh sách modifiedItems
    modifiedItems = [];
}