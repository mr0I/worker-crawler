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

function priceSanitizer(price) {
    return Number(convert_non_latin_numbers_to_latin_numbers(price.replace(/,/g,'',)));
}

function getCurrentDate(){
    const currentDate = new Date();
    return currentDate.getTime();
}

function getBrand(title){
    if (title.indexOf('شیائومی') !== -1){
        return 'Xiaomi';
    } else if(title.indexOf('سامسونگ') !== -1){
        return 'Samsung';
    } else if(title.indexOf('اپل') !== -1){
        return 'Apple';
    } else if(title.indexOf('نوکیا') !== -1){
        return 'Nokia';
    } else{
        return null;
    }
}



module.exports ={
    convert_non_latin_numbers_to_latin_numbers,
    priceSanitizer,
    getCurrentDate,
    getBrand
};
