"use strict";
(function(){
function init(){
    var size = 100;
    var canvas = document.getElementById('texture');
    var ctx  = canvas.getContext("2d");
    var impossibleButton = document.getElementById('impossibleButton');
    var form = document.getElementById('form');
    var actualForm = document.getElementById('actualForm');
    var darken = false;
    var submitButton = document.querySelector("#submitButton");

    var texture = new Image();
    texture.src = "./images/triangle.svg";

    texture.onload = function(){
    requestAnimationFrame(animate);
    }

    function animate(timestamp){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    var amountX = (canvas.width / size) + 1;
    var amountY = (canvas.height / size) + 1;

    for (var h = 0; h < amountY; h++){
        for (var w = 0; w < amountX; w++){
        ctx.save();
        ctx.translate(w * size,h * size);
        ctx.rotate(0.0007 * timestamp - ((w - h )* 0.1));
        ctx.scale(Math.sin(timestamp / 1000 - (h - w * Math.sin(timestamp / 3000)) ) + 1,Math.sin(timestamp / 1000 - (h - w * Math.sin(timestamp / 3000) )) + 1);
        ctx.translate(-w * size,-h * size);
        ctx.drawImage(texture, w * size, h * size, 100, 100 );
        ctx.restore();
        }
    }

    if (darken) {
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(0,0,canvas.width, canvas.height);
    }
    
    requestAnimationFrame(animate);
    }

    function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // resize/position button
    impossibleButton.style.left = ((window.innerWidth / 2) - (impossibleButton.clientWidth / 2)) + "px";
    impossibleButton.style.top = ((window.innerHeight / 2) - (impossibleButton.clientHeight / 2)) + "px";

    form.style.left = ((window.innerWidth / 2) - (form.clientWidth / 2)) + "px";
    form.style.top = ((window.innerHeight / 2) - (form.clientHeight / 2)) + "px";

    impossibleButton.style.opacity = 1;
    }

    window.onresize = resize;
    impossibleButton.onclick = function(){
        // fade out
        this.style.opacity = 0;
        this.style.zIndex = -1000;
        form.style.zIndex = 1000;
        form.style.opacity = 1;
        darken = true;
    }
    submitButton.onclick = function(){
        actualForm.submit();
    }
    resize();
}


window.onload = init;
})();