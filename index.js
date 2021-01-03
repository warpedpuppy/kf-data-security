const express = require('express');
    morgan = require('morgan');

const app = express();
 
//logs all requests using Morgan, prints in terminal.
app.use(morgan('common'));

//json list of movies
let favMovies = [
    {
        title: 'Arrival',
        director: 'Denis Villeneuve',
        year: 2016
    },
    {
        title: 'Spotlight',
        director: 'Tom McCarthy',
        year: 2015
    },
    {
        title: 'The Martian',
        director: 'Ridley Scott',
        year: 2015
    },
    {
        title: 'Catch Me If You Can',
        director: 'Steven Spielberg',
        year: 2002
    },
    {
        title: 'The Ninth Gate',
        director: 'Roman Polanski',
        year: 1999
    },
    {
        title: 'Blackfish',
        director: 'Gabriela Cowperthwaite',
        year: 2013
    },
    {
        title: 'Annihilation',
        director: 'Alex Garland',
        year: 2018
    },
    {
        title: 'Ex Machina',
        director: 'Alex Garland',
        year: 2014
    },
    {
        title: 'Interstellar',
        director: 'Christopher Nolan',
        year: 2014
    },
    {
        title: 'Spirited Away',
        director: 'Hayao Miyazaki',
        year: 2001
    }
]

//express routing syntax, express GET route located at '/movies/ that returns JSON object about top 10 movies
app.get('/movies', (req, res) =>{
    res.json(favMovies);
});

//GET route located at default endpoint / that returns text
app.get('/', (req, res) => {
    res.send('Welcome to myFlix app!');
});

//serves documentation.html file using express.static, keyword searching in "public" folder
app.use(express.static('public'));

//middleware error handling always goes last in app.use chain
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Uh oh, something went wrong!');
})

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});
