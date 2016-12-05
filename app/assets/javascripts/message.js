$(function(){

  function appendMessage(data){
    var html =  '<div class="chat-unit">' +
                '<li class="chat-unit__name-time">' +
                '<span class="name">' + data.name + '</span>' +
                '<span class="time">' + data.time + '</span>' +
                '<p class="chat-unit__message">' + data.message.body + '</p>' +
                '</li>' +
                '</div>';
    $('.message-list').append(html);
  };

  function pageScroll(){
    $('.main__body').animate({scrollTop: $('.main__body')[0].scrollHeight}, 'fast');
  }

  $(document).on('turbolinks:load', function(){
    pageScroll();
  });

  $('.submit').on('click', function(e){
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
      appendMessage(data);
      pageScroll();
      textField.val('');
    })
    .fail(function(){
      alert('error');
    });
  });
});

