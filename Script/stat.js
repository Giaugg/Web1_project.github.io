document.addEventListener("DOMContentLoaded", function () {
	start();
});
let items;
var totalquantity, totalprice;
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
	create_stat(objects);
    items = objects;

};

var create_stat = function (objects) {
		const itemContainer = document.getElementById("itemlist1");
        itemContainer.innerHTML = `
        `;
        totalprice =0;
        totalquantity =0;
    if(objects.length !== 0)
	objects.forEach(function (objects) {

		create_stat_line(objects);
        document.getElementById('thongkequantity').textContent = totalquantity
        document.getElementById('thongkeprice').textContent = totalprice
	});
    else{
        document.getElementById('thongkequantity').textContent = 0
        document.getElementById('thongkeprice').textContent =0 
        
    }
};

var create_stat_line = function (object) {
	if (object.status === 1) {
        totalquantity += object.quality;
        console.log({totalprice})

        totalprice = totalprice + object.price*object.quality;
        console.log({totalprice})
		const itemContainer = document.getElementById("itemlist1");

		const itemElement = document.createElement("tr");
		itemElement.classList.add("item");

		const total_price = parseInt(object.price) * parseInt(object.quality);

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

		itemContainer.appendChild(itemElement);
		
	}
    
};

function filterAndRenderData() {
	const selectedBrand = document.getElementById("brand").value;
    console.log({selectedBrand})
	const dateStart = document.getElementById("date-start").value;
	const dateEnd = document.getElementById("date-end").value;
	const filteredItems = items.filter(function (item) {
		const itemBrand = item.brand;
        // console.log(itemBrand)
		const time = item.Date.split("T")[0];
		const times = time.split("-");
		const itemTimeOrder = times[1] + "/" + times[2] + "/" + times[0];
		// console.log(itemTimeOrder);
		// console.log(new Date(itemTimeOrder));
		// console.log(new Date(dateStart));
		return (
			(selectedBrand === "all" || itemBrand === selectedBrand) &&
			(dateStart === "" ||
				dateEnd === "" ||
				(new Date(itemTimeOrder) >= new Date(dateStart) &&
					new Date(itemTimeOrder) <= new Date(dateEnd)))
		);
	});

	// console.log(filteredItems)
    create_stat(filteredItems);
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

