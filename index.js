/*
for api sites
 */
const mysql = require('mysql');
const chalk = require('chalk');
const cmdArgs = require('yargs').argv;
const config = require('./config');
const fs = require('fs');
const ApiCrawler = require('./inc/functions');
const Ftp = require( 'ftp' );
const dotenv = require('dotenv');
dotenv.config();
const sharp = require('sharp'); // https://github.com/lovell/sharp
const path = require('path');
const {
    get_current_date,
    get_brand,
    delay
} = require('./inc/helpers');


// Get Args
const isDev = cmdArgs['dev'];
const siteID = cmdArgs['site-id'];
const catID = cmdArgs['cat-id'];
const catName = cmdArgs['cat-name'];
const brandUpdater = cmdArgs['brand-updater'];
const imageUploader = cmdArgs['image-uploader'];
const webpConverter = cmdArgs['webp-converter'];


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


/* Start Tools */
// send images to host
if (imageUploader !== undefined && imageUploader.toLowerCase() === 'y'){
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
                ftpClient.put( `../EcommerceShop/public/uploads/productImages${file}`,
                    `../EcommerceShop/public/uploads/productImages${file}`, function( err, list ) {
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
if (brandUpdater !== undefined && brandUpdater.toLowerCase() === 'y') {
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
// Convert Jpg To Webp
if (webpConverter !== undefined && webpConverter.toLowerCase() === 'y') {
    fs.readdir('../EcommerceShop/public/uploads/productImages/', function (err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        }

        files.forEach(async function (file, index) {
            let fileExt = file.slice(file.indexOf('.')+1);
            let fileName = file.slice(0,file.indexOf('.'));
            console.log('progress:' + chalk.green(++index) + '/' + files.length);

            if (fileExt === 'jpg' || fileExt === 'jpeg' ) {
                sharp(path.join(__dirname,'../EcommerceShop/public/uploads/productImages/' + file))
                    .resize(450)
                    .toFile(path.join(__dirname, '../' +
                        'EcommerceShop/public/uploads/productImages/') + fileName + '.webp', (err, info) => {
                        if (err) console.log('Error in resizing', err);
                        else {
                            try {
                                fs.unlink(path.join(__dirname, '../' +
                                    'EcommerceShop/public/uploads/productImages/') + file, function (err) {
                                    if (err) console.warn('image deletion Error', err);
                                });
                            } catch (e) {
                                console.error('Unlink Error', e);
                            }
                        }
                    });
            }
            await delay(1500);
        });
    });
    return;
}
/* End Tools */


// Run Crawler
const runCrawler = async (url , connection ,site_id, cat_id) => {
    // variables
    let pageLimit = config.crawler_settings.pageLimit;
    let parsedResultsArray = [];
    const start_crawl_time = get_current_date();

    for (let i=1; i<=pageLimit; i++){
        console.log(chalk.cyan(`Scraping: ${url+i}`));
        let products = await ApiCrawler.fetchData(url + i);
        parsedResultsArray = await ApiCrawler.parseResults(products,parsedResultsArray);
    }

    await ApiCrawler.exportResults(parsedResultsArray,connection , site_id, cat_id,start_crawl_time);

    for (let j=0; j<parsedResultsArray.length; j++){
        await ApiCrawler.updateProducts(parsedResultsArray[j].pid,connection);
        await delay(2000); // add delay
    }
};

const userUrl = catName+'Url';
connection.query(`SELECT ${userUrl} FROM ${config.tables.SitesTable} WHERE id=${siteID} `,
    function(err,row,fields){
        if (err) console.log(err);
        preparation(row , userUrl);
    });

const preparation = async(row ,user_url) => {
    if (row.length === 0){
        console.log(chalk.red.bgBlack("No Such Category!!!"));
        process.exit(1);
        return;
    }
    // Pagination Elements Link
    let url = '';
    switch (user_url){
        case 'mobileUrl':
            url = (row instanceof Object)
                ? `${process.env.API_URL}/categories/${await row[0].mobileUrl}/search/?page=`
                : row;
            break;
        case 'mobileAccessoriesUrl':
            url = (row instanceof Object)
                ? `${process.env.API_URL}/categories/${await row[0].mobileAccessoriesUrl}/search/?page=`
                : row;
            break;
        case 'computerPartsUrl':
            url = (row instanceof Object)
                ? `${process.env.API_URL}/categories/${await row[0].computerPartsUrl}/search/?page=`
                : row;
            break;
        case 'laptopAccessoriesUrl':
            url = (row instanceof Object)
                ? `${process.env.API_URL}/categories/${await row[0].laptopAccessoriesUrl}/search/?page=`
                : row;
            break;
        case 'wearableGadgetUrl':
            url = (row instanceof Object)
                ? `${process.env.API_URL}/categories/${await row[0].wearableGadgetUrl}/search/?page=`
                : row;
            break;
        case 'tabletUrl':
            url = (row instanceof Object)
                ? `${process.env.API_URL}/categories/${await row[0].tabletUrl}/search/?page=`
                : row;
            break;
        case 'laptopUrl':
            url = (row instanceof Object)
                ? `${process.env.API_URL}/categories/${await row[0].laptopUrl}/search/?page=`
                : row;
            break;
        case 'officeMachinesUrl':
            url = (row instanceof Object)
                ? `${process.env.API_URL}/categories/${await row[0].officeMachinesUrl}/search/?page=`
                : row;
            break;
        default:
            url = (row instanceof Object)
                ? `${process.env.API_URL}/categories/${await row[0].mobileUrl}/search/?page=`
                : row;
    }

    runCrawler(url, connection ,siteID,catID);
};










