const { Worker }  = require('worker_threads');;
//let workDir = __dirname+"/dbWorker.js";
const axios = require('axios');
const cheerio = require('cheerio');


const mainFunc = async () => {
    const url = "https://www.daneshjooyar.com/";

    // fetch html data
    let res = await fetchData(url);
    if(!res.data){
        console.log("Invalid data Obj");
        return;
    }
    const html = res.data;
    let dataObj = {};

    // mount html page to the root element
    const $ = cheerio.load(html);
    const selector = $('.container.section.autocv > .row ');

    selector.each(function() {
        let href = $(this).find('a').attr('href');
        console.log(href);
        // let title = $(this).find('p').text(); // get the text in all the td elements
        let newStr = href.split("\t"); // convert text (string) into an array
        newStr.shift(); // strip off empty array element at index 0
        formatStr(newStr, dataObj); // format array string and store in an object
    });

    return dataObj;

};

mainFunc().then((res) => {
    const worker = new Worker(workDir);
    console.log("Sending crawled data to dbWorker...");
    worker.postMessage(res);

    worker.on("message", (message) => {
        console.log(message)
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

function formatStr(arr, dataObj){
    let regExp = /[^A-Z]*(^\D+)/; // regex to match all the words before the first digit
    let newArr = arr[0].split(regExp); // split array element 0 using the regExp rule
    dataObj[newArr[1]] = newArr[2]; // store object
}


// const { Worker, isMainThread, parentPort }  = require('worker_threads');
//
// if (isMainThread) {
//     const worker =  new Worker(__filename);
//     worker.once('message', (message) => {
//         console.log(message); // prints 'Worker thread: Hello!'
//     });
//     worker.postMessage('Main Thread: Hi!');
// } else {
//     parentPort.once('message', (message) => {
//         console.log(message); // prints 'Main Thread: Hi!'
//         parentPort.postMessage("Worker thread: Hello!");
//     });
// }
