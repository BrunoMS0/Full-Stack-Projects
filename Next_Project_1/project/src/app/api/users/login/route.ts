import {connect} from "@/dbConfig/dbConfig.js"
import User from "@/model/userModel.js"
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        /*Este request recibe el body que seria el username, password y email.
         Lo recibe del servidor del cliente*/
        const {email,password} = reqBody;
        console.log('reqBody is:');
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({ email });
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400});
        }

        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);//compare the password against the encrypted password 
        if(!validPassword){
            return NextResponse.json({error: "Password is incorrect"}, {status: 400});
        }

        //create token data
        const tokenData = {
            id: user._id,//the _id is a property of the user in DB
            username: user.username,
            email: user.email
        }

        //create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1h'});//the ! means that it's comming
        /*
        -"tokenData": Se utiliza como carga útil del token. En otras palabras, 
        contiene la información que se va a incluir en el token.

        -"process.env.TOKEN_SECRET": es la clave secreta utilizada para firmar el token. 
        Es una práctica común almacenar la clave secreta en una variable de entorno para mayor seguridad.

        -"{expiresIn: '1h'}": especifica que el token expirará después de 1 hora. Después de este tiempo, 
        el token ya no será válido y el usuario deberá volver a iniciar sesión.
        */

        /*Este código toma cierta información del usuario, la incluye en un objeto tokenData, 
        y luego utiliza jsonwebtoken para firmar un token JWT que contiene esos datos. 
        Este token se puede utilizar para autenticar al usuario en futuras solicitudes. Agrega una capa
        adicional de seguridad */


        const response  = NextResponse.json({
            message: "login successful",
            success: true
        })

        response.cookies.set("token", token, { httpOnly: true });
        /*
                    EL .set ES PARA ESTABLECER UAN COOKIE EN LA RESPUESTA
        "token": El primer argumento es el nombre de la cookie, en este caso, se llama "token". 
         token: El segundo argumento es el valor de la cookie, que en este caso es el token JWT que se generó anteriormente.
         {httpOnly:true}: Es una opción de seguridad que indica al navegador que la cookie solo debe ser accesible a través de 
                            HTTP y no a través de scripts del lado del cliente
        */

        return response;
    }
    catch (error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }   
}