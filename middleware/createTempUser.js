const Users = require("../model/Users");


// I created this script to create a temp user so that i can
//  monitor usage on the site and then 
// assign the original user after they have signed
module.exports = () => {

    const tempUser = new Users({
        firstname: "Temp firstname",
        lastname: "Temp lastname",
        password: "Temp password",
        phoneNo: "0101001010101",
        email: "Tempemail@gmail.com",
        address: "Temp address",
        address2: "Temp address2",
        country: "Temp country",
        city: "Temp city",
        company: "Temp company",
        zip: "Temp zip",
        note: "Temp note"
    });

    

    tempUser.save((err)=>{
        if (err) {
            console.log("::::::", err);
        }
    });

    console.log(tempUser);
    console.log("Created New User");
}