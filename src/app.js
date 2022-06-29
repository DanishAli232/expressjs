//API
// Get - read
// Post - create
// put - update
// delete - delete
const path = require('path');
const express = require('express');
const app = express();
const hbs = require("hbs");
const requests = require('requests');

// console.log(path.join(__dirname , "../public/index.html"));

const staticPath = path.join(__dirname , "../public");
// app.get(route , callback)

//built in middleware
// app.use(express.static(staticPath));

//Set the view Engine
app.set("view engine" , "hbs");

//If we change name of views to template we can do this by this method
const templatepath = path.join(__dirname , "../templates/views");
app.set("views" , templatepath);

//partials work like component just link in react we can create component and used it more than one time
const partialsPath = path.join(__dirname , "../templates/partials");
hbs.registerPartials(partialsPath);

app.get("/" , (req , res) => {
    res.render("index" , {
        name: "danish"
    });
})

const cityname = "lahore";
app.get("/temp" , (req , res) => {
        requests(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=02b0152ef8629ea55982712d9de8d987`)
          .on('data', (chunk) => {
            const objdata = JSON.parse(chunk);
            const arrdata = [objdata];
            // console.log(arrdata[0].main.temp);
            const realtimedata = arrdata
            res.write(realtimedata[0].name);
            res.write(` Name of city is ${realtimedata[0].name} and temperature is ${realtimedata[0].main.temp}`);
          })
          .on('end', (err) => {
            if (err) return console.log('connection closed due to errors', err);
            res.end();
          });
      
})

app.get("/" , (req , res) => {
    // res.send("Hello From The Danish Family");
});

app.get("/about" , (req , res) => { 
    res.send([
        {
            id: 1,
            name: "danish",
            Roll_No: "BSEF19E001"
        }
    ]);
})

app.get("/about1" , (req , res) => {
    res.render("about");
})

app.get("/about/*" , (req , res) => {
    res.render("404" , {
        errorcomment: "404 Error... After about us Page Not Found"
    })
})

app.get("*" , (req , res) => {
    res.render("404" , {
        errorcomment: "404 Error... Page Not Found"
    })
})

app.listen(8000 , "127.0.0.1" , () => {
    console.log("listening to the port No 8000");
})

// Callback has teo parameters: req and res
// req object represents the HTTP requests and has properties for the request query string, parameter, body
// res object represents the HTTP response