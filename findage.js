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

app.post("/", function (req, res) {

    var today = new Date();
    var current_date = String(today.getDate()).padStart(2, '0');
    var current_month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var current_year = today.getFullYear();


    var birth_date = parseFloat(req.body.birth_date);

    var birth_month = parseFloat(req.body.birth_month);
    var birth_year = parseFloat(req.body.birth_year);

    // var bmi = weight / (height * height);

    // var current_date = 7;
    // var current_month = 12;
    // var current_year = 2017;
    // // birth dd// mm// yyyy
    // var birth_date = 16;
    // var birth_month = 12;
    // var birth_year = 2009;



    // if birth date is greater than current date
    // then do not count this month and add 30
    // to the date so as to subtract the date and
    // get the remaining days
    if (birth_date > current_date) {
        current_date = current_date + month[birth_month - 1];
        current_month = current_month - 1;
    }

    // if birth month exceeds current month, then do
    // not count this year and add 12 to the month so
    // that we can subtract and find out the difference
    if (birth_month > current_month) {
        current_year = current_year - 1;
        current_month = current_month + 12;
    }

    // calculate date, month, year
    var res_date = current_date - birth_date;
    var res_month = current_month - birth_month;
    var res_year = current_year - birth_year;

    // print the present age
    // document.write("Present Age<br>Years: " + (calculated_year) + " ");
    // document.write("Months: " + calculated_month + " ");
    // document.write("Days: " + calculated_date + " ");

    var res_today = current_month + '/' + current_date + '/' + current_year;

    res.send("Today is " + res_today + ". Your present age is " + res_year + " years old and " + res_month + " months " + res_date + " days."); // .toFixed(1) : display the number have one decimal
})


// start up server use app.listen()
// listen on port 3000 and have a call back
app.listen(3000, function () {
    console.log("Server is running on port 3000.");
});