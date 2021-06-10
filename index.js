const axios = require('axios');
const cheerio = require('cheerio');
const mysql = require('mysql');
const chalk = require('chalk');
const config = require('./config');
const url = "https://www.digikala.com/search/category-mobile-phone";
const catId = 1;

const connection = mysql.createConnection({
    host: config.db.fullstack_express.host,
    database: config.db.fullstack_express.database,
    user: config.db.fullstack_express.username,
    password: config.db.fullstack_express.password
});
connection.connect();

let pageLimit = 3;
let pageCounter = 0;
let parsedResults = [];
let start_crawl_time = '';
console.log(chalk.yellow.bgBlue(`\n  Scraping of ${chalk.underline.bold(url)} initiated...\n`))

const fetchData = async (url) => {
    start_crawl_time = getCurrentDate();

    try {
        const html = await axios.get(url);
        const $ = cheerio.load(html.data);
        const selector = $('ul.c-listing__items.js-plp-products-list > li > .c-product-box');

        selector.map(function (index , el) {
            index++;
            let title = $(el).attr('data-title-fa');
            let href = $(el).find('a.js-product-url').attr('href');
            let img = $(el).find('img').attr('src');

            const metadata = {
                "title" : title,
                "url" : href,
                "image" : img,
                "count" : index
            };
            parsedResults.push(metadata);
        });


        // Pagination Elements Link
        const nextPageLink = 'https://www.digikala.com' + $('.c-pager__items').find('a.c-pager__item.is-active').parent().next().find('a').attr('href');

        console.log(chalk.cyan(`Scraping: ${nextPageLink}`));
        pageCounter++;
        console.log(pageCounter);

        if (pageCounter === pageLimit) {
            exportResults(parsedResults , catId , start_crawl_time);
            return false;
        }

        await fetchData(nextPageLink);

    } catch (error) {
        //exportResults(parsedResults , catId);
        console.error(error)
    }
};

const exportResults = (parsed_results,cat_id,sct) => {
    let values = [];
    const ect = getCurrentDate();

    for(let i=0; i< parsedResults.length; i++){
        values.push([parsed_results[i].title,parsed_results[i].url,parsed_results[i].image,cat_id,String(ect)]);
    }
    //Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
    connection.query(`INSERT INTO ${config.tables.ProductsTable} (title, url , image, category_id,date) VALUES ?`,
        [values],
        function(err,result) {
        if (err) {
            console.log(err);
        } else {
            console.log('All Is Done');

            connection.query(`DELETE FROM ${config.tables.ProductsTable} WHERE category_id=${cat_id} AND date<${String(ect)} `,
                function(err,resp){
                    if (err) throw err;
                    console.log('All Old Data Is Deleted.');
                });
        }
    });

    connection.query(`INSERT INTO ${config.tables.LogsTable} (start_crawl_time, end_crawl_time) VALUES (${sct},${ect})`,
        function(err,result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Logs Added.');
            }
    });
};

function getCurrentDate(){
    const currentDate = new Date();
    return currentDate.getTime();
}

fetchData(url);