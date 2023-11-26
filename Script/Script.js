var objects;
var main_data;
var TTDN = "user";
var accouts;

var api = "http://localhost:3000/Item";
var api_accout = "http://localhost:3000/accout";



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
document.getElementById('status').textContent = "Ques";
////////////// CREATE MAIN DATA////////////

var Read_file_maindata = function () {
	fetch(api)
		.then((response) => response.json())
		.then(function (data) {
			render(data);
		});
};
var Read_file_accout = function () {
	fetch(api_accout)
		.then((response) => response.json())
		.then(function (accouts) {
			// console.log(accouts);
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

	if(TTDN === "user"){
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
	else{
		alert(" đăng nhập để mua hàng!")
	}

}
//chi tiet
function chitiet(id, ten, gia, hinh) {
    var modal1Element=document.querySelector('.search input')
    var cuoiElement=document.querySelector('.cuoi');
    var selectElement=document.querySelector('.brand')
      var chitietmoda1lElement=document.querySelector('.modal1')
      chitietmoda1lElement.style.display="none"
     hinh= convertImagePath(hinh)
   var   chitetElement1=document.querySelector('.chi-tiet-modal')
                chitetElement1.innerHTML= 
      `
              <div class="chi-tiet-modal-container1">
       <div class="modal-close" >
         <button class="annutclose">  <i class="fa-solid fa-xmark"></i></button>
       </div>
       <div class="chi-tiet-header1">
           <div class="item">
               <img src=${hinh} alt="" >
           </div>
         <div class="divchitiet">
         <div class="header1" style="font-size: 50px;">
         <div class="fornt-write"><h1 style="font-size:60px;">${ten}</h1></div>
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
          </div><div>
           </div>
       </div>
      </div>`
      var  minusElement1=document.querySelector('#handel-minus');
      console.log(minusElement1)
       var inputElement1=document.querySelector('.fornt-sl #input')
       console.log(inputElement1)
        var amount1=inputElement1.value
       
        var annutCloseElement1=document.querySelector('.annutclose');
        var giohangElement=document.querySelector('.giohangchitiet');
        function themvaogiohang1(){
          console.log(inputElement1.value)
          var cart=JSON.parse(localStorage.getItem("cart"));
           if(cart==null){
              cart=[];
              cart.push({id:id,name:ten,price:gia,imgage:hinh,quality:inputElement1.value})
           }
         else{
          let item=cart.find(item=> item.id===id);

          if(item&&inputElement1.value>=1) item.quality=inputElement1.value;
            else cart.push({id:id,name:ten,price:gia,imgage:hinh,quality:inputElement1.value})
         }

      localStorage.setItem("cart",JSON.stringify(cart));
        }
        giohangElement.addEventListener('click',themvaogiohang1)
        
           
           annutCloseElement1.onclick=function(){
             
              chitetElement1.style.display="none"
             if(modal1Element.value||selectElement.value||cuoiElement.value) chitietmoda1lElement.style.display="flex"
           }
        function render2(amount)
        {
          inputElement1.value=amount;
        }
        function giatriminus(){
          if(amount1>1)
               amount1--;
  
               render2(amount1)
        }
        inputElement1.addEventListener('input',function(){
          amount1=inputElement1.value
        })
        function giatriplus(){
               amount1++;
               render2(amount1)
        }
        var plusElement1 = document.querySelector('#handel-plus');
    plusElement1.addEventListener('click', giatriplus);
    minusElement1.addEventListener('click',giatriminus)

                  chitetElement1.style.display="flex"
     
    
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
Read_file_accout();

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
		dauElement.value="";
		cuoiElement.value="";
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



/////////////////////////////////////////
//  xu li trang thai dang nhap