$(function() {
    $('.post-like a').click(function(e){
		e.preventDefault();      
        var anchor = $(this);
        var postID = anchor.data('post-id');

        $.ajax({
            type: 'post',
            url: ajax_var.url,
            data: 'action=post-like&nonce=' + ajax_var.nonce + '&post_like=&post_id=' + postID,
            success: function(count){
                // console.log( count );
                if (count != 'already') {
                    anchor.addClass('voted');
                    anchor.siblings('.count').text(count);
                }
            }
        });     
        return false;
    });
});