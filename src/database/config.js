const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/construction',{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            })
        .then((db) => console.log('Db is Connected'))
        .catch((err)=>console.log(err));
