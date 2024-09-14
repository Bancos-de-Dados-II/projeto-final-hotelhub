import sequelize from "../../database/database";
import UsuarioRepository from "./usuarioRepository";
import UsuarioController from "./controllerUsuario";

const usuarioRepository = new UsuarioRepository(sequelize);
const usuarioController = new UsuarioController(usuarioRepository);

export {usuarioController, usuarioRepository};

