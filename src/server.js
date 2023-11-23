
require('dotenv').config()
const { render } = require('ejs')
const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
const apiRouters = require('./routes/api')
const connection = require('./config/database')
const User = require('./models/User')
var cors = require('cors');

const port = process.env.PORT || 8081
const hostname = process.env.HOST_NANME

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:4200',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use('/v1/api/', apiRouters);

(async () => {
    try {
        await connection();

        app.listen(port, hostname, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (error) {
        console.log('Check connect to DB: ', error)
    }
})()


