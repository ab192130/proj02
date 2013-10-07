var progressBody = $('#progressBar');
var progress = $('#progressBar .progress-bar');
var submit = $('#uploadBtn');

$(function(){
    progressBody.hide();
    $('.alert').hide();
});

submit.on('click', function(e){
    e.preventDefault();
    var formData = new FormData();
    var file = document.getElementById('myFile').files[0];
    formData.append('myFile', file);

    var xhr = new XMLHttpRequest();

    xhr.open('post', '/user/edit/picture', true);

    xhr.upload.onprogress = function(e) {
//        progress.fadeIn();
        if(e.lengthComputable){
            var percent = ((e.loaded / e.total) * 100) + '%';
            progressBody.fadeIn(100);
            $('#myFile').hide();
            progress.css('width', percent);
//            alert('progress');
        }

    };

    xhr.onerror = function(e) {
//        alert('Error: ' + this.statusText);
        console.log('Error: ' + this.statusText);

    };

    xhr.onload = function(e) {
//        progress.css('width', '100%');
        if(this.statusText !== 'OK'){
            var alert = '<div class="alert alert-danger">'+
                'Error!' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                '</div>';
            $('#message').append(alert);
        } else {
            var alert = '<div class="alert alert-success">'+
                'Success!' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                '</div>';
            $('#message').append(alert);
        }
        $('#myFile').fadeIn();
        progressBody.fadeOut();
//        var alert = 'success! <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
//        $('#message').append(alert);

    };

    console.log(xhr);

    xhr.send(formData);
});






