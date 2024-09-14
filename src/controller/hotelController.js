import Hotel from "../models/Hotel.js";

const adicionarHotel = async(req, res) => {
    try {
        const hotel = await Hotel.create(req.body);
        res.status(201).json(hotel);
    } catch (error) {
        res.status(400).json('Error');
    }
}

const listarHoteis = async(req, res) => {
    try {
        const hoteis = await Hotel.findAll();
        res.status(201).json(hoteis);
    } catch (error) {
        res.status(400).json('Error ao listar hotéis');
    }
}

const listarHoteisPorCNPJ = async(req, res) => { 
    try {
        const cnpj = req.params.cnpj;
        const hoteisPorCnpj = await Hotel.findOne({
            where: {
                cnpj,
            }
        });
        res.status(201).json(hoteisPorCnpj);
    } catch (error) {
        res.status(400).json('Hotel não existe!');
    }
}

const excluirHotel = async(req, res) => {
    try {
        const id = req.params.id;
        const hotelExluir = await Hotel.findByPk(id);
        hotelExluir.destroy();
        res.status(201).json('Hotel exluido');
    } catch (error) {
        res.status(400).json('Não foi possível excluir hotel');
    }
}

const atualizarHotel = async(req, res) => {
    const { nome, localizacao } = req.body;
    try {
        const id = req.params.id;

        const hotelAtualizar = await Hotel.findByPk(id);

        hotelAtualizar.nome = nome;
        hotelAtualizar.localizacao = localizacao;

        await hotelAtualizar.save();

        res.status(201).json(hotelAtualizar);

    } catch (error) {
        res.status(400).json('Não foi possível atualizar o hotel');
    }
}


export { adicionarHotel, listarHoteis, listarHoteisPorCNPJ, excluirHotel, atualizarHotel };