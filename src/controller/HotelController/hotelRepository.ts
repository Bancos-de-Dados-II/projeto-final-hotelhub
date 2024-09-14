import { Sequelize, Model, UUID } from "sequelize";
import Hotel from '../../database/models/Hotel.ts';
import { HotelDTO } from "./HotelDTO.ts";

class HotelRepository {
    constructor(private sequelize: Sequelize) {}

    async addHotel(hotel: Partial<Hotel>): Promise<Hotel> {
        try {
            return await Hotel.create(hotel as Hotel);
        } catch (error) {
            console.error('Erro ao adicionar hotel:', error);
            throw new Error('Erro ao adicionar hotel');
        }
    }

    async listAllHotels(): Promise<Hotel[]> {
        try {
            return await Hotel.findAll();
        } catch (error) {
            console.error('Erro ao listar hotéis', error);
            throw new Error('Erro ao listar hotéis');
        }
    }

    async deleteHotel(cnpj: string): Promise<void> {
        try {
            await Hotel.destroy({
                where: {
                    cnpj: cnpj,
                },
            });
        } catch (error) {
            console.error('Erro ao deletar hotel', error);
            throw new Error('Erro ao deletar hotel');
        }
    }

    async findHotelByPk(cnpj: string): Promise<Hotel | null> {
        try {
            const hotel:Hotel|null = await Hotel.findByPk(cnpj);
            return hotel;
        } catch (error) {
            console.error('Erro ao buscar hotel', error);
            throw new Error('Erro ao buscar hotel');
        }
    }

    async updateHotel(cnpj:string, hotel:Hotel|HotelDTO):Promise<unknown | void> {
        try {
            const newHotel = await Hotel.update({
                ...hotel
            }, {
                where:{
                    cnpj:cnpj
                }
            })
            return newHotel;
        } catch(error) {
            console.error('Erro ao atualizar hotel', error);
            throw new Error('Erro ao atualizar hotel');
        }
    } 
}

export default HotelRepository;