import { NextResponse, NextRequest } from 'next/server';
// import { getAuthToken } from './app/_server_utility_functions/getAuthToken';
import { getAuthToken } from './utility_functions/getAuthToken';

export async function middleware(request: NextRequest) {
//   ------------------------------------------------------------------------------------------------------
    const authUser =  await getAuthToken(request)
    

  if ( request.nextUrl.pathname.startsWith('/login') ) {
  if (authUser) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
//   else{
//     return NextResponse.redirect(new URL('/login', request.url));


//   }
  
  }
  

//   ------------------------------------------------------------------------------------------------------
  if(request.nextUrl.pathname.startsWith('/dashboard')){
  if(!authUser){
    return NextResponse.redirect(new URL('/login', request.url));
  }
  }
//   ------------------------------------------------------------------------------------------------------

}
export const config = {
  matcher: ['/login','/dashboard'],
};