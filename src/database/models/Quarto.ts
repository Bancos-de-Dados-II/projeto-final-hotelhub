import { Table, Column, Model, PrimaryKey, ForeignKey, DataType } from "sequelize-typescript";
import sequelize from "../database";
import Hotel from "./Hotel";

@Table({
    tableName: "quartos"
})
class Quarto extends Model<Quarto>{
    @PrimaryKey
    @Column
    numero!: number;

    @PrimaryKey
    @ForeignKey(
        () => Hotel
    )
    @Column
    hotelCNPJ!: string;
    
    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    preco!: number;

    @Column
    tipo!: string;
}

export default Quarto;