'use strict';

const toggle_mode = () => (
    $('.toggle--icon').toggleClass('dark'),
    document.body.classList.toggle('dark-mode')
);

// --- //

const password = {
    'upper': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    'lower': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    'number': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    'symbol': ['!', '@', '#', '$', '&', '*'],
};

const checked_array = Array();
const checkboxes = $(`.input--container input[type='checkbox']`);
const password_length_input = $('#password_length');


password_length_input.focus();


const check_length = (element) => element.val() ? element.val() : element.data('default');

$('#generate').click(() => generate_password(checkboxes, password, $('#result'), check_length(password_length_input)));
document.addEventListener(
    'keyup', e => e.code == 'Enter' || e.code == 'NumpadEnter' ? generate_password(checkboxes, password, $('#result'), check_length(password_length_input)) : 0
);

function generate_password(element, compare, place_to_write, password_length, array = []) {
    if (password_length > 50) {
        alert('password length must be less than 50');
        return;
    }

    for (let i = 0; i < element.length; i++)
        if (element[i].checked)
            array.push(compare[element[i].id]);

    if (array.length == 0) {
        alert('you have to select at least one');
        return;
    }

    write_password(array, place_to_write, password_length);
}

function write_password(result_array, place_to_write, password_length) {
    let result_string = '';

    for (let i = 0; i < password_length; i++)
        for (let j = 0; j < result_array.length; j++) {
            let random_number = Math.floor(Math.random() * result_array[j].length);

            if (result_string.length == password_length)
                break;

            result_string += result_array[j][random_number];
        }

    place_to_write.val(result_string);
}

const clear_input = element => element.val('');

$('#clear').click(() => clear_input($('#result')));

$('#copy--container').click(() => copy_clipboard($('#result'), $('#alert')));

let toast_timeout;

function copy_clipboard(element, alert) {
    element.select();

    document.execCommand("copy");

    clearTimeout(toast_timeout);

    if (element.val().length == 0) {
        alert.html(`There's nothing to copy!`);
        alert.css('background', '#fc636b');
    } else {
        alert.html(`Copied to clipboard!`);
        alert.css('background', '#6a67ce');
    }

    alert.addClass('show');

    toast_timeout = setTimeout(() => alert.removeClass('show'), 3000);
}