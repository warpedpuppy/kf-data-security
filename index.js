const express = require('express'),
    morgan = require('morgan'),
    //cross origin resource sharing - enables other work to reference this backend, including my API
    cors = require('cors'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const app = express();
 
//logs all requests using Morgan, prints in terminal.
app.use(morgan('common'));
app.use(cors());
app.use(bodyParser.json());

//json list of movies
let favMovies = [
    {
        title: 'Arrival',
        director: 'Denis Villeneuve',
        year: 2016,
        genres: {
            'primary': 'Science Fiction',
            'secondary': 'Drama'
        },
        description: 'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecrafts appear around the world.',
        imageURL: 'https://www.imdb.com/title/tt2543164/mediaviewer/rm3938516992/',
        featured: true
    },
    {
        title: 'Spotlight',
        director: 'Tom McCarthy',
        year: 2015,
        genres: {
            'primary': 'Biography',
            'secondary': 'Crime'
        },
        description: 'The true story of how the Boston Globe uncovered the massive scandal of child molestation and cover-up within the local Catholic Archdiocese, shaking the entire Catholic Church to its core.',
        imageURL: 'https://www.imdb.com/title/tt1895587/mediaviewer/rm899739136/',
        featured: true
    },
    {
        title: 'The Martian',
        director: 'Ridley Scott',
        year: 2015,
        genres:{
            'primary': 'Science Fiction',
            'secondary': 'Adventure'
        },
        description: 'An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.',
        imageURL: 'https://www.imdb.com/title/tt3659388/mediaviewer/rm1391324160/',
        featured: false
    },
    {
        title: 'Catch Me If You Can',
        director: 'Steven Spielberg',
        year: 2002,
        genres: {
            'primary': 'Biography',
            'secondary': 'Crime'
        },
        description: 'Barely 21 yet, Frank is a skilled forger who has passed as a doctor, lawyer and pilot. FBI agent Carl, becomes obsessed with tracking down the con man. But Frank not only eludes capture, he revels in the pursuit.',
        imageURL: 'https://www.imdb.com/title/tt0264464/mediaviewer/rm3911489536',
        featured: false
    },
    {
        title: 'The Ninth Gate',
        director: 'Roman Polanski',
        year: 1999,
        genres: {
            'primary': 'Mystery',
            'secondary': 'Thriller'
        },
        description: 'A rare book dealer, while seeking out the last two copies of a demon text, gets drawn into a conspiracy with supernatural overtones.',
        imageURL: 'https://www.imdb.com/title/tt0142688/mediaviewer/rm3119152640/',
        featured: false
    },
    {
        title: 'Blackfish',
        director: 'Gabriela Cowperthwaite',
        year: 2013,
        genres: {
            'primary': 'Documentary',
            'secondary': 'Biography'
        },
        description: 'A documentary following the controversial captivity of killer whales, and its dangers for both humans and whales.',
        imageURL: 'https://www.imdb.com/title/tt2545118/mediaviewer/rm4277380096/',
        featured: true
    },
    {
        title: 'Annihilation',
        director: 'Alex Garland',
        year: 2018,
        genres: {
            'primary': 'Science Fiction',
            'secondary': 'Horror'
        },
        description: 'A biologist signs up for a dangerous, secret expedition into a mysterious zone where the laws of nature don\'t apply.',
        imageURL: 'https://www.imdb.com/title/tt2798920/mediaviewer/rm4064891392/',
        featured: true
    },
    {
        title: 'Ex Machina',
        director: 'Alex Garland',
        year: 2014,
        genres: {
            'primary': 'Science Fiction',
            'secondary': 'Thriller'
        },
        description: 'A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.',
        imageURL: 'https://www.imdb.com/title/tt0470752/mediaviewer/rm848491264/',
        featured: true
    },
    {
        title: 'Interstellar',
        director: 'Christopher Nolan',
        year: 2014,
        genres: {
            'primary': 'Adventure',
            'secondary': 'Science Fiction'
        },
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        imageURL: 'https://www.imdb.com/title/tt0816692/mediaviewer/rm4043724800/',
        featured: false
    },
    {
        title: 'Spirited Away',
        director: 'Hayao Miyazaki',
        year: 2001,
        genres: {
            'primary': 'Animation',
            'secondary': 'Fantasy'
        },
        description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
        imageURL: 'https://www.imdb.com/title/tt0245429/mediaviewer/rm4207852801/',
        featured: false
    }
]

//GET route located at default endpoint / that returns text
app.get('/', (req, res) => {
    // throw new Error('I broke');
    // console.log(req);
    res.send('Welcome to myFlix app!');
});

//serves documentation.html file using express.static, keyword searching in "public" folder
app.use(express.static('public'));

//express routing syntax, express GET route located at '/movies/ that returns JSON object about favMovies array

app.get('/movies', (req, res) => {
    res.json(favMovies);
});

//get data about single movie by title
app.get('/movies/:title', (req, res) =>{
    res.json(favMovies.find((movie) =>
    {return movie.title === req.params.title}));
});

//get data about genre by title "thriller"
app.get('/movies/genres/:genre', (req, res) => {
  res.send('Successful GET request returning data on genre: ' + req.params.genre);
});

//get data about a director
app.get('/movies/directors/:director', (req, res) => {
    res.send('Successful GET request returning information on director: ' + req.params.director);
});

//allow new users to register SIMPLE
app.post('/users', (req, res) => {
    res.send('Successfully added new user.');
})

//allow new users to register FULL:
// app.post('/users', (req, res) => {
//     let newUser = req.body;

//     if(!newUser.username) {
//         const message = "Missing a username in request body.";
//         res.status(400).send(message);
//     } else {
//         newUser.id = uuid.v4();
//         // WOULD NEED A PUSH LINE HERE, SUCH AS: users.push(newUser);
//         res.status(201).send(newUser);
//     }
// });

//allow users to update their user info(username)
app.put('/users/:id', (req, res) => {
    res.send('Updated user ID# ' + req.params.id + '\'s username.')
})

//allow users to add a movie to their favorite list
app.post('/users/:id/movies/:movieID', (req, res) => {
    res.send('Successful POST request, adding movie ID ' + req.params.movieID + ' to favorites list.')
});

//allow users to remove a movie from their favorite list
app.delete('/users/:id/movies/:movieID', (req, res) => {
    res.send('Successfully DELETED movie ID# ' + req.params.movieID + ' from favorites list.');
});

//allow users to deregister
app.delete('/users/:id', (req, res) => {
    res.send('Thank you, your account with ID# ' + req.params.id + ' has been removed.')
})

//middleware error handling always goes LAST in app.use chain
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Uh oh, something went wrong!');
})

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});
