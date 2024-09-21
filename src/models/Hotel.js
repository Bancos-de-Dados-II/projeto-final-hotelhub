import mongoose from "mongoose"
import { Schema } from "mongoose"

const HotelSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    cnpj: {
        type: String,
        required: true,
        unique: true,
    },
    localizacao: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    tipo: {
        type: String,
        required: true,
    }

})

const Hotel = mongoose.model('Hotel', HotelSchema)

export default Hotel