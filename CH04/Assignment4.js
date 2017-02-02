function calculateValues(height, time)
{   
    var g = 9.8;
    var v = g * time;
    var displacement = (g*Math.pow(time, 2))/2; 
    var valueArray = [displacement, v];
    return valueArray;
}

function display() {
    $("#table thead").remove();
    $("#table tbody").remove();

    var height = $("#height").val();

    if(height.length === 0 )
    {
        alert("Please enter the inital height.");
    }
    else if(height > 3000)
    {
        alert("Please enter the inital height less than or equal to 3000.");
    }
    else if(height < 0)
    {
        alert("Please enter a positive value.");
    }
    else
    {
        var time = 0;
        var valueArray = [];
        var velocity = 0;
        height = height * 1;
        var currentHeight = height;

        $("#table").append("<thead><tr><th>"
                + "<div class=\"head\">Time (s)</div></th>"
                + "<th><div class=\"head\">Height (m)</div></th>"
                + "<th><div class=\"head\">Velocity (m/s)</div></th></tr>");
        let tableBody = $("<tbody></tbody>");
        while(currentHeight >= 0)
        {
            let row = $("<tr><td><div class=\"content\">" + time.toFixed(2) 
                    +"</div></td><td><div class=\"content\">" 
                    + currentHeight.toFixed(2) +"</div></td><td>" 
                    + "<div class=\"content\">" + velocity.toFixed(2)
                    + "</div></td></tr>");
            tableBody.append(row);
            time++;
            valueArray = calculateValues(height, time);
            currentHeight = height - valueArray[0]; 
            velocity = valueArray[1];
        }
        $("#table").append(tableBody);
    }
}
