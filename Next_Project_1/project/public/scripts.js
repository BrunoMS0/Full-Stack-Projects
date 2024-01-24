let listElements = document.querySelectorAll('.list-buttom-click');//lista de los elementos que van a aparecer o desaparecer
// se seleccionaron las clases que contienen un submenu
let submenus = document.querySelectorAll('.list-show-1, .list-show-2');

function eliminarSubmenus(){
    submenus.forEach(cadaSubmenu => {
        cadaSubmenu.classList.remove('menu');
        cadaSubmenu.style.height=0;
        cadaSubmenu.style.display = 'none';
    });
}
function eliminarArrow(){
    listElements.forEach(elemtList => {
        elemtList.classList.remove('arrow');
    });//elimino cualquier otra clase para que solo sean 1 a la vez
}

listElements.forEach(element => {
    element.addEventListener('click', () => {
        const nextSibling = element.nextElementSibling;
        if(nextSibling !== null){
            const tieneClase = element.classList.contains('arrow');

            eliminarSubmenus();
            eliminarArrow();

            nextSibling.style.display = 'block';
            
            
            let height = 0;
            let menu = nextSibling;  
            
            if(menu.clientHeight == 0){
                height = menu.scrollHeight;
            }

            if(!tieneClase){
                element.classList.toggle('arrow');
                element.nextElementSibling.classList.toggle('menu');
                menu.style.height = `${height}px`;
            }
        }else{
            console.error('No sibling found');
        }
        //the conditional is to verify if the next element sibling has an element
        
    });
});

let buttom = document.getElementById('boton');
let seccionInterna = document.getElementById('about-us');
buttom.addEventListener('click', () => {
    seccionInterna.scrollIntoView({behavior: "smooth"});

});


window.addEventListener('scroll', () => {
    let header = document.querySelector("header");
    header.classList.toggle('abajo-header',window.scrollY>0);
});

document.addEventListener('click', function (e) {
    // Verificar si se hizo clic fuera del área del menú desplegable
    var listItemClick = document.querySelector('.list');

    if (
        e.target.closest('.list') !== listItemClick 
    ) {
        // Ocultar los submenús
        eliminarSubmenus();
        eliminarArrow();
    }
});


let topList =  document.getElementById('go-to-top');

window.addEventListener('scroll', () => {

    topList.classList.toggle('go-to-top',window.scrollY>75);
    if (window.scrollY > 75) {
        topList.style.display = 'initial';
    } else {
        topList.style.display = 'none';
    }
});
topList.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});