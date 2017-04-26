/* 
 * @author Connor Tannahill 
 */



//##############################################
var SERVER_URL = 'http://dev.cs.smu.ca:8141';
//##############################################


function validateData() {
    //first get the values from the fields
    var a_number = $("#a_number").val();
    var studentType = $("input[name=studentOptions]:checked").val();
    var ageGroup = $("#ageRange").val();

    var pattern = /A[0-9]{8}/;

    if (a_number === '') {
        alert("Please enter the A-Number.");
        $("#a_number").focus();
        return false;
    }
    else if (a_number.length !== 9) {
        alert("The A-Number length is incorrect");
        $("#a_number").focus();
        return false;
    }
    else if (a_number.charAt(0) !== 'A') {
        alert("The A-Number should start with an \"A\"");
        $("#a_number").focus();
        return false;
    }
    else if(!(pattern.test(a_number))) {
        alert("Only digits are allowed after the \"A\"");
        $("#a_number").focus();
        return false;
    }

    if(ageGroup === "unselected") {
        alert("Please select the age group");
        $("ageRange").focus();
        return false;
    }

    return true;
}


$('#saveButton').click(
        function () {

            if (validateData()) {

                //create an object
                var newObj = {
                    "A_Number": $("#a_number").val(),
                    "StudentType": $("input[name=studentOptions]:checked").val(),
                    "AgeGroup": $("#ageRange").val()
                };


                //now store it
                $.post(SERVER_URL + "/saveInformation",
                        newObj,
                        function (data) {
                            alert("Record Saved!");
                        })
                        .fail(function (error) {
                            alert("error in post saveInformation", error.responseText);
                        });


            }//end if validateData()

        }//end function
);

$('#displayButton').click(
        function () {

            //#############################################

            var information = [];//place holder

            $.post(SERVER_URL + '/getInformation',
//                    null, //you can also pass an empty string etc
                    function (data) {

                        //if found, use it, at this point, it's still an array!
                        information = data;

                        if (information == null || information.length == 0) {
                            //no record whatsoever, let the user know
                            alert("No record found");
                        }
                        else {
                            alert('Records downloaded successfully!');


                            //Initializing the table
                            $("#displayTable").html(
                                    "   <tr>" +
                                    "     <th>A-number</th>" +
                                    "     <th>Level</th>" +
                                    "     <th>Age Group</th>" +
                                    "   </tr>"
                                    );

                            var table = document.getElementById('displayTable');


                            //go through each record
                            for (var i = 0; i < information.length; i++) {

                                var a_number = information[i].A_Number
                                var studentType = information[i].StudentType; 
                                var ageGroup = information[i].AgeGroup; 

                                var r = table.insertRow();
                                r.insertCell(-1).innerHTML = a_number;
                                r.insertCell(-1).innerHTML = studentType;
                                r.insertCell(-1).innerHTML = ageGroup;

                            }//end for                    

                        }//end else                        


                    }).fail(function (error) {
                alert(error.responseText);
            });

            //#############################################

        }//end function
);
