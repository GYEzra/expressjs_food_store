const mongoose = require('mongoose')
require('dotenv').config()

var dbState = [{
    value: 0,
    label: "Disconnected"
},
{
    value: 1,
    label: "Connected"
},
{
    value: 2,
    label: "Connecting"
},
{
    value: 3,
    label: "Disconnecting"
}];

const connection = async () => {
    await mongoose.connect(process.env.DB_URI);
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find(f => f.value === state).label, "to database");
}

module.exports = connection