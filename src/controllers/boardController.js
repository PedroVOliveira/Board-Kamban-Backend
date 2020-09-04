const connection = require("../database/connection");
module.exports = {
    async index(req,res) {
        const [board] = await connection('board').select('*').where('user_id',req.user_id);
        const steps = await connection('step').select('*').where('board_id',board.id);
        board.steps = steps;
        for(step of steps) {
            const tasks = await connection('task').select('*').where('step_id',step.id);
            step.tasks = tasks; 
        }
        return res.send(board);
    }
}