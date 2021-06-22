const axios = require('axios');
const cheerio = require('cheerio');
const mysql = require('mysql');
const chalk = require('chalk');
const util = require('util');
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
const siteId = cmdArgs['site-id'];
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
        const html = await axios.get(encodeURI(url));
        const $ = cheerio.load(html.data);

        connection.query(`SELECT * FROM ${config.tables.SelectorsTable} WHERE site_id=${siteId} `,
            function(err,row,fields){
                if (err) console.log(err);
                Scraping(row,$);
            });
    } catch (error) {
        console.error(error);
        process.exit();
    }
};

const Scraping = async (row , $) => {
    const site_id = row[0].site_id;
    const selector = $(row[0].main_selector);

    selector.map(function (index , el) {
        //index++;
        let title = '';
        let href = '';
        let img = '';
        switch (site_id) {
            case 1:
                title = $(el).attr(row[0].title_selector);
                href = $(el).find(row[0].href_selector).attr('href');
                img = $(el).find(row[0].img_selector).attr('src');
                break;
            default:
                title = $(el).attr(row[0].title_selector);
                href = $(el).find(row[0].href_selector).attr('href');
                img = $(el).find(row[0].img_selector).attr('src');
        }

        const metadata = {
            "title" : title,
            "url" : href,
            "image" : img
        };
        parsedResults.push(metadata);
    });

    // Pagination Elements Link
    let nextPageLink = '';
    switch (site_id) {
        case 1:
            nextPageLink = 'https://www.digikala.com' + $('.c-pager__items').find('a.c-pager__item.is-active').parent().next().find('a').attr('href');
            break;
        default:
            nextPageLink = 'https://www.digikala.com' + $('.c-pager__items').find('a.c-pager__item.is-active').parent().next().find('a').attr('href');
    }

    console.log(chalk.cyan(`Scraping: ${nextPageLink}`));
    pageCounter++;
    console.log(pageCounter);

    if (pageCounter === pageLimit) {
        exportResults(parsedResults ,site_id, catId , start_crawl_time);
        return false;
    }

    await fetchData(nextPageLink);
};

const exportResults = async (parsed_results,site_id ,cat_id,sct) => {
    let values = [];
    const ect = getCurrentDate();

    let crawled_count = 0;
    // for(let i=0; i<10 ; i++){
    for(let i=0; i< parsedResults.length; i++){
        // Add Single Page Data
        crawled_count++;
        const urlSingle = await `https://www.digikala.com${parsed_results[i].url}`;
        console.log('current index:' + chalk.yellow.bgBlack(i+1));
        let specifications = '';
        let parameters = '';
        let description = '';

        try{
            const html = await axios.get(encodeURI(urlSingle));
            const $ = cheerio.load(html.data);
            const specs_selector = $('.c-product__params.js-is-expandable > ul > li');
            const params_selector = $('ul.c-params__list > li');
            const desc_selector = $('.c-content-expert__summary > .c-mask');
            //const images_selector = $('ul.c-gallery__items > li > .thumb-wrapper');
            let specs = [];
            let specs_obj = {};
            let params = [];
            let params_obj = {};
            let desc = '';
            params_selector.map(function (index , el) {
                let params_key = $(el).find('.c-params__list-key > span.block').text();
                let params_value = $(el).find('.c-params__list-value > span.block').text();
                params_obj[params_key] = params_value.replace(/\s+/g, ' ');
                params.push(params_obj);
            });
            params = params[params.length-1];
            specs_selector.map(function (index , el) {
                //let img = $(el).find('img').data('src');
                let specs_key = $(el).find('span').eq(0).text();
                let specs_value = $(el).find('span').eq(1).text();
                specs_obj[specs_key] = specs_value.replace(/\s+/g, ' ');
                specs.push(specs_obj);
            });
            specs = specs[specs.length-1];
            desc_selector.map(function (index , el) {
                desc = $(el).find('.c-mask__text.c-mask__text--product-summary').text();
            });
             specifications = JSON.stringify(specs);
             parameters = JSON.stringify(params);
             description = desc;
        } catch (error) {
            console.error(error);
            process.exit();
        }

        values.push([parsed_results[i].title,parsed_results[i].url,parsed_results[i].image,cat_id,site_id,specifications,parameters,description,String(ect)]);
    }

    //Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
     connection.query(`INSERT INTO ${config.tables.ProductsTable}
     (title, url , image, category_id,site_id,specifications,parameters,description,date) VALUES ?`,
        [values],
        function(err,result) {
            if (err) throw err;
            console.log('All Is Done');

              connection.query(`DELETE FROM ${config.tables.ProductsTable} WHERE category_id=${cat_id} AND site_id=${site_id} AND date<${String(ect)} `,
                function(err,resp){
                    if (err) throw err;
                    console.log('All Old Data Is Deleted.');
                });
        });

    connection.query(`INSERT INTO ${config.tables.LogsTable}
    (start_crawl_time, end_crawl_time , all_count ,crawled_count , category_id , site_id)
    VALUES (${sct},${ect},${parsed_results.length} , ${crawled_count},${cat_id},${site_id})`,
        function(err,result) {
            if (err) throw err;
            console.log('Logs Added.');
        });

};


function getCurrentDate(){
    const currentDate = new Date();
    return currentDate.getTime();
}

