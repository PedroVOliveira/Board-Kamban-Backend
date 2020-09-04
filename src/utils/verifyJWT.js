const jwt = require('jsonwebtoken');
module.exports = {
     verifyJWT(req, res, next){
        var token = req.headers['authorization'];
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token.replace('Bearer ',''), process.env.SECRET, function(err, decoded) {
          if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
          
          // se tudo estiver ok, salva no request para uso posterior
          req.user_id = decoded.user_id;
          console.log(decoded);
          next();
        });
    }
}