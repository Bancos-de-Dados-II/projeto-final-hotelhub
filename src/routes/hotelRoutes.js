import express from 'express';
import { adicionarHotel, listarHoteis, buscarHotelPorCNPJ, excluirHotel, atualizarHotel } from '../controller/hotelController.js'

const routes = express.Router();

routes.post('/', adicionarHotel);
routes.get('/', listarHoteis);
routes.get('/:cnpj', buscarHotelPorCNPJ);
routes.delete('/:_id', excluirHotel);
routes.put('/:_id', atualizarHotel);

export default routes;