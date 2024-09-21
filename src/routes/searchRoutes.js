import express from 'express';
import { pesquisarHoteis } from '../controller/hotelController.js'

const searchRoute = express.Router();

searchRoute.get('/', pesquisarHoteis);

export default searchRoute;