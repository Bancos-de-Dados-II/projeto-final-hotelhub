import express from 'express';
import { adicionarHotel, listarHoteis, buscarHotelPorCNPJ, excluirHotel, atualizarHotel, pesquisarHoteis } from '../controller/hotelController.js'

const routes = express.Router();

routes.post('/', adicionarHotel);
routes.get('/', listarHoteis);
routes.get('/:cnpj', buscarHotelPorCNPJ);
routes.delete('/:_id', excluirHotel);
routes.put('/:_id', atualizarHotel);
routes.get('/search', pesquisarHoteis);

export default routes;