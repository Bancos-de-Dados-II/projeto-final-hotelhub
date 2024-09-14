import { Sequelize } from "sequelize-typescript";
import Avaliacao from "./models/Avaliacao";
import Hotel from "./models/Hotel";
import Quarto from "./models/Quarto";
import Reserva from "./models/Reserva";
import Usuario from "./models/Usuario";

const sequelize = new Sequelize('main', 'admin', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    models: [Avaliacao, Hotel, Quarto, Reserva, Usuario]
});

export default sequelize;