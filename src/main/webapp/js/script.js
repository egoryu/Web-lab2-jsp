$(function() {
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function validateX() {
        let checkboxes = document.querySelectorAll('input[name="x"]:checked');
        if (checkboxes.length === 1) {
            return true;
        } else {
            $('#error').text('Неправильное количество выбор x');
            return false;
        }
    }

    function validateY() {
        let yField = $('#y-textinput');
        let numY = yField.val().replace(',', '.');

        if (isNumeric(numY) && numY > -5 && numY < 5) {
            return true;
        } else {
            $('#error').text('Неправильный формат y');
            return false;
        }
    }

    function validateR() {
        if ($('.r-radio:checked')) {
            return true;
        } else {
            $('#error').text('Неправильный формат r');
            return false;
        }
    }

    function validateForm() {
        return validateX() & validateY() & validateR();
    }
    
    /*$('#former').submit(function(event) {


        if (!validateForm()) {
            $('#error').removeClass('invisible');
            event.preventDefault();
            return;
        } else {
            $('#error').addClass('invisible');
        }

        window.location.replace("./process?" + $(this).serialize() + '&time=' + new Date().getTimezoneOffset());
    });*/

    $('#send').on('click', function(event) {
        if (!validateForm()) {
            event.preventDefault();
        } else {
            $('#hide_timezone').val(new Date().getTimezoneOffset());
        }
    });
    /*function start() {
        let url = window.location.pathname;
        if (url !== '/lab2/')
            window.location.replace("/lab2/");
    }

    start();*/
});