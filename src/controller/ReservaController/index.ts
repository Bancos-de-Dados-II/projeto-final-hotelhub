import sequelize from "../../database/database";
import ReservaRepository from "./reservaRepository";
import ReservaController from "./controllerReserva";
import UsuarioRepository from "../UsuarioController/usuarioRepository";
import QuartoRepository from "../QuartoController/quartoRepository";
import HotelRepository from "../HotelController/hotelRepository";

const reservaRepository = new ReservaRepository(sequelize);
const usuarioRepository = new UsuarioRepository(sequelize);
const quartoRepository = new QuartoRepository(sequelize);
const hotelRepository = new HotelRepository(sequelize);
const reservaController = new ReservaController(reservaRepository, usuarioRepository, quartoRepository, hotelRepository);

export default reservaController;

