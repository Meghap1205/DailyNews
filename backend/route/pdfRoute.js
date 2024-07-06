const express = require("express");
const router = express.Router();
const {uploadpdf, displaypdf ,updatepdf, deletepdf, displayonepdf } = require("../controller/pdfController");

router.post("/upload", uploadpdf);
router.get("/display", displaypdf);
router.get("/display/:id", displayonepdf);
router.patch("/update/:id", updatepdf);
router.delete("/delete/:id", deletepdf);
module.exports = router;
