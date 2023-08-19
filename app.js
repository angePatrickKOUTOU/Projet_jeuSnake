const canvas = document.getElementById("canvas") ;
const ctx = canvas.getContext('2d') ;


const canvas1 = document.getElementById("canvas1") ;
const ctx1 = canvas1.getContext('2d') ;

// VARIABLE 
vx = 10 ;
vy = 0 ; 
let score = 0 ;
let point ;
let temps = 200 ;


let snake =  [ {x: 140, y:150},{x: 130, y:150},{x: 120, y:150},{x: 110, y:150} ] 


function animation(){
    
    nettoieCanvas1()
    if(point == 50){
        document.getElementById("level").innerHTML = "Level 2" ;
        temps = 100 ; 

    }else if(point == 100){
        document.getElementById("level").innerHTML = "Level 3" ;
        temps = 50 ;
    }else if(point == 140){
        document.getElementById("level").innerHTML = "Level 4" ;
        temps = 30 ;
}
    

    setTimeout(function(){
        nettoieCanvas() ;
        dessinPomme() ;
        faireAvancerSerpent() ;
        dessinerSerpent() ;

        animation() ;

    }, temps);
}





animation() ;
creerPomme() ;

function nettoieCanvas(){
    ctx.fillStyle = "white" ;
    ctx.fillStroke = "black" ;
    ctx.strokeRect(0,0,canvas.width,canvas.height);
    ctx.fillRect(0,0,canvas.width,canvas.height);
}


function nettoieCanvas1(){
    /* let random = (Math.random()*0xFFFFFF << 0).toString(16) ;  Generer nombre aleatoire en hexadecimal  
    a = "#"+ random ;    Generer couleur a partir du nombre hexadecimal
    // console.log(a) ;
    //ctx1.fillStyle = a ;
    */

    ctx1.fillStyle = "#0AF" ;
    if(50 <= point && point <100 ){
        ctx1.fillStyle= "Green";  
    }else if( 100 <= point && point < 140){
        ctx1.fillStyle = "purple" ;  
    }else if(  140 <=  point ){
        ctx1.fillStyle = "red" ;  
    }  

    /* const random = (Math.random()*0xFFFFFF << 0).toString(16) ;
    a = "#"+ random ;
    console.log(a);
    
    if(point == 50 ){
        ctx1.fillStyle = a ;  
    }else if( point==100){
        ctx1.fillStyle = a ;  
    }else if(   point == 140 ){
        ctx1.fillStyle = a ;  
    }  */

    ctx1.fillStroke = "black" ;
    ctx1.strokeRect(0,0,canvas1.width,canvas1.height);
    ctx1.fillRect(0,0,canvas1.width,canvas1.height);
}

function dessinerLesMorceaux(morceaux){
    ctx.fillStyle ="#00fe14" ; //remplissage 
    ctx.StrokeStyle = "black" ; // remplissage bordure
    ctx.strokeRect(morceaux.x,morceaux.y,10,10) ; // placer 
    ctx.fillRect(morceaux.x,morceaux.y,10,10) ;
}

function dessinerSerpent(){
    snake.forEach((morceaux) =>{
        dessinerLesMorceaux(morceaux) ;
    }) ;
}




function faireAvancerSerpent(){
    const head = { x: snake[0].x + vx , y: snake[0].y + vy } ;
    snake.unshift(head);

const mangerPomme =  snake[0].x === pommeX && snake[0].y===pommeY ;
    if(mangerPomme){
        score += 10 ;
        document.getElementById("score").innerHTML = score ;
        point = score ;
        creerPomme() ;

    } else {
        snake.pop() ;
    }

    /*if(point == 100) {
        animation1() ;
    } */
    

}

document.addEventListener('keydown',changerDirection) ;

function changerDirection(event) {

    const direction = event.keyCode ;

    const FLECHE_HAUT = 38 ;
    const FLECHE_BAS = 40 ;
    const FLECHE_DROITE = 39 ;
    const FLECHE_GAUCHE = 37 ;

    const monter = vy === -10 ;
    const descendre = vy === 10 ;
    const adroite = vx === 10 ;
    const agauche = vx === -10 ;

    if( direction === FLECHE_GAUCHE && !adroite ){vx =-10 ; vy = 0 ;}
    if( direction === FLECHE_DROITE && !agauche ){vx = 10 ; vy = 0 ;}
    if( direction === FLECHE_HAUT && !descendre ){vx =0 ; vy = -10 ;}
    if( direction === FLECHE_BAS && !monter ){vx =0 ; vy = 10;}

}

function random1(){
    return Math.round((Math.random()*290)/10)*10
}

function creerPomme(){
    pommeX = random1() ;
    pommeY = random1() ;

    // Eviter que les coor soient pareil avec le snake
    snake.forEach(function(part){
        const serpentSurPomme = part.x === pommeX && part.Y === pommeY ;
        if(serpentSurPomme){
            creerPomme() ;
        }
    })
}

function dessinPomme() {
    
    ctx.fillStyle = "red" ;
    ctx.StrokeStyle = "black" ;
    ctx.beginPath();
    ctx.arc(pommeX+5,pommeY+5,5,0, 2*Math.PI) ;
    ctx.fill() ;
    ctx.stroke() ;
}

