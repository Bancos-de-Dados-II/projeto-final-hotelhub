import { Request, Response } from "express";
import HotelRepository from "./hotelRepository.ts";
import { HotelSchema, HotelDTO } from "./HotelDTO.ts";
import { z } from "zod";
import UsuarioController from "../UsuarioController/controllerUsuario.ts";

class HotelController {
    hotelRepository: HotelRepository;

    constructor(hotelRepository: HotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    async addHotel(req: Request, res: Response) {
        try {
            const hotelData: HotelDTO = HotelSchema.parse(req.body);
            const hotel = await this.hotelRepository.addHotel(hotelData);
            
            return res.status(201).json(hotel);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: error.errors });
            }
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async listAllHotels(req:Request, res:Response) {
        try {
            const hoteis = await this.hotelRepository.listAllHotels();
            return res.status(201).json(hoteis);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async deleteHotel(req: Request, res: Response) {
        const { cnpj } = req.body
        try {
            await this.hotelRepository.deleteHotel(cnpj);
            return res.status(201).json('Hotel removido!');

        } catch(error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async findHotelByPk(req: Request, res: Response) {
        const cnpj = decodeURIComponent(req.params.cnpj);
        try {
            const hotel = await this.hotelRepository.findHotelByPk(cnpj);
            return res.status(201).json(hotel);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async updateHotel(req:Request, res:Response) {
        try {
            const hotelData: HotelDTO = HotelSchema.parse(req.body);
            const cnpj = req.body.cnpj;
            const newHotel = await this.hotelRepository.updateHotel(cnpj, hotelData);
            return res.status(201).json(newHotel);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export default HotelController;