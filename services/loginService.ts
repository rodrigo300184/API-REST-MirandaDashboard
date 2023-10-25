import  jwt  from "jsonwebtoken";
import 'dotenv/config'; 

const defaultUser = {
    user: "admin",
    password: "admin",
  };

  const secret: string = process.env.SECRET_KEY || '';
  
  async function login(user: string, password: string) {
    if(user === defaultUser.user && password === defaultUser.password ){
        return signJWT({user})
    }else {
        throw new Error('Wrong user or password!')
    }
    
  }
  
  function signJWT(payload: { user: string }) {
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return {payload,token};
  }
  
  function verifyJWT(token: string) {
    // Verify the jwt token
  }
  
  const authService = {
    login,
    signJWT,
    verifyJWT,
  };
  
  export default authService;