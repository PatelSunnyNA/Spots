const mongoose = require('mongoose');
const Thought = require('./thought');
const Schema = mongoose.Schema;
const User = require('./user')
const SpotSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }]
});

SpotSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Thought.deleteMany({
              _id:{
                $in: doc.thoughts
              }
        })
}
})

module.exports = mongoose.model('Spot', SpotSchema)