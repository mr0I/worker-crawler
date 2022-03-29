const request = require('request');
const path = require('path');
const fs = require('fs');

const {brandsList} = require('../helpers/brands');
const arabic_zero_char_code = 1632;
const arabic_nine_char_code = 1632 + 9;
const farsi_zero_char_code = 1776;
const farsi_nine_char_code = 1776 + 9;

// supports arabic and farsi
function convert_non_latin_numbers_to_latin_numbers(s) {
    for (let i = 0; i < s.length; i++) {
        const c = s.charCodeAt(i);
        let number = -1;

        if (c >= arabic_zero_char_code && c <= arabic_nine_char_code) {
            number = c - arabic_zero_char_code;
        } else if (c >= farsi_zero_char_code && c <= farsi_nine_char_code) {
            number = c - farsi_zero_char_code;
        }

        if (number >= 0) {
            s = s.slice(0, i) + number + s.slice(i + 1);
        }
    }

    return s;
}

function price_sanitizer(price) {
    return Number(convert_non_latin_numbers_to_latin_numbers(price.replace(/,/g,'',)));
}

function get_current_date(){
    return new Date().getTime();
}

function image_downloader(files,image_names, callback) {
    let index = 0;

    let data = setInterval(async () => {
        if (index === files.length ){
            clearInterval(data);
            console.log(chalk.green('upload is finished :)'));
        } else {
            let fileName = path.join(__dirname, '../../' +
                'EcommerceShop/public/uploads/productImages/') + image_names[index] + '.jpg';

            console.log('index',index);
            request.head(files[index], function (err, res, body) {
                // console.log('content-type:', res.headers['content-type']);
                // console.log('content-length:', res.headers['content-length']);
                fs.access(path.join(__dirname , '../../EcommerceShop/public/uploads/productImages'),(error) => {
                    if (error) fs.mkdirSync(path.join(__dirname ,'../../EcommerceShop/public/uploads/productImages'))  ;
                });
                request(files[index])
                    .pipe(fs.createWriteStream(fileName,{
                        highWaterMark:300000
                    }))
                    .on("close", callback)
                    .on("error", (err) => {console.log(err)});

                index++;
            });
        }
    }, 4000);
}


function get_brand(title){
    let brand = 'UnCategorized';
    Object.entries(brandsList).forEach(entry => {
        let [key,value] = entry;
        if (title.indexOf(key) !== -1) brand = brandsList[key];
    });

    return brand;
}

function delay(ms){
    return new Promise((resolve,reject) => {
        setTimeout(resolve,ms);
    });
}


module.exports = {
    price_sanitizer,
    get_current_date,
    get_brand,
    delay,
    image_downloader
};
