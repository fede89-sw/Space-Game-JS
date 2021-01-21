var stella;  //stella caricata con newStar
var stelle = new Array();  //array di stelle,da piu elementi img 'stella'
var idStella; //id ogni singola stella
var i;  //contatore
var tOUT; //timer
var maxH=window.innerHeight-50; //max valore di altezza pagina
var maxW=window.innerWidth-10; //max valore di larghezza pagina
var tipoStella; //valore random per stabilire che immagine caricare
var nstelle=0; //contatore stelle
var velocita= new Array(); //velocita random assegnata ad ogni stella di 'stelle'
var body=document.getElementById('body');//'body' contiene il body html della pagina
var y;      //contatore
var FirstOpening=0;    //variabile per primo caricamento stelle quando apri la pagina internet
var ship=document.getElementById('nave');
var tasto;
var body=document.getElementById('body');
var laser;
var tastospara;
var tOUTlaser;
var index=0;
var canShoot=0;
var enemy;
var tOUTenemy;
var interval;
var enemyLaser;
var tOUTenemyShoot;
var arraylaser=new Array();
var arraynemici=new Array();
var arraylasernemici=new Array();
var intervalloEnemyShoot;


ship=document.createElement('img');
ship.style.position='absolute';
ship.style.zIndex=15;
ship.style.top=window.innerHeight/2;
ship.style.left=(window.innerWidth-window.innerWidth)+20;
ship.src='.\\img.\\starship1.gif';
body.appendChild(ship);


   
    function start(){
        nstelle=getRandomInt(10,25); //genera random il numero di stelle sulla pagina(da 10 a 25)
        for(i=0; i<nstelle; i++){
           newStar(i);             //crea stella con ID 'i'
           }
         scorriStella();           //richiama la funzione
         intervallo();
    }

    function newStar(idStella){
               
             tipoStella=getRandomInt(0,200); //numero random in base al quale verra generata un certo tipo di stella
             stella=document.createElement('img'); //creo l'elemento immagine 'stella'
             if (FirstOpening == 0) {
                 stella.style.left=(getRandomInt(maxW/2,maxW))+"px";
                 FirstOpening=1;    //all'apertura della pagina le stelle le creo non dal bordo ma a random nella pagina
              } else{
                  stella.style.left=maxW+"px"; //altrimenti partono tutte dal limite dx della pagina
              }
             stella.style.top=getRandomInt(1,maxW)+"px";//la stella si posiziona a caso lungo l'altezza della pagina
             stella.id=idStella; //la stella avra l'id che gli passo
             stella.style.position='absolute';//senza questo non si muove niente
             stella.style.zIndex=getRandomInt(1,12); //indica la priorita (l'img passa in primo piano)
			 stella.style.display="block";     
             if (tipoStella<3){ //se tipoStella  <3 sui 200 numeri carico asteroide
                 stella.src='.\\img\\asteroid_'+(tipoStella+1)+'.gif';
             } else{
                 if (tipoStella<=5){ //se tipoStella tra 3 e 5 carico pianeta
                     stella.src='.\\img\\planet_'+(tipoStella-2)+'.gif';
                 } else{  //altrimenti carico stelle a caso tra 1.jpg a 10.jpg
                     stella.src='.\\img\\'+getRandomInt(1,10)+'.jpg';
                 }
             }      
             body.appendChild(stella); //immetto l'img nel body
             velocita[idStella]=getRandomInt(1,10); //numero random velocita stella creata,messo nel rispettivo array
             stelle[idStella]=stella;//metto stella creata in array stelle
    }

    function scorriStella(){
          for (y=0; y<nstelle;y++){ //ciclo per tutte le stelle
             if((stelle[y] != "") && (parseInt(stelle[y].style.left) > -400)){ //se l'array stelle[i] non e arrivato a fine schermo sx meno -400
               stelle[y].style.left=(parseInt(stelle[y].style.left)-(5+velocita[y]))+'px';//arretro la stella di -5px + la sua velocita assegnata
           }else{
               deleteStar(y); //altrimenti cancello stella
               newStar(y);   //e al suo posto ne creo una nuova per avere un continuo turnover
           }
                  }
       tOUT=setTimeout(scorriStella,30);  //ripete scorriStella ogni 30ms
    }

    function deleteStar(idStella){
        body.removeChild(stelle[idStella]); //rimuovo l'elemento img
        stelle[idStella]=""; //lo cancello anche dall'array 'stelle'
    }

    function getRandomInt(min,max){
        return Math.floor(Math.random()*((max+1)-min)+min);    //funzione che crea un numero random tra 'min' e 'max' compresi
    }


function muovi(){
    tasto=event.which || event.KeyCode;
    switch (tasto){
        case 38:    //SU
        if(parseInt(ship.style.top) >= 20){
            ship.style.top=(parseInt(ship.style.top)-10)+'px';
        }break;
                
        case 40:    //GIU 
         if(parseInt(ship.style.top) <= (window.innerHeight-50)){ 
            ship.style.top=(parseInt(ship.style.top)+10)+'px';
            
         }break;

        case 37:    //SX
         if(parseInt(ship.style.left) >= 20){
            ship.style.left=(parseInt(ship.style.left)-10)+'px';
          }break;
          
        case 39:    //DX
         if(parseInt(ship.style.left) <= (window.innerWidth-50)){
            ship.style.left=(parseInt(ship.style.left)+10)+'px';
           }break;

         default:
         break;
    }
}


