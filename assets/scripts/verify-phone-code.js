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

function waitForElementVisibleTest(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
        // Check if element is already visible
        if ($(selector).is(':visible')) {
            console.log(`Element ${selector} is already visible`);
            resolve();
            return;
        }

        console.log(`Waiting for element ${selector} to become visible...`);

        // Set a timeout to avoid hanging indefinitely
        const timeoutId = setTimeout(() => {
            if (observer) {
                observer.disconnect();
            }
            clearInterval(pollId);
            console.warn(`Timeout waiting for element ${selector} to become visible`);
            // Resolve anyway to prevent blocking the flow
            resolve();
        }, timeout);

        // Use MutationObserver to watch for DOM changes
        const observer = new MutationObserver((mutations, obs) => {
            if ($(selector).is(':visible')) {
                obs.disconnect();
                clearTimeout(timeoutId);
                clearInterval(pollId);
                console.log(`Element ${selector} is now visible (via MutationObserver)`);
                resolve();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class', 'display', 'visibility']
        });

        // Also use polling as a fallback mechanism
        const pollId = setInterval(() => {
            if ($(selector).is(':visible')) {
                observer.disconnect();
                clearTimeout(timeoutId);
                clearInterval(pollId);
                console.log(`Element ${selector} is now visible (via polling)`);
                resolve();
            }
        }, 100);
    });
}

function waitForButtonEnabledTest(buttonId, timeout = 10000) {
    return new Promise(resolve => {
        const button = document.getElementById(buttonId);

        console.log(`Checking if button ${buttonId} is enabled...`);

        if (button && button.getAttribute('aria-disabled') === 'false') {
            console.log(`Button ${buttonId} is already enabled`);
            resolve(button);
            return;
        }

        console.log(`Waiting for button ${buttonId} to become enabled...`);

        // Set a timeout to avoid hanging indefinitely
        const timeoutId = setTimeout(() => {
            if (observer) {
                observer.disconnect();
            }
            clearInterval(pollId);
            console.warn(`Timeout waiting for button ${buttonId} to become enabled`);
            // Try to resolve with the button anyway to prevent blocking the flow
            const button = document.getElementById(buttonId);
            resolve(button);
        }, timeout);

        const observer = new MutationObserver((mutations, obs) => {
            const button = document.getElementById(buttonId);
            if (button && button.getAttribute('aria-disabled') === 'false') {
                obs.disconnect();
                clearTimeout(timeoutId);
                clearInterval(pollId);
                console.log(`Button ${buttonId} is now enabled (via MutationObserver)`);
                resolve(button);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['aria-disabled', 'disabled']
        });

        // Also use polling as a fallback mechanism
        const pollId = setInterval(() => {
            const button = document.getElementById(buttonId);
            if (button && button.getAttribute('aria-disabled') === 'false') {
                observer.disconnect();
                clearTimeout(timeoutId);
                clearInterval(pollId);
                console.log(`Button ${buttonId} is now enabled (via polling)`);
                resolve(button);
            }
        }, 100);
    });
}

$(document).ready(function () {
    window.CONTENT.verifying_blurb = "";

    $('#phoneVerificationControl_but_send_code').on('click', async function () {
        await waitForElementVisibleTest('.verificationCode_li');
        console.log({afterClickSendCode: 'code sent'})

        const introMessage = window?.SA_FIELDS.AttributeFields[0]?.DISPLAY_CONTROL_CONTENT?.intro_msg
        if(introMessage) {
            $('#api h1').text(introMessage)
        }

        $('.phone_li').addClass('none');
        $('.intro').addClass('none');
    });

    $('#phoneVerificationControl_but_verify_code').on('click', async function () {
        await waitForButtonEnabledTest('#phoneVerificationControl_but_change_claims');

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

    waitForButtonEnabledTest('continue').then(button => {
        console.log({aaa: 'button enabled'})
        $('#verifying_blurb').addClass('working')
        setTimeout(() => {
            button.click()
        }, 0)
    });
});