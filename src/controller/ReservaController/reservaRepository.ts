import { Sequelize, Model, UUID } from "sequelize";
import Reserva from "../../database/models/Reserva.ts";
import { ReservaDTO } from "./ReservaDTO.ts";

class ReservaRepository {
    constructor(private sequelize: Sequelize) {}

    async addReserva(reserva: Partial<Reserva>): Promise<Reserva> {
        try {
            return await Reserva.create(reserva as Reserva)
        } catch (error) {
            console.error('Erro ao fazer reserva:', error);
            throw new Error('Erro ao fazer reserva');
        }
    }

    async deleteReserva(numero: number): Promise<void> {
        try{
            await Reserva.destroy({
                where:{
                    numero:numero,
                }
            });
        } catch(error) {
            console.error('Erro ao remover usuário', error);
            throw new Error('Erro ao remover usuário');
        }
    }

    async listAllReservas(): Promise<Reserva[]> {
        try {
            return await Reserva.findAll();
        } catch (error) {
            console.error('Erro ao listar reservas', error);
            throw new Error('Erro ao listar reservas');
        }
    }

    async findReservaByPk(numero: number): Promise<Reserva | null> {
        try {
            const reserva: Reserva|null = await Reserva.findByPk(numero);
            return reserva;
        } catch (error) {
            console.error('Erro ao buscar reserva', error);
            throw new Error('Erro ao buscar reserva');
        }
    }

    async updateReserva(numero: number, reserva: Reserva | ReservaDTO): Promise<unknown | null> {
        try {
            const newReserva = await Reserva.update({
                ...reserva
            }, {
                where:{
                    numero: numero,
                }
            })
            return newReserva;
        } catch(error) {
            console.error('Erro ao atualizar reserva', error);
            throw new Error('Erro ao atualizar reserva');
        }
    }
}

export default ReservaRepository;
    