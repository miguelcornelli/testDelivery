const connection = require('../database/connection')

module.exports ={
    async index(request, response){
        const pedido_id = request.headers.authorization

        const incidents = await connection('incidents')
            .where('pedido_id', pedido_id)
            .select('*');

        return response.json(incidents)
    }
}