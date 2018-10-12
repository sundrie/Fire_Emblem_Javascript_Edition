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
        ctx.fillRectangle
        ctx.font = '20px Arial';
        ctx.fillText('Fire Emblem', 420, 50);
        ctx.font = '16px italic';
        ctx.fillText('Javascript Edition',420,80);
    }

    mainMenu();
});