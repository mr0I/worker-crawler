const axios = require('axios');
const config = require('../config');
const fs = require('fs');
const chalk = require('chalk');
const { v4: uuidv4 } = require('uuid');
const request = require('request');
const path = require('path');
const {
    get_current_date,
} = require('../inc/helpers');



class ApiCrawler{
    constructor() {
        download.bind(this)();
    }

    static async fetchData(next_page_link)
    {
        const results = await axios.get(encodeURI(next_page_link));
        // log in local file
        //fs.writeFileSync('./logs.json', JSON.stringify(results.data.data.products,null,'\t'));

        return results.data.data.products;
    }

    static async parseResults(products,parsedResultsArray)
    {
        products.forEach(product => {
            const metadata = {
                "title" : product.title_fa,
                "title_en" : product.title_en,
                "url" : product.url.uri,
                "price" : product.default_variant.price.selling_price,
                "main_price" : (product.default_variant.price.rrp_price !== 0)
                    ? product.default_variant.price.rrp_price
                    : null,
                "status" : product.status,
                "img" : (product.images.main.url[0]).substring(0,((product.images.main.url[0]).indexOf(".jpg")+4)),
                "brand": product.data_layer.brand,
                "pid": product.id,
            };

            parsedResultsArray.push(metadata);
        });

        return parsedResultsArray;
    }

    static async exportResults(parsedResultsArray,connection,site_id,cat_id,sct)
    {
        // variables
        let values = [];
        let specifications = '';
        let parameters = '';
        let description = '';
        let old_images = [];
        const ect = get_current_date();

        connection.query(`SELECT * FROM ${config.tables.ProductsTable} WHERE category_id=${cat_id} AND site_id=${site_id} AND date<${String(ect)} `,
            function(err,result,fields){
                if (err) console.log(err);

                for (let k=0;k<result.length;k++){
                    old_images.push(result[k].image);
                }
            });

        let crawled_count = 0;
        let queueImages = [];
        let imageNames = [];
        for (let i=0; i< parsedResultsArray.length; i++){
            crawled_count++;
            queueImages.push(parsedResultsArray[i].img);
            console.log('current index:' + chalk.yellow.bgBlack(crawled_count));

            let image_temp = uuidv4();
            imageNames.push(image_temp);

            values.push([parsedResultsArray[i].pid, parsedResultsArray[i].title, parsedResultsArray[i].title_en, parsedResultsArray[i].url, parsedResultsArray[i].main_price
                , parsedResultsArray[i].price, parsedResultsArray[i].status, image_temp, cat_id, site_id, specifications
                , parameters, description, parsedResultsArray[i].brand, String(ect)]);
        }

        try{
            download(queueImages,imageNames, function () {console.log('image upload:', 'done');});
        } catch (e) {
            console.log('image download error: ',e);
        }

        //  Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
        connection.query(`INSERT INTO ${config.tables.ProductsTable}
                         (pid,title,title_en, url,main_price ,price,status,image,category_id,site_id,specifications,parameters,description,brand,date) VALUES ?`,
            [values],
            function(err,result) {
                if (err) throw err;
                console.log('All Is Done');

                connection.query(`DELETE FROM ${config.tables.ProductsTable} WHERE category_id=${cat_id} AND site_id=${site_id} AND date<${String(ect)} `,
                    function(err,resp){
                        if (err) throw err;
                        console.log('All Old Data Is Deleted.');
                        // delete old images
                        for (let j=0;j<old_images.length;j++){
                            try {
                                fs.unlink(path.join(__dirname, '../../EcommerceShop/public/uploads/productImages/') + old_images[j] + '.webp' , function (err) {
                                    if (err) console.warn('image deletion Error',err);
                                    console.log('Old Image Is Deleted');
                                })
                            } catch (e) {
                                console.error('Unlink Error',e);
                            }
                        }
                    });
            });

        connection.query(`INSERT INTO ${config.tables.LogsTable}
                        (start_crawl_time, end_crawl_time , all_count ,crawled_count , category_id , site_id)
                        VALUES (${sct},${get_current_date()},${parsedResultsArray.length} , ${crawled_count},${cat_id},${site_id})`,
            function(err,result) {
                if (err) throw err;
                console.log('Logs Added.');
            });
    }

    static async updateProducts(pid,connection)
    {
        // variables
        let specifications = '';
        let parameters = '';
        let description = '';
        let specs = [];
        let specs_obj = {};
        let params = [];
        let params_obj = {};


        let urlSingle = `${process.env.API_URL}/product/${pid}/`;
        axios.get(encodeURI(urlSingle))
            .then(res => {
                specifications = res.data.data.product.specifications[0].attributes;
                parameters = res.data.data.product.review.attributes;

                if (specifications !== undefined){
                    specifications.forEach(spec => {
                        specs_obj[spec.title] = spec.values;
                        specs.push(specs_obj);
                    });
                }
                if (parameters !== undefined){
                    parameters.forEach(param=> {
                        params_obj[param.title] = param.values;
                        params.push(params_obj);
                    });
                }

                specifications = JSON.stringify(specs);
                parameters = JSON.stringify(params);
                if (res.data.data.product.review.description !== undefined) description = res.data.data.product.review.description;

                connection.query(`UPDATE ${config.tables.ProductsTable} SET 
                specifications=?,parameters=?,description=? WHERE pid=?; `, [specifications,parameters,description,pid],
                    function(err,result,fields){
                        if (err) console.log(err);
                    });
            }).catch(err => {
            console.log(err);
        });


    }
}


function download(files,image_names, callback) {
    let index = 0;
    let data = setInterval(async () => {
        index++;
        if (index === files.length)
            clearInterval(data);
        else {
            let fileName = path.join(__dirname, '../../' +
                'EcommerceShop/public/uploads/productImages/') + image_names[index] + '.jpg';

            request.head(files[index % files.length], function (err, res, body) {
                // console.log('content-type:', res.headers['content-type']);
                // console.log('content-length:', res.headers['content-length']);
                fs.access(path.join(__dirname , '../../EcommerceShop/public/uploads/productImages'),(error) => {
                    if (error) fs.mkdirSync(path.join(__dirname ,'../../EcommerceShop/public/uploads/productImages'))  ;
                });
                request(files[index % files.length])
                    .pipe(fs.createWriteStream(fileName,{
                        highWaterMark:300000
                    }))
                    .on("close", callback);
            });
        }
    }, 4000);
}


module.exports = ApiCrawler;