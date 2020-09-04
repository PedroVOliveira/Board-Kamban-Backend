const connection = require("../database/connection");

module.exports = {
    async index(req,res) {
        const tasks = await connection('task').select('*');
        return res.json(tasks);
    },
    
    async create(req,res) {
        // A parte de login vem no cabeçalho da requisição, e por esse motivo o ong_id não é passado por aqui :)
        const { title,step_id, content, date } = req.body;
        const step = await connection('step').where('id', step_id);
        if(!step.length) {
            return res.status(404).send({error: 'step não Existe!'});
        }
        const [task] = await connection('task').insert({
            title,
            content,
            date,
            step_id,
        });
        return res.json({id:task,title,content,date,step_id});
    },

    
}