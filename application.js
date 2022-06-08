const express = require('express');
const productsRouter = require('./routers/products');
const app = express();
const PORT = 8080;

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/productos', productsRouter);

app.get('/', (request, response) => {
    response.render('index.ejs');
});

app.listen(PORT, ()=> console.log(`Listen on port number: ${PORT}`));
app.on('error', error => console.log('There was on error trying to start the server:', error))