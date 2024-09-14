import { Table, Column, Model, PrimaryKey, ForeignKey, AllowNull } from "sequelize-typescript";
import Usuario from "./Usuario";
import Quarto from "./Quarto";
import Hotel from "./Hotel";

@Table({
    tableName: "reservas"
})
class Reserva extends Model<Reserva> {
    @PrimaryKey
    @Column
    numero!: number;

    @Column
    checkin!: string;

    @Column
    checkout!: string;

    @ForeignKey(
        () => Usuario
    )
    @Column ({
        allowNull: false
    })
    usuarioCPF!: string;

    @ForeignKey(
        () => Quarto
    )
    @Column
    quartoNumero!: number;

    @ForeignKey(
        () => Hotel
    )
    @Column
    hotelCNPJ!: string;
}

export default Reserva;