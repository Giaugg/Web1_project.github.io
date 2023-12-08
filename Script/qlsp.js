document.addEventListener("DOMContentLoaded", function () {
    fetchData();
});
var imageNew="";
function fetchData() {
    fetch('http://localhost:3000/Item')
        .then(response => response.json())
        .then(data => renderItems(data))
        .catch(error => console.error('Lỗi khi đọc dữ liệu:', error));
}

function renderItems(items) {
    const content = document.querySelector(".content");
    const editWindow = document.getElementById("edit-window");
    const removeWindow = document.getElementById("remove-window");

    items.forEach(item => {
        const container = document.createElement("div");
        container.classList.add("container");

        const divLeft = document.createElement("div");
        divLeft.classList.add("left");

        const imageElement = document.createElement("img");
        imageElement.src = item.image;
        divLeft.appendChild(imageElement);

        const divRight = document.createElement("div");
        divRight.classList.add("right");

        const divName = document.createElement("div");
        divName.id = "name";
        divName.textContent = item.name;

        const divBrand = document.createElement("div");
        divBrand.id = "brand";
        divBrand.textContent = "Brand: " + item.brand;

        const divPrice = document.createElement("div");
        divPrice.id = "price";
        divPrice.textContent = "Price: " + item.price;

        const divBtn = document.createElement("div");
        divBtn.classList.add("Btn");

        const editButton = document.createElement("button");
        editButton.id = "edit";
        editButton.textContent = "Sửa";
        editButton.addEventListener('click', function () {
            showEditWindow(item);
        });

        const removeButton = document.createElement("button");
        removeButton.id = "remove";
        removeButton.textContent = "Xoá";
        removeButton.addEventListener("click", () => showConfirmationWindow(item));

        divRight.appendChild(divName);
        divRight.appendChild(divBrand);
        divRight.appendChild(divPrice);
        divBtn.appendChild(editButton);
        divBtn.appendChild(removeButton);

        container.appendChild(divLeft);
        container.appendChild(divRight);
        container.appendChild(divBtn);

        content.appendChild(container);

    });
}

