Parse.initialize("yqmOnVqd4NdQPa8UVXLpMrYwlSn7vuGMe7wbjHvt", "ALZzjaSo5jJZGFQgpdC4xvsvqltGFzdJwiRRXE3f"); 
Parse.serverURL = "https://parseapi.back4app.com";

const Berry = Parse.Object.extend('Berry');


function saveBerry() {

    // post berry data to the backend
    var name = $("#exampleFormControlSelect1").val();
    var details = $("#discription").val();
    var rating = parseInt($("#ratingSelect").val()); // IMPORTANT TO CONVERT TO NUMBER
    var state = $("#stateName").val();
    var zip = parseInt($("#zipCode").val()); // IMPORTANT TO CONVERT TO NUMBER
    var city = $("#cityName").val();
    var location = $('#location').val();                                                                 //We have to add location in the index file
    
    const myNewObject = new Berry();

    myNewObject.set('Details', details);
    myNewObject.set('Name', name);
    myNewObject.set('Rating', rating);
    myNewObject.set('State', state);
    myNewObject.set('ZIP', zip);
    myNewObject.set('City', city);
    myNewObject.set('Location', location);

    //alert("Please insert required fields")

    myNewObject.save({
        success: function(){
            alert("Congratulation ! Berry has been added succesfully!!")
        }, error: function(error){
            alert("Something went wrong !")
            console.log("Error:" + error.message);
        }
    });
};




function getBerry(type) {

    const Berry = Parse.Object.extend('Berry');
    const query = new Parse.Query('Berry');


    // If there is specific type, then we add it to the query
    // otherwise, we search for all the database
    if (type != "all") {
        query.equalTo("Name", type);
    } 


      query.find().then((results) => {
      results.forEach((result) => {

        console.log("Berry succesfully got from the datbase");

        const Name = result.get('Name');
        const rating = result.get("Rating");
        const zip = result.get('ZIP');
        const state = result.get('State');
        const details = result.get('Details');
        const city = result.get('City');
        const location = result.get('Location')                                                                  // We have to add location in the index file.


        // HERE YOU GET THE LOCATION 
        // const Berry_location = blablabla

        console.log(Name, rating, zip, state, details, city, location);   

        // HERE YOU CALL THE MAP API TO PUT THE MARKER WITH THE LOCATION JUST RETRIEVED FROM ALL THE BERRIES
        // new marker = 
        // {
        //    blablabla
        //    location : Berry_location
        // }


  })
    }, (error) => {
      console.error(error);
       alert("error while getting data from database")
    });

};