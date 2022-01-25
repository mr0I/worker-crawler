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
    let brand = null;

    if (title.indexOf('شیائومی') !== -1){
        brand ='Xiaomi';
    } else if(title.indexOf('سامسونگ') !== -1){
        brand ='Samsung';
    } else if(title.indexOf('اپل') !== -1 || title.indexOf('IPHONE') !== -1 ){
        brand ='Apple';
    } else if(title.indexOf('نوکیا') !== -1){
        brand ='Nokia';
    }else if(title.indexOf('هوآوی') !== -1 || title.indexOf('هواوی') !== -1){
        brand ='Huawei';
    }else if(title.indexOf('موتورولا') !== -1 ){
        brand ='motorola';
    }else if(title.indexOf('لیتو') !== -1 ){
        brand ='Leitu';
    }else if(title.indexOf('دبلیو یو دبلیو') !== -1 ){
        brand ='WUW';
    }else if(title.indexOf('کوکلایسک') !== -1 || title.indexOf('کوکلاسیک') !== -1 ){
        brand ='Kuclassic';
    }else if(title.indexOf('بیبوشی') !== -1 || title.indexOf('بییوشی ') !== -1 ){
        brand ='Biboshi';
    }else if(title.indexOf('کلومن') !== -1 ){
        brand ='Koluman';
    }else if(title.indexOf('ترانیو') !== -1 ){
        brand ='Tranyoo';
    }else if(title.indexOf('اچ اند ام') !== -1 ){
        brand ='H&M';
    }else if(title.indexOf('ریمکس') !== -1 ){
        brand ='Remax';
    }else if(title.indexOf('یونیمات') !== -1 ){
        brand ='Unimat';
    }else if(title.indexOf('جانتا') !== -1 ){
        brand ='Janta';
    }else if(title.indexOf('ویفینگ') !== -1 ){
        brand ='Weifeng';
    }else if(title.indexOf('SLCN') !== -1 ){
        brand ='SLCN';
    }else if(title.indexOf('یونیورسال') !== -1 ){
        brand ='Universal';
    }else if(title.indexOf('انکر') !== -1 ){
        brand ='Anker';
    }else if(title.indexOf('OK Stand') !== -1 ){
        brand ='OK Stand';
    }else if(title.indexOf('پاناسون') !== -1 ){
        brand ='Panasun';
    }else if(title.indexOf('ایوون') !== -1 ){
        brand ='Ivon';
    }else if(title.indexOf('inpods') !== -1 || title.indexOf('Inpods') !== -1 ){
        brand ='inpods';
    }else if(title.indexOf('ایرفون') !== -1 ){
        brand ='Earphones';
    }else if(title.indexOf('M106') !== -1 ){
        brand ='M106';
    }else if(title.indexOf('BTH-F9-5') !== -1 ){
        brand ='BTH-F9-5';
    }else if(title.indexOf('تی پی-لینک') !== -1 ){
        brand ='TP-Link';
    }else if(title.indexOf('جی پلاس') !== -1 ){
        brand ='GPlus';
    }else if(title.indexOf('بیاند') !== -1 ){
        brand ='Beyond';
    }else if(title.indexOf('ای دیتا') !== -1 ){
        brand ='ADATA';
    }else if(title.indexOf('جی تب') !== -1 ){
        brand ='G-Tab';
    }else if(title.indexOf('وسترن دیجیتال') !== -1 ){
        brand ='Western Digital';
    }else if(title.indexOf('T36') !== -1 ){
        brand ='T36';
    }else if(title.indexOf('4D') !== -1 ){
        brand ='4D';
    }else if(title.indexOf('ریزر') !== -1 ){
        brand ='Razer';
    }else if(title.indexOf('تسکو') !== -1 ){
        brand ='Tsco';
    }else if(title.indexOf('اچ اکس اس') !== -1 || title.indexOf('اچ ایکس اس') !== -1 ){
        brand ='HXX';
    }else if(title.indexOf('کوئین تک') !== -1 ){
        brand ='Queen Tech';
    }else if(title.indexOf('G9') !== -1 ){
        brand ='G9';
    }else if(title.indexOf('G24') !== -1 ){
        brand ='G24';
    }else if(title.indexOf('W26') !== -1 ){
        brand ='W26';
    }else if(title.indexOf('HW16') !== -1 ){
        brand ='HW16';
    }else if(title.indexOf('M36') !== -1 ){
        brand ='M36';
    }else if(title.indexOf('marbel') !== -1 ){
        brand ='marbel';
    }else if(title.indexOf('اچ‌پی') !== -1 || title.indexOf('اچ پی') !== -1 ){
        brand ='HP';
    }else if(title.indexOf('سن دیسک') !== -1 ){
        brand ='SanDisk';
    }else if(title.indexOf('رویال') !== -1 ){
        brand ='Royal';
    }else if(title.indexOf('میدسان') !== -1 ){
        brand ='Midsun';
    }else if(title.indexOf('مودیو') !== -1 ){
        brand ='Modio';
    }else if(title.indexOf('هایلو') !== -1 ){
        brand ='Haylou';
    }else if(title.indexOf('لوکا') !== -1 ){
        brand ='Lucca';
    }else if(title.indexOf('امیزفیت') !== -1 ){
        brand ='Amazfit';
    }else if(title.indexOf('میبرو') !== -1 ){
        brand ='Mibro';
    }else if(title.indexOf('اچ ام') !== -1 ){
        brand ='HM';
    }else if(title.indexOf('لنوو') !== -1 ){
        brand ='Lenovo';
    }else if(title.indexOf('جی ال ایکس') !== -1 ){
        brand ='GLX';
    }else if(title.indexOf('مایکروسافت') !== -1 ){
        brand ='Microsoft';
    }else if(title.indexOf('ایسوس') !== -1 ){
        brand ='Asus';
    }else if(title.indexOf('ام اس آی') !== -1 ){
        brand ='MSI';
    }else if(title.indexOf('الین ویر') !== -1 ){
        brand ='AlienWare';
    }else if(title.indexOf('ایسر') !== -1 ){
        brand ='Acer';
    }else if(title.indexOf('کانن') !== -1 ){
        brand ='Canon';
    }else if(title.indexOf('پاناسونیک') !== -1 ){
        brand ='Panasonic';
    }else if(title.indexOf('اسمال سان') !== -1 ){
        brand ='Small Sun';
    }else if(title.indexOf('کاسیو') !== -1 ){
        brand ='Casio';
    }else if(title.indexOf('کیتک') !== -1 ){
        brand ='Keytec';
    }else if(title.indexOf('یونیک') !== -1 ){
        brand ='Unic';
    }else if(title.indexOf('آلکاتل') !== -1 ){
        brand ='Alcatel';
    }else if(title.indexOf('دایمو') !== -1 ){
        brand ='Dymo';
    }

    return brand;
}



module.exports ={
    convert_non_latin_numbers_to_latin_numbers,
    priceSanitizer,
    getCurrentDate,
    getBrand
};
