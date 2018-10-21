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
    var mousetracker;   

    // On récupère la position du 1er canvas pourdéterminer où les autres doivent se placer pour faire des layers. offset() renvoie la position top et left de l'élément 
    var topPos = $("#canvas").offset().top;
    var leftPos = $("#canvas").offset().left;


    // création du second layer
    $(".wrapper").append("<canvas id='canvas2' class='canvas2'></canvas>");
    var canvas2 = $("#canvas2")[0];
    canvas2.setAttribute('width', 840);
    canvas2.setAttribute('height', 480);
    var ctx2 = canvas2.getContext("2d");
	var cwidth2 = $("#canvas2").width();
    var cheight2 = $("#canvas2").height();
    var canvassize2 = canvas2.getBoundingClientRect();
    $(".canvas2").css("position","absolute");
    $(".canvas2").css("top",topPos);
    $(".canvas2").css("left",leftPos);

    
    
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
            ctx2.clearRect(this.posx, this.posy, 20, 20);
            ctx2.fillStyle = "purple";
            // Le switch permets de modifier la position en fonction de la touche pressée on ecrase la valeur de x ou y de notre objet en faisant +20 ou -20 sur la précédente valeur de x
            switch (what) {
                case "+x":                                
                    this.posx += 20;                   
                    break;
                case "-x":                
                    this.posx -= 20;                   
                    break;
                case "-y":                
                    this.posy -= 20;                
                    break;
                case "+y":                
                    this.posy += 20;                                       
                    break;
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
        }
    }

    function Character(posx,posy) {
        // posx et posy permettes de déterminer où se trouve le personnage
        this.posx = posx;
        this.posy = posy;

        // On fixe le personnage aux coordonnées indiquées lors de sa création
        this.create = function(imgChara) { 
            imgChara.src = "http://localhost/Fire_Emblem_Javascript_Edition/static/img/chrom.png";
            imgChara.onload = function(){
                ctx.drawImage(imgChara,0,0);
            }
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

    // Lorsque la touche Entrée est pressée on peut passer au jeu
    $(document).keypress(function(e){
        if(e.key === "Enter"){
            gameScreen();
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
        // Permets de détecter les touches du clavier
        $(document).keypress(function(e){         
            theCursor.move(e.key);             
        });

        var chrom = new Character(0,0);
        var imgChara = new Image();
        // Ceci va créer notre personnage (définir sa place dans la grille)
        chrom.create(imgChara);        
    }
});