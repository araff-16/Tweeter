
$(document).ready(function() {


  $("#tweetinput").on('input',function() {

    //NOTE WE NEED TO USE $(this) to access the jquery methods
    let counter = 140 - $(this).val().length;
    
    const countobj = $(this).closest('.new-tweet').find(".counter")
    countobj.text(counter)

    if (counter < 0) {
      countobj.css("color", "red")
    } else {
      countobj.css("color", "#545149")
    }
    
  })

});