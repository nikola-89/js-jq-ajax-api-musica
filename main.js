$(document).ready(function() {
    builder = Handlebars.compile($('#builder').html());
    request();
});

// ***************************
// **********function*********
// ***************************

function request() {
    $.ajax(
        {
            url: "https://flynn.boolean.careers/exercises/api/array/music",
            method: "GET",
            success: function (r, s) {
                if (r.success) {
                    print(r.response);
                } else {
                    error();
                }
            },
            error: function (r, s) {
                error();
            }
        }
    );
}

function print(resp) {
    for (var i = 0; i < resp.length; i++) {
        $('.cds-container').append(builder(resp[i]));
    }
}

function error() {
    var error_config = {
        poster : 'https://i.imgur.com/wm3Wlmc.png',
        title : 'impossibile soddisfare la richiesta'
    }
    $('.cds-container').append(builder(error_config));
}
