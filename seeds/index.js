const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Spot = require('../models/spot');

mongoose.connect('mongodb://localhost:27017/spot');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Spot.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const spot = new Spot({
            author: '63499686e0c7567972779b7d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/random',
            price: random1000,
            description: 'Lorem ipsum dolor sit amet'
        })
        await spot.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})