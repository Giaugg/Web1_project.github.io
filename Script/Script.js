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
		// console.log(course.image);

		return `<div class="flex-item">
      <div class="flex-image-ctn"> 
        <img src="${course.image}" alt="" id="flex-image">
      </div>
      <p class="name">${course.name} <\p>
      <div class="button-flex">
        <button class="annut" onclick="chitiet(${course.id},'${course.name}',${course.price},'${course.image}')">Chi Tiet</button>
        <button class="add-to-cart-button" onclick="themvaogiohang(${course.id},'${course.name}',${course.price},'${course.image}')">Add to cart</button>
      </div>
      <p class="price">$${course.price}</p>
      </div>`;
	});

	itemContainer.innerHTML += html.join("");
}
//gio hang
function themvaogiohang(id, ten, gia, hinh) {
	var cart = JSON.parse(localStorage.getItem("cart"));
	if (cart == null) {
		cart = [];
		cart.push({ id: id, name: ten, price: gia, image: hinh, quality: 1 });
	} else {
		let item = cart.find((item) => item.id === id);
		if (item) item.quality++;
		else
			cart.push({ id: id, name: ten, price: gia, image: hinh, quality: 1 });
	}

	localStorage.setItem("cart", JSON.stringify(cart));
}
//chi tiet
function chitiet(id, ten, gia, hinh) {
	hinh = convertImagePath(hinh);
	var chitetElement1 = document.querySelector(".chi-tiet-modal");
	chitetElement1.innerHTML = `
        <div class="chi-tiet-modal-container">
		<div class="chi-tiet-header">
			<div> Chi Tiết Sản Phẩm </div>
			<div class="modal-close" ><img src="..\\Images\\icon\\close.svg" alt="" ></div>
		</div>
		<div class="chitiet-container">
            <div class="modal-chi-tiet-image"><img  id="image-chitiet"src=${hinh} alt="" ></div>
			<div class="chitiet-right">
         		<div> Tên SP: ${ten}</div>
         		<div>Giá: ${gia}</div>
         		<div> SIZE <select name="" id=""></select> </div>
         		<div>so luong
             		<div class="fornt-sl" >
                     		<div class="button">  <button id="handel-minus" ><i class="fa-solid fa-minus"></i></button></div>
                 			<input type="text" id="input-chitiet"  value="0">
                 			<div class="button"><button id="handel-plus" ><i class="fa-solid fa-plus"></i></button></div>
					</div>		
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
	var inputElement1 = document.querySelector(".fornt-sl #input-chitiet");
	console.log(inputElement1);
	var amount1 = inputElement1.value;

	var annutCloseElement1 = document.querySelector(".modal-close");
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
				image: hinh,
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
					image: hinh,
					quality: inputElement1.value,
				});
		}

		localStorage.setItem("cart", JSON.stringify(cart));
	}
	giohangElement.addEventListener("click", themvaogiohang1);

	annutCloseElement1.onclick = function () {
		chitetElement1.style.display = "none";
		if (modal1Element.value || selectElement.value || cuoiElement.value)
			chitietmoda1lElement.style.display = "flex";
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
// console.log(convertedPath);

Read_file_maindata();

var readfile = function () {
	fetch(api)
		.then(function (data) {
			return data.json();
		})
		.then(function (data) {
			render2(data);
		});
};
function render2(items) {
	var itemElement = document.querySelector(".sanphamItem");

	var html = items.map(function (item) {
		return `<div class="chitiet"> 
           <img src="${item.image}" alt="">
           <div class="chitiet2">
               <div>${item.name}</div>
               <div>${item.price}</div>
           </div>  
           <div class="khung"><button class="annut" onclick="chitiet(${item.id},'${item.name}',${item.price},'${item.image}')" >Chi Tiet</button></div>
           </div>    
        `;
	});
	itemElement.innerHTML = html.join("");
	timkiem(items);
}
//TIM KIEM
function timkiem(items) {
	// console.log(items);
	var chitietmodalElement = document.querySelector(".modal1");
	var closechitietElenment = document.querySelector(".annutclose1");
	var searchElement = document.querySelector(".search-btn");
	var sanphamElement = document.querySelector(".sanphamItem");
	var chitetElement = document.querySelectorAll(".chitiet");
	var nutchonElenment = document.querySelector(".nutchon");
	var selectElement = document.querySelector(".brand");
	var search2Element = document.querySelector(".search2");
	var modal1Element = document.querySelector(".search input");
	var dauElement = document.querySelector(".dau");
	var cuoiElement = document.querySelector(".cuoi");
	var array = Array.from(chitetElement);
	selectElement.value = "";
	var x = 0;
	nutchonElenment.addEventListener("click", function () {
		if (!x) {
			search2Element.style.display = "flex";
			x = 1;
		} else {
			search2Element.style.display = "none";
			x = 0;
		}
		selectElement.value = "";
	});
	searchElement.addEventListener("click", function () {
		chitietmodalElement.style.display = "flex";
	});
	closechitietElenment.addEventListener("click", function () {
		chitietmodalElement.style.display = "none";
		modal1Element.value = "";
		search2Element.style.display = "none";
		selectElement.value = "";

		if (!modal1Element.value) {
			sanphamElement.style.display = "none";
		}
	});
	var select = 0;
	sanphamElement.style.display = "none";
	console.log(chitetElement);
	modal1Element.addEventListener("input", function () {
		var ten = modal1Element.value.toLowerCase();
		if (!selectElement.value && !cuoiElement.value && !dauElement.value) {
			if (!modal1Element.value) sanphamElement.style.display = "none";
			else sanphamElement.style.display = "block";

			chitetElement.forEach(function (item) {
				if (
					item.innerText
						.replace("Chi Tiet", "")
						.toLowerCase()
						.includes(ten)
				)
					item.style.display = "flex";
				else item.style.display = "none";
			});
		} else if (selectElement.value && cuoiElement.value && dauElement.value) {
			var x = parseInt(dauElement.value);
			var y = parseInt(cuoiElement.value);
			if (!modal1Element.value) {
				var a = [];
				var sanpham1 = items.filter(function (item) {
					return (
						x <= item.price &&
						y >= item.price &&
						item.brand.toString() === selectElement.value
					);
				});
				console.log(sanpham1);
				sanpham1.forEach(function (item) {
					var s = item.image;
					s = s.toString().toLowerCase();
					for (var i = 0; i < array.length; i++) {
						var j = array[i].innerText;
						j = j.replace("Chi Tiet", "");
						var z = array[i].outerHTML;
						var c = 0;
						if (z.toLowerCase().includes(s) && !a[i]) {
							console.log(z);
							c++;
							array[i].style.display = "flex";
							a[i] = 1;
							if (c == sanpham1.length) break;
						} else if (!a[i]) {
							array[i].style.display = "none";
						}
					}
				});
				sanphamElement.style.display = "block";
			} else {
				var a = [];
				var sanpham1 = items.filter(function (item) {
					return (
						x <= item.price &&
						y >= item.price &&
						item.brand.toString() === selectElement.value
					);
				});
				console.log(sanpham1);
				sanpham1.forEach(function (item) {
					var s = item.image;
					s = s.toString().toLowerCase();
					for (var i = 0; i < array.length; i++) {
						var j = array[i].innerText;
						j = j.replace("Chi Tiet", "");
						var z = array[i].outerHTML;
						var c = 0;
						if (
							z.toLowerCase().includes(s) &&
							!a[i] &&
							j.toLowerCase().includes(modal1Element.value)
						) {
							console.log(z);
							c++;
							array[i].style.display = "flex";
							a[i] = 1;
							if (c == sanpham1.length) break;
						} else if (!a[i]) {
							array[i].style.display = "none";
						}
					}
					sanphamElement.style.display = "block";
				});
			}
		} else if (selectElement.value) {
			var x = selectElement.value;
			var a = [];
			var sanpham = items.filter(function (item) {
				return x === item.brand.toString();
			});
			sanpham.forEach(function (item) {
				var s = item.image;
				s = s.toString().toLowerCase();

				var c = 0;
				if (!modal1Element.value) {
					for (var i = 0; i < array.length; i++) {
						var j = array[i];
						var z = j.outerHTML;
						if (z.toLowerCase().includes(s) && !a[i]) {
							console.log(z);
							c++;
							array[i].style.display = "flex";
							a[i] = 1;
						} else if (!a[i]) {
							array[i].style.display = "none";
						}
					}
					sanphamElement.style.display = "block";
				} else {
					var input1 = modal1Element.value.toLowerCase();

					for (var i = 0; i < array.length; i++) {
						var j = array[i].innerText;
						j = j.replace("Chi Tiet", "");
						var z = array[i].outerHTML;
						if (
							z.toLowerCase().includes(s) &&
							!a[i] &&
							j.toLowerCase().includes(input1)
						) {
							console.log(z);
							c++;
							array[i].style.display = "flex";
							a[i] = 1;
						} else if (!a[i]) {
							array[i].style.display = "none";
						}
					}
					sanphamElement.style.display = "block";
				}
			});
		} else if (dauElement.value && cuoiElement.value) {
			var x = parseInt(dauElement.value);
			var y = parseInt(cuoiElement.value);
			if (!modal1Element.value) {
				var sanpham1 = items.filter(function (item) {
					return x <= item.price && y >= item.price;
				});
				sanpham1.forEach(function (item) {
					var s = item.image;
					s = s.toString().toLowerCase();
					for (var i = 0; i < array.length; i++) {
						var j = array[i];
						var z = j.outerHTML;
						var c = 0;
						if (z.toLowerCase().includes(s) && !a[i]) {
							c++;
							array[i].style.display = "flex";
							a[i] = 1;
							if (c == sanpham1.length) break;
						} else if (!a[i]) {
							array[i].style.display = "none";
						}
					}
				});
				sanphamElement.style.display = "block";
			} else {
				console.log(111);
				var a = [];
				var sanpham1 = items.filter(function (item) {
					return x <= item.price && y >= item.price;
				});
				sanpham1.forEach(function (item) {
					var s = item.image;
					s = s.toString().toLowerCase();
					for (var i = 0; i < array.length; i++) {
						var j = array[i].innerText;
						j = j.replace("Chi Tiet", "");
						var z = array[i].outerHTML;
						var c = 0;
						if (
							z.toLowerCase().includes(s) &&
							!a[i] &&
							j.toLowerCase().includes(modal1Element.value)
						) {
							console.log(z);
							c++;
							array[i].style.display = "flex";
							a[i] = 1;
							if (c == sanpham1.length) break;
						} else if (!a[i]) {
							array[i].style.display = "none";
						}
					}
				});
				sanphamElement.style.display = "block";
			}
		}
	});

	selectElement.addEventListener("change", function () {
		select = 1;

		var x = parseInt(dauElement.value);
		var y = parseInt(cuoiElement.value);

		if (!modal1Element.value && !dauElement.value && !cuoiElement.value) {
			var x = selectElement.value;
			console.log(items);
			console.log(x);
			console.log(typeof x);
			var sanpham = items.filter(function (item) {
				return x === item.brand.toString();
			});
			console.log(sanpham);
			var a = [];
			sanpham.forEach(function (item) {
				var s = item.image;
				s = s.toString().toLowerCase();
				var c = 0;
				for (var i = 0; i < array.length; i++) {
					var j = array[i];
					var z = j.outerHTML;
					if (z.toLowerCase().includes(s) && !a[i]) {
						c++;
						array[i].style.display = "flex";
						a[i] = 1;
						if (c == sanpham.length) break;
					} else if (!a[i]) {
						array[i].style.display = "none";
					}
				}
				sanphamElement.style.display = "block";
			});
		} else if (modal1Element.value && dauElement.value && cuoiElement.value) {
			console.log("KHONG DUOC");
			var a = [];
			var sanpham1 = items.filter(function (item) {
				return (
					x <= item.price &&
					y >= item.price &&
					item.brand.toString() === selectElement.value
				);
			});
			console.log(sanpham1);
			sanpham1.forEach(function (item) {
				var s = item.image;
				s = s.toString().toLowerCase();
				for (var i = 0; i < array.length; i++) {
					var j = array[i].innerText;
					j = j.replace("Chi Tiet", "");
					var z = array[i].outerHTML;
					var c = 0;
					if (
						z.toLowerCase().includes(s) &&
						!a[i] &&
						j.toLowerCase().includes(modal1Element.value)
					) {
						console.log(z);
						c++;
						array[i].style.display = "flex";
						a[i] = 1;
						if (c == sanpham1.length) break;
					} else if (!a[i]) {
						array[i].style.display = "none";
					}
				}
			});
			sanphamElement.style.display = "block";
		} else if (modal1Element.value) {
			var a = [];
			var sanpham = items.filter(function (item) {
				return item.brand.toString() === selectElement.value;
			});
			sanpham.forEach(function (item) {
				var s = item.image;
				s = s.toString().toLowerCase();
				for (var i = 0; i < array.length; i++) {
					var j = array[i].innerText;
					j = j.replace("Chi Tiet", "");
					var z = array[i].outerHTML;
					var c = 0;
					if (
						z.toLowerCase().includes(s) &&
						!a[i] &&
						j.toLowerCase().includes(modal1Element.value)
					) {
						console.log(z);
						c++;
						array[i].style.display = "flex";
						a[i] = 1;
						if (c == sanpham1.length) break;
					} else if (!a[i]) {
						array[i].style.display = "none";
					}
				}
			});
			sanphamElement.style.display = "block";
		} else if (dauElement.value && cuoiElement.value) {
			var a = [];
			var sanpham1 = items.filter(function (item) {
				return (
					item.brand.toString() === selectElement.value &&
					x <= item.price &&
					y >= item.price
				);
			});
			console.log(sanpham1);
			sanpham1.forEach(function (item) {
				var s = item.image;
				s = s.toString().toLowerCase();
				for (var i = 0; i < array.length; i++) {
					var j = array[i].innerText;
					j = j.replace("Chi Tiet", "");
					var z = array[i].outerHTML;
					var c = 0;
					if (z.toLowerCase().includes(s) && !a[i]) {
						console.log(z);
						c++;
						array[i].style.display = "flex";
						a[i] = 1;
					} else if (!a[i]) {
						array[i].style.display = "none";
					}
				}
				sanphamElement.style.display = "block";
			});
		}
	});

	cuoiElement.addEventListener("keydown", function () {
		var a = [];
		var x = parseInt(dauElement.value);
		var y = parseInt(cuoiElement.value);
		console.log(x, y);
		if (x && y && !modal1Element.value && !selectElement.value) {
			var sanpham1 = items.filter(function (item) {
				return x <= item.price && y >= item.price;
			});
			sanpham1.forEach(function (item) {
				var s = item.image;
				s = s.toString().toLowerCase();
				for (var i = 0; i < array.length; i++) {
					var j = array[i];
					var z = j.outerHTML;
					var c = 0;
					if (z.toLowerCase().includes(s) && !a[i]) {
						c++;
						array[i].style.display = "flex";
						a[i] = 1;
						if (c == sanpham1.length) break;
					} else if (!a[i]) {
						array[i].style.display = "none";
					}
				}
			});
			sanphamElement.style.display = "block";
		} else if (x && y && modal1Element.value && selectElement.value) {
			var a = [];
			var sanpham1 = items.filter(function (item) {
				return (
					x <= item.price &&
					y >= item.price &&
					item.brand.toString() === selectElement.value
				);
			});
			sanpham1.forEach(function (item) {
				var s = item.image;
				s = s.toString().toLowerCase();
				for (var i = 0; i < array.length; i++) {
					var j = array[i].innerText;
					j = j.replace("Chi Tiet", "");
					var z = array[i].outerHTML;
					var c = 0;
					if (
						z.toLowerCase().includes(s) &&
						!a[i] &&
						j.toLowerCase().includes(modal1Element.value)
					) {
						console.log(z);
						c++;
						array[i].style.display = "flex";
						a[i] = 1;
						if (c == sanpham1.length) break;
					} else if (!a[i]) {
						array[i].style.display = "none";
					}
				}
			});
			sanphamElement.style.display = "block";
		} else if (x && y && modal1Element.value) {
			console.log(111);
			var a = [];
			var sanpham1 = items.filter(function (item) {
				return x <= item.price && y >= item.price;
			});
			sanpham1.forEach(function (item) {
				var s = item.image;
				s = s.toString().toLowerCase();
				for (var i = 0; i < array.length; i++) {
					var j = array[i].innerText;
					j = j.replace("Chi Tiet", "");
					var z = array[i].outerHTML;
					var c = 0;
					if (
						z.toLowerCase().includes(s) &&
						!a[i] &&
						j.toLowerCase().includes(modal1Element.value)
					) {
						console.log(z);
						c++;
						array[i].style.display = "flex";
						a[i] = 1;
						if (c == sanpham1.length) break;
					} else if (!a[i]) {
						array[i].style.display = "none";
					}
				}
			});
			sanphamElement.style.display = "block";
		} else if (x && y && selectElement.value) {
			var a = [];
			var sanpham1 = items.filter(function (item) {
				return (
					x <= item.price &&
					y >= item.price &&
					item.brand.toString() === selectElement.value
				);
			});
			console.log(sanpham1);
			sanpham1.forEach(function (item) {
				var s = item.image;
				s = s.toString().toLowerCase();
				for (var i = 0; i < array.length; i++) {
					var j = array[i].innerText;
					j = j.replace("Chi Tiet", "");
					var z = array[i].outerHTML;
					var c = 0;
					if (z.toLowerCase().includes(s) && !a[i]) {
						console.log(z);
						c++;
						array[i].style.display = "flex";
						a[i] = 1;
					} else if (!a[i]) {
						array[i].style.display = "none";
					}
				}
				sanphamElement.style.display = "block";
			});
		}
	});
}
var str = "Hello, world!\nThis is a string.";

// Thay thế tất cả các dấu cách và xuống dòng bằng ký tự trống
var newStr = str.replace(/\s/g, "");
readfile();
// // Form Login & Register
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

const showContainer = document.getElementById("show-conntainer");

const closeButtons1 = document.getElementById("formclose1");
const closeButtons2 = document.getElementById("formclose2");

const registerBtn = document.getElementById("register-btn");
const loginBtn = document.getElementById("login-btn");

const home = document.getElementById("homeshow");

showContainer.addEventListener("click", function () {
	loginForm.style.display = "block";
	home.style.display = "block";
});

closeButtons1.addEventListener("click", function () {
	loginForm.style.display = "none";
	home.style.display = "none";
});
closeButtons2.addEventListener("click", function () {
	registerForm.style.display = "none";
	home.style.display = "none";
});
registerBtn.addEventListener("click", function () {
	registerForm.style.display = "block";
	loginForm.style.display = "none";
	home.style.display = "block";
});
loginBtn.addEventListener("click", function () {
	registerForm.style.display = "none";
	loginForm.style.display = "block";
	home.style.display = "block";
});

var flag;
function Validator(options) {
	function validate(inputElement, rule) {
		var errorMessage = rule.test(inputElement.value);
		var errorElement =
			inputElement.parentElement.querySelector(".form-message");
		if (errorMessage) {
			flag = true;
			errorElement.innerText = errorMessage;
			inputElement.parentElement.classList.add("invalid");
		} else {
			flag = false;
			errorElement.innerText = "";
			inputElement.parentElement.classList.remove("invalid");
		}
	}

	var formElement1 = document.querySelector(options.form1);
	if (formElement1) {
		formElement1.onsubmit = function (event) {
			event.preventDefault();
			options.rules.forEach(function (rule) {
				var inputElement1 = formElement1.querySelector(rule.selector);
				validate(inputElement1, rule);
			});
			if (flag == false) {
				var FullName = document.getElementById("fullname").value;
				var Username = document.getElementById("username").value;
				var Email = document.getElementById("email").value;
				var Password = document.getElementById("password").value;
				var PhoneNumber = document.getElementById("phonenumber").value;
				var Gender = document.getElementById("gender").value;

				var account = JSON.parse(localStorage.getItem("USERS")) || [];
				var checkregister = account.find(function (user) {
					return user.email == Email || user.username == Username;
				});

				if (checkregister) {
					alert("Tên đăng nhập hoặc eamil này đã được đăng ký");
				} else {
					account.push({
						fullname: FullName,
						username: Username,
						password: Password,
						email: Email,
						phonenumber: PhoneNumber,
						gender: Gender,
					});

					localStorage.setItem("USERS", JSON.stringify(account));
					alert("Đăng kí thành công");
				}
				document.getElementById("fullname").value = "";
				document.getElementById("username").value = "";
				document.getElementById("email").value = "";
				document.getElementById("password").value = "";
				document.getElementById("phonenumber").value = "";
				document.getElementById("confirm").value = "";
				document.getElementById("gender").checked = false;
			}
		};

		options.rules.forEach(function (rule) {
			var inputElement1 = formElement1.querySelector(rule.selector);

			if (inputElement1) {
				inputElement1.onblur = function () {
					validate(inputElement1, rule);
				};
				inputElement1.oninput = function () {
					var errorElement =
						inputElement1.parentElement.querySelector(".form-message");
					errorElement.innerText = "";
					inputElement1.parentElement.classList.remove("invalid");
				};
			}
		});
	}

	var formElement2 = document.querySelector(options.form2);
	if (formElement2) {
		formElement2.onsubmit = function (event) {
			event.preventDefault();
			options.rules.forEach(function (rule) {
				var inputElement2 = formElement2.querySelector(rule.selector);
				validate(inputElement2, rule);
			});
			if (flag == false) {
				var userEmail = document.getElementById("username1").value;
				var userPassword = document.getElementById("password1").value;

				account = JSON.parse(localStorage.getItem("USERS")) || [];

				var checklogin = account.find(function (user) {
					return (
						user.email === userEmail && user.password === userPassword
					);
				});

				if (checklogin) {
					alert("Đăng nhập thành công");
				} else {
					alert("Email hoặc mật khẩu không đúng");
				}
			}

			document.getElementById("username1").value = "";
			document.getElementById("password1").value = "";
		};
		options.rules.forEach(function (rule) {
			var inputElement2 = formElement2.querySelector(rule.selector);

			if (inputElement2) {
				inputElement2.onblur = function () {
					validate(inputElement2, rule);
				};
				inputElement2.oninput = function () {
					var errorElement =
						inputElement2.parentElement.querySelector(".form-message");
					errorElement.innerText = "";
					inputElement2.parentElement.classList.remove("invalid");
				};
			}
		});
	}
}

Validator.isRequired = function (selector) {
	return {
		selector: selector,
		test: function (value) {
			return value.trim() ? undefined : "Please enter information.";
		},
	};
};

Validator.isEmail = function (selector) {
	return {
		selector: selector,
		test: function (value) {
			var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
			return isValid ? undefined : "Please enter a valid email.";
		},
	};
};

Validator.isPhoneNumber = function (selector) {
	return {
		selector: selector,
		test: function (value) {
			return /^[0-9]{10}$/.test(value)
				? undefined
				: "Please enter a valid phone number";
		},
	};
};

Validator.isMinlength = function (selector, min) {
	return {
		selector: selector,
		test: function (value) {
			return value.length >= min
				? undefined
				: "Password must contain at least  " + min + " characters.";
		},
	};
};

Validator.isConfirm = function (selector, confirmvalue) {
	return {
		selector: selector,
		test: function (value) {
			return value === confirmvalue() ? undefined : "Password incorrect.";
		},
	};
};

Validator.isGenderSelected = function (selector) {
	return {
		selector: selector,
		test: function (value) {
			var genderElements = document.querySelectorAll(selector);
			var isChecked = false;
			for (var i = 0; i < genderElements.length; i++) {
				if (genderElements[i].checked) {
					isChecked = true;
					break;
				}
			}
			return isChecked ? undefined : "Please select gender.";
		},
	};
};
