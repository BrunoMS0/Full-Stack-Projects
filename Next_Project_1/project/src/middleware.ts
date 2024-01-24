import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = (path === '/login' || path === '/signup') || path === '/verifyemail' || 
    path === '/forgotpassword' ||path === '/resetPassword' || path === '/newpassworddone';
  
  const token = request.cookies.get('token')?.value || '';
  /*El operador .? proporciona una forma segura de acceder a propiedades 
  en una cadena de acceso, especialmente cuando hay posibilidades de que algún nivel de 
  la cadena sea null o undefined.*/

  /*
    Si la cookie "token" está presente y tiene un valor: 
          - request.cookies.get('token')?.value devolverá el valor de la cookie "token"
          - el operador ?. permite acceder al valor
    
    Si la cookie "token" está presente pero no tiene un valor (por ejemplo, null o undefined):
          - En este caso, request.cookies.get('token')?.value devolverá undefined
          - debido al uso del operador de fusión nula (||), se asignará una cadena vacía a la variable token

    Si la cookie "token" no está presente:
          - En este caso, request.cookies.get('token') será undefined o null.
          - El operador de encadenamiento opcional (?.) evitará un error al acceder a value en undefined o null.
          - La expresión completa se evaluará como undefined, y debido al uso del operador de fusión nula (||), 
            se asignará una cadena vacía a la variable token.
  */
  
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  /*El propósito es evitar que un usuario ya autenticado acceda a páginas públicas, 
  por lo que se redirige a la página principal.*/

  if(!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/signup', request.nextUrl));
  }
  /*La intención aquí podría ser asegurarse de que un usuario no autenticado sea 
  redirigido a la página de inicio de sesión cuando intente acceder a rutas protegidas. */
}
 
// See "Matching Paths" below to learn more
//why without '/' you cannot in to that url?
export const config = {
  matcher: [
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
    '/forgotpassword',
    '/resetpassword',
    '/newpassworddone'
  ]
}