import { model, Model, models, Schema } from "mongoose";

const StockSchema = new Schema({
    stockname: { type: String },
    ticker: { type: String },
    quantity: { type: Number },
    buyprice: { type: Number },
}, {
    timestamps: true // to update
});

export const Stock = models.Stock || model('Stock' , StockSchema , "stocks")
