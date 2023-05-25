const crypto = require('crypto');
const connection = require('../database/connection');


module.exports = {
    async index (request, response) {
        const pessoas = await connection ('pessoas').select('*');
    
        return response.json(pessoas);
    },

    async create (request, response) {
        const {name, email, whatsapp, city, uf} = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('pessoas').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({id});
    }    
    
};