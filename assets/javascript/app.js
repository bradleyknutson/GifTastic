var gifTastic = {
    topics: ["The Witcher", "Deus Ex", "Minecraft", "Factorio", "Portal"],
    queryUrl: '',
    addButtons: function(){
        $('#buttonSection').empty();
        this.topics.forEach(topic => {
            var topicButton = $('<button class="btn btn-dark">');
            topicButton.data("topic", topic);
            topicButton.data('offset', 0);
            topicButton.addClass('topics');
            topicButton.text(topic);
            $('#buttonSection').append(topicButton);
        });
    },
    displayImages: function(e){
        gifTastic.buildQueryUrl($(this).data('topic'), $(this).data('offset'));
        $(this).data('offset', $(this).data('offset') + 10);
        $.ajax({
            method: "GET",
            url: gifTastic.queryUrl
        }).then(function(response){
            console.log(response);
            var newGifSection = $('<div class=row>');
            var leftSide = true;
            response.data.forEach(giphy => {
                if(leftSide === true){
                    var newCardDiv = $('<div class="col-lg-5 card">');
                    var newGif = $('<video controls loop class=gif>');
                    newGif.attr('src', giphy.images.original_mp4.mp4);
                    newGif.attr('type', 'video/mp4');
                    newCardDiv.append($('<div class=card-header>').text(giphy.title + " || Rated " + giphy.rating.toUpperCase()));
                    var newGifDiv = $("<div class=card-body>");
                    newGifDiv.append(newGif);
                    newCardDiv.append(newGifDiv);
                    newGifSection.append(newCardDiv);
                    newGifSection.append($('<div class=col-lg-2>'));
                    leftSide = false;
                }else{
                    var newCardDiv = $('<div class="col-lg-5 card">');
                    var newGif = $('<video controls loop class=gif>');
                    newGif.attr('src', giphy.images.original_mp4.mp4);
                    newGif.attr('type', 'video/mp4');
                    newCardDiv.append($('<div class=card-header>').text(giphy.title + " || Rated " + giphy.rating.toUpperCase()));
                    var newGifDiv = $("<div class=card-body>");
                    newGifDiv.append(newGif);
                    newCardDiv.append(newGifDiv);
                    newGifSection.append(newCardDiv);
                    leftSide = true;
                }
            });;
            $('#gifSection').prepend(newGifSection);
        });
    },
    buildQueryUrl: function(searchTerm, offset){
        gifTastic.queryUrl = '';
        var apiKey = 'TJxF5Z9s3iaJVlJ1fV2pSiby7iqKQw3L';
        var gifUrl = 'https://api.giphy.com/v1/gifs/search';
        searchTerm = searchTerm.replace(' ', '+');
        gifTastic.queryUrl += gifUrl + "?q=" + searchTerm + "&offset=" + offset + "&limit=10&api_key=" + apiKey;
    },
    addNewButton: function(){
        event.preventDefault();
        if($('#newTopic').val().trim() && !gifTastic.topics.includes($('#newTopic').val().trim())){
            gifTastic.topics.push($('#newTopic').val().trim());
            $('#newTopic').val('');
        };
        gifTastic.addButtons();
    },
}

$(document).ready(function () {
    gifTastic.addButtons();
    $('#addButton').on('click', gifTastic.addNewButton);
    $('#newTopic').keypress(function(e){
        if(e.key === "Enter"){
            gifTastic.addNewButton();
        }
    });
    $(document.body).on('click', '.topics', gifTastic.displayImages);
});