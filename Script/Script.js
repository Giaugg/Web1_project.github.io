var objects;
var main_data;
function scrollSnapAutoScroll() {
    const container = document.querySelector('.gallery');
    const scrollItems = document.querySelectorAll('.gallery_item');
    let currentIndex = 0;

    function scrollToNextItem() {
        currentIndex = (currentIndex + 1) % scrollItems.length;
        container.scrollTo({
            left: scrollItems[currentIndex].offsetLeft,
            behavior: 'smooth',
        });
    }

    setInterval(scrollToNextItem, 3000); // Tự động cuộn mỗi 3 giây (3000ms)
}

scrollSnapAutoScroll();
////////////// CREATE MAIN DATA////////////
var Read_file_maindata = function () {
    // Đọc nội dung của file1.txt
    fetch('../filedata/main_data.txt')
        .then(response => response.text())
        .then(data => {
            main_data = data; // Lưu dữ liệu vào biến main_data
            // console.log(main_data);
            get_main_objects();
        })
        .catch(error => {
            console.error(error);
        });
}

var get_main_objects = function () {
    const lines = main_data.split('\n'); // Tách tệp thành từng dòng

    objects = lines.map(line => {
        const [productId, brand, name, price, sl] = line.split(' '); // Tách dấu cách
        return {
            productId,
            brand,
            name,
            price,
            sl
        };
    });
    console.log(objects)
    create_main_data();
}


var create_main_data = function(){
    const itemContainer = document.getElementById("flex-container");

    objects.forEach(function(objects,index) {
        // Tạo một phần tử .item
        const itemElement = document.createElement("div");
        itemElement.classList.add("flex-item");

        const originalString = "ID_Products001.jpg";
        const modifiedString = originalString.replace(/001/g, (index+1).toString().padStart(3, "0"));

        const charname = objects.name;
        const name = charname.replace(/%/g, ' ');
        // console.log(name);

        // Tạo các phần tử con và đặt giá trị từ đối tượng sản phẩm



        itemElement.innerHTML = `
            <img src=".\\Images\\products\\main_products\\${modifiedString}" alt="" id="flex-image">
            <button class="add-to-cart-button">add to cart</button>
            <p id="name">${name}</p>
            <p id="price">$${objects.price}</p>

        `;


        // Thêm phần tử .item vào phần tử gốc
        itemContainer.appendChild(itemElement);
    });
}

Read_file_maindata();