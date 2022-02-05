const axios = require('axios');
const cheerio = require('cheerio');
const mysql = require('mysql');
const chalk = require('chalk');
const cmdArgs = require('yargs').argv;
const config = require('./config');
const fs = require('fs');
const path = require('path');
const request = require('request');
const { v4: uuidv4 } = require('uuid');
const {
    price_sanitizer,
    get_current_date,
    get_brand
} = require('./inc/functions');
const sharp = require('sharp'); // https://github.com/lovell/sharp
const Ftp = require( 'ftp' );


// Get Args
const isDev = cmdArgs['dev'];
const siteId = cmdArgs['site-id'];
const catId = cmdArgs['cat-id'];
const catName = cmdArgs['cat-name'];
const brandUpdater = cmdArgs['brand-updater'];
const imageUploader = cmdArgs['image-uploader'];


// Define Connection
const connection = mysql.createConnection({
    host: isDev ? config.db.fullstack_express.host : config.db.fullstack_express.host ,
    port :  3306,
    connectionLimit : isDev ? 100 : 100,
    database: isDev ? config.db.fullstack_express.database : config.db.fullstack_express.database,
    user: isDev ? config.db.fullstack_express.username : config.db.fullstack_express.username,
    password: isDev ? config.db.fullstack_express.password : config.db.fullstack_express.password,
    multipleStatements:true
});
connection.connect();


// send images to host
if (imageUploader === 1){
    const ftpClient = new Ftp();

    ftpClient.connect( {
        'host': config.ftp.host,
        'user': config.ftp.user,
        'password': config.ftp.pass
    });

    fs.readdir('./productImages', function (err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        }

        files.forEach(function (file, index) {
            ftpClient.on( 'ready', function() {
                ftpClient.put( `./productImages/${file}`,
                    `./productImages/${file}`, function( err, list ) {
                        if ( err ) throw err;
                        console.log("upload file '%d' successful" , ++index);
                        ftpClient.end();
                    });
            });
        });
    });

    return;
}


// Update Brand Names
if (brandUpdater === 1) {
    connection.query(`SELECT id,title,brand FROM ${config.tables.ProductsTable} `,
        function(err,row){
            if (err) throw new Error('Error: ' + err);

            let rows = Object.values(JSON.parse(JSON.stringify(row)));
            let values = [];
            let counter = 0;
            for (let item of rows){
                if (item.brand === null){
                    values.push({brand:get_brand(item.title), id:item.id });
                }
            }

            if (values.length === 0) {
                console.log(chalk.green(`No need to do this!`) );
                return;
            }

            let queries = '';
            values.forEach(function (value) {
                if (value.brand !== null) counter += 1;
                queries += mysql.format(`UPDATE ${config.tables.ProductsTable} SET brand = ? WHERE id = ?; `, [value.brand,value.id] );
            });
            console.log(chalk.yellow(`Renamed Brands Count: ${counter}`) );
            connection.query(queries);

            connection.query(`SELECT COUNT(*) as ct FROM ${config.tables.ProductsTable} WHERE brand='UnCategorized' `,
                function(err,row){
                    if (err) throw new Error('Error: ' + err);
                    console.log(chalk.red(`Remained Nulled Brands: ${row[0].ct}`) );
                });
            console.log(chalk.white.bgGreen("Brands updated"));
        });
    return;
}


// Start Crawler
const user_url = catName+'Url';
connection.query(`SELECT ${user_url} FROM ${config.tables.SitesTable} WHERE id=${siteId} `,
    function(err,row,fields){
        if (err) fetchData('Error');
        fetchData(row , user_url);
    });

// Variables
let pageLimit = config.crawler_settings.pageLimit;
let pageCounter = 0;
let parsedResults = [];
let start_crawl_time = '';

const download = async function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        // console.log('content-type:', res.headers['content-type']);
        // console.log('content-length:', res.headers['content-length']);
        fs.access('./productImages/',(error) => {
            if (error) fs.mkdirSync('./productImages/')  ;
        });
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

