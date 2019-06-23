$(function(){
  var search_list=$("#user-search-result");
  function appendUser(user){
    var html=`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
              </div>`
    search_list.append(html);
  }
  function appendErrMsgHTML(msg){
    var html=`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${msg}</p>
              </div>`
    search_list.append(html)
  }

  function addUserId(added_user_ids){
    var added_list=$(".chat-group-user").find('input')
    added_list.each(function(i , added_user){
      added_user_ids.push(Number($(added_user).val()))
    })
    return added_user_ids
  }
  $("#user-search-field").on("keyup",function(){
    var input=$(this).val();
    $.ajax({
      type:'GET',
      url: '/users',
      data: { keyword: input },
      dataType:'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
      var added_user_ids=[]
      addUserId(added_user_ids)
      if (input.length !==0 && users.length !== 0){
        users.forEach(function(user){
          if($.inArray(user.id,added_user_ids) == -1){
            appendUser(user);
          }
        });
        if(!($(".user-search-add ").length)){
          appendErrMsgHTML("一致するユーザーが見つかりません")
        }
      }
      else{
        appendErrMsgHTML("一致するユーザーが見つかりません")
      }
    })
    .fail(function(){
      alert('失敗しました')
    })
  });
});