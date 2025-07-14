const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        quantity: {
            type: Number,
            default: 0,
            max: 1000,
        },
       
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
);

module.exports = mongoose.model(DOCUMENT_NAME, productSchema);