console.log('init')


document.querySelectorAll('button[id="#elementor-action%3Aaction%3Dpopup%3Aopen%26settings%3DeyJpZCI6IjE4OTA3IiwidG9nZ2xlIjpmYWxzZX0%3D"]').forEach((element) => {
    element.addEventListener('click', () => {
        var dialog = document.querySelector('.dialog-type-lightbox')
            if (dialog) {
                dialog.style.display = 'flex'
            }
        setTimeout(connectForm, 1000);
        console.log('Form connected to button');
    })
})

document.querySelectorAll('a[href="#elementor-action%3Aaction%3Dpopup%3Aopen%26settings%3DeyJpZCI6IjE4OTA3IiwidG9nZ2xlIjpmYWxzZX0%3D2"]').forEach((element) => {
    element.addEventListener('click', () => {
        var dialog = document.querySelector('.dialog-type-lightbox')
        if (dialog) {
            dialog.style.display = 'flex'
        }
        setTimeout(connectFormHardcor, 1000);
        console.log('Form connected to button');
    })
})

function connectForm() {
    console.log('connectForm')
    var callInit = false;
    var form = document.querySelector('.elementor-popup-modal form');

    if (form) {

        var formButton = form.querySelector('button[type="submit"]');

        window.leadCM.formTelInputSelector = function(form) {

            var phone = form.querySelector('input[type="tel"]').value.replace(/ /g,'').replace('+', '');
            if (phone == null) phone = form.querySelector('input[type="Tel"]').value.replace(/ /g,'').replace('+', '');

            if (phone.substring(0, 3) == '971') {
                phone = '971' + phone.substring(3).replace(/^0+/, ''); // remove all zeros after country code
                // console.log('phone number without zeros after country code: ', phone);
            }

            if (phone.substring(0, 1) == '0') {
                phone = phone.replace(/^0+/, ''); // remove all zeros in the beginning of phone number
                // console.log('phone without zeros in the beginning: ', phone);
                if (phone.substring(0, 3) == '971') {
                    phone = '971' + phone.substring(3).replace(/^0+/, ''); // remove all zeros after country code
                    // console.log('phone number without zeros after country code: ', phone);
                } else if (phone.substring(0, 3) != '971') {
                    phone = '971' + phone; // add country code if no country code
                    // console.log('phone with country code: ', phone);
                }
            }
            // console.log('phone: ', phone);
            return phone;

        };

        formButton.addEventListener('click', function (e) {
            var phoneNumber = window.leadCM.formTelInputSelector(form);
            if (phoneNumber && window.leadCM && window.leadCM.call && !callInit) {
                callInit = true;
                var nameInput = form.querySelector('input[name="wpforms[fields][0]"]');
                var emailInput = form.querySelector('input[name="wpforms[fields][1]"]');;
                var interestedInput = form.querySelector('textarea[name="wpforms[fields][2]"]');


                var userName = nameInput ? nameInput.value : null;
                var userEmail = emailInput ? emailInput.value : null;
                var userInterested = interestedInput ? interestedInput.value : null;

                var custom_params = {
                    lc_param_phone: phoneNumber,
                };

                if (userName) {
                    custom_params['lc_param_name'] = userName;
                }

                if (userEmail) {
                    custom_params['lc_param_email'] = userEmail;
                }

                if (userInterested) {
                    custom_params['lc_param_interested'] = userInterested;
                }

                console.log(custom_params);
                window.leadCM.dispatchCustomEvent("CUSTOM_PARAMS", custom_params, function() {window.leadCM.call(phoneNumber, 'universal_form');});

            }
        });

    }

}

function connectFormHardcor() {
    console.log('connectFormHardcor')
    var callInit = false;
    var form = document.querySelector('.elementor-popup-modal form');

    if (form) {

        var formButton = form.querySelector('button[type="submit"]');

        window.leadCM.formTelInputSelector = function(form) {

            var phone = form.querySelector('input[type="tel"]').value.replace(/ /g,'').replace('+', '');
            if (phone == null) phone = form.querySelector('input[type="Tel"]').value.replace(/ /g,'').replace('+', '');

            if (phone.substring(0, 3) == '971') {
                phone = '971' + phone.substring(3).replace(/^0+/, ''); // remove all zeros after country code
                // console.log('phone number without zeros after country code: ', phone);
            }

            if (phone.substring(0, 1) == '0') {
                phone = phone.replace(/^0+/, ''); // remove all zeros in the beginning of phone number
                // console.log('phone without zeros in the beginning: ', phone);
                if (phone.substring(0, 3) == '971') {
                    phone = '971' + phone.substring(3).replace(/^0+/, ''); // remove all zeros after country code
                    // console.log('phone number without zeros after country code: ', phone);
                } else if (phone.substring(0, 3) != '971') {
                    phone = '971' + phone; // add country code if no country code
                    // console.log('phone with country code: ', phone);
                }
            }
            console.log('phone: ', phone);
            return phone;

        };

        formButton.addEventListener('click', function (e) {
            var phoneNumber = window.leadCM.formTelInputSelector(form);
            if (phoneNumber && window.leadCM && window.leadCM.call && !callInit) {
                callInit = true;
                if(window.leadCM.formBeforeCall) {
                    window.leadCM.formBeforeCall(phoneNumber, form, function() {window.leadCM.call(phoneNumber, 'universal_form');});
                } else {
                    window.leadCM.call(phoneNumber, 'universal_form')
                }
            }
        });

        window.leadCM.formBeforeCall = function (phoneNumber, form, call) {

            var nameInput = form.querySelector('input[name="wpforms[fields][0]"]');
            var emailInput = form.querySelector('input[name="wpforms[fields][1]"]');;
            var interestedInput = form.querySelector('textarea[name="wpforms[fields][2]"]');


            var userName = nameInput ? nameInput.value : null;
            var userEmail = emailInput ? emailInput.value : null;
            var userInterested = interestedInput ? interestedInput.value : null;

            var custom_params = {
                lc_param_phone: phoneNumber,
            };

            if (userName) {
                custom_params['lc_param_name'] = userName;
            }

            if (userEmail) {
                custom_params['lc_param_email'] = userEmail;
            }

            if (userInterested) {
                custom_params['lc_param_interested'] = userInterested;
            }

            console.log({lc_param_phone: "46108885278", lc_param_name: "test", lc_param_email: "test@mail.com", lc_param_interested: "test"});
            leadCM.dispatchCustomEvent("CUSTOM_PARAMS", {lc_param_phone: "46108885278", lc_param_name: "test", lc_param_email: "test@mail.com", lc_param_interested: "test"}, call);

        };

    }

}

