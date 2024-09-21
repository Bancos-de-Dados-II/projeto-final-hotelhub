import routes from './routes/hotelRoutes.js';
import express, { Router } from 'express';
import cors from 'cors';
import clientRedis from './db/redis.js';
import { pesquisarHoteis } from './controller/hotelController.js';
import searchRoute from './routes/searchRoutes.js';
const app = express();

const corsOptions = {
    origin: ['http://127.0.0.1:5500', 'http://127.0.0.1:5501'],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/Hotel', routes);
app.use('/search', searchRoute);

clientRedis.on('connect', () => {
    console.log('Conectado ao Redis');
});

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port} 🚀🚀🚀`);
});