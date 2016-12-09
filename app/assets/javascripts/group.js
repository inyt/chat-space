$(function(){
  $(document).on('turbolinks:load', function(){
    var preWord = "";
    function showUser(users){
      $.each(users, function(id, user){
        var html = '<div class="chat-group-user clearfix" id="group-user-div-add-' + user.id + '">' +
                   '<p class="chat-group-user__name">' + user.name + '</p>' +
                   '<a class="chat-group-user__btn user-search-add" id="group-user-add-' + user.id + '" data-user-name="' + user.name + '">追加</a>' +
                   '</div>';
        $('#user-search-result').append(html);
     });
    };

    function addUser(id, name){
      var html = '<div class="chat-group-user clearfix" id="group-user-' + id + '">' +
                 '<p class="chat-group-user__name">' + name + '</p>' +
                 '<a class="chat-group-user__btn user-search-remove" id="group-user-delete-' + id + '">削除</a>' +
                 '<input value="' + id + '" type="hidden" name="group[user_ids][]">' +
                '</div>';
      $('#chat-group-users').append(html);
    };

    $('.user-search-remove').on('click', function(){
      var userId = parseInt($(this).attr('id').match(/\d/g), 10);
      var divId = "#group-user-" + userId;
      $(divId).remove();
    });

    $('#user-search-field').on('keyup', function(){
      var textField = $('#user-search-field');
      var input = textField.val();

      if(input != preWord){
        $.ajax({
          type: 'GET',
          url: '/users/search',
          data: { input: input },
          dataType: 'json'
        })
        .done(function(data){
          $('#user-search-result').empty();
          showUser(data);

          $('.user-search-add').on('click', function(){
            var name = $(this).attr('data-user-name');
            var id = parseInt($(this).attr('id').match(/\d/g), 10);
            addUser(id, name);
            $(this).parent().remove();
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
      }
  preWord = input;
    })
  });
});
