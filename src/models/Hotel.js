import sequelize from "../db/database.js";
import { DataTypes } from "sequelize";

const Hotel = sequelize.define("hoteis", {
    id: {
        type:DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    cnpj: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    localizacao: {
        type: DataTypes.GEOMETRY,
    }
});

async function sincronizar() {
    await Hotel.sync();
} 

sincronizar();

export default Hotel;