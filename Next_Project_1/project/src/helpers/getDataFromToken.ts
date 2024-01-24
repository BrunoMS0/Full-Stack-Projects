import { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';

        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        /*'token' es el que se va a verificar y 'process.env.TOKEN_SECRET!' es con lo que se le va 
        a verificar. El operador ! se usa para indicar que se asume que la variable de entorno está 
        presente y no es null o undefined. */

        /*: any: Es una anotación de tipo que indica que se está utilizando el tipo 'any' para la variable 
        decodedToken. Esto significa que TypeScript no realizará comprobaciones de tipo específicas para 
        esta variable, permitiendo cualquier tipo de valor. */

        /*Este método verifica la validez del token y, si es válido, lo decodifica para obtener la 
        información contenida en el token. Si la verificación es exitosa, devuelve un objeto que representa 
        la información decodificada del token. Esto podría incluir el ID del usuario, la fecha de expiración, 
        u otros datos que hayan sido incluidos al momento de generar el token. */

        return decodedToken.id;
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}