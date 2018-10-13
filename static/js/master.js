$(function(){
    var canvas = $("#canvas")[0];
    // Ici je défini la taille pour éviter de mettre ça dans le html
    canvas.setAttribute('width', 840);
    canvas.setAttribute('height', 480);

    // Le jeu sera en 2d pas en 3d
    var ctx = canvas.getContext("2d");
	var cwidth = $("#canvas").width();
    var cheight = $("#canvas").height();

    
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
        
        ctx.font = '60px Arial';
        ctx.fillText('Fire Emblem', 250, 200);
        ctx.font = 'italic 20px Arial';
        ctx.fillText('Javascript Edition',430,230);         
        
        // On créé une un nouveau bouton en utilisant le constructeur que j'ai fais
        var startingButton = new Button(320, 270, 200, 50,"20px Arial","Commencer");
        // On utilise la méthode pour le générer
        startingButton.drawButton("#dadadb","#000000");

        // // Pour la suite afin de détecter si le rectangle a été cliqué
        // $("#canvas").on("click",function(){
        
        // })

        // mousemove nous renvoie la position de la souris uniquement quand elle est sur le canvas
        $("#canvas").mousemove(function(event) {
            // Soluce trouvé pour contrer le décallage des coordonnées ici : https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
            var canvassize = canvas.getBoundingClientRect();
            var mousetracker = {
                x : event.clientX - canvassize.left,
                y : event.clientY - canvassize.top
            }
            if (mousetracker.x > startingButton.x && mousetracker.x < startingButton.x + startingButton.width && mousetracker.y > startingButton.y && mousetracker.y < startingButton.y + startingButton.height){
                // On appelle la méthode de notre objet pour changer son apparence
                startingButton.changeButtonColor("#8c8c8c","#000000");
            } else {
                // Dès que la souris sort on utilise à nouveau notre méthode en remettant aux valeurs de base
                startingButton.changeButtonColor("#dadadb","#000000");
            }     
        });
         
    }
    mainMenu();

});