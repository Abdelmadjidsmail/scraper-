const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
//const writeStream = fs.createWriteStream('post.json');
let fin = false;
const url = 'https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Algeria';
var num = 0
var data = [];
let date_ob = new Date();

// current date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();

const dateTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;



//------------- fun ---------------//
var intervalID = setInterval(scraping, 100, );

function scraping() {
  console.log('scraping ..');
}

function StopFunction() {
  clearInterval(intervalID);
}




request(url, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);


    const total = $('.wikitable.alternance tr').length;


    $('.wikitable.alternance tr').each((i, el) => {

      //getting data from each line
      const l1 = $(el).find('td:nth-child(1)').text().replace(/(\r\n|\n|\r)/gm, "");
      const l2 = $(el).find('td:nth-child(3)').text().replace(/(\r\n|\n|\r)/gm, "");
      const l3 = $(el).find('td:nth-child(4)').text().replace(/(\r\n|\n|\r)/gm, "");
      const l4 = $(el).find('td:nth-child(5)').text().replace(/(\r\n|\n|\r)/gm, "");


      if (l1 != '' && i != 50 && i != 51) {
        data[num] = {
          'willaya': l1,
          'Confirmed_cases': l2,
          'Deaths': l3,
          'Recoveries': l4
        }
        scraping()
        num++;
      }
      if (i == 51) {
        data[num] = {
          'Total': l1,
          'Total_Confirmed_cases': l2,
          'Total_Deaths': l3,
          'Total_Recoveries': l4
        }
      }

    })


    data.push({
      'latestUpdate': dateTime
    })




    console.log('scraping done');
    StopFunction();

    fs.writeFileSync('post.json', JSON.stringify(data), function (err) {
      if (err) throw err;

    });
    console.log('saved ..');



  }
});