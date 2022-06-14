const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const productsRouter = require('./routers/products')(io);

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/static', express.static(__dirname + '/static'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/productos', productsRouter);

app.get('/', (request, response) => {
    response.render('index.ejs');
});

server.listen(PORT, ()=> console.log(`Listen on port number: ${PORT}`));
server.on('error', error => console.log('There was on error trying to start the server:', error))