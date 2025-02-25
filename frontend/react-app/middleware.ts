import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import validate from './actions/validate';


export async function middleware(request : NextRequest) { 
  const token = request.cookies.get('access_token')?.value;

  if(!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const { data, error } = await validate();
  if(!data) { 
    return NextResponse.redirect(new URL("/", request.url));
  } 

  return NextResponse.next();
  
}

export const config = {
    matcher: [
        '/dashboard/:path*',
    ],
}