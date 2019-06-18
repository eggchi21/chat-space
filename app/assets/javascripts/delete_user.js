$(function(){
  var search_list=$("#user-search-result");
  function appendUser(user){
    var html=`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
              </div>`
    search_list.append(html);
  }
  $(document).on("click",".user-search-remove",function(e){
    e.preventDefault();
    $(this).parent().remove();
    var input=$("#user-search-field").val()
    var deleted_user_name = $(this).prev('p').text()
    var deleted_user_id = $(this).prev('p').prev('input').val()
    var deleted_user = {id: deleted_user_id, name: deleted_user_name}
    if (deleted_user_name.indexOf(input)===0){
      if (!($(".user-search-add ").length)){
        $("#user-search-result").empty();
      }
      appendUser(deleted_user)
    }
  });
});