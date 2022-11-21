// Modal Window

$('.btn-open').on('click', function() {
    $('#wrapper-modal').fadeIn();
});

$('.form-modal').on('click', function() {
    $('#wrapper-modal').fadeOut();
});

$('#overlay').on('click', function() {
    $('#wrapper-modal').fadeOut();
});

$('.form-modal').children().on('click', function(e) {
    e.stopPropagation();
});


// Validate

$.validator.addMethod("regex", function(value, element, regexp) {
    var regExsp = new RegExp(regexp);
    return regExsp.test(value);
},"Please check your input.");


// Отправка форм

$(document).ready(function () {
    $('[data-submit]').on('click', function (e) {
        e.preventDefault();
        $(this).parent('form').submit();
    })
    $.validator.addMethod("regex", function(value, element, regexp) {
        var regExsp = new RegExp(regexp);
        return this.optional(element) || regExsp.test(value);
    },"Please check your input.");


    // Функция валидации

    function valEl(el) {
        el.validate({
                rules: {
                    phone: {
                        required: true,
                        regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                    },
                    name: {
                        required: true,
                        regex : "[A-Za-z]{1,32}"
                    },
                    email: {
                        required: true,
                        email: true
                }
            },
            messages: {
                tel: {
                    required: 'Поле обезательно для заполнения',
                    regex: 'Телефон может содержать символы + - ()'
                },
                name: {
                    required: 'Поле обезательно для заполнения'
                },
                email: {
                    required: 'Поле обезательно для заполнения',
                    email: 'Неверный формат E-mail'
                }
            },
            //Начинаем проверку id форм
            submitHandler: function (form) {
                $('#preloader-active').fadeIn();
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch ($formId) {
                    case'form-modal':
                    $.ajax({
                        type: 'POST',
                        url: $form.attr('action'),
                        data: $form.serialize() 
                    })
                    .always(function () {
                        console.log('Always')
                        setTimeout(function(){
                            $form.trigger('reset');
                            $('#preloader-active').fadeIn();
                        }, 1100);
                        setTimeout(function () {
                            $('#preloader-active').fadeOut();
                        }, 1300);
                    });
                    break;
                    case'form-modal':
                    $.ajax({
                        type: 'POST',
                        url: $form.attr('action'),
                        data: $form.serialize() 
                    })
                    .always(function () {
                        console.log('Always')
                        setTimeout(function(){
                            $form.trigger('reset');
                            $('#preloader-active').fadeIn();
                        }, 1100);
                        setTimeout(function () {
                            $('#preloader-active').fadeOut();
                            $('#wrapper-modal').fadeOut();
                        }, 1300);
                    });
                    break;
                }
                return false;
            }
        });
    }
    $('.form-modal').each(function () {
        valEl($(this));
    });
});