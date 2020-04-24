const promisifyAll = require('util-promisifyall')
const PDFManager = promisifyAll(require('html-pdf'));


class PDFWriter {

    async writePDF(pathDest, htmlData, htmlResponse) {
        var options = { 
            format: 'A4', 
            orientation: "portrait",
            border: {
                "top": "1cm", 
                "right": "1cm",
                "bottom": "1cm",
                "left": "1cm"
              }
            };
        try {
                await PDFManager.create(htmlData, options).toFile(pathDest, (err, res) => {
                htmlResponse.sendFile(pathDest)
                return true;
            });   
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = PDFWriter;