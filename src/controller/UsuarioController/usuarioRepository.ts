import { Sequelize, Model, UUID } from "sequelize";
import Usuario from '../../database/models/Usuario.ts';
import { UsuarioDTO } from "./UsuarioDTO.ts";

class UsuarioRepository {
    constructor(private sequelize: Sequelize) {}

    async addUsuario(usuario: Partial<Usuario>): Promise<Usuario> {
        try {
            return await Usuario.create(usuario as Usuario);
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
            throw new Error('Erro ao adicionar usuário');
        }
    }

    async listAllUsers(): Promise<Usuario[]> {
        try {
            return await Usuario.findAll();
        } catch (error) {
            console.error('Erro ao listar usuários', error);
            throw new Error('Erro ao listar usuários');
        }
    }

    async deleteUser(cpf: string):Promise<void> {
        try {
            await Usuario.destroy({
                where:{
                    cpf:cpf,
                }
            })
        } catch (error) {
            console.error('Erro ao remover usuário', error);
            throw new Error('Erro ao remover usuário');
        }
    }

    async findUserByPk(cpf:string):Promise<Usuario | null> { 
        try {
            const user:Usuario|null = await Usuario.findByPk(cpf);
            return user;
        } catch (error) {
            console.error('Erro ao buscar usuário', error);
            throw new Error('Erro ao buscar usuário');
        }
    } 
}

export default UsuarioRepository;