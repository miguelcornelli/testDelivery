const connection = require('../database/connection')
module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;

        const[count] = await connection('incidents').count();

        console.log(count);

        const incidents = await connection('incidents')
        .join('pedidos', 'pedidos.id', '=', 'incidents.pedido_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'incidents.*',
            'pedidos.name',
            'pedidos.email',
            'pedidos.whatsapp',
            'pedidos.city',
            'pedidos.uf'
        ]);

        response.headers('x-Total-Count', count['count(*)']);
        
      return response.json(incidents);
    },

    async create(request, response){
        const { title, description, value } = request.body;
       const pedido_id = request.headers.authorization;

      const [id] = await connection('incidents').insert({
           title,
           description,
           value,
           pedido_id,
       })

       return response.json({ id })
    },
    
    async delete(request, response){
        const { id } = request.params;
        const pedido_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('pedido_id')
        .first();

    if(incident.pedido_id !== pedido_id){
        return response.status(401).json({error: 'Operation not permitted.'})
    }
    await connection('incidents').where('id', id).delete();
    return response.status(204).send();
    },
};