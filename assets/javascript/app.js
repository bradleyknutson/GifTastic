var gifTastic = {
    topics: ["The Witcher", "Deus Ex", "Minecraft", "Factorio", "Portal"],
    queryUrl: '',
    addButtons: function(){
        $('#buttonSection').empty();
        this.topics.forEach(topic => {
            var topicButton = $('<button>');
            topicButton.data("topic", topic);
            topicButton.addClass('topics');
            topicButton.text(topic);
            $('#buttonSection').append(topicButton);
        });
    },
    displayImages: function(e){
        gifTastic.buildQueryUrl($(this).data('topic'));
        $.ajax({
            method: "GET",
            url: gifTastic.queryUrl
        }).then(function(response){
            console.log(response);
            var newGifSection = $('<div>');
            newGifSection.addClass('row')
            response.data.forEach(giphy => {
                var newGifDiv = $('<div>');
                newGifDiv.addClass('col-lg-4');
                var newGif = $('<img>');
                newGif.addClass('gif');
                newGif.attr('src', giphy.images.original_still.url);
                newGif.data('animated', 'off');
                newGifDiv.append(newGif);
                newGifDiv.append($('<p>').text(giphy.title));
                newGifDiv.append($('<p>').text("Rating: " + giphy.rating));
                newGifSection.append(newGifDiv);
            });;
            $('#gifSection').prepend(newGifSection);
        });
    },
    buildQueryUrl: function(searchTerm){
        gifTastic.queryUrl = '';
        var apiKey = 'TJxF5Z9s3iaJVlJ1fV2pSiby7iqKQw3L';
        var gifUrl = 'http://api.giphy.com/v1/gifs/search';
        searchTerm = searchTerm.replace(' ', '+');
        gifTastic.queryUrl += gifUrl + "?q=" + searchTerm + "&limit=10&api_key=" + apiKey;
    },
    addNewButton: function(){
        event.preventDefault();
        if($('#newTopic').val() && !gifTastic.topics.includes($('#newTopic').val())){
            gifTastic.topics.push($('#newTopic').val());
            $('#newTopic').val('');
        };
        gifTastic.addButtons();
    },
    animateGif: function(e){
        if($(this).data('animated') === 'off'){
            var newSource = $(this).attr('src');
            newSource = newSource.replace(/_s.gif/g, ".gif");
            $(this).attr('src', newSource);
            $(this).data('animated', 'on');
        }else{
            var newSource = $(this).attr('src');
            newSource = newSource.replace(/.gif/g, "_s.gif");
            $(this).attr('src', newSource);
            $(this).data('animated', 'off');
        }
    }
}





$(document).ready(function () {
    gifTastic.addButtons();
    $('#addButton').on('click', gifTastic.addNewButton);
    $(document.body).on('click', '.topics', gifTastic.displayImages);
    $(document.body).on('click', '.gif', gifTastic.animateGif);
});