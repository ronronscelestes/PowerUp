require("./../config/db.config");
const mongoose = require('mongoose');

const users = [
    {
        username: "thais",
        mail: "thais@mail.fr",
        password: "hello"
    },
    {
        username: "romain",
        mail: "romain@mail.fr",
        password: "hello"
    },
    {
        username: "julie",
        mail: "julie@mail.fr",
        password: "hello"
    }
]

const UserModel = require("./../models/User.model");

UserModel.deleteMany()
.then(() => {
    UserModel.insertMany(users)
    .then(success => {
    console.log(success, 'successsss');
    mongoose.connection.close().then(success => console.log('WELL CLOSED'))
    .catch(err => console.log('NOPE DIDNT CLOSE'));
})
.catch(err => console.log(err, 'faaaaaail'));
})


