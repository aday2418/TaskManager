import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import validate from './actions/validate';


export async function middleware(request : NextRequest) { 
  
  console.log("RUNNING MIDDLEWARE");

  const token = request.cookies.get('access_token')?.value;
  console.log("Token:",token)

  if(!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const { data, error } = await validate();
  if(!data) { 
    console.log("Bad Token", data);
    return NextResponse.redirect(new URL("/", request.url));
  } 

  return NextResponse.next();
  
}

export const config = {
    matcher: [
        '/dashboard/:path*',
    ],
}