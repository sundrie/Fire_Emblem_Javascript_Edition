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

    // On récupère la position du 1er canvas pour déterminer où les autres doivent se placer pour faire des layers. offset() renvoie la position top et left de l'élément 
    var topPos = $("#canvas").offset().top;
    var leftPos = $("#canvas").offset().left;


    // création du second layer
    $(".wrapper").append("<canvas id='canvas2' class='canvas2'></canvas>");
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
    $(".wrapper").append("<canvas id='canvas3' class='canvas3'></canvas>");
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
    $(".wrapper").append("<canvas id='canvas4' class='canvas4'></canvas>");
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
                ctx2.drawImage(imgCursor,420,240);
            }            
        }
        // Cette fonction va permettre de recréer le curseur avec de nouveaux paramètres 
        this.regenerate = function(what){
            ctx2.clearRect(this.posx, this.posy, tilesize, tilesize);
            ctx2.fillStyle = "purple";
            // Le switch permets de modifier la position en fonction de la touche pressée on ecrase la valeur de x ou y de notre objet en faisant +20 ou -20 sur la précédente valeur de x
            switch (what) {
                case "+x":
                    // Ceci sert à ne pas dépasser notre zone de jeu tant que le x n'a pas atteint le max width et bien on peut ajouter +20 à notre x 
                    if (this.posx < cwidth2-tilesize) {                                
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
                    if (this.posy < cheight2-tilesize) {                
                        this.posy += tilesize;                                       
                        break;
                    } else {
                        break;
                    }
            }
            ctx2.drawImage(imgCursor,this.posx,this.posy);          
        }
        // Ceci va permettre de modifier la position du personnage 
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
            for (i = 0; i < listCharacter.length; i++) {
                if (this.posx === listCharacter[i].posx && this.posy === listCharacter[i].posy) {
                    console.log("Vous êtes sur : " + listCharacter[i].CharacterName);
                    console.log(listCharacter[i]);
                    // On appelle la méthode de cet objet pour lui indiquer qu'il doit s'afficher
                    infoPerso.create(listCharacter[i]);                    
                }
                
            }
            
        }
    }

    function Character(name,posx,posy,HP) {
        // posx et posy permettes de déterminer où se trouve le personnage
        this.name = name;
        this.posx = posx;
        this.posy = posy;
        this.HP = HP;

        // On fixe le personnage aux coordonnées indiquées lors de sa création
        this.create = function() { 
            var imgChara = new Image();
            imgChara.src = "http://localhost/Fire_Emblem_Javascript_Edition/static/img/"+ this.name +".png";
            // Sans ces variables pour le drawImage ça ne marcherait pas this.posx et this.posy renvoie undefined si mis dans le drawImage
            var x = this.posx;
            var y = this.posy;
            imgChara.onload = function(){
                ctx.drawImage(imgChara,x,y);
            }            
            radarMap.listAllCharacterPos(this);
        }                
    }

    // notre liste de toutes les infos sur les Characters
    var listCharacter = [];
    // Cet objet va nous permettre d'enregistrer les positions de toutes les instances de notre classe Character
    var radarMap = { 
        listAllCharacterPos : function(target){              
            listCharacter.push({
                CharacterName : target.name, 
                posx : target.posx,
                posy : target.posy,
                HP : target.HP
            });              
        }
    }  

    // Fonction permettant de centrer quelque chose par rapport à son conteneur
    // Retourne un array [0] pour x et [1] pour y
    function centerThings(x,y,width,height,cwidth,cheight) {
        var centeredx = (cwidth-width)/2;
        var centeredy = (cheight-height)/2;
        var returnedVal = [centeredx,centeredy];
        return returnedVal;
    }

    // le menu de pause en jeu
    var pauseMenu = {
        x: 0,
        y : 0,
        width : 400,
        height : 400, 
        color : "grey",
        // méthode pour créer le menu
        create : function() {            
            // Ajoute de la couleur au fond de notre menu
            ctx3.fillStyle = this.color;
            // Ceci va nous permettre de centrer notre contenu
            var centerMe = centerThings(this.x,this.y,this.width,this.height,cwidth3,cheight3);
            // On écrase les deux 0 avec nos nouvelles valeurs 
            this.x = centerMe[0];
            this.y = centerMe[1];
            // Dessine un rectangle remplit / strokeRect() au contraire ne dessine que ses bords sans le remplir
            ctx3.fillRect(this.x,this.y,this.width,this.height);                 
        },
        destroy : function(){
            ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
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
            // Ajoute de la couleur au fond de notre menu
            ctx4.fillStyle = this.color;
            // Dessine un rectangle remplit / strokeRect() au contraire ne dessine que ses bords sans le remplir
            ctx4.fillRect(this.x,this.y,this.width,this.height);                 
        }
    }  

    // Affiche les infos sur le personnage
    var infoPerso = {
        x: 500,
        y : 40,
        width : 300,
        height : 400, 
        color : "grey",
        // méthode pour créer le menu
        create : function(target) {            
            // Ajoute de la couleur au fond de notre menu
            ctx4.fillStyle = this.color;
            // Dessine un rectangle remplit / strokeRect() au contraire ne dessine que ses bords sans le remplir
            ctx4.fillRect(this.x,this.y,this.width,this.height);

            ctx4.fillStyle = "black";
            ctx4.font = "60px Arial";        
            // En faisant ainsi c'est à dire à utiliser les valeurs de bases du rectangle la position du texte sera toujours dans celui ci 
            ctx4.fillText("HP : "+target.HP, this.x+40, this.y+60);                 
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

    // L'affichage du jeu
    function gameScreen() {        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Ceci permets d'éviter que le fond soit supprimé quand le personnage bouge. En effet mettre le fond en css fixe ce problème
        $(".canvas").css("background-image","url('http://localhost/Fire_Emblem_Javascript_Edition/static/img/grid.png')");   
        
        // On créé notre curseur pour intéragir avec le jeu
        var theCursor = new Cursor(420,240);
        theCursor.create();
        
        // Permets de déterminer si le jeu est en pause ou non de base il ne l'est pas
        var isOnPause = false;
        // Permets de détecter les touches du clavier
        $(document).keypress(function(e){         
            if (e.key==="ArrowUp" || e.key==="ArrowRight" || e.key==="ArrowDown" || e.key==="ArrowLeft") {
                theCursor.move(e.key);  
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
        infoMap.create();    

        var chrom = new Character("Chrom",420,460,50);
        // Ceci va créer notre personnage (définir sa place dans la grille)
        chrom.create();

        var cordelia = new Character("Cordelia", 200,200,40)
        cordelia.create();      
    }
});