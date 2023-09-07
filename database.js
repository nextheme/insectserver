import React from 'react'
import mongoose, { mongo } from 'mongoose'

const MongoConnect = (uri) => {
    mongoose.connect(uri).then(() => { console.log("Conected to MongoDB successfully") }).catch((err) => { console.log(err) })
}

export default MongoConnect
