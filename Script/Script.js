var objects;
var main_data;

var api = "http://localhost:3000/Item";
function scrollSnapAutoScroll() {
	const container = document.querySelector(".gallery");
	const scrollItems = document.querySelectorAll(".gallery_item");
	let currentIndex = 0;

	function scrollToNextItem() {
		currentIndex = (currentIndex + 1) % scrollItems.length;
		container.scrollTo({
			left: scrollItems[currentIndex].offsetLeft,
			behavior: "smooth",
		});
	}

	setInterval(scrollToNextItem, 3000); // Tự động cuộn mỗi 3 giây (3000ms)
}

scrollSnapAutoScroll();
////////////// CREATE MAIN DATA////////////

var Read_file_maindata = function () {
	fetch(api)
		.then((response) => response.json())
		.then(function (data) {
			render(data);
		});
};

function render(courses) {
	var itemContainer = document.getElementById("flex-container");

	var html = courses.map(function (course) {
		console.log(course.imgage);

		return `<div class="flex-item">
            <img src="${course.imgage}" alt="" id="flex-image">
      <button class="add-to-cart-button" onclick="themvaogiohang(${course.id},'${course.name}',${course.price},'${course.imgage}')">add to cart</button>
      <p id="name">${course.name}
      <div><button class="annut" onclick="chitiet(${course.id},'${course.name}',${course.price},'${course.imgage}')">sub</button></div>
      </p>
      <p id="price">$${course.price}</p>
      </div>`;
	});

	itemContainer.innerHTML += html.join("");
}
function themvaogiohang(id, ten, gia, hinh) {
	var cart = JSON.parse(localStorage.getItem("cart"));
	if (cart == null) {
		cart = [];
		cart.push({ id: id, name: ten, price: gia, imgage: hinh, quality: 1 });
	} else {
		let item = cart.find((item) => item.id === id);
		if (item) item.quality++;
		else
			cart.push({ id: id, name: ten, price: gia, imgage: hinh, quality: 1 });
	}

	localStorage.setItem("cart", JSON.stringify(cart));
}
function chitiet(id, ten, gia, hinh) {
	console.log(hinh);
	hinh = convertImagePath(hinh);
	var chitetElement1 = document.querySelector(".chi-tiet-modal");

	var bodyElement = document.querySelector("#body");
	chitetElement1.innerHTML = `
                <div class="chi-tiet-modal-container">
         <div class="modal-close" >
           <button class="annutclose">  <i class="fa-solid fa-xmark"></i></button>
         </div>
         <div class="chi-tiet-header">
             <div class="item">
                 <img src=${hinh} alt="" >
             </div>
             <div class="header1" style="font-size: 100%;">
         <div class="fornt-write"><h2>${ten}</h2></div>
         <div>GIA:${gia}</div>
         <div>
             SIZE
             <select name="" id=""></select>
         </div>
         <div>so luong
             <div class="fornt-sl" >
                     <div class="button">          
                             <button id="handel-minus" ><i class="fa-solid fa-minus"></i></button>
                 </div>
                 <input type="text" id="input" style="width: 50px;" value="0">
                 <div class="button">
                 <button id="handel-plus" ><i class="fa-solid fa-plus"></i></button>
             </div>
                    
           
             </div>
         </div>
         <div>
             <button class="giohangchitiet"><a href="http://127.0.0.1:5501/index.html"><i class="fa-sharp fa-solid fa-cart-plus"></i>THEM VAO GIO</a></button>
          </div>
             </div>
             
         </div>
        </div>`;
	var minusElement1 = document.querySelector("#handel-minus");
	console.log(minusElement1);
	var inputElement1 = document.querySelector(".fornt-sl #input");
	console.log(inputElement1);
	var amount1 = inputElement1.value;

	var annutCloseElement1 = document.querySelector(".annutclose");
	var giohangElement = document.querySelector(".giohangchitiet");
	function themvaogiohang1() {
		console.log(inputElement1.value);
		var cart = JSON.parse(localStorage.getItem("cart"));

		if (cart == null) {
			cart = [];
			cart.push({
				id: id,
				name: ten,
				price: gia,
				imgage: hinh,
				quality: inputElement1.value,
			});
		} else {
			let item = cart.find((item) => item.id === id);

			if (item && inputElement1.value >= 1)
				item.quality = inputElement1.value;
			else
				cart.push({
					id: id,
					name: ten,
					price: gia,
					imgage: hinh,
					quality: inputElement1.value,
				});
		}

		localStorage.setItem("cart", JSON.stringify(cart));
	}
	giohangElement.addEventListener("click", themvaogiohang1);

	annutCloseElement1.onclick = function () {
		chitetElement1.style.display = "none";
	};
	function render2(amount) {
		inputElement1.value = amount;
	}
	function giatriminus() {
		if (amount1 > 1) amount1--;

		render2(amount1);
	}
	inputElement1.addEventListener("input", function () {
		amount1 = inputElement1.value;
	});
	function giatriplus() {
		amount1++;
		render2(amount1);
	}
	var plusElement1 = document.querySelector("#handel-plus");
	plusElement1.addEventListener("click", giatriplus);
	minusElement1.addEventListener("click", giatriminus);

	chitetElement1.style.display = "flex";
}
function convertImagePath(inputPath) {
	// Sử dụng phương thức replace để thay thế chuỗi "..Images" thành "..\Images\products\"
	const convertedPath = inputPath.replace(
		"..Imagesproducts",
		"..\\Images\\products\\"
	);
	return convertedPath;
}

// Sử dụng hàm với ví dụ
const inputPath = "..ImagesproductsID_Products004.jpg";
const convertedPath = convertImagePath(inputPath);
console.log(convertedPath);

Read_file_maindata();
