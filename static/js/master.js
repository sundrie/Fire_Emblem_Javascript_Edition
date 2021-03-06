$(function(){
    var canvas = $("#canvas")[0];
    // Ici je défini la taille pour éviter de mettre ça dans le html
    canvas.setAttribute('width', 840);
    canvas.setAttribute('height', 480);

    // Le jeu sera en 2d pas en 3d
    var ctx = canvas.getContext("2d");
	var cwidth = $("#canvas").width();
    var cheight = $("#canvas").height();
    // Soluce trouvé pour contrer le décallage des coordonnées ici : https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
    var canvassize = canvas.getBoundingClientRect();
    // C'est la taille des cases de notre grille vu que c'est carré et bien pas besoin de faire pour x et y
    var tilesize = 20;

    var mousetracker;   

    // On récupère la position du 1er canvas pour déterminer où les autres doivent se placer pour faire des layers. 
    var topPos = $("#canvas").position().top;
    var leftPos = $("#canvas").position().left;
    
    // création du second layer
    $(".gamecontainer").append("<canvas id='canvas2' class='canvas2'></canvas>");
    var canvas2 = $("#canvas2")[0];
    // On mets les valeurs du premier canvas pour éviter de tout changer à chaque fois
    canvas2.setAttribute('width', cwidth);
    canvas2.setAttribute('height', cheight);
    var ctx2 = canvas2.getContext("2d");
	var cwidth2 = $("#canvas2").width();
    var cheight2 = $("#canvas2").height();
    var canvassize2 = canvas2.getBoundingClientRect();
    $(".canvas2").css("position","absolute");
    $(".canvas2").css("top",topPos);
    $(".canvas2").css("left",leftPos);
    
    // création du troisième layer
    $(".gamecontainer").append("<canvas id='canvas3' class='canvas3'></canvas>");
    var canvas3 = $("#canvas3")[0];
    // On mets les valeurs du premier canvas pour éviter de tout changer à chaque fois
    canvas3.setAttribute('width', cwidth);
    canvas3.setAttribute('height', cheight);
    var ctx3 = canvas3.getContext("2d");
	var cwidth3 = $("#canvas3").width();
    var cheight3 = $("#canvas3").height();
    var canvassize3 = canvas3.getBoundingClientRect();
    $(".canvas3").css("position","absolute");
    $(".canvas3").css("top",topPos);
    $(".canvas3").css("left",leftPos);

    // création du quatrième layer
    $(".gamecontainer").append("<canvas id='canvas4' class='canvas4'></canvas>");
    var canvas4 = $("#canvas4")[0];
    // On mets les valeurs du premier canvas pour éviter de tout changer à chaque fois
    canvas4.setAttribute('width', cwidth);
    canvas4.setAttribute('height', cheight);
    var ctx4 = canvas4.getContext("2d");
	var cwidth4 = $("#canvas4").width();
    var cheight4 = $("#canvas4").height();
    var canvassize4 = canvas4.getBoundingClientRect();
    $(".canvas4").css("position","absolute");
    $(".canvas4").css("top",topPos);
    $(".canvas4").css("left",leftPos);

    // création du cinquième layer
    $(".gamecontainer").append("<canvas id='canvas5' class='canvas5'></canvas>");
    var canvas5 = $("#canvas5")[0];
    // On mets les valeurs du premier canvas pour éviter de tout changer à chaque fois
    canvas5.setAttribute('width', cwidth);
    canvas5.setAttribute('height', cheight);
    var ctx5 = canvas5.getContext("2d");
	var cwidth5 = $("#canvas5").width();
    var cheight5 = $("#canvas5").height();
    var canvassize5 = canvas5.getBoundingClientRect();
    $(".canvas5").css("position","absolute");
    $(".canvas5").css("top",topPos);
    $(".canvas5").css("left",leftPos);

    // création du sixième layer
    $(".gamecontainer").append("<canvas id='canvas6' class='canvas6'></canvas>");
    var canvas6 = $("#canvas6")[0];
    // On mets les valeurs du premier canvas pour éviter de tout changer à chaque fois
    canvas6.setAttribute('width', cwidth);
    canvas6.setAttribute('height', cheight);
    var ctx6 = canvas6.getContext("2d");
	var cwidth6 = $("#canvas6").width();
    var cheight6 = $("#canvas6").height();
    var canvassize6 = canvas6.getBoundingClientRect();
    $(".canvas6").css("position","absolute");
    $(".canvas6").css("top",topPos);
    $(".canvas6").css("left",leftPos);

    // création du septième canvas 
    $(".gamecontainer").append("<canvas id='canvas7' class='canvas7'></canvas>");
    var canvas7 = $("#canvas7")[0];
    // On mets les valeurs du premier canvas pour éviter de tout changer à chaque fois
    canvas7.setAttribute('width', cwidth/2);
    canvas7.setAttribute('height', cheight/2);
    var ctx7 = canvas7.getContext("2d");
	var cwidth7 = $("#canvas7").width();
    var cheight7 = $("#canvas7").height();
    var canvassize7 = canvas7.getBoundingClientRect();
    $(".canvas7").css("background-color","grey");
    $(".canvas7").css("display","inline-block");
    $(".canvas7").css("margin-bottom",cheight7/2+"px");


    // méthode pour suivre les déplacements de la souris
    function mouseTracking (mousetracker,target) {
        // Si la souris passe au dessus de la zone ciblée alors on renvoie true sinon si c'est en dehors alors false                  
        if (mousetracker.x > target.x && mousetracker.x < target.x + target.width && mousetracker.y > target.y && mousetracker.y < target.y + target.height){
            return true;
        } else {
            return false;
        }            
    }

    // Constructeur de notre objet bouton qui permets de faire de multiples boutons
    function Button(x, y, width, height, tfont, text) {
        this.x = x; 
        this.y = y;
        this.width = width;
        this.height = height;
        this.tfont = tfont;
        this.text = text;        

        // méthode pour modéliser le bouton
        this.drawButton = function(bcolor,tcolor) {            
            // Ajoute de la couleur à notre rectangle
            ctx.fillStyle = bcolor;
            // Dessine un rectangle remplit / strokeRect() au contraire ne dessine que ses bords sans le remplir
            ctx.fillRect(this.x,this.y,this.width,this.height);
            
            // On mets la couleur noire à notre font sinon ça va être de la même couleur que notre rectangle
            ctx.fillStyle = tcolor;
            ctx.font = tfont;        
            // En faisant ainsi c'est à dire à utiliser les valeurs de bases du rectangle la position du texte sera toujours dans celui ci 
            ctx.fillText(this.text, this.x+45, this.y+33);
        }

        // Permets de changer la couleur et le texte du bouton pour par exemple faire un effet hover sur le bouton (le bouton est supprimé puis recréé avec de nouvelles couleurs saisies)
        this.changeButtonColor = function(newbcolor,newtcolor){
            // clearRect() efface le rectangle il suffit d'indiquer les coordonnées qu'on avait rentrée pour créer le rectangle que l'on souhaite maintenant supprimer
            ctx.clearRect(this.x,this.y,this.width,this.height);
            this.drawButton(newbcolor,newtcolor);
        }
    } 

    // Pour pouvoir accéder au curseur n'importe où dans le code
    var imgCursor = new Image();
    // Le curseur pour se déplacer sur la carte et manipuler les personnages
    function Cursor(posx,posy){
        this.posx = posx;
        this.posy = posy;
        // On fixe le curseur aux coordonnées indiquées lors de sa création
        this.create = function() { 
            imgCursor.src = "http://localhost/Fire_Emblem_Javascript_Edition/static/img/cursor.png";
            imgCursor.onload = function(){
                ctx4.drawImage(imgCursor,420,240);
            }            
        }
        // Cette fonction va permettre de recréer le curseur avec de nouveaux paramètres 
        this.regenerate = function(what){
            ctx4.clearRect(this.posx, this.posy, tilesize, tilesize);
            ctx4.fillStyle = "purple";
            // Le switch permets de modifier la position en fonction de la touche pressée on ecrase la valeur de x ou y de notre objet en faisant +20 ou -20 sur la précédente valeur de x
            switch (what) {
                case "+x":
                    // Ceci sert à ne pas dépasser notre zone de jeu tant que le x n'a pas atteint le max width et bien on peut ajouter +20 à notre x 
                    if (this.posx < cwidth4-tilesize) {                                
                        this.posx += tilesize;                 
                        break;             
                    } else {     
                        // Si on est à la limite de la zone et bien on redessine au même endroit l'image               
                        break;
                    }
                case "-x":
                    if (this.posx > 0) {                
                        this.posx -= tilesize;                  
                        break;
                    } else {             
                        break;
                    }
                case "-y":
                    if (this.posy > 0) {                 
                        this.posy -= tilesize;                
                        break;
                    } else {
                        break;
                    }
                case "+y":
                    if (this.posy < cheight4-tilesize) {                
                        this.posy += tilesize;                                       
                        break;
                    } else {
                        break;
                    }
            }
            ctx4.drawImage(imgCursor,this.posx,this.posy);          
            //console.log(this.posx,this.posy);            
        }
        // Ceci va permettre de modifier la position du curseur 
        this.move = function(direction){
            if (direction === "ArrowRight") {
                this.regenerate("+x");                     
            }
            if (direction === "ArrowLeft") {          
                this.regenerate("-x");
            }
            if (direction === "ArrowUp") {
                this.regenerate("-y");
            }
            if (direction ==="ArrowDown") {
                this.regenerate("+y");
            }
            this.displayInfo();              
        }
        // Ceci va afficher les infos sur ce que le curseur survole
        this.displayInfo = function(){
            // Pour sauvegarder le this (Cursor)
            var cursor = this;     
            $.each(listAllCharacter, function(){
                if (cursor.posx === this.posx && cursor.posy === this.posy){
                    // On appelle la méthode de cet objet pour lui indiquer qu'il doit s'afficher
                    infoPerso.create(this);                    
                } else {
                    // Bizarrement ceci fixe le fait que seul une seule aire de mvt apparaisse 
                    this.destroyMvtPath();
                }            
            });             
            infoMap.create();  
        }        
    }

    
    var listAllCharacter = {};
    // Cette variable va stocker tous les sprites sur la grilles des personnages
    var spriteChara = {};

    function Character(name,posx,posy,mvt,HP,force,defense){
        // posx et posy permettes de déterminer où se trouve le personnage
        this.name = name;
        this.posx = posx;
        this.posy = posy;
        this.mvt = mvt;
        this.HP = HP;
        this.force = force;
        this.defense = defense;

        // On fixe le personnage aux coordonnées indiquées lors de sa création
        this.create = function() { 
            var imgChara = new Image();
            imgChara.src = "http://localhost/Fire_Emblem_Javascript_Edition/static/img/"+ this.name +".png";
            // Sans ces variables pour le drawImage ça ne marcherait pas this.posx et this.posy renvoie undefined si mis dans le drawImage
            var x = this.posx;
            var y = this.posy;
            imgChara.onload = function(){
                ctx2.drawImage(imgChara,x,y);                
            }
            spriteChara[this.name] = imgChara;
            listAllCharacter[this.name] = this;
        }
        // Ceci va afficher les possibilités de mouvement en illuminant les cases où il y a possibilité de s'y déplacer  
        this.showMvtPath = function(){                   
            var character = this; 
            // cette variable va nous permettre de convertir notre valeur de mvt en portée max en prenant en compte la taille de case
            var maxMvt = tilesize*character.mvt;
            // Permets de règler l'opacité des éléments 
            ctx3.globalAlpha = 0.3;
            ctx3.fillStyle = "blue";
            // Cette boucle va nous permettre de "dessiner" la portée de mouvement du personnage
            var k = 0;
            // On effectue i fois le nombre de mouvement autorisé par le personnage (5,7 fois)
            for(i = character.mvt;i>0 ;i--){
                // Ceci est important on enlève i donc 1 a maxMvt pour que le guide dessine toutes les cases jusqu'a là où se trouve le personnage
                maxMvt = i*tilesize;                
                for(j = maxMvt;j>=tilesize;j-=tilesize){
                    // bas_droit
                    ctx3.fillRect(character.posx+j,character.posy+k,tilesize,tilesize);
                    // haut gauche
                    ctx3.fillRect(character.posx-j,character.posy-k,tilesize,tilesize);
                    // haut droit
                    ctx3.fillRect(character.posx+k,character.posy-j,tilesize,tilesize);
                    // bas gauche
                    ctx3.fillRect(character.posx-k,character.posy+j,tilesize,tilesize);                               
                }
                // Ceci est déplacé ici sinon notre code ne fonctionnerait pas comme voulu 
                k += tilesize;
            }            
            character.showMaxAttRange();
        }
        // Supprime le guide de mouvement
        this.destroyMvtPath= function(){
            ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
        }
        // Comme dans le jeu va afficher la portée max des attaques (dans le jeu ça entoure là où s'arrête le mouvement) en rouge 
        this.showMaxAttRange=function(){
            var character = this;
            var maxMvt = tilesize*character.mvt;
            var k=0;
            ctx3.globalAlpha = 0.3;
            ctx3.fillStyle = "red";
            for(j = maxMvt+tilesize;j>=tilesize;j-=tilesize){
                // bas_droit
                ctx3.fillRect(character.posx+j,character.posy+k,tilesize,tilesize);
                // haut gauche
                ctx3.fillRect(character.posx-j,character.posy-k,tilesize,tilesize);
                // haut droit
                ctx3.fillRect(character.posx+k,character.posy-j,tilesize,tilesize);
                // bas gauche
                ctx3.fillRect(character.posx-k,character.posy+j,tilesize,tilesize);    
                k += tilesize;                           
            }

        }
        this.move = function(character){  
            $(document).keypress(function(e){
                // Permets d'afficher le guide de mvt pour montrer les possibilités de mouvement dès que le personnage a été sélectionné
                character.showMvtPath();
                console.log(character.name,character.posx,character.posy);                   
                // Si le joueur réappuie sur la touche E et bien on déplace le sprite
                if(e.key === "e"){                    
                    $.each(listAllCharacter, function(){   
                        console.log(character.name +" = "+this.name+" ? ");
                        if (theCursor.posx === this.posx && theCursor.posy === this.posy && character.name !== this.name){
                            console.log("Hey tu es sur " + this.name + " tu ne peut pas y aller");
                        } else if (theCursor.posx === character.posx && theCursor.posy === character.posy) {
                            ctx2.drawImage(spriteChara[character.name],theCursor.posx,theCursor.posy);
                        } else {                    
                            // On garde en mémoire la précédente localisation du sprite pour pouvoir le supprimer une fois le déplacement fait
                            var previouslocation = [character.posx,character.posy];
                            console.log("déplacement à cet endroit");

                            ctx2.drawImage(spriteChara[character.name],theCursor.posx,theCursor.posy);
                            ctx2.clearRect(previouslocation[0],previouslocation[1],tilesize,tilesize); 
                            
                            // On écrase les précédentes valeurs avec la position du curseur car maintenant le personnage est là où se trouve le curseur
                            character.posx = theCursor.posx;  
                            character.posy = theCursor.posy;    
                            character.destroyMvtPath();
                            // on appelle la méthode pour mettre à jour la position dans la logic grid;
                            logicGridGestion.updateCharaPos(previouslocation,character);
                        }
                    });                         
                }
            });   
        }
    }

    // Fonction permettant de centrer quelque chose par rapport à son conteneur
    // Retourne un array [0] pour x et [1] pour y
    function centerThings(width,height,cwidth,cheight) {
        var centeredx = (cwidth-width)/2;
        var centeredy = (cheight-height)/2;
        var returnedVal = [centeredx,centeredy];
        return returnedVal;
    }

    // le menu de pause en jeu
    var pauseMenu = {
        x: 0,
        y : 0,
        width : 300,
        height : 400, 
        color : "grey",
        // méthode pour créer le menu
        create : function() {            
            // Ajoute de la couleur au fond de notre menu
            ctx6.fillStyle = this.color;
            // Ceci va nous permettre de centrer notre contenu
            var centerMe = centerThings(this.width,this.height,cwidth6,cheight6);
            // On écrase les deux 0 avec nos nouvelles valeurs 
            this.x = centerMe[0];
            this.y = centerMe[1];
            // Dessine un rectangle remplit / strokeRect() au contraire ne dessine que ses bords sans le remplir
            ctx6.fillRect(this.x,this.y,this.width,this.height);                 
        },
        destroy : function(){
            ctx6.clearRect(this.x, this.y, this.width, this.height);
        } 
    } 

    // Affiche les infos sur le terrain
    var infoMap = {
        x: 0,
        y : 0,
        width : 100,
        height : 60, 
        color : "grey",
        // méthode pour créer le menu
        create : function() {      
             
            var tileData;
            $(logicGrid).filter(function(){
                if (this.x === theCursor.posx && this.y === theCursor.posy) { 
                    tileData = this;
                }
            });
            
            // Ajoute de la couleur au fond de notre menu
            ctx5.fillStyle = this.color;
            // Dessine un rectangle remplit / strokeRect() au contraire ne dessine que ses bords sans le remplir
            ctx5.fillRect(this.x,this.y,this.width,this.height);      
            var dataTerrain = {}; 
            switch (tileData.id) {
                case 0:
                    dataTerrain ["nom"] = "Plaine";
                    dataTerrain ["def"] = 0;
                    dataTerrain ["esq"] = 0;
                    break;
                case 1:
                    dataTerrain ["nom"] = "Void";
                    dataTerrain ["def"] = -1;
                    dataTerrain ["esq"] = -10;
                    break;
            }
            ctx5.fillStyle = "white";
            ctx5.font = "15px Arial";  
            // Le nom du terrain
            ctx5.fillText(dataTerrain.nom,this.x+10,this.y+20);
            // Les caractéristiques du terrain
            ctx5.font = "10px Arial";
            ctx5.fillText("Def : "+dataTerrain.def+ " - Esq : "+dataTerrain.esq ,this.x+10,this.y+40);           
        }
    }  

    // Affiche les infos sur le personnage dans une fenêtre
    var infoPerso = {
        x: 0,
        y : 0,
        width : cwidth7,
        height : cheight7, 
        color : "grey",
        // méthode pour créer le menu
        create : function(target) {
            // Ajoute de la couleur au fond de notre menu
            ctx7.fillStyle = this.color;
            // Dessine un rectangle remplit / strokeRect() au contraire ne dessine que ses bords sans le remplir
            ctx7.fillRect(this.x,this.y,this.width,this.height);

            ctx7.fillStyle = "black";
            ctx7.font = "15px Arial";      
            ctx7.textAlign="center";   
            // En faisant ainsi c'est à dire à utiliser les valeurs de bases du rectangle la position du texte sera toujours dans celui ci
            ctx7.fillText(target.name,cwidth7/2,this.y+20); 
            ctx7.fillText("HP : "+target.HP, cwidth7/2, this.y+40);      
            ctx7.fillText("Mvt : "+target.mvt,cwidth7-60,this.y+20);   
            
            ctx7.fillText("Force : "+target.force,this.x+40,this.y+80); 
            ctx7.fillText("Defense : "+target.force,this.x+48,this.y+100);
        },
        // Permets de supprimer la fenêtre 
        destroy : function(){
            ctx7.clearRect(this.x,this.y,this.width,this.height);            
        }
    } 
    
    function mainMenu(){
        // Notre image en fond
        $(".canvas").css("background-image","url('http://localhost/Fire_Emblem_Javascript_Edition/static/img/background_FEA.jpg')");   
        $(".canvas").css("background-size","cover");

        ctx.fillStyle="#000000";
        ctx.font = '60px Arial';
        ctx.fillText('Fire Emblem', 250, 200);
        ctx.font = 'italic 20px Arial';
        ctx.fillText('Javascript Edition',430,230);         
        ctx.fillStyle="#000000";
        ctx.font = '30px Arial';
        ctx.fillText('Appuyez sur la touche Entrée pour commencer', 100, 400);  
    }
    mainMenu();    

    // Ceci indique si l'utilisateur a appuyé sur démarrer le jeu de base on l'initialise à faux 
    var launchedGame = false;
    // Lorsque la touche Entrée est pressée on peut passer au jeu
    $(document).keypress(function(e){
        // Si la touche Enter est appuyé et que le jeu n'a pas encore été lancé alors on affiche la fenêtre du jeu
        if(e.key === "Enter" && launchedGame === false){
            gameScreen();
            // Le jeu ayant été lancé on passe la variable a vrai empêchant ce bout de code de se réexecuté et provoquer des bugs
            launchedGame = true;
        }
    });

    var theCursor;

    // Notre grille logique qui est utile dans les jeux pour déterminer les collisions, etc. 
    // Il y a actuellement 1008 tiles (840*20)+(480*20)
    var logicGrid = [];

    var logicGridGestion = {
        grid : logicGrid,
        create : function(){
            for (j = cheight; j >= 0; j-=tilesize){
                for (i = cwidth; i >= 0; i-=tilesize){
                    logicGrid.push({
                        x:i,
                        y:j,
                        id:0,   // l'id correspond au type du terrain
                        occupied:false,     // Ceci va nous permettre de dire si quelqu'un est sur cette case de base on initialise à faux
                    });
                    //ctx4.fillText("0",i,j);  
                    ctx.fillStyle="#024509";  
                    ctx.fillRect(i,j,tilesize,tilesize);                
                }
            }
        },
        // Cette méthode va figer la position des différents personnages sur la grid
        manageCharaPos : function(){
            $.each(listAllCharacter, function(){
                // console.log(this);
                // Pour sauvegarder le this
                var chara = this;
                $(logicGrid).filter(function(){  
                    if (this.x === chara.posx && this.y === chara.posy) {   
                        console.log("trouvé "+chara.name +" - "+ chara.posx,chara.posy);      
                        ctx.fillStyle="purple";
                        ctx.fillRect(this.x,this.y,tilesize,tilesize);
                        // On passe le occupied à vrai puisqu'une unité y est présente
                        this.occupied=true;
                        
                        // this.id = 1;                       
                    }            
                });
            });
        },
        // Cette méthode va mettre a jour la position des unités ayant bougé
        updateCharaPos : function(oldPos,unit){
            console.log("ancienne position "+oldPos);
            console.log(unit); 
            
            // On supprime la précédente position du personnage  
            // Pour les tests c'est du purple dégueu      
            ctx.fillStyle="#024509";
            ctx.fillRect(oldPos[0],oldPos[1],tilesize,tilesize); 
            // Et on le mets à la nouvelle position
            ctx.fillStyle="purple";
            ctx.fillRect(unit.posx,unit.posy,tilesize,tilesize);            
        }

    }

    // L'affichage du jeu
    function gameScreen() {        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Ceci permets d'éviter que le fond soit supprimé quand le personnage bouge. En effet mettre le fond en css fixe ce problème
        $(".canvas").css("background-image","url('http://localhost/Fire_Emblem_Javascript_Edition/static/img/grid.png')");   
        
        // On créé notre curseur pour intéragir avec le jeu
        theCursor = new Cursor(420,240);
        theCursor.create();
        
        // Permets de déterminer si le jeu est en pause ou non de base il ne l'est pas
        var isOnPause = false;
        // Permets de détecter les touches du clavier
        $(document).keypress(function(e){         
            if (e.key==="ArrowUp" || e.key==="ArrowRight" || e.key==="ArrowDown" || e.key==="ArrowLeft") {
                theCursor.move(e.key);
                $.each(listAllCharacter, function(){   
                    if (theCursor.posx === this.posx && theCursor.posy === this.posy){
                        this.showMvtPath();                        
                    }    
                });                                                        
            }        
            // Si la touche E est pressée et que l'on se trouve sur un personnage alors on peut le déplacer
            if(e.key === "e"){
                $.each(listAllCharacter, function(){
                    if (theCursor.posx === this.posx && theCursor.posy === this.posy) {
                        console.log("Unité " + this.name + " activée ! Paré à rouler !");     
                        this.move(this);                        
                    }
                });       
            }             
            // Si le jeu n'est pas en pause donc on le mets en pause                  
            if (e.key === "Escape" && isOnPause === false) {
                pauseMenu.create();
                // Maintenant on mets qu'il est en pause
                isOnPause = true;
            } else if (e.key === "Escape" && isOnPause === true) {
                // Sinon si le jeu est déjà en pause donc qu'on veut relancer et bien on appelle la méthode pour enlever le menu
                pauseMenu.destroy();
                // Et le jeu n'étant plus en pause on remets la variable à faux
                isOnPause = false;
            }                   
        });
          

        var chrom = new Character("Chrom",420,460,5,50,15,12);
        // Ceci va créer notre personnage (définir sa place dans la grille)
        chrom.create();

        var cordelia = new Character("Cordelia",200,200,7,40,10,10);
        cordelia.create();      

        var tharja = new Character("Tharja",100,160,5,35,5,10);
        tharja.create();
         
        // i est x
        // j est y
        
        // On créé la grille logique 
        logicGridGestion.create();
        
        logicGridGestion.manageCharaPos();

        console.log(logicGrid);

        // Pour chercher dans le tableau
        // Sert juste d'exemple
        $(logicGrid).filter(function(){            
            if (this.x === 480 && this.y === 100) {          
                // Sert d'exemple      
                console.log("trouvé "+this.x +" - "+ this.y);      
                ctx.fillStyle="grey";
                ctx.fillRect(this.x,this.y,tilesize,tilesize);
                this.id = 1;                       
            }            
        });
            
    }
    
});