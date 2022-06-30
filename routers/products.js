const express = require('express');
const {checkSchema, validationResult} = require('express-validator');
const {Router} = express;
const router = Router();
const ProductRepository = require('../repositories/products-repository');
const MessageRepository = require('../repositories/message-repository');
const productRepository = new ProductRepository();
const messagesRepository = new MessageRepository();

const productSchema = {
    id: {
        in: ['params'],
        optional: true,
        errorMessage: 'Id del producto debe ser entero',
        isInt: { options: { min: 1 } },
        toInt: true
    },
    title: {
        notEmpty: true,
        errorMessage: "El titulo no puede estar vacio"
    },
    price: {
        errorMessage: "El precio debe ser un decimal positivo",
        exists: true,
        isFloat: { options: { min: 0 } },
        toFloat: true
    },
    thumbnail: {
        notEmpty: true,
        errorMessage: "Thumbnail no puede estar vacio"
    }
};

router.get('/', async (request, response) => {
    const products = await productRepository.getAll();

    response.render('products.ejs', {products});
});

router.post('/', checkSchema(productSchema), (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()});
    }

    productRepository.save(request.body);
    response.redirect('/');
});

module.exports = io => {
    io.on('connection', async socket => {
        console.log(`User has been conected: ${socket.id}`)

       const messages = await messagesRepository.getAll();
       const products = await productRepository.getAll();
        
        io.emit('products', products);
        io.emit('messages', messages);

        socket.on('messages', async message => {
            await messagesRepository.save(message);
            const messages = await messagesRepository.getAll();

            io.emit('messages', messages);
        });
    });
    return router;
};