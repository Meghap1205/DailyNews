const express = require("express");
const app = express();

app.use(express.json());

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors({
    origin: ["https://daily-news-frontend.vercel.app"],
    methods: ["GET", "POST", "PUT", "HEAD", "DELETE", "PATCH"],
}));

const pdfRoute = require("./route/pdfRoute");
app.use("/api", pdfRoute);

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("Mongodb is connected");
    })
    .catch((err) => {
        console.log(err);
    });

// Proxy route to fetch PDFs from Firebase Storage
app.get('/proxy', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(url);
        const buffer = await response.buffer();
        res.set({
            'Content-Disposition': `attachment; filename="${req.query.title}"`,
            'Content-Type': 'application/pdf',
        });
        res.send(buffer);
    } catch (error) {
        res.status(500).send('Error fetching the PDF');
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
