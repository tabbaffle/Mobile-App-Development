function display() {
    var name = $("#name").val();
    var aNumber = $("#a_number").val();
    var major = $("#major").val();
    var gpa = $("#gpa").val();

    $("#table_name").html(name);
    $("#table_a_number").html(aNumber);
    $("#table_major").html(major);
    $("#table_gpa").html(gpa);
}
