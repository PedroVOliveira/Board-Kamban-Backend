const crypto = require('crypto');
const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
module.exports = {
    async index(request,response) {
        // Seleciona tudo
        const users = await  connection('users').select('users.id','users.name','users.email');
        return response.json(users);
    },
    
    async create(request,response) {
        const {name,email, password } = request.body;
        
        
        const encript = bcrypt.hash(password,10, async function(err, hash) {
            
            const [user_id] = await connection('users').insert({
                name,
                email,
                password:hash,
            })

            let token = jwt.sign({ user_id: user_id }, process.env.SECRET, {
                expiresIn: 60 * 60 * 24  // expires in 5min
            });
            const [board_id] = await connection('board').insert({
                user_id
            })
              
            return response.json({ id:user_id, token,board_id });
        });

    },
}