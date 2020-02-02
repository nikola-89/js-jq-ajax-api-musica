$(document).ready(function() {
    // ***************************
    arr_response = [];
    // ***************************
    builder_cd = Handlebars.compile($('#builder_cd').html());
    builder_list = Handlebars.compile($('#builder_list').html());
    // ***************************
    request();
    // ***************************
    $(document).on('click', '.placeholder', function () {
        $('.placeholder').css('opacity', '0');
        $('.list__ul').toggle();
    });
    // ***************************
    $(document).on('click', '.list__ul li', function (event) {
        event.preventDefault();
        $('.placeholder').text($(this).value).css('opacity', '1');
        $('.list__ul').toggle();
        $('.cds-container .cd').remove();
        printCdByGenre($(this).attr('value'));
    });
});
// ***************************
// *-------*function*--------*
// ***************************
function request() {
    $.ajax(
        {
            url: "https://flynn.boolean.careers/exercises/api/array/music",
            method: "GET",
            success: function (r) {
                if (r.success) {
                    $.each(r.response, function(key, value) {
                        arr_response.push(value);
                    });
                    console.log(arr_response);
                    printCd();
                    printSelectGenre();
                } else {
                    error();
                }
            },
            error: function () {
                error();
            }
        }
    );
}
// ***************************
function printCd() {
    for (var i = 0; i < arr_response.length; i++) {
        $('.cds-container').append(builder_cd(arr_response[i]));
    }
}
// ***************************
function printCdByGenre(value) {
    for (var i = 0; i < arr_response.length; i++) {
        if (arr_response[i].genre == value) {
            $('.cds-container').append(builder_cd(arr_response[i]));
        }
    }
}
// ***************************
function printSelectGenre() {
    var temp = [];
    for (var i = 0; i < arr_response.length; i++) {
        temp.push(arr_response[i].genre);
    }
    var unique = [];
    $.each(temp, function (i, el) {
        if ($.inArray(el, unique) === -1) {
            unique.push(el);
            $('.list__ul').append(builder_list(({"genre" : el})));
        }
    });
}
// ***************************
function error() {
    var error_config = {
        "poster" : 'https://i.imgur.com/wm3Wlmc.png',
        "title" : 'impossibile soddisfare la richiesta'
    }
    $('.cds-container').append(builder_cd(error_config));
}
// ***************************
