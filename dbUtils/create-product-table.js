const options = require('../configurations/mariaDB')
const knex = require('knex')(options);

knex.schema.createTable('products', table => {
    table.increments('id')
    table.string('title')
    table.decimal('price',12, 2)
    table.string('thumbnail')
})
.then(()=> console.log('Table created'))
.catch(error => {
    console.log(error);
    throw error;
})
.finally(()=> {
    knex.destroy()
})