const mongoose= require("mongoose");

const pdfSchema= new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    pdfURL:{
        type: String,
        require: true,
    },
    date:{
        type: Date,
        default: Date.now(),
    }
})

const pdfModel = mongoose.model("Pdf", pdfSchema);
module.exports = pdfModel;
