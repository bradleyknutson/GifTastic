var gifTastic = {
    topics: ["The Witcher", "Deus Ex", "Minecraft", "Factorio", "Portal"],
    addButtons: function(){
        this.topics.forEach(topic => {
            var topicButton = $('<button>');
            topicButton.addClass('topics');
            topicButton.text(topic);
            $('#buttonSection').append(topicButton);
        });
    }
}






$(document).ready(function () {
    gifTastic.addButtons();
});