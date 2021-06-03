const axios = require('axios');
const cheerio = require('cheerio');
const mysql = require('mysql');
const chalk = require('chalk');
const config = require('./config');
const url = "https://www.digikala.com/search/category-mobile-phone";
const cat_id = 1;

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
console.log(chalk.yellow.bgBlue(`\n  Scraping of ${chalk.underline.bold(url)} initiated...\n`))

const fetchData = async (url) => {
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
            exportResults(parsedResults);
            return false;
        }
        await fetchData(nextPageLink);

    } catch (error) {
        exportResults(parsedResults);
        console.error(error)
    }
};

const exportResults = (parsedResults) => {
    let values = [];
    for(let i=0; i< parsedResults.length; i++){
        values.push([parsedResults[i].title,parsedResults[i].url,parsedResults[i].image,cat_id]);
    }
    //Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
    connection.query(`INSERT INTO ${config.tables.ProductsTable} (title, url , image, category_id) VALUES ?`, [values], function(err,result) {
        if (err) {
            console.log(err);
        } else {
            console.log('All Is Done');
        }
    });
};

fetchData(url);