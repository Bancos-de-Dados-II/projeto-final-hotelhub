import Hotel from '../models/Hotel.js'
import database from '../db/index.js'
import redisClient from '../db/redis.js'

//DELETAR A CHAVE HOTÉIS SEMPRE QUE: ADICIONAR, ATUALIZAR E REMOVER HOTÉIS

const adicionarHotel = async(req, res) => {
    try {
        await database()
        const hotel = await Hotel.create(req.body)

        const cache = await Hotel.find();
        await redisClient.set('hoteis', JSON.stringify(cache));
        
        res.status(201).json(hotel)
    } catch (error) {
        res.status(400).json(error);
    }
}

const listarHoteis = async (req, res) => {
    try {
        await database();

        const cachedHoteis = await redisClient.get('hoteis');

        if (cachedHoteis) {
            return res.status(200).json(JSON.parse(cachedHoteis));
        } else {
            const hoteis = await Hotel.find();

            if (hoteis && hoteis.length > 0) {
                await redisClient.set('hoteis', JSON.stringify(hoteis));
                console.log('Cache atualizado');
                console.log("MONGO");
                
                return res.status(200).json(hoteis);
            }
                
            return res.status(404).json({ message: 'Nenhum hotel encontrado' });
        }

    } catch (error) {
        console.error('Erro ao listar hotéis:', error);
        return res.status(400).json({ message: 'Erro ao listar hotéis', error: error.message });
    }
}


const buscarHotelPorCNPJ = async(req, res) => { 
        const { cnpj } = req.params;
        try {
            await database();
    
            const cachedHotel = await redisClient.get(`hotel:${cnpj}`);
            if (cachedHotel) {
                return res.status(200).json(JSON.parse(cachedHotel));
            }
    
            const hotel = await Hotel.findOne({ cnpj });
    
            if (!hotel) {
                return res.status(404).json({ message: 'Hotel não encontrado' });
            }
    
            await redisClient.set(`hotel:${cnpj}`, JSON.stringify(hotel));
    
            res.status(200).json(hotel);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao listar hotel por CNPJ' });
        }
}

const excluirHotel = async (req, res) => {
    const _id = req.params._id;
    try {
        await database();

        const hotel = await Hotel.findByIdAndDelete(_id);

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel não encontrado' });
        }

        const cache = await Hotel.find();
        await redisClient.set('hoteis', JSON.stringify(cache));

        res.status(200).json({ message: 'Hotel excluído com sucesso' });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao excluir hotel' });
    }
};

const atualizarHotel = async (req, res) => {
    const id  = req.params._id;
    
    try {
        await database();

        const hotel = await Hotel.findByIdAndUpdate(id, req.body, { new: true });

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel não encontrado' });
        }

        await redisClient.set(`hotel:${hotel.cnpj}`, JSON.stringify(hotel));

        res.status(200).json(hotel);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar hotel' });
    }
};

export { adicionarHotel, listarHoteis, buscarHotelPorCNPJ, excluirHotel, atualizarHotel };