const fetchData = async (row , user_url) => {
    if (row.length === 0){
        console.log(chalk.red.bgBlack("No Such Category!!!"));
        process.exit(1);
        return;
    }

    let url = '';
    switch (user_url){
        case 'mobileUrl':
            url = (row instanceof Object) ? await row[0].mobileUrl : row;
            break;
        case 'mobileAccessoriesUrl':
            url = (row instanceof Object) ? await row[0].mobileAccessoriesUrl : row;
            break;
        case 'computerPartsUrl':
            url = (row instanceof Object) ? await row[0].computerPartsUrl : row;
            break;
        case 'laptopAccessoriesUrl':
            url = (row instanceof Object) ? await row[0].laptopAccessoriesUrl : row;
            break;
        case 'wearableGadgetUrl':
            url = (row instanceof Object) ? await row[0].wearableGadgetUrl : row;
            break;
        case 'tabletUrl':
            url = (row instanceof Object) ? await row[0].tabletUrl : row;
            break;
        case 'laptopUrl':
            url = (row instanceof Object) ? await row[0].laptopUrl : row;
            break;
        case 'officeMachinesUrl':
            url = (row instanceof Object) ? await row[0].officeMachinesUrl : row;
            break;
        default:
            url = (row instanceof Object) ? await row[0].mobileUrl : row;
    }

    console.log(chalk.yellow.bgBlue(`\n  Scraping of ${chalk.underline.bold(url)} initiated...\n`));

    start_crawl_time = get_current_date();
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
        process.exit(1);
    }
};

