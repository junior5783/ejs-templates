const fs = require('fs');

class Contenedor {
    constructor(fileName){
        this.fileName = fileName;
    }

    async save(product){
        const products = await this.#getProducts();
        const id = this.#getProductId(products);

        products.push({id, ...product});
        await this.#writeProducts(products);
        
        return id;
    }

    async getById(id){
        const products = await this.#getProducts();
        const product = products.find(({id: productId}) => productId === id);
        
        return product;
    }

    async getAll(){
        return await this.#getProducts();
    }

    async deleteById(id){
        const products = await this.#getProducts();
        const filteredProducts = products.filter(({id: productId}) => productId !== id);
        
        await this.#writeProducts(filteredProducts);
    }

    async deleteAll(){
        await this.#writeProducts("");
    }

    #getProductId(products){
        if(products?.length){
            const {id} = products[products.length - 1];

            return id + 1;
        }

        return 1;
    }

    async #getProducts(){
        try{
            const contentFile = await fs.promises.readFile(this.fileName, 'utf-8');
            
            return contentFile ? JSON.parse(contentFile) : [];
        }catch(error){
            if(error.code === 'ENOENT'){
                return [];
            }else{
                console.log("There was an error trying to get the products: ", error);
            }
        }
    }

    async #writeProducts(products){
        try{
            if(products instanceof Array){
                await fs.promises.writeFile(this.fileName, JSON.stringify(products));
                return;
            }
            await fs.promises.writeFile(this.fileName, products);
        }catch(error){
            console.log("There was an error trying to write the products: ", error);
        }
    }

}

module.exports = Contenedor;