

var main_data;
var Read_file_user = function () {

// Đọc nội dung của file1.txt
    fetch('../filedata/cart_for_user.txt') 
    .then(response => response.text())
    .then(data => { 
        main_data = data; // In nội dung của file văn bản vào console
        console.log(main_data)
        getObjects()
    })
    .catch(error => {
        console.error(error);   

});
}

var getObjects = function(){

    const lines = main_data.split('\n'); // Tách tệp thành từng dòng

    const objects = lines.map(line => {
        const [productId,
            brand,
            img,
            name,
            price] = line.split(' '); // Tách dấu cách
            return {productId,
                brand,
                img,
                name,
                price: parseInt(price, 10) };
        });
    
        console.log(objects);
        // console.log(objects[1]);
}


Read_file_user();


