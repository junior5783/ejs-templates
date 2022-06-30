const options = require('../configurations/sqlLite')
const knex = require('knex')(options);

knex.schema.createTable('messages', table => {
    table.increments('id');
    table.string('email');
    table.string('message');
    table.string('date');
})
.then(()=> console.log('Table created'))
.catch(error => {
    console.log(error);
    throw error;
})
.finally(()=> {
    knex.destroy()
})