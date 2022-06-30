const options = require('../configurations/sqlLite');
const knex = require('knex')(options);

class MessageRepository {
    constructor(){
    }

    async save(message){
        try{
           return await knex('messages').insert(message);
        }catch(error){
            console.log(error);
        }
    }

    async getAll(){
        try{
            const messagesFromDB = await knex.from('messages').select('*');
            const messages = messagesFromDB.map(messageRow => ({...messageRow}));

            return messages;
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = MessageRepository;