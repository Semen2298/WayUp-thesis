/* HAMBURGER */

$('.mobile_menu').on('click',function(){
    $('.burger').toggle();
})

$('.sub').on('click',function(){
    $('.sub-mobil').toggle();
})

$('#closeMenu').on('click',function(){
    $('.burger').hide();
});

$('.mobile_menu-tab').on('click',function(){
    $('#burger-tabs').toggle();
})


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

$('.close').on('click', function() {
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
                $('#modal-set').fadeIn();
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
                            $('#modal-set').fadeIn();
                        }, 1100);
                        setTimeout(function () {
                            $('#modal-set').fadeOut();
                        }, 1300);
                    });
                }
                return false;
            },
            submitHandler: function (form) {
                $('#map-modal').fadeIn();
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch ($formId) {
                    case'map-form':
                    $.ajax({
                        type: 'POST',
                        url: $form.attr('action'),
                        data: $form.serialize() 
                    })
                    .always(function () {
                        console.log('Always')
                        setTimeout(function(){
                            $form.trigger('reset');
                            $('#map-modal').fadeIn();
                        }, 1100);
                        setTimeout(function () {
                            $('map-modal').fadeOut();
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
    $('.map-form').each(function () {
        valEl($(this));
    });
});


// Скрол шапки 

$(function() {
    let header = $('.header-transparent_content');
     
    $(window).scroll(function() {
      if($(this).scrollTop() > 1) {
       header.addClass('header-transparent');
      } else {
       header.removeClass('header-transparent');
      }
    });
   });

// Slider Header

const offerSlides = document.querySelectorAll('.offerSlide'),
      scrollbars = document.querySelectorAll('.scrollbar'),
      slidesWrapper = document.querySelectorAll('.offer-header__wrapper');

let i = 0;

const activeSlides = n => {
    for(offerSlide of offerSlides){
        offerSlide.classList.remove('active');
    }
    offerSlides[n].classList.add('active');
}

const activeScrollbar = n => {
    for(scrollbar of scrollbars) {
        scrollbar.classList.remove('active');
    }
    scrollbars[n].classList.add('active');
}

const prepareCurrentSlides = ind => {
    activeSlides(ind);
    activeScrollbar(ind);
}

const nextSlides = () => {
    if(i == offerSlides.length - 1){
        i = 0;
        prepareCurrentSlides(i);
    }else{
        i++;
        prepareCurrentSlides(i);
    }
};
const prevSlides = () => {
    if(i == 0){
        i = offerSlides.length - 1;
        prepareCurrentSlides(i);
    }else{
        i--;
        prepareCurrentSlides(i);
    }
};

scrollbars.forEach((item,indexDot) => {
    item.addEventListener('click', () => {
        i = indexDot;
        prepareCurrentSlides(i);
        clearInterval(interval);
    })
});

const intervals = setInterval(nextSlides, 2500);







/* SLIDER Dream Team */

const prev = document.getElementById('btn-prev'),
      next = document.getElementById('btn-next'),
      slides = document.querySelectorAll('.slide'),
      dots = document.querySelectorAll('.dot'),
      slidesWrap = document.querySelectorAll('.slider-wrapper');

let index = 0;

const activeSlide = n => {
    for(slide of slides){
        slide.classList.remove('active');
    }
    slides[n].classList.add('active');
}

const activeDot = n => {
    for(dot of dots) {
        dot.classList.remove('active');
    }
    dots[n].classList.add('active');
}

const prepareCurrentSlide = ind => {
    activeSlide(ind);
    activeDot(ind);
}

const nextSlide = () => {
    if(index == slides.length - 1){
        index = 0;
        prepareCurrentSlide(index);
    }else{
        index++;
        prepareCurrentSlide(index);
    }
};
const prevSlide = () => {
    if(index == 0){
        index = slides.length - 1;
        prepareCurrentSlide(index);
    }else{
        index--;
        prepareCurrentSlide(index);
    }
};

dots.forEach((item,indexDot) => {
    item.addEventListener('click', () => {
        index = indexDot;
        prepareCurrentSlide(index);
        clearInterval(interval);
    })
});

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

const interval = setInterval(nextSlide, 2500);



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

$('.close').on('click', function() {
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
                $('#modal-set').fadeIn();
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
                            $('#modal-set').fadeIn();
                        }, 1100);
                        setTimeout(function () {
                            $('#modal-set').fadeOut();
                        }, 1300);
                    });
                    break;
                    // case'form-modal':
                    // $.ajax({
                    //     type: 'POST',
                    //     url: $form.attr('action'),
                    //     data: $form.serialize() 
                    // })
                    // .always(function () {
                    //     console.log('Always')
                    //     setTimeout(function(){
                    //         $form.trigger('reset');
                    //         $('#modal-set').fadeIn();
                    //     }, 1100);
                    //     setTimeout(function () {
                    //         $('#modal-set').fadeOut();
                    //         $('#wrapper-modal').fadeOut();
                    //     }, 1300);
                    // });
                    // break;
                }
                return false;
                
            }
        });
    }
    $('.form-modal').each(function () {
        valEl($(this));
    });
});


// Скрол шапки 

$(function() {
    let header = $('.header-transparent_content');
     
    $(window).scroll(function() {
      if($(this).scrollTop() > 1) {
       header.addClass('header-transparent');
      } else {
       header.removeClass('header-transparent');
      }
    });
   });


