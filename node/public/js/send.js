(function($, io){
  var socket = io.connect('http://localhost:1337/');
  var $posts = $('#posts')
  socket.on('server', function (data) {
    if( $( '#initial') ) {
      $( '#initial').remove();
    }
    
    var ht = '';
    ht += '<div><p>'+ data.file+' ('+data.line+')</p><p>'+ data.msg+'</p></div>'
    
    $posts.append( ht );
  });
}($, io));