class Table{
    constructor(arr){
        this.header = arr[0];
        arr.shift();
        this.rows = arr;
    }

    get rowsNumber(){
        return this.rows.length;
    }

    get columnsNumber(){
        return this.header.length;
    }

}

module.exports = Table;