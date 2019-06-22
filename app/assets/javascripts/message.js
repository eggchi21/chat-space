$(function(){
  function buildHTML(message){
    if (message.image==null){
      var submission =`<p class="lower-message__content">
                        ${message.content}
                      </p>`;
    }
    else if (message.content==null){
      var submission =` <img class="lower-message__image" src= ${message.image} alt="28"></img>`;
    }
    else{
      var submission=`<p class="lower-message__content">
                        ${message.content}
                      </p>
                      <img class="lower-message__image" src= ${message.image} alt="28"></img>`;
    }
    var html = `<div class="message" data-id=${message.id}>
                  <div class="upper-message">
                    <div class="upper-message__username">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    ${submission}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url= $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html =buildHTML(message);
      $('.chat-messages').append(html);
      $('.chat-messages').animate({scrollTop:$('.chat-messages').get(0).scrollHeight},"fast");
      $('#new_message')[0].reset();
      $('input').removeAttr('disabled');
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました')
      $('input').removeAttr('disabled');
    })
  })

  var reloadMessages = function(){
    var last_message_id=$('.message').last().data('id')
    var group_id=$('.chat-header-left__group-name').data('id')
    $.ajax({
      url: `/groups/${group_id}/api/messages`,
      type: 'get',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages){
      messages.forEach(function(message){
        var insertHTML = buildHTML(message);
        $('.chat-messages').append(insertHTML);
        $('.chat-messages').animate({scrollTop:$('.chat-messages').get(0).scrollHeight},"fast");
      })
    })
    .fail(function(){
      alert('自動更新に失敗しました')
    })
  }
  $(window).on('load',function(){
    var url=location.href
    if(url.match(/\/groups\/\d+\/messages/)){
      setInterval(reloadMessages, 5000);
    }
  })
})