const fs = require('fs');
const util = require('util');

class Reader{

    constructor(){
        this.reader = util.promisify(fs.readFile);
    }

    async readFile(path){
        try {
            return this.reader(path, 'utf8');
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }
}
module.exports = Reader;