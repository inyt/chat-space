$(function(){

  function appendMessage(data){
    if(data.message.image.url){
      var html =  '<div class="chat-unit">' +
                  '<li class="chat-unit__name-time" id="new-message">' +
                  '<span class="name">' + data.name + '</span>' +
                  '<span class="time">' + data.time + '</span>' +
                  '<p class="chat-unit__message">' + data.message.body + '</p>' +
                  `<img src="${data.message.image.url}">` +
                  '</li>' +
                  '</div>';
    }else{
      var html =  '<div class="chat-unit">' +
                  '<li class="chat-unit__name-time" id="new-message">' +
                  '<span class="name">' + data.name + '</span>' +
                  '<span class="time">' + data.time + '</span>' +
                  '<p class="chat-unit__message">' + data.message.body + '</p>' +
                  '</li>' +
                  '</div>';
    }
    $('.message-list').append(html);
  };

  function pageScroll(){
    $('.main__body').animate({scrollTop: $('.main__body')[0].scrollHeight}, 'slow');
  }

  function autoUpdate(){
    url = document.location.pathname;
    if( url.match(/messages/) ){
      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json'
      })
      .done(function(data){
        var length = $('li').length;
        console.log(data.number);
        console.log(length);
        if(length != data.number){
          appendMessage(data);
          pageScroll();
        }
      })
      .fail(function(){
        alert('err');
      });
    }
  }


  setInterval(autoUpdate, 2000);


  $(document).on('turbolinks:load', function(){
    pageScroll();
  });

  $('.submit').on('click', function(e){
    e.preventDefault();
    var message = new FormData($('#new_message').get(0));
    requestUrl = document.location.pathname;
    $.ajax({
      type: 'POST',
      url: requestUrl,
      data: message,
      processData: false,
      contentType: false,
      dataType: 'json'
    })
    .done(function(data){
      appendMessage(data);
      pageScroll();
      $('#message_body').val('');
    })
    .fail(function(){
      alert('error');
    });
  });
});

