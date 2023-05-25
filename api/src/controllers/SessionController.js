const connection = require('../database/connection');
const { create } = require('./Pcontroller');

module.exports = {
    async create (request, response) {
        const { id } =request.body;

        const pessoas =await connection('pessoas')
        .where('id',id)
        .select ('name')
        .first ();

        if (!pessoas){
            return response.status(400).json({ error: 'no pessoas found with this ID'});

        }
        return response.json(pessoas);

    }
}