// Hiển thị cửa sổ nhỏ với thông tin của item để sửa đổi
function showEditWindow(item) {
    const wrapWindow = document.getElementsByClassName("wrap")[0];
    const editWindow = document.getElementsByClassName("edit-window")[0];
    const editedNameInput = document.getElementById("editedName");
    const editedBrandInput = document.getElementById("editedBrand");
    const editedPriceInput = document.getElementById("editedPrice");
   

    var selectFileElement=document.querySelector("#upload");
    console.log(selectFileElement.value)

    // Hiển thị thông tin cần sửa đổi trong cửa sổ sửa đổi
    editedNameInput.value = item.name;
    editedBrandInput.value = item.brand;
    editedPriceInput.value = item.price;
 

    // Hiển thị cửa sổ sửa đổi
    editWindow.style.display = "block";
    wrapWindow.style.display = "block";
    wrapWindow.addEventListener("click", function (){
        wrapWindow.style.display = "none";
        editWindow.style.display = "none";
        document.getElementById('showImage').innerHTML="";
        var selectFileElement=document.querySelector("#upload");
         selectFileElement.value="";
       
    })
    selectFileElement.addEventListener('change',editImages)


    const saveEditButton = document.getElementById("saveEdit");

    // Bắt đầu lắng nghe sự kiện khi nhấn nút "Lưu"
    saveEditButton.addEventListener("click", function () {
        // Lấy giá trị từ các trường input
        const newName = editedNameInput.value;
        const newBrand = editedBrandInput.value;
        const newPrice = editedPriceInput.value;
        var updatedItem;
        // Tạo đối tượng mới với thông tin đã sửa đổi
       if(imageNew)
       {
        updatedItem = {
            id: item.id,
            brand: newBrand,
            name: newName,
            price: newPrice,
            image:imageNew,
          
        };
       }
       else{
        updatedItem = {
            id: item.id,
            brand: newBrand,
            name: newName,
            price: newPrice,
            image:item.image,
          
        };
       }

          imageNew="";
        // Gửi yêu cầu PUT để cập nhật dữ liệu trên JSON Server
        fetch(`http://localhost:3000/Item/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
        })
        .then(response => response.json())
        .then(data => {
            console.log(`Dữ liệu đã được cập nhật cho item có id ${item.id}:`, data);
            // Đóng cửa sổ sửa đổi sau khi lưu thành công
            editWindow.style.display = "none";
            wrapWindow.style.display = "none";
        })
        .catch(error => {
            console.error(`Lỗi khi cập nhật dữ liệu cho item có id ${item.id}:`, error);
        });
    });
}

function showConfirmationWindow(item) {
    const confirmationWindow = document.getElementsByClassName("confirmation-window")[0];
    confirmationWindow.style.display = "block";

    const deleteConfirmButton = document.getElementById("delete-confirm");
    const cancelDeleteButton = document.getElementById("cancel-delete");

    deleteConfirmButton.addEventListener("click", () => deleteItem(item));
    cancelDeleteButton.addEventListener("click", () => closeConfirmationWindow());
}

function closeConfirmationWindow() {
    const confirmationWindow = document.getElementsByClassName("confirmation-window")[0];
    confirmationWindow.style.display = "none";
}

function deleteItem(item) {
    const itemId = item.id;
    const url = `http://localhost:3000/Item/${itemId}`;

    fetch(url, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log(`Đã xoá sản phẩm có id ${itemId}:`, data);
        fetchData(); // Sau khi xoá, cập nhật lại dữ liệu
    })
    .catch(error => {
        console.error(`Lỗi khi xoá sản phẩm có id ${itemId}:`, error);
    });

    closeConfirmationWindow(); // Đóng cửa sổ xoá sau khi thực hiện xoá
}

function showAddWindow() {
    const addWindow = document.getElementById("add-window");
    addWindow.style.display = "block";
    var selectFileElement=document.querySelector("#upload2");
    selectFileElement.addEventListener('change',editImages2)

}

function closeAddWindow() {
    const addWindow = document.getElementById("add-window");
    addWindow.style.display = "none";
    document.getElementById('showImage2').innerHTML="";
    var selectFileElement=document.querySelector("#upload2");
     selectFileElement.value="";
}

function addNewItem() {
    const newName = document.getElementById("newName").value;
    const newBrand = document.getElementById("newBrand").value;
    const newPrice = document.getElementById("newPrice").value;
  
    const newItem = {
        name: newName,
        brand: newBrand,
        price: newPrice,
        image: imageNew,
    };
    imageNew="";

    fetch('http://localhost:3000/Item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Đã thêm mới sản phẩm:', data);
        fetchData(); // Sau khi thêm mới, cập nhật lại dữ liệu
        closeAddWindow(); // Đóng cửa sổ thêm mới sau khi thực hiện thêm mới
    })
    .catch(error => {
        console.error('Lỗi khi thêm mới sản phẩm:', error);
    });
}
const logoDiv = document.querySelector('.logo');
const siderDiv = document.querySelector('.sider');

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
function editImages()
{ 
   
  var fileInput=document.getElementById('upload').files;
  console.log(fileInput)

   if(fileInput.length>0)
{ 
var fileToLoad=fileInput[0];
var fileReader=new FileReader();
fileReader.onload=function(e){
    console.log(e.target);
    var srcData=e.target.result;
    console.log(srcData);
      var newImage=document.createElement('img');
       newImage.src=srcData;
       imageNew=srcData;

        document.getElementById('showImage').innerHTML=newImage.outerHTML;}
        var selectFileElement=document.querySelector("#upload");
        console.log(selectFileElement.value)
      
    fileReader.readAsDataURL(fileToLoad);
  
}



}

function editImages2()
{ 
   
  var fileInput=document.getElementById('upload2').files;
  console.log(fileInput)

   if(fileInput.length>0)
{ 
var fileToLoad=fileInput[0];
var fileReader=new FileReader();
fileReader.onload=function(e){
    console.log(e.target);
    var srcData=e.target.result;
    console.log(srcData);
      var newImage=document.createElement('img');
       newImage.src=srcData;
       imageNew=srcData;

        document.getElementById('showImage2').innerHTML=newImage.outerHTML;}
        var selectFileElement=document.querySelector("#upload2");
        console.log(selectFileElement.value)
      
    fileReader.readAsDataURL(fileToLoad);
  
}



}
