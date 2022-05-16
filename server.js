const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const TeacherAPI = require('./src/Routes/Teacher/route.teacher');
const ProfileAPI = require('./src/Routes/Teacher/route.tprofile');
const MaterialAPI = require('./src/Routes/Teacher/route.material');;


dotenv.config();
const app = express();
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8081;

/**
 * Get MONGODB_URI from .env
 */

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error) => {

    if (error) {
        console.log('Database Error:', error.message);
        console.log('######################################################');
    }
});

mongoose.connection.once('open', () => {
    console.log('Database Connected...');
    console.log('######################################################');
});

app.route('/').get((req, res) => {
    res.send('CTSE Assignment');
});


//serve static assets of in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('FrontEnd/build'))
}

//API endpoints
app.use('/teacher', TeacherAPI());
app.use('/profile', ProfileAPI());
app.use('/material', MaterialAPI());

app.listen(PORT, () => {
    console.log('######################################################');
    console.log(`Server is ON and running on PORT : ${PORT}`);
    console.log('...Wait DB connecting...');
});


