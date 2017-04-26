var SERVER_URL = 'http://dev.cs.smu.ca:8241';

var hasMadeTransaction = false;

function checkForTransaction () {
    $.post(SERVER_URL + '/getTransactions', null, 
        function (data) {
            transactions = data;
            if (transactions == null || transactions.length == 0) {
                hasMadeTransaction = false;
            }
            else {
                hasMadeTransaction = true;
            }
        }).fail(function (error) {
            alert(error.responseText);
    });
}

//Switch page when buttons on menu page are pressed.
//Includes controller to only allow access to transactions page once one has been made.
$(".switchPage").click(function(){
    var buttonId = this.id;
    console.log(buttonId);
    if(buttonId == "Transactions") {
        checkForTransaction();
        if(hasMadeTransaction === true) {
            window.location.href 
                = window.location.pathname +"#Transactions";
            drawTransactionTable();

        }
        else {
            alert("No record found");
        }
    }
    else if(buttonId == "Deposit") {
        window.location.href 
            = window.location.pathname + "#Deposit";
    }
    else if(buttonId == "Withdraw") {
        window.location.href 
            = window.location.pathname + "#Withdraw"
    }
});

//Check inputted values for depositing and withdrawing.
function verifyInput(amount) {
    if(amount <= 0 || amount.length === 0) {
        alert('Please enter a positive amount.');
        return false;
    }
    return true;
}

//Function to make JSON objects given the type of transaction given.
function makeJSON(transactionType, amount) {
    var newObj = {
        "TransactionTime" : new Date($.now()).toLocaleString(),
        "TransactionType" : transactionType,
        "Amount" : parseFloat(amount).toFixed(2)
    }
    return newObj;
}

//Functionality when depositing.
$("#depositToAccount").click(function() {
    var amount = $("#depositAmount").val();

    if(verifyInput(amount)) {
        var newObj = makeJSON('Deposit', amount);
        console.log(newObj)

        $.post(SERVER_URL + '/recordTransaction', newObj, 
            function(data) {
                alert('Deposit completed.');
            }).fail(function(error) {
                alert(error.responseText);
        });

        hasMadeTransaction = true;
        $("#depositAmount").val('');
        var depositTable = $("#depositTable");
        depositTable.html('');
        depositTable.html("<tr><th>Date/Time</th><th>Operation</th><th>Amount</th></tr>");
        depositTable.append('<tr><td>'+newObj.TransactionTime+'</td><td>'
            +newObj.TransactionType+'</td><td>'+newObj.Amount+'</td></tr>');
    }
});

//Functionality when withdrawing.
$("#withdrawFromAccount").click(function() {
    var amount = $("#withdrawAmount").val();
    if(verifyInput(amount)) {
        amount *= -1;
        var newObj = makeJSON('Withdraw', amount);
        
        $.post(SERVER_URL  + '/recordTransaction', newObj,
            function(data) {
                alert('Withdraw completed.');
            }).fail(function(error) {
                alert(error.responseText);
        });

        hasMadeTransaction = true;
        $("#withdrawAmount").val('');
        var withdrawTable = $("#withdrawTable");
        withdrawTable.html('');
        withdrawTable.html("<tr><th>Date/Time</th><th>Operation</th><th>Amount</th></tr>");
        withdrawTable.append('<tr><td>'+newObj.TransactionTime+'</td><td>'
            +newObj.TransactionType+'</td><td>'+newObj.Amount+'</td></tr>');
    }
});

function drawTransactionTable() {
    var transactions = [];

    $.post(SERVER_URL + '/getTransactions', null, 
        function (data) {
            transactions = data;
            transactionsTable = $('#transactionsTable');

            if (transactions == null || transactions.length == 0) {
                alert('No transactions found.');
                transactionsTable.html('');
            }
            else {
                transactionsTable.html("<tr><th>Date/Time</th><th>Operation</th><th>Amount</th></tr>");

                for(var i = 0; i < transactions.length; i++) {
                    transactionsTable.append('<tr><td>'+transactions[i].TransactionTime
                        +'</td><td>'+transactions[i].TransactionType+'</td><td>'
                        +transactions[i].Amount+'</td></tr>');
                }

            }

        }).fail(function (error) {
            alert(error.responseText);
    });
}

//Clear tables when going back to the menu.
$('.MenuButton').click(function() {
    $('#depositTable').html('');
    $('#withdrawTable').html('');
    $('#transactionsTable').html('');
});