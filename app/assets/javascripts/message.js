$(function(){

  function prependMessage(data){
    var nameSpan = $('<span class="name">').append(data.name);
    var timeSpan = $('<span class="time">').append(data.time);
    var bodyP = $('<p class="chat-unit__message">').append(data.message.body);
    var li = $('<li class="chat-unit__name-time">').append(nameSpan).append(timeSpan).append(bodyP);
    var div = $('<div class="chat-unit">').append(li);
    $('.message-list').prepend(div);
  }

  $('.main__footer--body').on('submit', function(e){
    e.preventDefault();
    var textField = $('#message_body')
    var message = textField.val();
    requestUrl = document.location.pathname;
    $.ajax({
      type: 'POST',
      url: requestUrl,
      data: {
        message: {
          body: message
        }
      },
      dataType: 'json'
    })
    .done(function(data){
      prependMessage(data);
      textField.val('');
    })
    .fail(function(){
      alert('error');
    });
  });
});
