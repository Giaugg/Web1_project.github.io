document.addEventListener("DOMContentLoaded", function () {
	start();
});
let items;
function start() {
	Read_data_cart();

	// console.log(modifiedItems);

	const submitButton = document.getElementById("submit");
	submitButton.addEventListener("click", function () {

		filterAndRenderData();
	});
}

var Read_data_cart = function () {
	objects = JSON.parse(localStorage.getItem("cart_admin"));
	// console.log(objects);
	create_admin_cart();
    items = objects;
};

var create_admin_cart = function () {
		const itemContainer = document.getElementById("itemlist1");
        // itemContainer.innerHTML = "";
	objects.forEach(function (objects) {
		// Tạo một phần tử .item

		create_admin_cart_line(objects);
        
	});
};

var create_admin_cart_line = function (object) {
	console.log(object);
	if (object.status == 1) {
		const itemContainer = document.getElementById("itemlist1");

		const itemElement = document.createElement("tr");
		itemElement.classList.add("item");

		// console.log(name);

		const total_price = parseInt(object.price) * parseInt(object.quality);
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
                <td>${object.id}</td>
                <td>${object.userID}</td>
                <td>${object.brand}</td>
                <td>${object.quality}</td>
                <td>${total_price}</td>
                <td>${dayobject}</td>
                    `;

		// Thêm phần tử .item vào phần tử gốc
		// console.log(itemContainer);
		itemContainer.appendChild(itemElement);
		
	}
    
};

function filterAndRenderData() {
	const selectedBrand = document.getElementById("brand").value;
	const dateStart = document.getElementById("date-start").value;
	const dateEnd = document.getElementById("date-end").value;
	const filteredItems = items.filter(function (item) {
		const itemBrand = item.brand.toString();
		const time = item.Date.split("-")[0];
		const times = time.split("/");
		const itemTimeOrder = times[1] + "/" + times[0] + "/" + times[2];
		console.log(itemTimeOrder);
		console.log(new Date(itemTimeOrder));
		console.log(new Date(dateStart));
		return (
			(selectedBrand === "all" || itemBrand === selectedBrand) &&
			(dateStart === "" ||
				dateEnd === "" ||
				(new Date(itemTimeOrder) >= new Date(dateStart) &&
					new Date(itemTimeOrder) <= new Date(dateEnd)))
		);
	});

	// renderData(filteredItems);
    create_admin_cart(filteredItems);
}

const logoDiv = document.querySelector(".logo");
const siderDiv = document.querySelector(".sider");

logoDiv.addEventListener("mouseover", () => {
	siderDiv.style.display = "flex";
});

logoDiv.addEventListener("mouseout", () => {
	siderDiv.style.display = "none";
});

siderDiv.addEventListener("mouseover", () => {
	siderDiv.style.display = "flex";
});

siderDiv.addEventListener("mouseout", () => {
	siderDiv.style.display = "none";
});
// const totalsRow = document.createElement("tr");
// totalsRow.innerHTML = `
//     <td colspan="3"><strong>Total:</strong> </td>
//     <td>${totalQuantity}</td>
//     <td>${totalPrice}</td>
//     <td></td>
// `;  
// console.log(3)
// list_tbody.appendChild(totalsRow);
