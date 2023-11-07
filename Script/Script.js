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
		// console.log(course.name)
		return `<div class="flex-item">
            <div class="div-img"> 
               
            <img src="${course.imgage}" alt="" id="flex-image">
            </div>
            <button class="Add-to-cart-button" onclick="themvaogiohang(${course.id},'${course.name}',${course.price},'${course.imgage}')">add to cart</button>
            <p id="name">${course.name}</p>
            <p class="price">$${course.price}</p>
            </div>`;
	});

	itemContainer.innerHTML += html.join("");
}
function themvaogiohang(id, ten, gia, hinh) {
	var cart = JSON.parse(localStorage.getItem("cart"));
	if (cart == null) {
		console.log(1);
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

Read_file_maindata();

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
