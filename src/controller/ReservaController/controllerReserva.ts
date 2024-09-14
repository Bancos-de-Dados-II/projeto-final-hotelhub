import { Request, Response } from "express";
import ReservaRepository from "./reservaRepository.ts";
import { ReservaSchema, ReservaDTO } from "./ReservaDTO.ts";
import { z } from "zod";
import UsuarioRepository from "../UsuarioController/usuarioRepository.ts";
import QuartoRepository from "../QuartoController/quartoRepository.ts";
import HotelRepository from "../HotelController/hotelRepository.ts";


class ReservaController {
    reservaRepository: ReservaRepository;
    usuarioRepository: UsuarioRepository;
    quartoRepository: QuartoRepository;
    hotelRepository: HotelRepository;

    constructor(reservaRepository: ReservaRepository, usuarioRepository:UsuarioRepository, quartoRepository: QuartoRepository, hotelRepository: HotelRepository) {
        this.reservaRepository = reservaRepository;
        this.usuarioRepository = usuarioRepository;
        this.quartoRepository = quartoRepository;
        this.hotelRepository = hotelRepository;
    }

    async addReserva(req: Request, res: Response) {
        const cpf = req.body.usuarioCPF;
        const userDate = await this.usuarioRepository.findUserByPk(cpf);

        if(!userDate) {
            return res.status(400).json("Usuário não encontrado");
        }

        console.log('hotelRepository:', this.hotelRepository);

        const cnpj = req.body.hotelCNPJ;
        const hotelData = await this.hotelRepository.findHotelByPk(cnpj);

        if(!hotelData) {
            return res.status(400).json("Hotel não encontrado");
        }

        const numero = req.body.quartoNumero;

        const quartoDate = await this.quartoRepository.findRoomByPk(numero, cnpj);
        
        if(!quartoDate) {
            return res.status(400).json("Quarto não encontrado");
        }

        try {
            const reservaData: ReservaDTO = ReservaSchema.parse(req.body);
            const reserva = await this.reservaRepository.addReserva(reservaData);

            return res.status(201).json(reserva);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: error.errors });
            }
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async deleteReserva(req:Request, res:Response) {
        try {
            const { numero } = req.body;
            await this.reservaRepository.deleteReserva(numero);
            return res.status(201).json('Reserva cancelada!');
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async listAllReservas(req:Request, res:Response) {
        try {
            const reservas = await this.reservaRepository.listAllReservas();
            return res.status(201).json(reservas);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async findReservaByPk(req:Request, res:Response) {
        try {
            const { numero } = req.params;
            const numeroReserva:number = Number(numero);
            const reserva = await this.reservaRepository.findReservaByPk(numeroReserva);
            return res.status(201).json(reserva);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export default ReservaController;