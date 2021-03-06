const connection = require('../database/connection')

module.exports ={
    async create (request, response){
        const { id } = request.body;

        const pedido = await connection('pedidos')
            .where('id', id)
            .select('name')
            .first();

    if (!pedido){
        return response.status(400).json({ error: 'No PEDIDO found with this ID '});
    }

        return response.json(pedido)
    }
}