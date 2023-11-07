var objects;
var main_data;
var api="http://localhost:3000/Item";

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

    fetch(api)
        .then(response => response.json())
        .then(function(data){
                  render(data);
        });
        
      
    }



function render(courses){
    var itemContainer = document.getElementById("flex-container");

      var html =  courses.map(function(course){
            // console.log(course.name)
            return `<div class="flex-item">
            <div class="div-img"> 
            
            <img src="${course.imgage}" alt="" id="flex-image">
            </div>
            <button class="add-to-cart-button" onclick="themvaogiohang(${course.id},'${course.name}',${course.price},'${course.imgage}')">add to cart</button>
            <p id="name">${course.name}</p>
            <p id="price">$${course.price}</p>
            </div>`
         })

         itemContainer.innerHTML+=html.join('');    
    }
    function themvaogiohang(id,ten,gia,hinh){
        var cart=JSON.parse(localStorage.getItem("cart"));
        if(cart==null){
            console.log(1);
            cart=[];
            cart.push({id:id,name:ten,price:gia,imgage:hinh,quality:1});
        }
        else{
            let item=cart.find(item=> item.id===id);
            if(item) item.quality++;
            else  cart.push({id:id,name:ten,price:gia,imgage:hinh,quality:1});
        }
        
        localStorage.setItem("cart",JSON.stringify(cart));
    }


Read_file_maindata();