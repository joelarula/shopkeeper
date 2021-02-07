'use strict';

const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'src/assets/db/');

var db = {};
db.categories = {};

var filenames = fs.readdirSync(directoryPath,);
     
filenames.forEach(function (file) {
    
        console.log(file);
        let product = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/assets/db/',file), 'utf8'));   

        let category = product.category.name;
        var c = db.categories[category];
        if(c == undefined){
            c = {};
        }

        if( c.products == undefined){
            c.products = [];
        }

        c.name = category;
        c.name_en = product.category.name_en;
        c.name_ru = product.category.name_ru;
        
        var p = {};
        p.key = product.key;
        p.name = product.name;

        p.description = product.description;

        p.photo  = product.photo;

        p.details = [];
        if(product.detail_0 != undefined){
            p.details.push(product.detail_0);
        }
        if(product.detail_1 != undefined){
            p.details.push(product.detail_1);
        }
        if(product.detail_1 != undefined){
            p.details.push(product.detail_1);
        }
           
        p.translation_en = product.translation_en;
        p.translation_ru = product.translation_ru;
        p.position = product.position;
        p.size = product.size
        p.published = product.published;

        c.products.push(p);
    
        db.categories[category] = c;

    
});

for (var key in db.categories) {
    var c = db.categories[key];
}


console.log(db);

let data = JSON.stringify(db);
fs.writeFileSync( path.join(__dirname, 'public/db.json'), data);

console.log("done");