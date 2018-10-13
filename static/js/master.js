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
    function Button(x, y, width, height,bcolor,tcolor,tfont,text) {
        this.x = x; 
        this.y = y;
        this.width = width;
        this.height = height;
        this.bcolor = bcolor;
        this.tcolor = tcolor;
        this.tfont = tfont;
        this.text = text;

        // méthode pour modéliser le bouton
        this.drawButton = function() {            
            // Ajoute de la couleur à notre rectangle
            ctx.fillStyle = this.bcolor;
            // Dessine un rectangle remplit / strokeRect() au contraire ne dessine que ses bords sans le remplir
            ctx.fillRect(this.x,this.y,this.width,this.height);
            
            // On mets la couleur noire à notre font sinon ça va être de la même couleur que notre rectangle
            ctx.fillStyle = tcolor;
            ctx.font = tfont;        
            // En faisant ainsi c'est à dire à utiliser les valeurs de bases du rectangle la position du texte sera toujours dans celui ci 
            ctx.fillText(text, this.x+45, this.y+30);
        }
    } 
    
    function mainMenu(){
        
        ctx.font = '60px Arial';
        ctx.fillText('Fire Emblem', 250, 200);
        ctx.font = 'italic 20px Arial';
        ctx.fillText('Javascript Edition',430,230);         
        
        // On créé une un nouveau bouton en utilisant le constructeur que j'ai fais
        var startingButton = new Button(320, 270, 200, 50,"#dadadb","#000000","20px Arial","Commencer");
        // On utilise la méthode pour le générer
        startingButton.drawButton();

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
            if (mousetracker.x > startButton.x && mousetracker.x < startButton.x + startButton.width && mousetracker.y > startButton.y && mousetracker.y < startButton.y + startButton.height){
                //console.log(mousetracker);
                console.log('survol !');
                // clearRect() efface le rectangle il suffit d'indiquer les coordonnées qu'on avait rentrée pour créer le rectangle que l'on souhaite maintenant supprimer
                // ctx.clearRect(startButton.x,startButton.y,startButton.width,startButton.height);
                // startButton.drawRect();
                // console.log(startButton.color);
                // startButton.color="blue"
                // console.log(startButton.color);
                
            } else {
                // startButton.drawRect();
            }        
        });
        
    }
    mainMenu();

});