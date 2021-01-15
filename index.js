require('dotenv').config();

const express = require('express'),
    morgan = require('morgan'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config')
    movieRouter = require('./movies/movies-router'),
    usersRouter = require('./users/users-router'),
    app = express(),
    auth = require('./auth')(app)


app.use(morgan('common'));
app.use(cors());
app.use(express.json());
app.use('/movies', movieRouter)
app.use('/users', usersRouter)

const passport = require('passport');

require('./passport'); //why is this format different, has an error?

//connects to existing MongoDB database LOCAL
mongoose.connect(config.LOCAL_DB, { useNewUrlParser: true, useUnifiedTopology: true});


app.get('/', (req, res) => {
    // throw new Error('I broke');
    // console.log(req);
    res.send('Welcome to myFlix app!');
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Uh oh, something went wrong!');
})

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
    console.log('Listening on Port ' + port);
});

