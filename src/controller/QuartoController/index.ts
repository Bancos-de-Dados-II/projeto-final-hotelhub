import sequelize from "../../database/database";
import QuartoRepository from "./quartoRepository";
import QuartoController from "./controllerQuarto";

const quartoRepository = new QuartoRepository(sequelize);
const quartoController = new QuartoController(quartoRepository);

export default quartoController;