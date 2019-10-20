// JWT - solução para sessões de API RESTFUL
import jwt from 'jsonwebtoken';

// já faz parte do node
import { promisify } from 'util';

/*

    authConfig:
    chave secreta para geração de token, data de expiração 

*/
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // console.log(authHeader);

  // INTERROMPE se token não existe = não é usuário logado
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provider' });
  }

  /*
    
    poderia usar a desestruturação dessa forma
    const [bearer, token] = authHeader.split(' ');
    mas é possível utilizar da forma abaixo,
    deixando visível somente o que é útil 
   
   */
  const [, token] = authHeader.split(' ');

  try {
    // A função verify responde com callback, por isso o uso do promisify
    // promisify retorna uma função e imediatamente a chamamos passando params
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // se der certo, as informações que colocamos no payload do token
    // lá em SessionControle estarão no objeto decoded

    console.log(decoded);

    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token Invalid' });
  }
};
