/**
 * Email verification handler for signup process
 * This script manages the UI transitions during email verification
 */
$(document).ready(function () {
    // Constants for selectors to improve maintainability
    const SELECTORS = {
        selfAsserted: '[data-name="SelfAsserted"]',
        sendCodeButton: '#emailVerificationControl_but_send_code',
        verifyCodeButton: '#emailVerificationControl_but_verify_code',
        verificationCodeField: '.emailVerificationCode_li',
        emailField: '.email_li',
        introText: '.intro',
        changeClaimsButton: '#emailVerificationControl_but_change_claims',
        verificationButtons: '#attributeVerification > .buttons'
    };

    // Check if we're on the right page
    const selfAssertedElement = $(SELECTORS.selfAsserted);
    if (!selfAssertedElement.length) {
        return;
    }

    // Maximum time to wait for element changes (in milliseconds)
    const MAX_WAIT_TIME = 10000;
    const POLLING_INTERVAL = 50;

    /**
     * Waits for an element to become visible and then executes a callback
     * @param {string} selector - The element selector to check
     * @param {Function} onVisible - Callback to execute when element is visible
     * @param {Function} onTimeout - Callback to execute if timeout occurs
     */
    function waitForElementVisible(selector, onVisible, onTimeout) {
        const startTime = Date.now();
        const checkInterval = setInterval(function () {
            // Check if element is visible
            if ($(selector).is(':visible')) {
                clearInterval(checkInterval);
                if (typeof onVisible === 'function') {
                    onVisible();
                }
                return;
            }

            // Check for timeout
            if (Date.now() - startTime > MAX_WAIT_TIME) {
                clearInterval(checkInterval);
                console.warn(`Timeout waiting for ${selector} to become visible`);
                if (typeof onTimeout === 'function') {
                    onTimeout();
                }
            }
        }, POLLING_INTERVAL);

        return checkInterval;
    }

    // Handle send code button click
    $(SELECTORS.sendCodeButton).on('click', function () {
        console.log({aaa: 1})
        waitForElementVisible(
            SELECTORS.verificationCodeField,
            function() {
                $(SELECTORS.emailField).hide();
                $(SELECTORS.introText).hide();
            }
        );

        console.log({ bbbb: 2})
    });

    // Handle verify code button click
    $(SELECTORS.verifyCodeButton).on('click', function () {
        waitForElementVisible(
            SELECTORS.changeClaimsButton,
            function() {
                $(SELECTORS.verificationButtons).show();
            }
        );
    });
});
