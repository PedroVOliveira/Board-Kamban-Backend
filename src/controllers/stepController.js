const connection = require("../database/connection");
const { update } = require("../database/connection");

module.exports = {
    async index(req,res) {
        const steps = await connection('step').select('*');
        return res.json(steps);
    },
    async create(req,res) {
        const { title, board_id } = req.body;
        const board = await connection('board').where('id',board_id);
        if(!board.length) {
            return res.status(404).send({error: 'Board não Existe!'});
        }
        const [step] = await connection('step').insert({
            title,
            board_id,
        });
        return res.json({id:step,title,board_id});
    },

    async update(req,res) {
        const { title,board_id } = req.body;
        const board = await connection('board').where('id',board_id);

        if(!board.length) {
            return res.status(404).send({error:'Board Não existe'});
        }
        const [step] = await connection('step').update({
            title,
        })
        
        return res.json({id:step,title,board_id});
        
    }
}