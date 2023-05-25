const { request } = require('express');
const connection = require ('../database/connection');
const { create, index } = require('./Pcontroller');

module.exports = {
    async index(request, response) {
        const {page = 1} = request.query;

        const [count] = await connection('casos').count();

        const casos = await connection ('casos')
        .join('pessoas', 'pessoas.id','=','casos.pessoas_id')
        .limit (5)
        .offset((page - 1)* 5)
        .select (['casos.*',
                 'pessoas.name',
                 'pessoas.email',
                 'pessoas.whatsapp',
                 'pessoas.city',
                 'pessoas.uf'   
    ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(casos);
    },
    async create (request, response) {
        const { title, description, value}= request.body;
        const pessoas_id = request.headers.authorization;

        const [id] = await connection ('casos').insert({
            title,
            description,
            value,
            pessoas_id,
        });

        return response.json({ id });
    },
    async delete (request, response) {
        const { id }= request.params;
        const pessoas_id = request.headers.authorization;

        const casos = await connection('casos')
        .where('id', id)
        .select('pessoas_id')
        .first();

        if (casos.pessoas_id === pessoas_id){
            return response.status(401).json({erro : 'operation not permitted.'});
        }

        await connection('casos').where ('id', id).delete();

        return response.status(204).send();
    }

};