var isLoggedIn  = false;
localStorage.setItem('userlogin',JSON.stringify([]));
var user = [];
function createAdmin(){
	if(localStorage.getItem('user')===null){
		var userArray = [];
		var user = {username: 'admin', password: '12345678', fullname: 'Trần Bảo Hân',email: 'baohan.tbh0406@gmail.com', phone: '0392306809' , datesignup: '06-04-2023'};
		userArray.push(user);
		localStorage.setItem('user',JSON.stringify(userArray));
	}
}
document.addEventListener("DOMContentLoaded", function() {
	createAdmin();	
	const showContainer = document.getElementById("show-conntainer");
	showContainer.addEventListener("click", function () {
	  if (isLoggedIn) {
		  // If logged in, show user info window
		  showUserInfoWindow();
	  } else {
		  // If not logged in, show login form
		  showform();
	  }
	});
})



function showform(){
	var userform = document.getElementById('user');
	userform.style.display = 'block';
	document.getElementById('signup').style.display = 'none';
	document.getElementById('login').style.display = 'block';
}
function closeform(){
	var userform = document.getElementById('user');
	userform.style.display = 'none';
}
function showSignUp(){
	document.getElementById('login').style.display = 'none';
	document.getElementById('signup').style.display = 'block';
	
}
function showLogin(){
	document.getElementById('signup').style.display = 'none';
	document.getElementById('login').style.display = 'block';
}
document.getElementById('signupform').addEventListener('submit', createUser);
document.getElementById('loginform').addEventListener('submit', login);
function createUser(e){
	e.preventDefault();
	var fullname = document.getElementById('fullname');
	var email = document.getElementById('email');
	var phone = document.getElementById('phone');
	var username = document.getElementById('usernameSignUp');
	var password = document.getElementById('passwordSignUp');
	var password2 = document.getElementById('passwordSignUp2');
	var flag = true;
	if(!fullname.value){
		document.getElementById('fullnameerror').style.display = 'block';
		flag = false;
	}else{
		document.getElementById('fullnameerror').style.display = 'none';
	}
	if(!email.value){
		document.getElementById('emailerror').style.display = 'block';
		flag = false;
	}else{
		document.getElementById('emailerror').style.display = 'none';
	}
	if(!phone.value){
		document.getElementById('phoneerror').style.display = 'block';
		flag = false;
	}else{
		if(isNaN(Number(phone.value))){
			document.getElementById('phoneerror').style.display = 'block';
			document.getElementById('phoneerror').innerHTML = 'invalid phone number';
			flag = false;
		}else{
			if(Number(phone.value)<100000000 || Number(phone.value)>999999999){
				document.getElementById('phoneerror').style.display = 'block';
				document.getElementById('phoneerror').innerHTML = 'Phone number is incorrect';
				flag = false;
			}else{
				document.getElementById('phoneerror').style.display = 'none';
			}
		}
	}
	if(!username.value){
		document.getElementById('usererror').style.display = 'block';
		flag = false;
	}else{
		document.getElementById('usererror').style.display = 'none';
	}
	if(!password.value){
		document.getElementById('passworderror').style.display = 'block';
		flag = false;
	}else{
		if(password.value.length<8){
			document.getElementById('passworderror').style.display = 'block';
			document.getElementById('passworderror').innerHTML = 'Password must be over 8 characters';
			flag = false;
		}else {
			document.getElementById('passworderror').style.display = 'none';
		}
	}
	if(password2.value != password.value){
		document.getElementById('password2error').style.display = 'block';
		flag = false;
	}else{
		document.getElementById('password2error').style.display = 'none';
	}
	if(flag==false){
		return false;
	}
	var d = new Date();
	var datesignup = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
	var user = {username: username.value, password: password.value, fullname: fullname.value, email: email.value, phone: phone.value , datesignup: datesignup};
	var userArray = JSON.parse(localStorage.getItem('user'));
	for(var i=0;i<userArray.length;i++){
		if(user.username==userArray[i].username){
			document.getElementById('usererror').style.display = 'block';
			document.getElementById('usererror').innerHTML = 'The login name is already used';
			username.focus();
			return false;
		}
	}
	userArray.push(user);
	localStorage.setItem('user',JSON.stringify(userArray));
	customAlert('You have successfully registered!','success');
	showLogin();
}
function login(e){
	e.preventDefault();
	var username = document.getElementById('usernameLogin').value;
	var password = document.getElementById('passwordLogin').value;
	var flag=true;
	if(!username){
		document.getElementById('usernameerror').style.display = 'block';
		flag = false;
	}else {
		document.getElementById('usernameerror').style.display = 'none';
	}
	if(!password){
		document.getElementById('passwordloginerror').style.display = 'block';
		flag = false;
	}else {
		document.getElementById('passwordloginerror').style.display = 'none';
	}
	if(flag==false){
		return false;
	}
	var userArray = JSON.parse(localStorage.getItem('user'));
	for(var i=0;i<userArray.length;i++){
		if(username==userArray[i].username){
			if(password==userArray[i].password){
				closeform();
				localStorage.setItem('userlogin',JSON.stringify(userArray[i]));
				
				isLoggedIn = true;
			found = true;
			alert("đăng nhập thành công");
			if(username === 'admin' ){ 
				window.location.assign("../Admin/index.html");
			}
			break;
				// return true;
			}
		}
	}
	
	document.getElementById('passwordloginerror').style.display = 'block';
	document.getElementById('passwordloginerror').innerHTML = 'Wrong login information';
	return found;
	// return true;
}





  function showUserInfoWindow() {
	const inforWindow = document.getElementById("userInformation");
	inforWindow.style.display = "block";
	console.log(inforWindow);

	var userin = JSON.parse(localStorage.getItem("userlogin"));
	console.log(userin);

	var nameInput = document.getElementById("userName");
	var sdtInput = document.getElementById("sdt");
	nameInput.value = userin.fullname;
	sdtInput.value = userin.phone;

	var closeInforWindow = document.getElementById("closeInfor");
	closeInforWindow.addEventListener("click", function (){
		inforWindow.style.display = "none";
	})
}

  



/*END USER*/
/*CUSTOM ALERT BOX*/
function customAlert(message,type) {
	if (type=='success') {
		document.getElementById("customalert").style.backgroundColor = '#4CAF50';
	}
	if (type=='warning') {
		document.getElementById("customalert").style.backgroundColor = '#f44336';
	}
	document.getElementById("customalert").innerHTML = message;
    var x = document.getElementById("customalert");
    x.className = "show";
    setTimeout(function(){ x.className = x.classList.remove("show"); }, 3500);
}
