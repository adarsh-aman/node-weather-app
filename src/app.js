const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
const app = express();

//define Paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine','hbs');
hbs.registerPartials(partialPath)

//static location in express
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Adarsh Aman'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Adarsh Aman'
    })
    
})

app.get('/help',(req,res)=>{
    res.send([{
        name: 'Adarsh',
        age: 28
    }])
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: '79 degree',
    //     location: 'Patna',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "Please provide correct search!"
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title: 'About Me',
        name: 'Adarsh Aman',
        errorMessage: '404 Page not found !'
    })
})
app.listen(3000, ()=>{
    console.log("Server is up on port 3000 !")
})