const axios = require('axios');
const config = require('../config');
const fs = require('fs');
const chalk = require('chalk');
const {
    price_sanitizer,
    get_current_date,
    get_brand
} = require('../inc/helpers');


class ApiCrawler{
    static async fetchData(next_page_link)
    {
        const results = await axios.get(encodeURI(next_page_link));
        // log in local file
        fs.writeFileSync('./logs.json', JSON.stringify(results.data.data.products,null,'\t'));

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

    static async exportResults(parsedResultsArray,connection,site_id,cat_id)
    {
        let values = [];
        const ect = get_current_date();

        let old_images = [];
        connection.query(`SELECT * FROM ${config.tables.ProductsTable} WHERE category_id=${cat_id} AND site_id=${site_id} AND date<${String(ect)} `,
            function(err,result,fields){
                if (err) console.log(err);

                for (let k=0;k<result.length;k++){
                    old_images.push(result[k].image);
                }
            });

        let counter = 0;
        let specs = [];
        let specs_obj = {};
        let params = [];
        let params_obj = {};

       await parsedResultsArray.map(product => {
            counter++;
            let urlSingle = `https://api.digikala.com/v1/product/${product.pid}/`;
            axios.get(encodeURI(urlSingle))
                .then(res => {
                    // console.log(res.data);
                    // let desc = '';
                    const specifications = res.data.data.product.specifications[0].attributes;
                    const parameters = res.data.data.product.review.attributes;
                    const description = res.data.data.product.review.description;

                    specifications.forEach(spec => {
                        specs_obj[spec.title] = spec.values;
                        specs.push(specs_obj);
                    });
                    parameters.forEach(param=> {
                        params_obj[param.title] = param.values;
                        params.push(params_obj);
                    });

                    // console.log(params.length);
                    // console.log(specs.length);

                    fs.writeFileSync('./single-logs.json', JSON.stringify(description,null,'\t'));
                }).catch(err => {
                console.log(err);
            })
        });


        //return 'singleUrls';

     //    let crawled_count = 0;
     //
     //        let image_temp = uuidv4();
     //        download(item.img,
     //            path.join(__dirname, '.' +
     //                '../EcommerceShop/public/uploads/productImages') + image_temp + '.jpg', function(){
     //                console.log('image upload:','done');
     //                sharp('.' +
     //                    '../EcommerceShop/public/uploads/productImages' + image_temp + '.jpg')
     //                    .resize(450)
     //                    .toFile('.' +
     //                        '../EcommerceShop/public/uploads/productImages' + image_temp + '.webp', (err, info) => {
     //                        if (err) console.log('Error in resinzing',err);
     //                        else {
     //                            try {
     //                                fs.unlink(path.join(__dirname, '.' +
     //                                    '../EcommerceShop/public/uploads/productImages') + image_temp + '.jpg' , function (err) {
     //                                    if (err) console.warn('image deletion Error',err);
     //                                });
     //                            } catch (e) {
     //                                console.error('Unlink Error',e);
     //                            }
     //                        }
     //                    });
     //            });
     //
     //        values.push([parsedResultsArray[i].title,parsedResultsArray[i].url,parsedResultsArray[i].main_price
     //            ,parsedResultsArray[i].price,parsedResultsArray[i].status,image_temp,cat_id,site_id,specifications
     //            ,parameters,description,parsedResultsArray[i].brand,String(ect)]);
     //
     //        if (crawled_count % config.crawler_settings.bulkInsertCount === 0) {
     //            connection.query(`INSERT INTO ${config.tables.ProductsTable}
     //             (title, url,main_price ,price ,status,image, category_id,site_id,specifications,parameters,description,brand,date) VALUES ?`,
     //                [values],
     //                function(err,result) {
     //                    if (err) throw err;
     //                    console.log(`All ${config.crawler_settings.bulkInsertCount} Is Done`);
     //                    values = [];
     //                });
     //        }
     //
     //    //Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
     //    connection.query(`INSERT INTO ${config.tables.ProductsTable}
     // (title, url,main_price ,price,status,image,category_id,site_id,specifications,parameters,description,brand,date) VALUES ?`,
     //        [values],
     //        function(err,result) {
     //            if (err) throw err;
     //            console.log('All Is Done');
     //
     //            connection.query(`DELETE FROM ${config.tables.ProductsTable} WHERE category_id=${cat_id} AND site_id=${site_id} AND date<${String(ect)} `,
     //                function(err,resp){
     //                    if (err) throw err;
     //                    console.log('All Old Data Is Deleted.');
     //                    // delete old images
     //                    deleteOldImages();
     //                });
     //        });
     //
     //    connection.query(`INSERT INTO ${config.tables.LogsTable}
     //        (start_crawl_time, end_crawl_time , all_count ,crawled_count , category_id , site_id)
     //        VALUES (${sct},${ect},${parsed_results.length} , ${crawled_count},${cat_id},${site_id})`,
     //        function(err,result) {
     //            if (err) throw err;
     //            console.log('Logs Added.');
     //        });

    }


}


module.exports = ApiCrawler;