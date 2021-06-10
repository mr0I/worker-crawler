const axios = require('axios');
const cheerio = require('cheerio');
const mysql = require('mysql');
const chalk = require('chalk');
const cmdArgs = require('yargs').argv;
const config = require('./config');


const connection = mysql.createConnection({
    host: config.db.fullstack_express.host,
    database: config.db.fullstack_express.database,
    user: config.db.fullstack_express.username,
    password: config.db.fullstack_express.password
});
connection.connect();

// Get URL
const catId = cmdArgs['cat-id'];
connection.query(`SELECT url FROM ${config.tables.CategoriesTable} WHERE id=${catId} `,
    function(err,row,fields){
        if (err) fetchData('Error');
        fetchData(row);
    });

// Variables
let pageLimit = 3;
let pageCounter = 0;
let parsedResults = [];
let start_crawl_time = '';
let products_count = 0;


const fetchData = async (row) => {

    if (row.length === 0){
        console.log(chalk.red.bgBlack("No Such Category!!!"));
        process.exit();
        return;
    }

    let url = '';
    (row instanceof Object) ? url = await row[0].url : url=row;
    console.log(chalk.yellow.bgBlue(`\n  Scraping of ${chalk.underline.bold(url)} initiated...\n`));

    start_crawl_time = getCurrentDate();
    try {
        const html = await axios.get(url);
        const $ = cheerio.load(html.data);
        const selector = $('ul.c-listing__items.js-plp-products-list > li > .c-product-box');

        selector.map(function (index , el) {
            //index++;
            products_count++;
            let title = $(el).attr('data-title-fa');
            let href = $(el).find('a.js-product-url').attr('href');
            let img = $(el).find('img').attr('src');

            const metadata = {
                "title" : title,
                "url" : href,
                "image" : img
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
        console.error(error);
        process.exit();
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
            if (err) console.log(err);

            console.log('All Is Done');
            connection.query(`DELETE FROM ${config.tables.ProductsTable} WHERE category_id=${cat_id} AND date<${String(ect)} `,
                function(err,resp){
                    if (err) throw err;
                    console.log('All Old Data Is Deleted.');
                });
        });

    connection.query(`INSERT INTO ${config.tables.LogsTable} (start_crawl_time, end_crawl_time , count , category_id) VALUES (${sct},${ect},${products_count},${cat_id})`,
        function(err,result) {
            if (err)  console.log(err);
            console.log('Logs Added.');
        });
};

function getCurrentDate(){
    const currentDate = new Date();
    return currentDate.getTime();
}

