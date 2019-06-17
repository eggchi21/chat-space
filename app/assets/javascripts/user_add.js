$(function(){
  var add_list=$('#chat-group-users');
  function appendUser(user){
    var html=`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user.id}'>
                <input name='group[user_ids][]' type='hidden' value=${user.id}>
                <p class='chat-group-user__name'>${user.name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
    add_list.append(html);
  };
  $(document).on("click",".user-search-add ",function(e){
    e.preventDefault();
    var user_id=$(this).attr('data-user-id');
    var user_name=$(this).attr('data-user-name');
    var user = {id: user_id , name: user_name};
    appendUser(user);
    $(this).parent().remove()
  });
});
