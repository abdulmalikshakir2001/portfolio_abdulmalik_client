import * as jose from "jose";
export default async function verifyJwtToken(authUserToken:Uint8Array|string){
    const secret = new TextEncoder().encode(
        'abdulmalikshakir2001',
      )
      const jwt = authUserToken
        
      try{
        const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret, {})
      return payload;

      }catch(error){
        return undefined;

      }
      

}

