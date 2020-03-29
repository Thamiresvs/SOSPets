const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { id } = request.body;
        console.log(request.body);
        
        const ong = await connection('ongs')
            .where('id', '5bc77356')
            .select('name')
            .first();

            if(!ong){
                return response.status(400).json({ error: 'ID da ONG incorreto' });
            }

            return response.json(ong);
    
    }
}   