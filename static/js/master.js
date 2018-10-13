$(function(){
    var canvas = $("#canvas")[0];
    // Ici je défini la taille pour éviter de mettre ça dans le html
    canvas.setAttribute('width', 840);
    canvas.setAttribute('height', 480);

    // Le jeu sera en 2d pas en 3d
    var ctx = canvas.getContext("2d");
	var cwidth = $("#canvas").width();
    var cheight = $("#canvas").height();

    // On créé notre objet startingButton
    var startButton = {
        x: 320,
        y : 270,
        width : 200,
        height : 50, 
        color : "#dadadb",

        // méthode pour créer le rectangle
        drawRect : function() {
            // Ajoute de la couleur à notre rectangle
            ctx.fillStyle = this.color;
            // Dessine un rectangle remplit / strokeRect() au contraire ne dessine que ses bords sans le remplir
            ctx.fillRect(this.x,this.y,this.width,this.height);
            
            // On mets la couleur noire à notre font sinon ça va être de la même couleur que notre rectangle
            ctx.fillStyle = '#000000';
            ctx.font = '20px Arial';        
            // En faisant ainsi c'est à dire à utiliser les valeurs de bases du rectangle la position du texte sera toujours dans celui ci 
            ctx.fillText('Commencer', this.x+45, this.y+30);
        }
    };    
    
    
    function mainMenu(){
        
        ctx.font = '60px Arial';
        ctx.fillText('Fire Emblem', 250, 200);
        ctx.font = 'italic 20px Arial';
        ctx.fillText('Javascript Edition',430,230);         
        
        // On appel la méthode de notre objet qi fait un rectangle
        startButton.drawRect();        

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
            if (mousetracker.x > startButton[0] && mousetracker.x < startButton[0] + startButton[2] && mousetracker.y > startButton[1] && mousetracker.y < startButton[1] + startButton[3]){
                console.log(mousetracker);
                console.log('survol !');
                // clearRect() efface le rectangle il suffit d'indiquer les coordonnées qu'on avait rentrée pour créer le rectangle que l'on souhaite maintenant supprimer
                ctx.clearRect(startButton[0],startButton[1],startButton[2],startButton[3]);
            } else {
                // drawRect(startButton[0],startButton[1],startButton[2],startButton[3],startButton[4]);
            }        
        });
        
    }
    mainMenu();

});