import { Table, Column, Model, PrimaryKey, ForeignKey } from "sequelize-typescript";
import sequelize from "../database";
import Usuario from "./Usuario";
import Hotel from "./Hotel";

@Table({
    tableName: "avaliacoes"
})
class Avaliacao extends Model<Avaliacao> {
    @PrimaryKey
    @Column
    codigo!: string;

    @ForeignKey(
        () => Usuario
    )
    @Column
    usuarioCPF!: string;

    @ForeignKey(
        () => Hotel
    )
    @Column
    hotelCNPJ!: string;
    
    @Column
    feedback!: string;
}

export default Avaliacao;