function spara(){
    if(canShoot == 0){
        tastospara= event.which || event.KeyCode;
         if ((String.fromCharCode(tastospara) == 'a') || (String.fromCharCode(tastospara) == 'A')){
           laser=document.createElement('img');
           laser.src='.\\img\\laser.jpg';
           laser.style.position='absolute';
           laser.style.zIndex=15;
           laser.style.top=(parseInt(ship.style.top)+20)+'px';
           laser.style.left=(parseInt(ship.style.left)+45)+'px';
           body.appendChild(laser);
           arraylaser.push(laser);
           scorrilaser();
             }
    }
}

function scorrilaser(){
    if(arraylaser.length != 0){
    if(parseInt(arraylaser[0].style.left) <= (window.innerWidth+100)){
        arraylaser[0].style.left=parseInt(arraylaser[0].style.left)+10+'px';
    
      if(arraynemici != 0){   //SE IL NEMICO E' PRESENTE
       if((parseInt(arraylaser[0].style.left) >= parseInt(arraynemici[0].style.left)-15) && ((parseInt(arraylaser[0].style.left) <= parseInt(arraynemici[0].style.left)+15))){
          if((parseInt(arraylaser[0].style.top) >= parseInt(arraynemici[0].style.top)-20) && ((parseInt(arraylaser[0].style.top) <= parseInt(arraynemici[0].style.top)+35))){
               enemy.src='.\\img\\explosion.gif';   //SE IL LASER INCONTRA LA NAVE NEMICA CARICO EXPLOSION AL POSTO DELLLA NAVE NEMICA
               deleteLaser();   //ELIMINO LASER
               clearInterval(intervalloEnemyShoot);
               setTimeout(deleteEnemy,1000);    //ELLIMINO NAVE NEMICA DOPO 2 SECONDI
          }  
        }
    }

    
    }
    else{
        deleteLaser();
        clearTimeout(tOUTlaser);
    }
    }
     tOUTlaser=setTimeout(scorrilaser,10);
}

function deleteLaser(){
    body.removeChild(arraylaser[0]);
    arraylaser.shift();
}

function nemico(){
    if (arraynemici.length == 0){
    enemy=document.createElement('img');
    enemy.style.position='absolute';
    enemy.style.zIndex=14;
    enemy.style.left=maxW-20+'px';
    enemy.style.top=getRandomInt(1,maxH)+'px';
    enemy.src='.\\img\\enemy-spaceship_2.gif';
     body.appendChild(enemy);
     arraynemici.push(enemy);
     intervalloEnemyShoot=setInterval(enemyShoot,getRandomInt(1500,4500));
     scorrinemico();
   }
}

function intervallo(){
    interval=setInterval(nemico,getRandomInt(12000,18000));
}

function scorrinemico(){
    if(arraynemici.length != 0){
     if(parseInt(arraynemici[0].style.left) > -100){
        arraynemici[0].style.left=parseInt(arraynemici[0].style.left)-10+'px';
    }
    else{
        deleteEnemy();
        clearTimeout(tOUTenemy);
    }
    }
     tOUTenemy=setTimeout(scorrinemico,80);  
}

function deleteEnemy(){
    body.removeChild(arraynemici[0]);
    arraynemici.shift();
}

function enemyShoot(){
    if (arraynemici.length != 0){
        if (arraylasernemici.length == 0){
        enemyLaser=document.createElement('img');
        enemyLaser.src='.\\img\\enemylaser.jpg';
        enemyLaser.style.position='absolute';
        enemyLaser.style.top=parseInt(enemy.style.top)+25+'px';
        enemyLaser.style.left=parseInt(enemy.style.left)-35+'px';
        body.appendChild(enemyLaser);
        arraylasernemici.push(enemyLaser);
        scorriLaserNemico();
        }
    }
}

function scorriLaserNemico(){
    if(arraylasernemici.length != 0){
      if(parseInt(arraylasernemici[0].style.left) >= -200){
        arraylasernemici[0].style.left=parseInt(arraylasernemici[0].style.left)-10+'px';
          if((parseInt(arraylasernemici[0].style.left) >= parseInt(ship.style.left)-15) && ((parseInt(arraylasernemici[0].style.left) <= parseInt(ship.style.left)+15))){
          if((parseInt(arraylasernemici[0].style.top) >= parseInt(ship.style.top)-15) && ((parseInt(arraylasernemici[0].style.top) <= parseInt(ship.style.top)+30))){
               ship.src='.\\img\\explosion.gif';   //SE IL LASER INCONTRA LA MIA NAVE CARICO EXPLOSION AL POSTO DELLLA NAVE
               deleteEnemyLaser();   //ELIMINO LASER
               clearInterval(intervalloEnemyShoot);
               setTimeout(deleteShip,3000);    //ELLIMINO NAVE NEMICA DOPO 2 SECONDI
          }  
        }
      }else{
          deleteEnemyLaser();
          clearTimeout(tOUTenemyShoot);
      }
    }
    tOUTenemyShoot=setTimeout(scorriLaserNemico,10);
}

function deleteEnemyLaser(){
    body.removeChild(arraylasernemici[0]);
    arraylasernemici.shift();
}

function deleteShip(){
    var rx;
    clearInterval(interval);
    clearTimeout(tOUTlaser);
    clearTimeout(tOUTenemy);
    clearTimeout(tOUTenemyShoot);
    clearTimeout(tOUT);
    rx=confirm('GAME OVER!!! Vuoi giocare ancora?');
    if ( rx == true){
       window.location.reload();
    }else{
        window.close();
    }

}