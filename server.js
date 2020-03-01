const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// const request = require("request")
const axios = require("request")


const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

// PARSE HTML ESPECIALLY FORM
app.use(bodyParser.urlencoded({ extended: true }));


// RENDER PLAIN JS TRHOUGH EJS FILE FROM SERVER GET REQUEST
app.get("/search", (req, res) => {
    res.render("search")
})


app.get("/results", (req, response) => {
    let query = req.query.search;
    request("https://api.themoviedb.org/3/search/movie?api_key=2e7ba550c391affeeab1cf02559ff381&query=" + query, (error, res, body) => {
        if (error) {
            console.log(error)
        }

        let data = JSON.parse(body);
        response.render("movies", { data: data, searchQuery: query });

    })

})





// LISTEN TO APP ON PORT 3000
app.listen("3000", () => {
    console.log("Listenning to App on 3000")
})
