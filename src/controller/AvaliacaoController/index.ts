import sequelize from "../../database/database";
import AvaliacaoRepository from "./avaliacaoRepository";
import AvaliacaoController from "./controllerAvaliacao";

const avaliacaoRepository = new AvaliacaoRepository(sequelize);
const avaliacaoController = new AvaliacaoController(avaliacaoRepository);

export default avaliacaoController;
