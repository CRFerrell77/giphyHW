//window.onload = function () {
$(document).ready(function(){
    //global vars
    var topicArray = ["gi joe", "Nintendo", "He-Man", "Thundercats", "Alf", "Pac-Man", "DuckTales", "Voltron" ] //80's nostalgia
    var currentTopic = "";
    var apiKeyURL = "https://api.giphy.com/v1/gifs/search?api_key=OOnfnFi6GR7YTlFGpGbxmYlaQa6JnMwc&q="; //easier than remembering it

    //function to create selector buttons (wipe all then create new from array)
    function setBtns () {
        //wipe the div clean
        $("#buttonRow").html();
        //then repopulate buttons
        for (i=0; i<topicArray.length; i++) {
            //console.log(topicArray[i]);
            var topicBtn = $('<button/>').attr("id", topicArray[i]).attr("class", "select btnStyle").text(topicArray[i]);
            $("#buttonRow").append(topicBtn);
            };
        };
    
    setBtns();

    //function to get button info / set Object
    $(".select").on("click", function () {
        //Pull id
        currentTopic = $(this).attr("id");
        //console.log(currentTopic);
        //set Object
        var currObj = apiKeyURL + currentTopic + "&limit=10&offset=0&rating=PG&lang=en";
        console.log(currObj);
    });

    //function to populate 10 pictures
        //need to add in animated or not state "animate" (to the picture or the object?)

    //function to create a new button from a text input
        //then create buttons again

    //function to swap animated with still
    // $("//class for the shown picture//").on("click", function() {
        
    //     var ani = $(this).attr("animate");

    //     if (ani === "still") {
    //       $(this).attr("src", $(this).attr("//URL for animated//")).attr("animate", "moving");
    //     } 
    //     if (ani ==="moving") {
    //       $(this).attr("src", $(this).attr("//URL for still//")).attr("animate", "still");
    //     };
        
    // });
});

