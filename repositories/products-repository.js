const options = require('../configurations/mariaDB');
const knex = require('knex')(options);

class ProductRepository {
    constructor(){
    }

    async save(product){
        try{
           return await knex('products').insert(product);
        }catch(error){
            console.log(error);
        }
    }

    async getAll(){
        try{
            const productsFromDB = await knex.from('products').select('*');
            const products = productsFromDB.map(productRow => ({...productRow}));

            return products;
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = ProductRepository;