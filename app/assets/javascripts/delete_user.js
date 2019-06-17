$(function(){
  $(document).on("click",".user-search-remove",function(e){
    e.preventDefault();
    $(this).parent().remove();
  });
});