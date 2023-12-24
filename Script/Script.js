var objects;
var main_data;
var TTDN = "user";
var accouts;

var api = "http://localhost:3000/Item";
var api_accout = "http://localhost:3000/accout";

const logoDiv = document.querySelector('.logo');
const siderDiv = document.querySelector('.sider');
const brand = document.querySelector('#brand');
const sub_menu = document.querySelector('.sub_menu');

var items2;
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

brand.addEventListener('mouseover', () => {
	sub_menu.style.display = 'flex';
});

brand.addEventListener('mouseout', () => {
	sub_menu.style.display = 'none';
});

sub_menu.addEventListener('mouseover', () => {
	sub_menu.style.display = 'flex';
});

sub_menu.addEventListener('mouseout', () => {
	sub_menu.style.display = 'none';
});


function scrollSnapAutoScroll() {
	const container = document.querySelector(".gallery");
	const scrollItems = document.querySelectorAll(".gallery_item");
	let currentIndex = 0;
	let scrollDuration = 2000;

	function scrollToNextItem() {
		currentIndex = (currentIndex + 1) % scrollItems.length;
		container.scrollTo({
			left: scrollItems[currentIndex].offsetLeft,
			behavior: "instant",
			duration: scrollDuration,
		});
	}

	setInterval(scrollToNextItem, 4000);
}

scrollSnapAutoScroll();
////////////// CREATE MAIN DATA////////////

var Read_file_maindata = function () {
	fetch(api)
		.then((response) => response.json())
		.then(function (data) {
			items2 = data;
			console.log(items2)
			render(data);
		});
};
var Read_file_accout = function () {
	fetch(api_accout)
		.then((response) => response.json())
		.then(function (accouts) {
			// ktradangnhap(accouts);
		});
};
//kiem tra dang nhap hay chua
function ktradangnhap(accouts) {
	var TTDN1 = document.getElementById("status");

	var s = `src=".\\images\\icon\\close.svg"`;
	console.log(s);
	var a = accouts.find(function (accout) {
		return accout.name.includes(TTDN1.textContent);
	})
	var target = 0;
	var target1 = 0;


	var bodyElement = document.querySelector('body');
	var closeElement = document.querySelector('#formclose1')


	bodyElement.addEventListener('click', function (event) {
		if (!a) {
			console.log("2 lan");




			if (target1 == 0) {
				alert("Bạn chưa đăng nhập");
				++target1;
			}
			if (event.target.outerHTML.includes(s)) alert("Bạn chưa đăng nhập không thể thoát");
			const loginForm = document.getElementById("login-form");
			const home = document.getElementById("homeshow");
			loginForm.style.display = "block";
			home.style.display = "block";

			var TTDN1 = document.getElementById("status");
			a = accouts.find(function (accout) {
				return accout.name.includes(TTDN1.textContent);
			})
			if (a) {
				console.log(a);
				loginForm.style.display = "none";
				home.style.display = "none";
			}


		}





	})




}


let items = [];
let pageLimit = 12;
let currentPage = 1;
let totalPage = 0;
let itemPerPage = [];

function render(courses) {
	items = courses;
	itemPerPage = items.slice(pageLimit * (currentPage - 1), pageLimit * currentPage);
	renderItems();

	totalPage = Math.ceil(items.length / pageLimit);
	renderPageNumber(totalPage);
}

