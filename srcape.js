
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.json');
let fin = false ;
const url ='https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Algeria';
// Write Headers
// writeStream.write(`Title,Link,Date \n`);

// fun 
var intervalID = setInterval(scraping, 100,);

function scraping(){
    console.log('scraping ..');
}
function StopFunction() {
    clearInterval(intervalID);
  }





request(url, (error, response, html) => {
  if (!error && response.statusCode == 200) {
      
      
    const $ = cheerio.load(html);

    
 const test =  $('.wikitable.alternance') ;
   
    //console.log(test.html());
   // console.log(test.text());


    // console.log(test.html());
    
    
 // init data 
 var data=[];



    $('.wikitable.alternance tr').each((i,el)=>{
        
        const l1 = $(el).find('td:nth-child(1)').text().replace(/(\r\n|\n|\r)/gm, "");
        const l2 = $(el).find('td:nth-child(3)').text().replace(/(\r\n|\n|\r)/gm, "");
        const l3 = $(el).find('td:nth-child(4)').text().replace(/(\r\n|\n|\r)/gm, "");
        const l4 = $(el).find('td:nth-child(5)').text().replace(/(\r\n|\n|\r)/gm, "");

    
          
            
     var  obj =   {'willaya' : l1, 
        'Confirmed_cases' : l2,
        'Deaths': l3,
        'Recoveries':l4
    }


        data.push(obj);
       
        scraping();

        

    })
StopFunction()
console.log('scraping done');
console.log('Saved!')
data.pop();



fs.writeFileSync('post.json',JSON.stringify(data), function (err) {
    if (err) throw err;
    ;
  });


  
  }
});












