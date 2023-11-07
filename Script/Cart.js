var main_data;
var objects; // Khai báo biến objects ở ngoài để truy cập sau này

document.addEventListener("DOMContentLoaded", function () {
  // Lấy các phần tử HTML
  const toggleSticketButton = document.getElementById("show-cart");
  const sticket = document.getElementById("cart-user-modal");
  const closeButtons = document.getElementById("close-logo");

  // Sự kiện khi nhấn nút "Hiển thị Sticket" hoặc dấu x
  toggleSticketButton.addEventListener("click", function () {
    sticket.style.display = "flex"; // Hiển thị Sticket
    Read_data_cart();
  });
  

  closeButtons.addEventListener("click", function () {
    sticket.style.display = "none"; // Ẩn Sticket
    const divElement = document.getElementById("item-list");
    while (divElement.firstChild) {
      divElement.removeChild(divElement.firstChild);
    }
    reset_price();
  });
});

var Read_data_cart = function () {
  var cart = JSON.parse(localStorage.getItem("cart"));
  // console.log(cart);
  objects = cart;
  create_user_cart();
  console.log(objects);
};

var create_user_cart = function () {
  const itemContainer = document.getElementById("item-list");
  if (objects.length === 0) empty_cart();
  else {
    objects.forEach(function (objects, index) {
      // Tạo một phần tử .item
      const itemElement = document.createElement("div");
      itemElement.classList.add("item");
      const id = objects.id;
      const originalString = "ID_Products001.jpg";
      const modifiedString = originalString.replace(
        /001/g,
        id.toString().padStart(3, "0")
      );

      const charname = objects.name;
      const name = charname.replace(/%/g, " ");
      // console.log(name);

      const total_price = parseInt(objects.price) * parseInt(objects.quality);
      // Tạo các phần tử con và đặt giá trị từ đối tượng sản phẩm

      // console.log(objects)

      itemElement.innerHTML = `
                <input type="checkbox" >
                <img src=".\\Images\\products\\${modifiedString}" alt="" class="item_img">
                <div>
                    <p> Tên sản phẩm </p>
                    <p>${name}</p>
                </div>
                <div id="item-ID" > ${objects.id} </div>
                <div>
                    <p> Giá sản phẩm </p>
                    <p id="price">${objects.price}</p>
                </div>
                <div>
                    <p>Số lượng</p>
                    <p id="n" class="price">${objects.quality}</p>
                </div>
                <div>
                    <p> Tổng tiền </p> 
                    <p id="total-price" class="price">${total_price}</p>
                </div>
                <div  class="delete-item"> 
                    <button>x</button>
                </div>
            `;

      // Thêm phần tử .item vào phần tử gốc
      itemContainer.appendChild(itemElement);
    });
  }
  delete_item();
  calc_money();
};

// Read_file_user();

var delete_item = function () {
  delete_HTML_item();
  delete_data_item();
};

var delete_HTML_item = function () {
  const alldeletebutton = document.querySelectorAll(".delete-item");

  alldeletebutton.forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.parentElement.remove();
    });
  });
};

var delete_data_item = function () {
  const alldeleteitem = document.querySelectorAll(".item");
  alldeleteitem.forEach((item) => {
    btn = item.querySelector(".delete-item");
    // console.log(btn);
    btn.addEventListener("click", function () {
      var cart = JSON.parse(localStorage.getItem("cart"));

      const target = item.querySelector("#item-ID");

      const newcart = cart.filter(function (cart) {
        return parseInt(cart.id) !== parseInt(target.textContent);
      });

      if (newcart.length === 0) empty_cart();

      // console.log(target.textContent, newcart);
      localStorage.setItem("cart", JSON.stringify(newcart));
    });
  });
};

var calc_money = function () {
  const allcheckbox = document.querySelectorAll(".item");
  // console.log(allcheckbox)
  allcheckbox.forEach((div) => {
    // console.log(div)
    div.addEventListener("click", function () {
      const element = div.querySelector('input[type="checkbox"]'); // Lấy phần tử input có type là "text"
      element.checked = !element.checked;

      let price = div.querySelector("#total-price");
      let num = div.querySelector("#n");
      calc(price, num, element);
    });
  });
};

var calc = function (price, num, check) {
  var total = document.getElementById("total-item");
  var total_cost = document.getElementById("total-cost");

  // console.log(price)
  if (check.checked) {
    // alert(total.textContent)
    total.textContent = parseInt(total.textContent) + 1;
    total_cost.textContent =
      parseInt(total_cost.textContent) + parseInt(price.textContent);
  } else {
    total.textContent = parseInt(total.textContent) - 1;
    total_cost.textContent =
      parseInt(total_cost.textContent) - parseInt(price.textContent);
  }
};
var reset_price = function () {
  var total = document.getElementById("total-item");
  var total_cost = document.getElementById("total-cost");
  total.textContent = 0;
  total_cost.textContent = 0;
};

var empty_cart = function () {
  const itemContainer = document.getElementById("item-list");
  var itemElementEmty = document.createElement("div");
  itemElementEmty.innerHTML = `
    <p id="empty"> Giỏ hàng trống xin vui lòng lựa chọn sản phẩm cần mua! </p> 
    `;
  itemContainer.appendChild(itemElementEmty);
};