function renderItems() {
	let itemContainer = document.getElementById("flex-container");
	let itemsHTML = "";

	itemPerPage.forEach((course) => {
		itemsHTML += `
		<div class="flex-item">
			<div class="flex-image-ctn"> 
				<img src="${course.image}" alt="" id="flex-image">
			</div>
			<p class="name">${course.name} </p>
			<div class="button-flex">
				<button class="annut" onclick="chitiet(${course.id},'${course.name}',${course.price},'${course.image}','${course.brand}')">Chi Tiet</button>
				<button class="add-to-cart-button" onclick="themvaogiohang(${course.id},'${course.name}',${course.price},'${course.image}','${course.brand}')">Add to cart</button>
			</div>
			<p class="price">$${course.price}</p>
		</div>`;
	});

	itemContainer.innerHTML = itemsHTML;
}
//phan loai
function hienthibrand(x) {

	if (x === "all") {
		console.log("co");
		render(items2)
	}
	else {
		var sanpham = items2.filter(function (item) {
			return x === item.brand.toString();
		});
		render(sanpham);
	}
}
var k = 0;
function onclickname(namebranch) {
	namebranch.addEventListener('click', function () {
		console.log(namebranch.innerText.includes("ALL"));
		var x = "";
		if (namebranch.innerText.toLowerCase().includes("dragon")) {
			x = "1";
		}
		else if (namebranch.innerText.toLowerCase().includes("chainsaw")) {
			x = "2";
		}
		else if (namebranch.innerText.toLowerCase().includes("kimetsu")) {
			x = "4";
		}
		else if (namebranch.innerText.toLowerCase().includes("jigokuraku")) {
			x = "3";
		}
		else if (namebranch.innerText.toLowerCase().includes("naruto")) {
			x = "5";
		}
		else if (namebranch.innerText.toLowerCase().includes("spy")) {
			x = "6";
		}

		else if (namebranch.innerText.includes("All")) {
			x = "all";
		}
		hienthibrand(x);


	})
}
function phanloai() {

	var dragonballElement = document.querySelector('#dragonball');
	var narutoElement = document.querySelector('#naruto');
	var spyfamilyElement = document.querySelector('#spyfamily');
	var kimetsuElement = document.querySelector('#kimetsu');
	var chainsawmanElement = document.querySelector('#chainsawman');
	var jackElement = document.querySelector("#jack");
	var allbrandElement = document.querySelector("#all");
	onclickname(dragonballElement);
	onclickname(narutoElement);
	onclickname(spyfamilyElement);
	onclickname(kimetsuElement);
	onclickname(chainsawmanElement);
	onclickname(jackElement);
	onclickname(allbrandElement);

}

function renderPageNumber(totalPage) {
	let paginationContainer = document.getElementById("pagination");
	let pageNumbersHTML = "";

	for (let i = 1; i <= totalPage; i++) {
		let currentClass = i === currentPage ? "current" : "";
		pageNumbersHTML += `<li class="${currentClass}" onclick="handlePageNumber(${i},${totalPage})">${i}</li>`;
	}
	paginationContainer.innerHTML = pageNumbersHTML;
}

function handlePageNumber(num, totalPage) {
	currentPage = num;
	itemPerPage = items.slice(pageLimit * (currentPage - 1), pageLimit * currentPage);
	renderItems();
	renderPageNumber(totalPage);
}
//gio hang
function themvaogiohang(id, ten, gia, hinh, brand) {
	var logged = [];
	logged = JSON.parse(localStorage.getItem("userlogin"));
	
	if (logged.length !== 0 ) {
		var cart = JSON.parse(localStorage.getItem("cart"));
		if (cart == null) {
			cart = [];
			cart.push({ id: id, name: ten, price: gia, imgage: hinh, quality: 1, brand: brand });
		} else {
			let item = cart.find((item) => item.id === id);
			if (item) item.quality++;
			else
				cart.push({ id: id, name: ten, price: gia, imgage: hinh, quality: 1, brand: brand });
		}

		localStorage.setItem("cart", JSON.stringify(cart));
	}
	else {
		alert(" đăng nhập để mua hàng!")
	}

}

