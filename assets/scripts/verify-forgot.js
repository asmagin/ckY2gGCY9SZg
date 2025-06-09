$(document).ready(function () {
    // window.CONTENT.verifying_blurb = "";

    const isForgotPasswordPage = $('[data-name="SelfAsserted"]');

    if (!isForgotPasswordPage.length) {
        return;
    }

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

    $('#emailVerificationControl_but_send_code').on('click', async function () {
        console.log(1);
        await waitForElementVisible('.verificationCode_li');
        console.log(2);
        $('.email_li').addClass('none');
        console.log(3);
        $('.intro').addClass('none');
        console.log(4);
    });

    $('#emailVerificationControl_but_verify_code').on('click', async function () {
        console.log(11);
        await waitForElementVisible('#emailVerificationControl_but_change_claims');
        console.log(22);

        $('.emailVerificationCode_li').addClass('none');
        const rePassword = $('.reenterPassword_li');
        const newPassword = $('.newPassword_li');
        $('#emailVerificationControl').addClass('none');

        if (rePassword.length && newPassword.length) {
            rePassword.show();
            newPassword.show();
            $('#attributeVerification > .buttons').addClass('flex');
        }
    });

    waitForButtonEnabled('continue').then(button => {
        $('#verifying_blurb').addClass('working')
        setTimeout(() => {
            button.click()
        }, 0)
    });
});