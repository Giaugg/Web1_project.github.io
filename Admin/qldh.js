document.addEventListener("DOMContentLoaded", function () {
    const cartTable = document.getElementById("cart-table");

    fetch('../filedata/cart_for_admin.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const tbody = cartTable.querySelector('tbody');

            lines.forEach(line => {
                const [userId, productId, price, quantity] = line.split(' '); // lấy giá trị từ trong file

                const total = parseFloat(price) * parseFloat(quantity);

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${userId}</td>
                    <td>${productId}</td>
                    <td>${quantity}</td>
                    <td>${total}</td>
                    <td>Chưa xử lý</td>
                    <td>
                        <button class="accept-button">Chấp nhận</button>
                        <button class="ignore-button">Từ chối</button>
                    </td>
                `;

                tbody.appendChild(row);

                // cài đặt tính năng cho nút accept và nút ignore

                const acceptButton = row.querySelector('.accept-button');
                acceptButton.addEventListener('click', function () {
                    const statusCell = row.querySelector('td:nth-child(5)');
                    statusCell.textContent = 'Chấp nhận';
                    statusCell.classList.add('accept_status'); // thêm class tạo hiệu ứng sau khi ấn
                    acceptButton.disabled = true; // chỉ ấn được một lần
                    ignoreButton.disabled = true;
                });
                const ignoreButton = row.querySelector('.ignore-button');
                ignoreButton.addEventListener('click', function () {
                    const statusCell = row.querySelector('td:nth-child(5)');
                    statusCell.textContent = 'Từ chối';
                    statusCell.classList.add('ignore_status');
                    acceptButton.disabled = true;
                    ignoreButton.disabled = true;
                });
            });
        })
        .catch(error => {
            console.error(error);
        });
});