//chi tiet
function chitiet(id, ten, gia, hinh, brand) {
	var modal1Element = document.querySelector('.search input')
	var cuoiElement = document.querySelector('.cuoi');
	var selectElement = document.querySelector('.brand')
	var chitietmoda1lElement = document.querySelector('.modal1')
	chitietmoda1lElement.style.display = "none"
	hinh = convertImagePath(hinh)
	var chitetElement1 = document.querySelector('.chi-tiet-modal')
	chitetElement1.innerHTML =
		`
        <div class="chi-tiet-modal-container1">
        	<div class="modal-close" >
        		<button class="annutclose"> <img src=".\\images\\icon\\close.svg" alt="">
        	</div>
        	<div class="chi-tiet-header1">
            	<div class="item">
               		<img src=${hinh} alt="" >
            	</div>
        		<div class="divchitiet">
        			<div class="header1" style="font-size: 50px;">
        				<div class="fornt-write"><h1 style="font-size:60px;">${ten}</h1></div>
        				<div>Giá:${gia}</div>
        			<div>
            			<div class="fornt-sl" > Số lượng:         
                    		<button id="handel-minus" ><img src=".\\images\\icon\\minus.svg" alt=""></button>
                			<input type="text" id="input" value="1">
                			<button id="handel-plus" ><img src=".\\images\\icon\\plus.svg" alt=""></button>
            			</div>
        			</div>
        			<div class="cartchitiet">
        				<button class="giohangchitiet"><img src=".\\images\\icon\\cart-shopping-solid.svg" alt=""> <h1>Thêm vào cart</h1></button>
        			</div>
       			</div>
			</div>
      	</div>`
	var minusElement1 = document.querySelector('#handel-minus');
	console.log(minusElement1)
	var inputElement1 = document.querySelector('.fornt-sl #input')
	console.log(inputElement1)
	var amount1 = inputElement1.value

	var annutCloseElement1 = document.querySelector('.annutclose');
	var giohangElement = document.querySelector('.giohangchitiet');
	function themvaogiohang1() {
		//   console.log(inputElement1.value)
		logged = JSON.parse(localStorage.getItem("userlogin"));
	
		if (logged.length !== 0 ) {
		var cart = JSON.parse(localStorage.getItem("cart"));
		if (cart == null) {
			cart = [];
			cart.push({ id: id, name: ten, price: gia, imgage: hinh, quality: inputElement1.value, brand : brand })
		}
		else {
			let item = cart.find(item => item.id === id);

			if (item && inputElement1.value >= 1) item.quality = inputElement1.value;
			else cart.push({ id: id, name: ten, price: gia, imgage: hinh, quality: inputElement1.value, brand:brand})
		}

		localStorage.setItem("cart", JSON.stringify(cart));
		alert("Bạn đã thêm thành công sản phẩm vào giỏ hàng");
		}
		else alert("đăng nhập để mua hàng")
	}
	giohangElement.addEventListener('click', themvaogiohang1)


	annutCloseElement1.onclick = function () {

		chitetElement1.style.display = "none"
		if (modal1Element.value || selectElement.value || cuoiElement.value) chitietmoda1lElement.style.display = "flex"
	}
	function render3(amount) {
		inputElement1.value = amount;
	}
	function giatriminus() {
		if (amount1 > 1) amount1--;
		else alert("Số lượng sản phẩm tối thiểu là 1")

		render3(amount1)
	}
	inputElement1.addEventListener('blur', function () {
		amount1 = inputElement1.value
		if (!parseInt(amount1) || parseInt(amount1) < 1) {
			alert("Bạn đã nhập sai dữ liệu bạn hãy nhập lại")
			amount1 = inputElement1.value = "1";
		}
		else amount1 = inputElement1.value
	})
	function giatriplus() {
		amount1++;
		render3(amount1)
	}
	var plusElement1 = document.querySelector('#handel-plus');
	plusElement1.addEventListener('click', giatriplus);
	minusElement1.addEventListener('click', giatriminus)

	chitetElement1.style.display = "flex"


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
document.addEventListener("DOMContentLoaded", function() {

Read_file_maindata();
Read_file_accout();
phanloai();

})

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
			   <div class="khung"><button class="chitiettimkiem" onclick="chitiet(${item.id},'${item.name}',${item.price},'${item.image}')" >Chi Tiet</button></div>
           </div>  
          
           </div>    
        `;
	});
	itemElement.innerHTML += html.join("");
	var modalcontainer1Element = document.querySelector('.modal-container1');
	var html1 = `<div class="phantrang">
	<div class="chontrang">
		
	</div>
     </div>`

	modalcontainer1Element.innerHTML += html1;

	timkiem(items);
}
//TIM KIEM
function timkiem(items) {
	// console.log(items);
	var chitietmodalElement = document.querySelector(".modal1");
	var closechitietElenment = document.querySelector(".annutclose1");
	var searchElement = document.querySelector("#search-btn");
	var sanphamElement = document.querySelector(".sanphamItem");
	var chitetElement = document.querySelectorAll(".chitiet");
	var nutchonElenment = document.querySelectorAll(".nutchon");
	var img1Elenment = document.querySelector("#s-1.nutchon");
	var img2Elenment = document.querySelector("#s-2.nutchon");
	var selectElement = document.querySelector(".brand");
	var search2Element = document.querySelector(".search2");
	var modal1Element = document.querySelector(".search input");
	var dauElement = document.querySelector(".dau");
	var cuoiElement = document.querySelector(".cuoi");
	var array = Array.from(chitetElement);
	var selectPageElement=document.querySelector('.chontrang');
	selectElement.value = "";
	2
	var x = 0;
  
	nutchonElenment.forEach((search_img) => {
		search_img.addEventListener("click", function () {
			if (!x) {
				search2Element.style.display = "flex";
				img1Elenment.style.display = "none";
				img2Elenment.style.display = "block";
				x = 1;
			} else {
				search2Element.style.display = "none";
				img1Elenment.style.display = "block";
				img2Elenment.style.display = "none";
				x = 0;
			}
			selectElement.value = "";
			dauElement.value="";
			cuoiElement.value="";
		});
	});
	searchElement.addEventListener("click", function () {
		chitietmodalElement.style.display = "flex";
	});
	closechitietElenment.addEventListener("click", function () {
		dauElement.value = "";
		cuoiElement.value = "";
		chitietmodalElement.style.display = "none";
		modal1Element.value = "";
		search2Element.style.display = "none";
		selectElement.value = "";

		if (!modal1Element.value) {
			sanphamElement.style.display = "none";
		}
		
            selectPageElement.style.display="none"
		
	});
	var select = 0;
	sanphamElement.style.display = "none";
	// console.log(chitetElement);
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
					{
						item.style.display = "flex";
					}
					else item.style.display = "none";
				});
				phantrangSreach();
		
		} else if (selectElement.value && cuoiElement.value && dauElement.value) {
			
			var x = parseInt(dauElement.value);
			var y = parseInt(cuoiElement.value);
			
				var a = [];
				var sanpham1 = items.filter(function (item) {
					return (
						x <= item.price &&
						y >= item.price &&
						item.brand.toString() === selectElement.value
					);
				});
				console.log(sanpham1);
				if(sanpham1.length==0)
				{
					for(var i=0;i<array.length;i++) 	array[i].style.display = "none";
					alert("Sản phẩm bạn vừa yêu cầu không có trong cửa hàng chúng tôi")
				}
				else{
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
				phantrangSreach();
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
					phantrangSreach();
				
			});
		} else if (dauElement.value && cuoiElement.value) {
			var x = parseInt(dauElement.value);
			var y = parseInt(cuoiElement.value);
			 
				console.log(111);
				var a = [];
				var sanpham1 = items.filter(function (item) {
					return x <= item.price && y >= item.price;
				});
				if(sanpham1.length==0)
				{
					for(var i=0;i<array.length;i++) 	array[i].style.display = "none";
				
				}
				else{
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
					phantrangSreach();
				}
			
		}
		var check=array.find((item)=>item.style.display=="flex");
		if(!check) 	alert("Sản phẩm bạn vừa yêu cầu không có trong cửa hàng chúng tôi");
		
		
  if(!dauElement.value&&!cuoiElement.value&&!modal1Element.value&&!selectElement.value)
		{
            selectPageElement.style.display="none"
		}
		else {
			var check1=array.find(function(item){
				return item.style.display=="flex";
	  })
	  console.log(array.find(function(item){
		return item.style.display=="flex"}));
	  if(!check1) selectPageElement.style.display="none"
	  else selectPageElement.style.display="flex"
		}
	});

	selectElement.addEventListener("change", function () {
		select = 1;

		var x = parseInt(dauElement.value);
		var y = parseInt(cuoiElement.value);

		if (!modal1Element.value && !dauElement.value && !cuoiElement.value) {
			var x = selectElement.value;
			var sanpham = items.filter(function (item) {
				return x === item.brand.toString();
			});
			if(sanpham.length==0)
				{
					for(var i=0;i<array.length;i++) 	array[i].style.display = "none";
					alert("Sản phẩm bạn vừa yêu cầu không có trong cửa hàng chúng tôi")
				}
			else{
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
			})
			phantrangSreach();
			}
		} 
		else if (modal1Element.value && dauElement.value && cuoiElement.value) {
		
			var a = [];
			var sanpham1 = items.filter(function (item) {
				return (
					x <= item.price &&
					y >= item.price &&
					item.brand.toString() === selectElement.value
				);
			});
			if(sanpham1.length==0)
				{
					for(var i=0;i<array.length;i++) 	array[i].style.display = "none";
					alert("Sản phẩm bạn vừa yêu cầu không có trong cửa hàng chúng tôi")
				}
			else{
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
				phantrangSreach();
			}
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
						
					} else if (!a[i]) {
						array[i].style.display = "none";
					}
				}
			});
			sanphamElement.style.display = "block";
				var check=array.find((item)=>item.style.display=="flex");
		if(!check) 	alert("Sản phẩm bạn vừa yêu cầu không có trong cửa hàng chúng tôi");
			phantrangSreach();
		} else if (dauElement.value && cuoiElement.value) {
			var a = [];
			var sanpham1 = items.filter(function (item) {
				return (
					item.brand.toString() === selectElement.value &&
					x <= item.price &&
					y >= item.price
				);
			});
			if(sanpham1.length==0)
			{
				for(var i=0;i<array.length;i++) 	array[i].style.display = "none";
				alert("Sản phẩm bạn vừa yêu cầu không có trong cửa hàng chúng tôi")
			}
			else{
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
				phantrangSreach();
			}
		}
		
		var check1=array.find(function(item){
                  return item.style.display=="flex";
		})
		if(!check1) selectPageElement.style.display="none"
		else selectPageElement.style.display="flex"
		
	});

	cuoiElement.addEventListener("keydown", function (event) {
		if(event.key==='Enter')
		{
			var a = [];
		var x = parseInt(dauElement.value);
		var y = parseInt(cuoiElement.value);
		console.log(x, y);
		if (x && y && !modal1Element.value && !selectElement.value) {
			var sanpham1 = items.filter(function (item) {
				return x <= item.price && y >= item.price;
			});
			if(sanpham1.length==0)
			{
				for(var i=0;i<array.length;i++) 	array[i].style.display = "none";
				alert("Sản phẩm bạn vừa yêu cầu không có trong cửa hàng chúng tôi")
			}
			else{
				sanpham1.forEach(function (item) {
					var s = item.image;
					
					s = s.toString().toLowerCase();
					for (var i = 0; i < array.length; i++) {
						var j = array[i];
						var z = j.outerHTML;
						var c = 0;
						if (z.toLowerCase().includes(s) && !a[i]) {
							c++;
							console.log(array[i]);
							array[i].style.display = "flex";
							a[i] = 1;
						
						} else if (!a[i]) {
							array[i].style.display = "none";
						}
					}
				});
			}
			sanphamElement.style.display = "block";
			phantrangSreach();
		} else if (x && y && modal1Element.value && selectElement.value) {
			var a = [];
			
			var sanpham1 = items.filter(function (item) {
				return (
					x <= item.price &&
					y >= item.price &&
					item.brand.toString() === selectElement.value
				);
			});
			if(sanpham1.length==0)
			{
				for(var i=0;i<array.length;i++) 	array[i].style.display = "none";
				alert("Sản phẩm bạn vừa yêu cầu không có trong cửa hàng chúng tôi")
			}
			else{
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
						
						} else if (!a[i]) {
							array[i].style.display = "none";
						}
					}
				});
				sanphamElement.style.display = "block";
				phantrangSreach();
			}
		} else if (x && y && modal1Element.value) {
			console.log(111);
			var a = [];
			var sanpham1 = items.filter(function (item) {
				return x <= item.price && y >= item.price;
			});
			if(sanpham1.length==0)
			{
				for(var i=0;i<array.length;i++) 	array[i].style.display = "none";
				alert("Sản phẩm bạn vừa yêu cầu không có trong cửa hàng chúng tôi")
			}
			else{
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
						
						} else if (!a[i]) {
							array[i].style.display = "none";
						}
					}
				});
				sanphamElement.style.display = "block";
				phantrangSreach();
			}
		} else if (x && y && selectElement.value) {
			var a = [];
			var sanpham1 = items.filter(function (item) {
				return (
					x <= item.price &&
					y >= item.price &&
					item.brand.toString() === selectElement.value
				);
			});
			if(sanpham1.length==0)
			{
				for(var i=0;i<array.length;i++) 	array[i].style.display = "none";
				alert("Sản phẩm bạn vừa yêu cầu không có trong cửa hàng chúng tôi")
			}
			else{
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
				phantrangSreach();
			}
		}
		}
		if(!dauElement.value&&!cuoiElement.value&&!modal1Element.value&&!selectElement.value)
		{
            selectPageElement.style.display="none"
		}
		else selectPageElement.style.display="flex"
		var check1=array.find(function(item){
			return item.style.display=="flex";
  })
  if(!check1) selectPageElement.style.display="none"
  else selectPageElement.style.display="flex"
	});
}
function displayResults(results, page, itemsPerPage, totalPages) {
	const resultsContainer = document.querySelector('.sanphamItem');
	const paginationContainer = document.querySelector('.chontrang');
	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const displayedResults = results.slice(startIndex, endIndex);
	console.log(displayedResults);

	results.forEach(result => {
		if (!displayedResults.find(item => item === result)) result.style.display = "none";
		else result.style.display = "flex";
	});


	paginationContainer.innerHTML = '';
	for (let i = 1; i <= totalPages; i++) {
		const pageButton = document.createElement('button');
		pageButton.textContent = i;
		pageButton.addEventListener('click', () => displayResults(results, i, 4, totalPages));
		paginationContainer.appendChild(pageButton);
	}
}
function phantrangSreach() {
	var chitietmodalElement = document.querySelector(".modal1");
	var chitetElement = document.querySelectorAll(".chitiet");
	var sanphamElement = document.querySelector(".sanphamItem");
	var chitetElement = document.querySelectorAll(".chitiet");
	var chontrangElement = document.querySelector('.chontrang');
	var array = Array.from(chitetElement);
	console.log(array);
	var dem = 0;
	var sanpham = array.filter(function (item) {
		console.log(item.style.display);
		if (item.style.display == "flex") dem++;
		return item.style.display == "flex";
	})
	console.log(sanpham);
	console.log(dem);
	if (dem > 0	) {
		var n = Math.ceil(dem / 4);
		displayResults(sanpham, 1, 4, n);
		// 		for(var i=1;i<=n;i++)
		// 		{   var j=0;
		//           chontrangElement.innerHTML+=`	<button class="chon">${i}</button>`;
		// 		  var dem2=0;
		// 		  chitetElement.forEach(function(item){
		// 			j++;
		// 			if(item.style.display=="flex") dem2++;
		//    })

		// 		}
	}

}


readfile();



/////////////////////////////////////////
//  xu li trang thai dang nhap

var a = document.querySelector('.more_menu');


document.getElementById('logout').addEventListener('click', function(){
localStorage.setItem('userlogin',JSON.stringify([]));

})