$(function(){

  function showUser(users){
    $.each(users, function(id, user){
      var html = `<div class="chat-group-user clearfix" id="group-user-div-add-${id}">` +
                 `<p class="chat-group-user__name">${user.name}</p>` +
                 `<a class="chat-group-user__btn user-search-add" id="group-user-add-${user.id}" data-user-name="${user.name}">追加</a>` +
                 '</div>';
      $('#user-search-result').append(html);
   });
  };

  function addUser(id, name){
    var html = `<div class="chat-group-user clearfix" id="group-user-${id}">` +
               `<p class="chat-group-user__name">${name}</p>` +
               `<a class="chat-group-user__btn user-search-remove" id="group-user-delete-${id}">削除</a>` +
               `<input value="${id}" type="hidden" name="group[user_ids][]">` +
              '</div>';
    $('#chat-group-users').append(html);
  };

    $('.user-search-remove').on('click', function(){
      var userId = parseInt($(this).attr('id').match(/\d/g), 10);
      var divId = "#group-user-" + userId;
      $(divId).remove();
    });

  $(document).on('turbolinks:load', function(){
    $('#member-search').on('click', function(e){
      e.preventDefault();
      var textField = $('#user-search-field')
      var input = textField.val();

      $.ajax({
        type: 'GET',
        url: '/users/search',
        data: { input: input },
        dataType: 'json'
      })
      .done(function(data){
        showUser(data);
        textField.val('');

        $('.user-search-add').on('click', function(e){
          var name = $(this).attr('data-user-name');
          var id = parseInt($(this).attr('id').match(/\d/g), 10);
          addUser(id, name);
        });


        $(document).on('click', '.user-search-remove', function(){
          var userId = parseInt($(this).attr('id').match(/\d/g), 10);
          var divId = "#group-user-" + userId;
          $(divId).remove();
        });

      })
      .fail(function(){
        alert('error');
      });
    })

  });

});
