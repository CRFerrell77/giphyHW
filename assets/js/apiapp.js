$(document).ready(function(){
    //global vars
    var topicArray = ["GI Joe", "Nintendo", "He-Man", "Thundercats", "Motley Crue", "Pac-Man", "DuckTales", "Voltron", "Hulkamania" ] //80's nostalgia
    var currentTopic = "";
    var apiKeyURL = "https://api.giphy.com/v1/gifs/search?api_key=OOnfnFi6GR7YTlFGpGbxmYlaQa6JnMwc&q="; //easier than remembering it

    //function to create selector buttons (wipe all then create new from array)
    function setBtns () {
        //wipe the div clean
        $("#buttonRow").html("");
        //then repopulate buttons
        for (i=0; i<topicArray.length; i++) {
            //console.log(topicArray[i]);
            var topicBtn = $('<button/>').attr("id", topicArray[i]).attr("class", "select btnStyle").text(topicArray[i]);
            $("#buttonRow").append(topicBtn);
        };
    };
    
    setBtns();

    //function to create a new button from a text input
        //then create buttons again
    $("#add-nos").on("click", function(event) {
        event.preventDefault(); //without this line, everything was resetting... why?
        var nostalgia = ($("#input80s").val().trim());
        //add it to the list
        topicArray.push(nostalgia);
        //reset buttons!
        setBtns();
    });

    //function to get button info / set Object
    $(document.body).on("click", ".select", function() {
        //empty out former giphy's (if any)
        $("#thingBox").html("");
        //Pull id
        currentTopic = $(this).attr("id");
        //random 1-20 number for the offset - since these are not current event items if you go too high you can find your images getting "out of focus"
        var randNum = Math.floor((Math.random() * 20) + 1);
        //set Object
        var currObj = apiKeyURL + currentTopic + "&limit=10&offset=" + randNum + "&rating=PG&lang=en";
        console.log(currObj);
        
        //function to populate 10 pictures
        //AJAX call w/response 
        $.ajax({
        url: currObj,
        method: "GET"
        }).done(function(response) {
            for (i=0; i<10; i++) { 
                //set the fixed H, still Img to a var
                var stillImg = response.data[i].images.fixed_height_still.url;
                var moveImg = response.data[i].images.fixed_height.url;
                var picRate = response.data[i].rating;
                //make the Img a 'thing', add the motion/still data
                var thisGiphy = $("<img>").attr("src", stillImg).attr("ani-still", stillImg).attr("ani-move", moveImg).attr("animate", "still").attr("class", "movement").attr("id", [i]);
                //add the thing to the box of things
                $("#thingBox").prepend(thisGiphy);
                //now to get the rating on there
                var thisRate = $("<div>").text("Rated: " + picRate);
                //add the thing to the box of things
                $("#thingBox").prepend(thisRate);
            };   
        });
    });

    //function to swap animated with still
    $(document.body).on("click", ".movement", function() {
        //set the animate data
        var ani = $(this).attr("animate");
        //check and flip the Animate data
        if (ani === "still") {
          $(this).attr("src", $(this).attr("ani-move")).attr("animate", "moving");
        } 
        if (ani === "moving") {
          $(this).attr("src", $(this).attr("ani-still")).attr("animate", "still");
        };
    });
});

