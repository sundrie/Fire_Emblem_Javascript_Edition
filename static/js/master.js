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
    
    function mainMenu(){

        var background = new Image();
        background.src = "http://localhost/Fire_Emblem_Javascript_Edition/static/img/background_FEA.jpg";
        // Le onload est obligatoire pour charger l'image
        background.onload = function(){
            ctx.drawImage(background,0,0,cwidth,cheight);   
        }
        
        ctx.fillStyle="#000000";
        ctx.font = '60px Arial';
        ctx.fillText('Fire Emblem', 250, 200);
        ctx.font = 'italic 20px Arial';
        ctx.fillText('Javascript Edition',430,230);         
        
        // On créé une un nouveau bouton en utilisant le constructeur que j'ai fais
        var startingButton = new Button(320, 270, 200, 50,"20px Arial","Commencer");
        // On utilise la méthode pour le générer
        startingButton.drawButton("#dadadb","#000000");        

        // mousemove nous renvoie la position de la souris uniquement quand elle est sur le canvas
        $("#canvas").mousemove(function(e) {
            mousetracker = {
                x : e.clientX - canvassize.left,
                y : e.clientY - canvassize.top
            }
            // on appelle notre fonction qui permets de savoir si la souris touche notre zone cible
            var hit = mouseTracking(mousetracker,startingButton); 
            // Si la fonction nous renvoie true ça veut dire que la souris est dans la zone           
            if (hit) {
                // On appelle la méthode de notre objet pour changer l'apparence du bouton
                startingButton.changeButtonColor("#8c8c8c","#000000");
            } else {
                // Dès que la souris sort on utilise à nouveau notre méthode en remettant aux valeurs de base
                startingButton.changeButtonColor("#dadadb","#000000");
            }

        });
        
        $("#canvas").on("click",function(e){
            mousetracker = {
                x : e.clientX - canvassize.left,
                y : e.clientY - canvassize.top
            }
            // on appelle notre fonction qui permets de savoir si la souris touche notre zone cible
            var hit = mouseTracking(mousetracker,startingButton); 
            // Si la fonction nous renvoie true ça veut dire que la souris est dans la zone           
            if (hit) {
                titleScreen();
            }
        })
         
    }
    mainMenu();

    function titleScreen() {
        console.log("Ecran de début");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

});