const fs = require('fs');
const util = require('util');

class FileManager{

    constructor(){
        this.writer = util.promisify(fs.writeFile);
    }

    async writeInFile(pathDest, data, htmlRes){
        try {
            await this.writer(pathDest, data);
            htmlRes.sendFile(pathDest);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
        
    }
}

module.exports = FileManager;