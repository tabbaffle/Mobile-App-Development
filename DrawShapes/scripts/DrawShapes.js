var ctx;

function validateData() {
    var shapeType = $("#shapeType").val();
    var fillOrStroke = $("#input[name=fillOrStrokeSelect]:checked").val();
    var size = parseInt($("#sizeInput").val());

    if(shapeType === 'unselected') {
        alert("Please select a shape");
        return false;
    }
    else if(size == NaN || size > 400 || size < 1) {
        alert("Please enter a positive size (<= 400)");
        return false;
    }
    return true;
}

function drawShape(shape, fillOrStroke, size) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";

    if(shape == 'circle') {
        ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
        if(fillOrStroke == 'fill') {
            ctx.fill();
        }
        else {
            ctx.stroke();
        }
    }
    else {
        if(fillOrStroke == 'fill') {
            ctx.fillRect(0, 0, size, size);
        }
        else {
            ctx.strokeRect(0, 0, size, size);
        }
    }
}

$("#drawShape").click(
    function() {
        if (validateData()) {
            var canvas = document.getElementById("shapeCanvas");
            ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            var shapeType = $("#shapeType").val();
            var fillOrStroke = $("input[name=fillOrStrokeSelect]:checked").val();
            var size = parseInt($("#sizeInput").val());

            drawShape(shapeType, fillOrStroke, size);
        }
});