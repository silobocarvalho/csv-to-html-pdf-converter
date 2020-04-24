const express = require('express');


//Classes variables - BEGIN
const Reader = require('./Classes/Reader');
const Processor = require('./Classes/Processor');
const Table = require('./Classes/Table');
const HtmlParser = require('./Classes/HtmlParser');
const FileManager = require('./Classes/FileManager');
const PDFWriter = require('./Classes/PDFWriter');
//Classes variables - END

//Variables definition - BEGIN
const app = express();
const serverPortNumber = process.env.PORT || 5555
const fs = require('fs');
const formidable = require('formidable');
//Variables definition - END

//Libs configuration - BEGIN
app.set('view engine', 'ejs');
app.use(express.static('public'));
//Libs configuration - END


async function covertFileToHTML(path) {
    let reader = new Reader();
    let dataRaw = await reader.readFile(path);
    let dataProcessed = Processor.process(dataRaw);
    let dataProcessedInTable = new Table(dataProcessed);
    let htmlRawPage = await HtmlParser.parse(dataProcessedInTable);
    return htmlRawPage;
}

async function createHTML(pathOrig, pathDest, htmlRes) {

    let htmlPage = await covertFileToHTML(pathOrig);
    await new FileManager().writeInFile(pathDest, htmlPage, htmlRes);
}

async function createPDF(pathOrig, pathDest, htmlRes) {
    
    let htmlPage = await covertFileToHTML(pathOrig);
    new PDFWriter().writePDF(pathDest, htmlPage, htmlRes);
}

app.get('/', (req, res) => {
    res.render('index');
});



app.post('/generatehtml', (req, res) => {
    var form = new formidable.IncomingForm();

    const pathDest = __dirname + '/yourfile.html'

    form.parse(req, function (err, fields, files) {
        let htmlPath = createHTML(files.csvfile.path, pathDest, res);
    });
});

app.post('/generatepdf', (req, res) => {
    var form = new formidable.IncomingForm();

    const pathDest = __dirname + '/yourfile.pdf'

    form.parse(req, function (err, fields, files) {
        createPDF(files.csvfile.path, pathDest, res); //HTML response is sent in PDF generation callback
    });
});

app.listen(serverPortNumber, () => {
    console.log("Server started at port: " + serverPortNumber);
});

