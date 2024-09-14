import express from 'express';
import { adicionarHotel, listarHoteis, listarHoteisPorCNPJ, excluirHotel, atualizarHotel } from '../controller/hotelController.js'

const routes = express.Router();

routes.post('/', adicionarHotel);
routes.get('/', listarHoteis);
routes.get('/:cnpj', listarHoteisPorCNPJ);
routes.delete('/:id', excluirHotel);
routes.put('/:id', atualizarHotel);

export default routes;

