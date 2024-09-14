import { Table, Column, Model, PrimaryKey } from "sequelize-typescript";
import sequelize from "../database";

@Table ({
    tableName: "hoteis"
})
class Hotel extends Model<Hotel> {
    @PrimaryKey
    @Column
    cnpj!: string;

    @Column
    nome!: string;

    @Column
    descricao!: string;

    @Column
    imagem!: string;

    @Column
    classificacao!: string;

    @Column
    endereco!: string;
}

export default Hotel;
