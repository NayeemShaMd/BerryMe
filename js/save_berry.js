Parse.initialize("yqmOnVqd4NdQPa8UVXLpMrYwlSn7vuGMe7wbjHvt", "ALZzjaSo5jJZGFQgpdC4xvsvqltGFzdJwiRRXE3f");
Parse.serverURL = "https://parseapi.back4app.com";

const Berry = Parse.Object.extend('Berry');


function saveBerry() {

    // post berry data to the backend
    var name = $("#exampleFormControlSelect1").val();
    var details = $("#discription").val();
    var rating = parseInt($("#ratingSelect").val()); // IMPORTANT TO CONVERT TO NUMBER
    var state = $("#locality").val();
    var zip = parseInt($("#postal_code").val()); // IMPORTANT TO CONVERT TO NUMBER
    var city = $("#locality").val();
    lat = document.getElementById("lat").value
    lang = document.getElementById("lang").value
    loc = lat +','+ lang
    console.log(loc)

    const myNewObject = new Berry();

    myNewObject.set('Details', details);
    myNewObject.set('Name', name);

    myNewObject.set('Rating', rating);
    myNewObject.set('State', state);
    myNewObject.set('ZIP', zip);
    myNewObject.set('City', city);
    myNewObject.set('Location', loc);

    //alert("Please insert required fields")

    myNewObject.save({
        success: function () {
            alert("Congratulation ! Berry has been added succesfully!!")
        }, error: function (error) {
            alert("Something went wrong !")
            console.log("Error:" + error.message);
        }
    });
};

