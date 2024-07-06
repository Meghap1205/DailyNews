const pdfModel = require("../model/pdfModel");

const uploadpdf = async (req, res) => {
    const { title, pdfURL } = req.body;

    if (!title || !pdfURL) {
        return res.status(400).json({ msg: "Please fill in all details" }); // Use 400 for bad request
    }

    try {
        const pdf = new pdfModel({
            title,
            pdfURL,
        });

        const savedPdf = await pdf.save();
        return res.status(201).json(savedPdf);
    } catch (error) {
        return res.status(500).json({ msg: error.message }); // Use 500 for internal server error
    }
};

const displaypdf = async (req,res)=>{
    try {
        const pdf = await pdfModel.find();
        return res.status(201).json(pdf);
    } catch (error) {
        return res.status(500).json({ msg: error.message }); 
    }
};

const displayonepdf = async (req,res)=>{
    try {
        const id = req.params.id;
        const pdf = await pdfModel.findById({_id : id});
        return res.status(201).json(pdf);
    } catch (error) {
        return res.status(500).json({ msg: error.message }); 
    }
}

const updatepdf = async (req, res) => {
    try {
        const id = req.params.id;
        newpdfdata = req.body;
        const updatepdf = await pdfModel.updateOne({_id: id},{$set: newpdfdata});
        return res.status(200).json(updatepdf);
    } catch (error) {
        return res.status(500).json({ msg: error.message }); 
    }
}

const deletepdf = async (req, res) => {
    try {
        const id = req.params.id;
        const deletepdf = await pdfModel.deleteOne({_id : id});
        return res.status(200).json(deletepdf);
    } catch (error) {
        return res.status(500).json({ msg: error.message }); 
    }
}

module.exports = { uploadpdf , displaypdf , updatepdf, deletepdf, displayonepdf };
