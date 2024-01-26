import verifyJwtToken from './verifyJwtToken';
import {  NextRequest } from 'next/server';
// import jwt  from 'jsonwebtoken';
export  async  function  getAuthToken(request:NextRequest){
    const cookies = request.cookies;
    const authToken = cookies.get('authToken');
    


    
    


    if(!authToken){
    return null

}
else{
    const authUser =  await  verifyJwtToken(authToken?.value)

 return authUser;

}

}