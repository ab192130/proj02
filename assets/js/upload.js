var progressBody = $('#progressBar');
var progress = $('#progressBar .progress-bar');
var submit = $('#uploadBtn');

$(function(){
    progressBody.hide();
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
            progressBody.fadeIn();
            progress.css('width', percent);
//            alert('progress');
        }

    };

    xhr.upload.onload = function(e) {
//        progress.css('width', '100%');
        progressBody.fadeOut();
    };

    console.log(xhr);

    xhr.send(formData);
});



