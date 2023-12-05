document.addEventListener("DOMContentLoaded", function () {
    start();
});
let items; 
function start() {
    getdata(renderData);
    const submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", function () {
        filterAndRenderData();
    });
}

function getdata(callback) {
    fetch('http://localhost:3000/Orders')
        .then(response => response.json())
        .then(data => {
            items = data;
            callback(items);
        });
}
function filterAndRenderData() {
    const selectedBrand = document.getElementById("brand").value;
    const dateStart = document.getElementById("date-start").value;
    const dateEnd = document.getElementById("date-end").value;
    const filteredItems = items.filter(function (item) {
        const itemBrand = item.brand.toString();
        const time = item.timeOrder.split("-")[0];
        const times = time.split("/");
        const itemTimeOrder = times[1] +"/"+ times[0] +"/"+ times[2];
        console.log(itemTimeOrder);
        console.log(new Date(itemTimeOrder));
        console.log(new Date(dateStart));
        return (
            (selectedBrand === "all" || itemBrand === selectedBrand) &&
            (dateStart === "" || dateEnd === "" ||
                (new Date(itemTimeOrder) >= new Date(dateStart) &&
                    new Date(itemTimeOrder) <= new Date(dateEnd))
            )
        );
    });

    renderData(filteredItems);
}
function renderData(Items) {
    var list_tbody = document.querySelector('#cart-table tbody');
    var totalQuantity = 0;
    var totalPrice = 0;
    list_tbody.innerHTML = "";
    Items.map(function (item) {
        const total = parseFloat(item.price) * parseFloat(item.quantity);
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.prod_id}</td>
                    <td>${item.brand}</td>
                    <td>${item.quantity}</td>
                    <td>${total}</td>
                    <td>${item.timeOrder}</td>
                `;
        if (item.status === 1) {
            list_tbody.appendChild(row);
            totalQuantity += parseFloat(item.quantity);
            totalPrice += total;
        }
    });
    const totalsRow = document.createElement('tr');
    totalsRow.innerHTML = `
        <td colspan="3"><strong>Total:</strong> </td>
        <td>${totalQuantity}</td>
        <td>${totalPrice}</td>
        <td></td>
    `;
    list_tbody.appendChild(totalsRow);
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