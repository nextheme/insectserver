import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
    uid: { type:String,unique: true  },
    status: { type: String },
    url: { type: String, required:true },
    name: { type: String },
})

const Photo = mongoose.model('Photo', PhotoSchema);

export default Photo;