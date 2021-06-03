const axios = require('axios');
const cheerio = require('cheerio');
const mysql = require('mysql');
const config = require('./config');
const url = "https://www.daneshjooyar.com";


const connection = mysql.createConnection({
    host: config.db.fullstack_express.host,
    database: config.db.fullstack_express.database,
    user: config.db.fullstack_express.username,
    password: config.db.fullstack_express.password
});
connection.connect();


fetchData(url).then( (res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const selector = $('.container.section.autocv > .row >  .col-xl-3.col-lg-4.col-sm-6.col-xs-12');

    let arr = [];
    let obj = {};
    selector.map(function (index) {
        let href = $(this).find('a').attr('href');
        let title = $(this).find('h3').text();

        obj = {
            "title" : title,
            "url" : href
        };
        arr.push(obj);
    });


    let values = [];
    for(var i=0; i< arr.length; i++){
        values.push([arr[i].title,arr[i].url]);
    }
    //Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
    connection.query(`INSERT INTO ${config.tables.ProductsTable} (title, url) VALUES ?`, [values], function(err,result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Success');
        }
    });

});

async function fetchData(url){
    console.log("Crawling data...");
    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));

    if(response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
    }
    return response;
}