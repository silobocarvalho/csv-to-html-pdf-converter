class Processor{
    
    static process(data){
        let dataSplited = data.split('\r\n');
        let rows = [];
        
        dataSplited.forEach(row => {
            let rowSplited = row.split(';');
            rows.push(rowSplited);
        });
        return rows;
    };

}

module.exports = Processor;