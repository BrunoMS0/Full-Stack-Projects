"use client"
import React,{useEffect} from "react"
import "../styleSheets/main.css"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"


export default function main(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        username:""
    });
    const [login,setLogin] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    const logout = async () => {
        try{
            await axios.get("/api/users/logout");
            setUser({
                username:""
            })
            setLogin(false);
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }
    }

    const getUser = async () => {
        try{
            const response = await axios.get("/api/users/me");
            console.log(response.data);
            setUser(response.data.data);//response.data is all the request, the next data is the property
            setLogin(true);
            console.log(user);
            return response.data;
        }
        catch (error: any){
            console.log(error.message);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return(
        <body>
            <header>
                <div className="headerContainer">

                    <div className="home">
                        <a href="#" className="BotonCasa"><span>Home</span></a>
                    </div>

                    <div className="headerContainer-nav">
                        <nav className="nav">
                            <ul className="list">
                                <li className="list-Item list-Item-click">
                                    <div className="list-buttom list-buttom-click">
                                        <a className="nav-link"><span>Inicio</span></a>
                                        <img src="assets/arrow.svg" className="list-arrow"/>
                                    </div>
                                    <ul className="list-show-1">
                                        <li className="list-inside">
                                            <a href="#" className="nav-link nav-link-inside"><span>Opcion1</span></a>
                                        </li>
                                        <li className="list-inside">
                                            <a href="#" className="nav-link nav-link-inside"><span>Opcion2</span></a>
                                        </li>
                                        <li className="list-inside">
                                            <a href="#" className="nav-link nav-link-inside"><span>Opcion3</span></a>
                                        </li>
                                    </ul>
                                </li> 
                                    
                                <li className="list-Item">
                                    <div className="list-buttom">
                                        <a className="nav-link" href="#"><span>Novedades</span></a>
                                    </div>
                                </li> 

                                <li className="list-Item list-Item-click">
                                    <div className="list-buttom list-buttom-click">
                                        <a className="nav-link"><span>Articulos</span></a>
                                        <img src="assets/arrow.svg" className="list-arrow"/>
                                    </div>
                                    <ul className="list-show-2">
                                        <li className="list-inside">
                                            <a href="#" className="nav-link nav-link-inside"><span>Opcion1</span></a>
                                        </li>
                                        <li className="list-inside">
                                            <a href="#" className="nav-link nav-link-inside"><span>Opcion2</span></a>
                                        </li>
                                    </ul>
                                </li> 

                                <li className="list-Item list-Item-click">
                                    <div className="list-buttom list-buttom-click login-buttom">
                                        {login ? (<a className="nav-link login-nav">{user.username}</a>) : (<a className="nav-link login-nav" href="/login">login</a>)}
                                    </div>
                                </li> 

                                <li className="list-Item list-Item-click">
                                    <div className="list-buttom list-buttom-click signup-buttom">
                                        {login ? (<a onClick={logout} className="nav-link logout-nav">Logout</a>) : (<a className="nav-link signup-nav" href="/signup">Signup</a>)}
                                    </div>
                                </li> 
                            
                            </ul>

                        </nav>
                    </div>

                </div>
                
                <nav></nav>
            </header>

            <div className="imgContainer">
                <div className="image-title">
                    <h1>Welcome <br/> to <br/>the <br/> Website</h1>
                </div>
                <div className="image-description">
                    <div className="image-description-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries    .</p>
                    </div>
                    <div className="image-buttom">
                        <button type="button" id="boton" className="boton">About Us</button>
                    </div>
                </div>
            </div>
            <div className="ProductsContainer">
                <div className="product-headerText">
                    <div className="product-header-title">
                        <h1>With a hub, it all makes sense. </h1>
                    </div>
                    <div className="product-header-description">
                        <p>Sitting at the center of your analytics and reporting, Funnel helps you gain control of your performance along every step of the way.</p>
                    </div>
                </div>
                <div className="product-number">
                    <div className="product">
                        <div className="product-image"><img src="imagenes/RAINING.jpg"/></div>
                        <div className="product-text">
                            <div className="product-Title"><h1>Product 1</h1></div>
                            <div className="product-description"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p></div>
                            <div className="product-boton">
                                <a href="#" className="products-verMas">Ver mas</a>
                                <img src="assets/arrow-down.svg" className="arrow-products"/>
                            </div>
                        </div>
                    </div>
                    <div className="product">
                        <div className="product-image"><img src="imagenes/METROPOLIS.jpg"/></div>
                        <div className="product-text">
                            <div className="product-Title"><h1>Product 2</h1></div>
                            <div className="product-description"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></div>
                            <div className="product-boton">
                                <a href="#" className="products-verMas">Ver mas</a>
                                <img src="assets/arrow-down.svg" className="arrow-products"/>
                            </div>
                        </div>
                    </div>
                    <div className="product">
                        <div  className="product-image"><img src="imagenes/RAINING.jpg"/></div>
                        <div className="product-text">
                            <div className="product-Title"><h1>Product 3</h1></div>
                            <div className="product-description"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has.</p></div>
                            <div className="product-boton">
                                <a href="#" className="products-verMas">Ver mas</a>
                                <img src="assets/arrow-down.svg" className="arrow-products"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="videoContainer">
                <div className="video-text">
                    <div className="video-text-title"><h1>How?</h1></div>
                    <div className="video-text-description">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuriest.</p>
                    </div>
                    <div className="video-text-checkList">
                        <ul className="video-list">
                            <li className="video-list-inside">                     
                                <img src="assets/check.svg" className="video-list-check"/>
                                <p className="video-list-description">check 1</p>                     
                            </li>
                            <li className="video-list-inside">                       
                                <img src="assets/check.svg" className="video-list-check"/>
                                <p className="video-list-description">check 2</p>                        
                            </li>
                            <li className="video-list-inside">                   
                                <img src="assets/check.svg" className="video-list-check"/>
                                <p className="video-list-description">check 3</p>
                            </li>
                        </ul>
                    </div>
                    <div className="video-buttom">
                        <button type="button" className="video-buttom-click">Lean More</button>
                    </div>
                </div>
                <div className="video-video">
                    <video className="video-reproduction" unmute controls>
                        <source src="videos/paypal.mp4" type="video/mp4"/>
                        Tu navegador no soporta el video
                    </video>
                </div>
            </div>



            <div id="about-us" className="about-us">
                <div className="about-us-container">
                    <div className="about-us-text">
                        <div className="about-us-title">
                            <h1>Title About</h1>
                        </div>
                        <div className="about-us-description">
                            <p>Lorem Ipsum is <span className="bold">"simply dummy text of the printing and typesetting industry"</span>. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        </div>
                    </div>
                    <div className="about-us-image"></div>
                </div>
            </div>

            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-column">
                        <div className="footer-text">
                            <div className="footer-title"><h3>Ubicacion</h3></div>
                            <div className="footer-description"><p>La ubicacion de esta tienda se encuentra en miami beach, Florida. Cerca a la playa, por la arena</p></div>
                        </div>
                        <div className="footer-ubication">
                            <img src="assets/ubication.svg" className="footer-image"/>
                            <a href="https://www.google.com/maps/place/Miami+Beach,+FL,+USA/@25.868863,-80.1218848,17.17z/data=!4m6!3m5!1s0x88d9a6172bfeddb9:0x37be1741259463eb!8m2!3d25.790654!4d-80.1300455!16zL20vMHJubXk?entry=ttu" className="footer-ubication-link">Ver Ubicacion</a>
                        </div>
                    </div>
                    <div className="footer-column">
                        <div className="footer-text">
                            <div className="footer-title"><h3>Contacto</h3></div>
                            <div className="footer-description footer-description-contact">
                                <p><span className="bold">Telefono de contacto:</span> 422-48565</p>
                                <p><span className="bold">Numero de celular:</span> 922485655</p>
                                <p><span className="bold">Correo:</span> buomosu26@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="footer-column">
                        <div className="footer-text">
                            <div className="footer-title"><h3>More information</h3></div>
                            <div className="footer-description"><p>Mas informacion sobre nosotros:</p></div>
                        </div>
                        <div className="footer-more">
                            <nav className="footer-nav">
                                <ul className="footer-list">
                                    <li className="footer-link"><a href="#">Politicas de privacidad</a></li>
                                    <li className="footer-link"><a href="#">Terminos y condiciones</a></li>
                                    <li className="footer-link"><a href="#">Libro de reclamaciones</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="footer-socialmedia">
                    <nav className="footer-socialmedia-nav">
                        <ul className="footer-socialmedia-list">
                            <li className="footer-socialmedia-link"><a href="#"><img src="assets/instagram.svg"/></a> </li>
                            <li className="footer-socialmedia-link"><a href="#"><img src="assets/meta.svg"/></a> </li>
                            <li className="footer-socialmedia-link"><a href="#"><img src="assets/youtube.svg"/></a> </li>
                            <li className="footer-socialmedia-link"><a href="#"><img src="assets/spotify.svg"/></a> </li>
                        </ul>
                    </nav>
                </div>
            </footer>

            <button type="button" id="go-to-top" className="top">
                <img src="assets/arrow-top.svg" title="img-top" className="img-top"/>
            </button>

            <script src="scripts.js"></script>
        </body>
    )
}
