const Products = require("../model/Products");


module.exports = {
    name: (search, result)=>{
        Products.find({name: search}, (err, v)=>{
            if (err) {
                console.log(":::::::" + err);
            }
            result(v);
        });
    },
    color: (search, result)=>{
        Products.find({color: search}, (err, v)=>{
            if (err) {
                console.log(":::::::" + err);
            }
            result(v);
        });
    },
    brand: (search, result)=>{
        Products.find({brand: search}, (err, v)=>{
            if (err) {
                console.log(":::::::" + err);
            }
            result(v);
        });
    },
    category: (search, result)=>{
        Products.find({category: search}, (err, v)=>{
            if (err) {
                console.log(":::::::" + err);
            }
            result(v);
        });
    }
};






// =================== Get All NAMES WITH A PARTICULAR NAME ===============================
// FIND ALL THE PAGES
// function _names(search) {
//     return search;
// }
//     let allNames;  // TO STORE THE CONTENT
    
//     // FUNCTION GETS THE CONTENT FROM mongoose findOne METHODE
//     async function getNames(names) {
//         allNames = await names;
//     }
//     console.log(":::" + search);
//     Products.findOne({name: search}, (err, names) => {
//         if (err) {
//             console.error("::::::" + err);
//         }
//         else if (names) {
//             console.log(":::::::::" + names);
//             getNames(names);
//         }
//         else if (!names) {
//             console.error(":::::: NO NAME ::::::");
//         }
//     });
// =================== end ===============================


// =================== Get All WITH A PARTICULAR NAME ===============================
// let allColors;
// let searchn;
// function getColor(color) {
//     allColors = color
// }
// function _colors(search) {
//     searchn = search;
// }
//     Products.find({color: searchn}, (err, color)=>{
//         if (err) {
//             console.log("::::::" + err);
//         }
//         else if (!color) {
//             console.error(":::::: NO COLOR ::::::");
//         }
//         else{
//             // console.log(color);
//             // return color;
//             getColor(color);
//         }
//     });

// =================== end ===============================
