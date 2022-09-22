// require express package
const express = require("express");
// require body parser package
const bodyParser = require("body-parser"); // allow us to pass information that we get sent from the post request
const res = require("express/lib/response");

// a app us express module
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// post request to get the user input, calculate it and render it back
app.post("/", function (req, res) {

    // use Date() object to generate current date, month, year and time
    var today = new Date();
    var current_date = String(today.getDate()).padStart(2, '0'); // if string length is not 2, fill with 0
    var current_month = String(today.getMonth() + 1).padStart(2, '0');
    var current_year = today.getFullYear();

    // get the user input of birthday
    var birth_date = parseFloat(req.body.birth_date); // convert string to float

    var birth_month = parseFloat(req.body.birth_month);
    var birth_year = parseFloat(req.body.birth_year);

    // if birth_date > current_date, add 30 to current date and minus 1 to current months
    if (birth_date > current_date) {
        current_date = current_date + month[birth_month - 1];
        current_month = current_month - 1;
    }
    // if birth_month > current_month, minus 1 to current year and add 12 to current months
    if (birth_month > current_month) {
        current_year = current_year - 1;
        current_month = current_month + 12;
    }

    // compute the current age
    var res_date = current_date - birth_date;
    var res_month = current_month - birth_month;
    var res_year = current_year - birth_year;

    // today time
    var res_today = current_month + '/' + current_date + '/' + current_year;

    // after user sumbit the input, today time and current age render back to web
    res.send("Today is " + res_today + ". Your present age is " + res_year + " years old and " + res_month + " months " + res_date + " days.");
})

// start up server use app.listen()
// listen on port 3000 and have a call back
app.listen(3000, function () {
    console.log("Server is running on port 3000.");
});