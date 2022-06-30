class DatabaseRepository {
    constructor(table, options){
        this.knex = require('knex')(options);;
        this.table = table;
    }

    async save(data){
        try{
           return await this.knex(this.table).insert(data);
        }catch(error){
            console.log(error);
        }
    }

    async getAll(){
        try{
            const dataFromDatabase = await this.knex.from(this.table).select('*');
            const data = dataFromDatabase.map(row => ({...row}));

            return data;
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = DatabaseRepository;