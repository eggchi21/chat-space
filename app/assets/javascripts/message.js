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
    var html = `<div class="message">
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
});