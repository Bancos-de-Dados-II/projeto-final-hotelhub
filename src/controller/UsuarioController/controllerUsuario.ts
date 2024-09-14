import { Request, Response } from "express";
import UsuarioRepository from "./usuarioRepository.ts";
import { UsuarioSchema, UsuarioDTO } from "./UsuarioDTO.ts";
import { z } from "zod";

class UsuarioController {
    usuarioRepository: UsuarioRepository;

    constructor(usuarioRepository: UsuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    async addUsuario(req: Request, res: Response) {
        try {
            const usuarioData: UsuarioDTO = UsuarioSchema.parse(req.body);
            const usuario = await this.usuarioRepository.addUsuario(usuarioData);

            return res.status(201).json(usuario);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: error.errors });
            }
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async listAllUsers(req:Request, res:Response) {
        try {
            const usuarios = await this.usuarioRepository.listAllUsers();
            return res.status(201).json(usuarios);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async deleteUser(req:Request, res:Response) {
        try {
            const { cpf } = req.body
            await this.usuarioRepository.deleteUser(cpf);
            return res.status(201).json('Usuário removido!');
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async findUserByPk(req: Request, res:Response) {
        try {
            const { cpf } = req.params;
            const user = await this.usuarioRepository.findUserByPk(cpf);
            return res.status(201).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async updateUser(req:Request, res:Response) {
        try {
            const usuarioData: UsuarioDTO = UsuarioSchema.parse(req.body);
            const cpf = req.body.cpf;
            const newUser = await this.usuarioRepository.updateUser(cpf, usuarioData);
            return res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export default UsuarioController;