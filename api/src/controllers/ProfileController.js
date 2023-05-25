const connection = require('../database/connection');
const { index } = require('./Pcontroller');

module.exports = {
    async index(request, response){
        const pessoas_id = request.headers.authorization;
        
        const casos = await connection('casos')
        .where ('pessoas_id', pessoas_id)
        .select('*');

        return response.json(casos);
    }
}