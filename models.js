const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    ReleaseYear: {type: String},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String
    },
    ImagePath: String,
    Featured: Boolean
});

let userSchema = mongoose.Schema ({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthdate: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

//hashes password in app
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

//compared hashed passwords (login and saved in app) to verify when logging in
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
};

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;