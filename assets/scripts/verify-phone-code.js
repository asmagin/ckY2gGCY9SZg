$(document).ready(function () {
    window.CONTENT.verifying_blurb = "";

    function waitForElementVisible(selector) {
        return new Promise(resolve => {
            if ($(selector).is(':visible')) {
                resolve();
                return;
            }

            const observer = new MutationObserver((mutations, obs) => {
                if ($(selector).is(':visible')) {
                    obs.disconnect();
                    resolve();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class']
            });
        });
    }

    function waitForButtonEnabled(buttonId) {
        return new Promise(resolve => {
            const button = document.getElementById(buttonId);

            if (button && button.getAttribute('aria-disabled') === 'false') {
                resolve(button);
                return;
            }

            const observer = new MutationObserver((mutations, obs) => {
                const button = document.getElementById(buttonId);
                if (button && button.getAttribute('aria-disabled') === 'false') {
                    obs.disconnect();
                    resolve(button);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['aria-disabled']
            });
        });
    }


    $('#phoneVerificationControl_but_send_code').on('click', async function () {
        console.log({beforeClickSendCode: 'clicking send code button'})
        await waitForElementVisible('.verificationCode_li');
        console.log({afterClickSendCode: 'code sent'})

        const introMessage = window?.SA_FIELDS.AttributeFields[0]?.DISPLAY_CONTROL_CONTENT?.intro_msg
        if(introMessage) {
            $('#api h1').text(introMessage)
        }

        $('.phone_li').addClass('none');
        $('.intro').addClass('none');
    });

    $('#phoneVerificationControl_but_verify_code').on('click', async function () {
        await waitForElementVisible('#phoneVerificationControl_but_change_claims');

        $('.phoneVerificationCode_li').addClass('none');
        const rePassword = $('.reenterPassword_li');
        const newPassword = $('.newPassword_li');
        $('#phoneVerificationControl').addClass('none');

        if (rePassword.length && newPassword.length) {
            rePassword.show();
            newPassword.show();
            $('#attributeVerification > .buttons').addClass('flex');
        }
    });

    waitForButtonEnabled('continue').then(button => {
        console.log({aaa: 'button enabled'})
        $('#verifying_blurb').addClass('working')
        setTimeout(() => {
            button.click()
            waitForElementVisible('#claimVerificationServerError').then(() => {
                $('#verifying_blurb').removeClass('working')
            })
        }, 0)
    });
});