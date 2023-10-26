var Read_file_user = function () {


// Đọc nội dung của file1.txt
    fetch('../filedata/cart_for_user.txt') 
    .then(response => response.text())
    .then(data => {
        console.log(data); // In nội dung của file văn bản vào console
    })
    .catch(error => {
        console.error(error);


});
}
Read_file_user();





// const fs = require('fs');
// const duongDanDenTep = 'duong_dan_den_tep.txt';

// fs.readFile(duongDanDenTep, 'utf8', (err, data) => {
//     if (err) {
//         console.error('Lỗi khi đọc tệp:', err);
//         return;
//     }

//     const lines = data.split('\n'); // Tách tệp thành từng dòng

//     const objects = lines.map(line => {
//         const [name, lastName, age] = line.split(' '); // Tách dấu cách
//         return { name, lastName, age: parseInt(age, 10) };
//     });

//     console.log(objects);
// });