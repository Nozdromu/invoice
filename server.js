const { default: axios } = require('axios');
const express = require('express');
const app = express();
var fs = require('fs');
var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
app.use(express.static(__dirname + '/public'));

const port = 3000;
// Set EJS as templating engine 
app.set('views', './views');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    console.log(req);
    var inv = req.query.invoice;
    res.render('index', data[inv]);
});
app.get('/reload', (req, res) => {
    data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    res.send(data);
})
app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/book',(req,res)=>{
    console.log(req);
    res.send('done')
})

const server = app.listen(port, function () {
    console.log('listening to port: ' + port)
    console.log(data)
});