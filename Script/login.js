var str = "Hello, world!\nThis is a string.";
var api_accout = "http://localhost:3000/accout";
var accounts;
var isLoggedIn = false;
var userID;
console.log(userID);

var Read_file_accout = function () {
	fetch(api_accout)
		.then((response) => response.json())
		.then(function (data) {
			// console.log(data);
			accounts = data;
			localStorage.setItem("accouts", JSON.stringify(accounts));

			Login();
			Register();
			console.log("done");
		});
};

Read_file_accout();
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	return emailRegex.test(email);
}
// Thay thế tất cả các dấu cách và xuống dòng bằng ký tự trống
// Login();

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

const showContainer = document.getElementById("show-conntainer");

const closeButtons1 = document.getElementById("formclose1");
const closeButtons2 = document.getElementById("formclose2");

const registerBtn = document.getElementById("register-btn");
const loginBtn = document.getElementById("login-btn");

const home = document.getElementById("homeshow");

var loginbutton = document.getElementById("loginButtonn");
// console.log(loginbutton)
var registerbutton = document.getElementById("registerButton");
registerBtn.addEventListener("click", function () {});
// // Form Login & Register
var checkbalid = false;
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
showContainer.addEventListener("click", function () {
    if (isLoggedIn) {
        // If logged in, show user info window
        showUserInfoWindow();
    } else {
        // If not logged in, show login form
        loginForm.style.display = "block";
        home.style.display = "block";
    }
});
function showUserInfoWindow() {
	const inforWindow = document.getElementById("userInformation");
	inforWindow.style.display = "block";
    var user = accounts.find(function (user) {
		return user.id === userID;
    });
	var idInput = document.getElementById("userId");
	var nameInput = document.getElementById("userName");
	var addressInput = document.getElementById("userAddress");
	idInput.value = user.id;
	nameInput.value = user.name;
	addressInput.value = user.address;
	var closeInforWindow = document.getElementById("closeInfor");
	closeInforWindow.addEventListener("click", function (){
		inforWindow.style.display = "none";
	})
}
var Login = function () {
	accounts = JSON.parse(localStorage.getItem("accouts"));

	loginbutton.addEventListener("click", function (event) {
		event.preventDefault();
		var checkvalid = false;
		var userEmail = document.getElementById("username1").value;
		var userPassword = document.getElementById("password1").value;

		var checklogin = accounts.find(function (user) {
			return user.email === userEmail && user.password === userPassword;
		});
		// console.log(checklogin.admin);
		if (checklogin && isValidEmail(userEmail)) {
			if (checklogin.admin == true) {
				var TTDN = document.getElementById("status");
				TTDN.textContent = "Admin";
				window.location.assign("../Admin/index.html");
				alert("Đăng nhập thành công");
			} else {
				var TTDN = document.getElementById("status");
				TTDN.textContent = checklogin.username;
				alert("Đăng nhập thành công");
				isLoggedIn = true;
				loginForm.style.display = "none";
				home.style.display = "none";
				userID = checklogin.id;
				console.log(userID);
			}
			// console.log(tt)
		
		} else {
			alert("Email hoặc mật khẩu không đúng");
		}
	});
};

var Register = function () {
	accounts = JSON.parse(localStorage.getItem("accouts"));

	var registerBtn = document.getElementById("registerButton");

	registerBtn.addEventListener("click", function () {
		var fullname = document.getElementById("fullname").value;
		var username = document.getElementById("username").value;
		var email = document.getElementById("email").value;
		var phonenumber = document.getElementById("phonenumber").value;
		var password = document.getElementById("password").value;
		var confirm = document.getElementById("confirm").value;
		var selectElement = document.getElementById("select").value;
		console.log(fullname);
		if (fullname.trim() === "") {
			alert("Full Name cannot be empty.");
			return;
		}

		if (username.trim() === "") {
			alert("Username cannot be empty.");
			return;
		}

		if (!isValidEmail(email)) {
			alert("Invalid email format.");
			return;
		}

		if (!isValidPhoneNumber(phonenumber)) {
			alert("Phone Number must have 10 digits.");
			return;
		}

		if (password.length < 8) {
			alert("Password must be at least 8 characters.");
			return;
		}

		if (password !== confirm) {
			alert("Passwords do not match.");
			return;
		}

		alert("Form is valid. Submitting...");

		accounts.push({ username: email, password: password, admin: false });
		console.log(accounts);
		localStorage.setItem("accouts", JSON.stringify(accounts));
		
	});

	function isValidPhoneNumber(phonenumber) {
		// Sử dụng regex để kiểm tra phonenumber có đủ 10 số không
		var phoneRegex = /^\d{10}$/;
		return phoneRegex.test(phonenumber);
	}
};
//log out
function logout(){
	isLoggedIn = false;
}