const Scraping = async (row , $) => {
    const site_id = row[0].site_id;
    const selector = $(row[0].main_selector);

    selector.map(function (index , el) {
        //index++;
        let title = '';
        let href = '';
        let price = '';
        let main_price = '';
        let status = '';
        let img = '';
        let img_name = '';
        let brand = '';

        switch (site_id) {
            case 1:
                title = $(el).attr(row[0].title_selector);
                href = 'https://www.digikala.com' + $(el).find(row[0].href_selector).attr('href');
                price = $(el).attr(row[0].price_selector);
                main_price = $(el).find(row[0].main_price_selector).text();
                status = (($(el).find(row[0].status_selector).html()) != '')? 'available' : 'not-available';
                img = $(el).find(row[0].img_selector).attr('src');
                img = img.substring(0,(img.indexOf(".jpg")+4));
                img_name = img.substring(img.lastIndexOf('/')+1,img.length);
                brand = get_brand(title);
                break;
            default:
                title = $(el).attr(row[0].title_selector);
                href = 'https://www.digikala.com' + $(el).find(row[0].href_selector).attr('href');
                price = $(el).attr(row[0].price_selector);
                main_price = $(el).find(row[0].main_price_selector).text();
                status = (($(el).find(row[0].status_selector).html()) != '')? 'available' : 'not-available';
                img = $(el).find(row[0].img_selector).attr('src');
                img = img.substring(0,(img.indexOf(".jpg")+4));
                img_name = img.substring(img.lastIndexOf('/')+1,img.length);
                brand = get_brand(title);
        }

        const metadata = {
            "title" : title,
            "url" : href,
            "price" : price_sanitizer(price),
            "main_price" : (price_sanitizer(main_price) !== 0) ? price_sanitizer(main_price): null,
            "status" : status,
            "image" : img_name,
            "img" : img.substring(0,(img.indexOf(".jpg")+4)),
            "brand": brand
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

    if (pageCounter === pageLimit) {
        exportResults(parsedResults , row ,site_id, catId , start_crawl_time);
        return false;
    }

    await fetchData(nextPageLink);
};

const exportResults = async (parsed_results ,row,site_id ,cat_id,sct) => {
    let values = [];
    const ect = get_current_date();

    connection.query(`SELECT * FROM ${config.tables.ProductsTable} WHERE category_id=${cat_id} AND site_id=${site_id} AND date<${String(ect)} `,
        function(err,result,fields){
            if (err) console.log(err);
            for (let k=0;k<result.length;k++){
                oldImagesArrayFunc(result[k].image);
            }
        });

    let crawled_count = 0;
    for(let i=0; i< parsedResults.length; i++){
        // Add Single Page Data
        crawled_count++;
        const urlSingle = await parsed_results[i].url;
        console.log('current index:' + chalk.yellow.bgBlack(i+1));
        let specifications = '';
        let parameters = '';
        let description = '';

        try{
            const html = await axios.get(encodeURI(urlSingle));
            const $ = cheerio.load(html.data);
            const specs_selector = $(row[0].specs_selector);
            const params_selector = $(row[0].params_selector);
            const desc_selector = $(row[0].desc_selector);
            let specs = [];
            let specs_obj = {};
            let params = [];
            let params_obj = {};
            let desc = '';

            params_selector.map(function (index , el) {
                let params_key = '';
                let params_value = '';
                switch (site_id) {
                    case 1:
                        params_key = $(el).find('.c-params__list-key > span.block').text();
                        params_value = $(el).find('.c-params__list-value > span.block').text();
                        params_obj[params_key] = params_value.replace(/\s+/g, ' ');
                        params.push(params_obj);
                        break;
                    default:
                        params_key = $(el).find('.c-params__list-key > span.block').text();
                        params_value = $(el).find('.c-params__list-value > span.block').text();
                        params_obj[params_key] = params_value.replace(/\s+/g, ' ');
                        params.push(params_obj);
                }
            });
            params = params[params.length-1];

            specs_selector.map(function (index , el) {
                let specs_key ='';
                let specs_value ='';
                switch (site_id) {
                    case 1:
                        specs_key = $(el).find('span').eq(0).text();
                        specs_value = $(el).find('span').eq(1).text();
                        specs_obj[specs_key] = specs_value.replace(/\s+/g, ' ');
                        specs.push(specs_obj);
                        break;
                    default:
                        specs_key = $(el).find('span').eq(0).text();
                        specs_value = $(el).find('span').eq(1).text();
                        specs_obj[specs_key] = specs_value.replace(/\s+/g, ' ');
                        specs.push(specs_obj);
                }
            });
            specs = specs[specs.length-1];

            desc_selector.map(function (index , el) {
                switch (site_id) {
                    case 1:
                        desc = $(el).find('.c-mask__text.c-mask__text--product-summary').text();
                        break;
                    default:
                        desc = $(el).find('.c-mask__text.c-mask__text--product-summary').text();
                }
            });

            specifications = JSON.stringify(specs);
            parameters = JSON.stringify(params);
            description = desc;
        } catch (error) {
            console.error(error);
            process.exit(1);
        }

        let image_temp = uuidv4();
        download(parsed_results[i].img,
            path.join(__dirname, '.' +
                './productImages/') + image_temp + '.jpg', function(){
                console.log('image upload:','done');
                sharp('.' +
                    './productImages/' + image_temp + '.jpg')
                    .resize(450)
                    .toFile('.' +
                        './productImages/' + image_temp + '.webp', (err, info) => {
                        if (err) console.log('Error in resinzing',err);
                        else {
                            try {
                                fs.unlink(path.join(__dirname, '.' +
                                    './productImages/') + image_temp + '.jpg' , function (err) {
                                    if (err) console.warn('image deletion Error',err);
                                });
                            } catch (e) {
                                console.error('Unlink Error',e);
                            }
                        }
                    });
            });

        values.push([parsed_results[i].title,parsed_results[i].url,parsed_results[i].main_price
            ,parsed_results[i].price,parsed_results[i].status,image_temp,cat_id,site_id,specifications
            ,parameters,description,parsed_results[i].brand,String(ect)]);

        if (crawled_count % config.crawler_settings.bulkInsertCount === 0) {
            connection.query(`INSERT INTO ${config.tables.ProductsTable}
                 (title, url,main_price ,price ,status,image, category_id,site_id,specifications,parameters,description,brand,date) VALUES ?`,
                [values],
                function(err,result) {
                    if (err) throw err;
                    console.log(`All ${config.crawler_settings.bulkInsertCount} Is Done`);
                    values = [];
                });
        }
    }


    //Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
    connection.query(`INSERT INTO ${config.tables.ProductsTable}
     (title, url,main_price ,price,status,image,category_id,site_id,specifications,parameters,description,brand,date) VALUES ?`,
        [values],
        function(err,result) {
            if (err) throw err;
            console.log('All Is Done');

            connection.query(`DELETE FROM ${config.tables.ProductsTable} WHERE category_id=${cat_id} AND site_id=${site_id} AND date<${String(ect)} `,
                function(err,resp){
                    if (err) throw err;
                    console.log('All Old Data Is Deleted.');
                    // delete old images
                    deleteOldImages();
                });
        });

    connection.query(`INSERT INTO ${config.tables.LogsTable}
    (start_crawl_time, end_crawl_time , all_count ,crawled_count , category_id , site_id)
    VALUES (${sct},${ect},${parsed_results.length} , ${crawled_count},${cat_id},${site_id})`,
        function(err,result) {
            if (err) throw err;
            console.log('Logs Added.');
            // connection.end();
        });
};


let old_images=[];
const oldImagesArrayFunc = async (img) => {
    old_images.push(img);
};
const deleteOldImages = async () => {
    for (let j=0;j<old_images.length;j++){
        try {
            fs.unlink(path.join(__dirname, './productImages/') + old_images[j] + '.webp' , function (err) {
                if (err) console.warn('image deletion Error',err);
                console.log('Old Image Is Deleted');
            })
        } catch (e) {
            console.error('Unlink Error',e);
        }
    }
};





