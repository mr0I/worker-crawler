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
    const currentDate = new Date();
    return currentDate.getTime();
}

function get_brand(title){
    let brand = 'UnCategorized';
    Object.entries(brandsList).forEach(entry => {
        let [key,value] = entry;
        if (title.indexOf(key) !== -1) brand = brandsList[key];
    });

    return brand;
}



module.exports = {
    price_sanitizer,
    get_current_date,
    get_brand
};
