'use strict'

const User = use('App/Models/User');

class authenticationCheck {

  async handle ({ request, response }, next) {
      const headers = request.headers();
      const token = headers['authorization'];
      
      if(token){
        const user = await User.query().where('token', token).first();

        if(!user){
          return response.status(401).json({'message':'Please login to access this feature'});
        }else{
          request.user = user.toJSON();
          await next();
        }
      }else{
        return response.status(403).json({
          message:"Login to access this feature"
        });
      }
}
}

module.exports = authenticationCheck
