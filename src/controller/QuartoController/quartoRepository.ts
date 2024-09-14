import { Sequelize, Model, UUID } from "sequelize";
import Quarto from '../../database/models/Quarto.ts';
import { QuartoDTO } from "./QuartoDTO";
import { number } from "zod";

class QuartoRepository {
    constructor(private sequelize: Sequelize) {}

    async addQuarto(quarto: Partial<Quarto>): Promise<Quarto> {
        try {
            return await Quarto.create(quarto as Quarto);
        } catch (error) {
            console.error('Erro ao adicionar quarto:', error);
            throw new Error('Erro ao adicionar quarto');
        }
    }

    async listAllRooms(): Promise<Quarto[]> {
        try {
            return await Quarto.findAll();
        } catch (error) {
            console.error('Erro ao listar quartos', error);
            throw new Error('Erro ao listar quartos');
        }
    }

    async deleteRoom(numero: number, hotelCNPJ: string):Promise<void> {
        try {
            await Quarto.destroy({
                where:{
                    numero:numero,
                    hotelCNPJ:hotelCNPJ
                }
            })
        } catch (error) {
            console.error('Erro ao buscar quarto', error);
            throw new Error('Erro ao buscar quarto');
        }
    }

    async findRoomByPk(numero:number, hotelCNPJ:string):Promise<Quarto | null> { 
        try {
            const quarto: Quarto | null = await Quarto.findOne({
                where: { numero:numero
                    , hotelCNPJ:hotelCNPJ}
            });
            return quarto;
        } catch (error) {
            console.error('Erro ao buscar quarto', error);
            throw new Error('Erro ao buscar quarto');
        }
    }

    async updateRoom(numero:number, hotelCNPJ:string, room:Quarto|QuartoDTO):Promise<unknown | void> {
        try {
            const newRoom = await Quarto.update({
                ...room
            }, {
                where:{
                    numero:numero,
                    hotelCNPJ:hotelCNPJ
                }
            })
            return newRoom;
        } catch(error) {
            console.error('Erro ao atualizar quarto', error);
            throw new Error('Erro ao atualizar quarto');
        }
    }
}

export default QuartoRepository;