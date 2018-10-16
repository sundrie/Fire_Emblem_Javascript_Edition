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

    function Character(posx,posy) {
        // posx et posy permettes de déterminer où se trouve le personnage
        this.posx = posx;
        this.posy = posy;

        // On fixe le personnage aux coordonnées indiquées lors de sa création
        this.create = function() { 
            ctx.fillStyle = "blue";
            ctx.fillRect(this.posx,this.posy,20,20);
        }
        // Ceci va permettre de modifier la position du personnage 
        this.move = function(direction){
            if (direction === "ArrowRight") {
                // On supprime la précédente position du personnage
                ctx.clearRect(this.posx, this.posy, 20, 20);                
                ctx.fillStyle = "blue";
                // Ici on ajoute +20 à la position de l'objet ce qui fait que sa précédente position sera écrasée par celle ci
                this.posx += 20; 
                // Et on le recrée aux nouvelles positions les 2 20 sont juste la largeur et hauteur du personnage étant donné que chaque personnage occupe une case ceci sera en fonction de la taille des cases 
                ctx.fillRect(this.posx,this.posy,20,20);                     
            }
            if (direction === "ArrowLeft") {
                ctx.clearRect(this.posx, this.posy, 20, 20);                
                ctx.fillStyle = "blue";
                this.posx -= 20; 
                ctx.fillRect(this.posx,this.posy,20,20);
            }
            if (direction === "ArrowUp") {
                ctx.clearRect(this.posx, this.posy, 20, 20);                
                ctx.fillStyle = "blue";
                this.posy -= 20; 
                ctx.fillRect(this.posx,this.posy,20,20);
            }
            if (direction ==="ArrowDown") {
                ctx.clearRect(this.posx, this.posy, 20, 20);                
                ctx.fillStyle = "blue";
                this.posy += 20; 
                ctx.fillRect(this.posx,this.posy,20,20);
            }
        }
    }
    
    function mainMenu(){
        
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

        var Chrom = new Character(0,0);
        // Ceci va créer notre personnage (définir sa place dans la grille)
        Chrom.create();

        // Permets de détecter les touches du clavier
        $(document).keypress(function(e){         
            Chrom.move(e.key);             
        });
    }
});