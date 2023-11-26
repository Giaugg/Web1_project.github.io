var str = "Hello, world!\nThis is a string.";
var api_accout = "http://localhost:3000/accout";
var accounts;

var Read_file_accout = function () {
	fetch(api_accout)
		.then((response) => response.json())
		.then(function (data) {
			console.log(data);
			accounts = data;
			Login();
		});
};

// Thay thế tất cả các dấu cách và xuống dòng bằng ký tự trống
Read_file_accout();
// Login();

// // Form Login & Register

var Login = function () {
	console.log("login");
	const registerForm = document.getElementById("register-form");
	const loginForm = document.getElementById("login-form");

	const showContainer = document.getElementById("show-conntainer");

	const closeButtons1 = document.getElementById("formclose1");
	const closeButtons2 = document.getElementById("formclose2");

	const registerBtn = document.getElementById("register-btn");
	const loginBtn = document.getElementById("login-btn");

	const home = document.getElementById("homeshow");

	showContainer.addEventListener("click", function () {

		var TTDN = document.getElementById('status');
		console.log(TTDN.textContent);
		if(TTDN.textContent !== "Ques") TTDN.textContent = "Ques";
		else{

			loginForm.style.display = "block";
			home.style.display = "block";
		}
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



	var loginbutton = document.getElementById("loginButtonn");
	console.log(loginbutton)
    var registerbutton = document.getElementById("registerButton");
    registerBtn.addEventListener("click", function(){
        var checkbalid = false;

    })

	loginbutton.addEventListener("click", function () {

        var checkvalid = false;
		var userEmail = document.getElementById("username1").value;
		var userPassword = document.getElementById("password1").value;

        


		var checklogin = accounts.find(function (user) {
			return user.username === userEmail && user.password === userPassword;
		});
        console.log(checklogin.admin);
		if (checklogin && isValidEmail(userEmail)) {
            if(checklogin.admin == true){
                var TTDN = document.getElementById('status');
    			TTDN.textContent = "Admin";
				window.location.assign("../Admin/index.html");
            }
            else{
                var TTDN = document.getElementById('status');
    			TTDN.textContent = "User";
			}
			// console.log(tt)
			alert("Đăng nhập thành công");

		} else {
			alert("Email hoặc mật khẩu không đúng");
		}
	});

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return emailRegex.test(email);
      }

        
    

};


