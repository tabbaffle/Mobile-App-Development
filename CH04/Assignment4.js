//TODO Figure out how to delete the table elements. 
function calculateValues(height, time)
{   
    var g = 9.8;
    var v = g * time;
    var displacement = (g*Math.pow(time, 2))/2; 
    var valueArray = [displacement, v];
    return valueArray;
}

function display() {
    $("#table tbody > tr").remove();

    var height = $("#height").val();

    if(height === false)
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
        var currentHeight = 0;

        let tableBody = $("<thead></thead>");
        while(currentHeight >= 0)
        {
            let row = $("<tr><td>" + time.toFixed(2) 
                    +"</td><td>" + currentHeight.toFixed(2) +"</td><td>" 
                    +velocity.toFixed(2)+"</td></tr>");
            tableBody.append(row);
            time++;
            valueArray = calculateValues(height, time);
            currentHeight = height - valueArray[0]; 
            velocity = valueArray[1];
        }
        $("#table").append(tableBody);
    }
}
