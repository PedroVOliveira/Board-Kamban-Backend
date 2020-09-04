const connection = require("../database/connection");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
module.exports =  {
    async auth(req,res) {
        const { email , password } = req.body;
        
        const [user] = await connection('users').where('email', email).select('password','id');
    
        if(!await bcrypt.compare(password, user.password)) {
            return res.status(401).send({error:'invalid password'})
    
        }
        
        let token = jwt.sign({ user_id: user.id }, process.env.SECRET, {
            expiresIn: 60 * 60 * 24  // expires in 1 day
          });
          
          
          return res.json({ auth: true, token: token });
        
    }
}