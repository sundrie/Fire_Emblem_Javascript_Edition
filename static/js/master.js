$(function(){
    var canvas = $("#canvas")[0];
    // Ici je défini la taille pour éviter de mettre ça dans le html
    canvas.setAttribute('width', 840);
    canvas.setAttribute('height', 480);

    // Le jeu sera en 2d pas en 3d
    var ctx = canvas.getContext("2d");
	var cwidth = $("#canvas").width();
    var cheight = $("#canvas").height();
    
    function mainMenu(){
        ctx.font = '60px Arial';
        ctx.fillText('Fire Emblem', 250, 200);
        ctx.font = 'italic 20px Arial';
        ctx.fillText('Javascript Edition',430,230);  

        // Pour plus de simplicité d'accès je stock tout ça sous cette forme
        var startButton = {
            x:320,
            y:270,
            width:200,
            height:50
        }

        // Ajoute de la couleur à notre rectangle
        ctx.fillStyle = '#dadadb';
        // Dessine un rectangle remplit / strokeRect() au contraire ne dessine que ses bords sans le remplir
        ctx.fillRect(startButton.x,startButton.y,startButton.width,startButton.height);

        // On mets la couleur noire à notre font sinon ça va être de la même couleur que notre rectangle
        ctx.fillStyle = '#000000';
        ctx.font = '20px Arial';        
        // En faisant ainsi c'est à dire à utiliser les valeurs de bases du rectangle la position du texte sera toujours dans celui ci 
        ctx.fillText('Commencer', startButton.x+45, startButton.y+30);

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
                console.log(mousetracker);
                console.log('survol !');                  
            }        
        });
        
    }
    mainMenu();






});