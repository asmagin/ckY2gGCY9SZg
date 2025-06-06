let attempts = 0;
const maxAttempts = 30;

function tryMoveAuthLinks() {
    const forgotPassword = document.getElementById('ForgotPasswordExchange');
    const createAccount = document.getElementById('SignUpExchange');
    const form = document.getElementById('localAccountForm');
    const isLoginPage = document.querySelector('#api.signIn');
    const heading = document.querySelector('.heading h1');
    const divider = document.querySelector('.divider');
    const socialSection = document.querySelector('.claims-provider-list-buttons.social');

    if (forgotPassword && createAccount && form && isLoginPage && heading && socialSection) {
        // Change heading text
        heading.innerHTML = window.CONTENT?.social_intro || "WELCOME BACK!";

        // Remove the divider section
        if (divider) {
            divider.remove();
        }

        // Add link class to buttons and apply styles (keep original text)
        forgotPassword.classList.add('link');

        createAccount.classList.add('link');

        // Move social section after the form and add styling
        form.parentNode.insertBefore(socialSection, form.nextSibling);

        // Reorganize the options within social section
        const options = socialSection.querySelector('.options');
        if (options) {
            // Clear current options
            options.innerHTML = '';

            // Create sign up container (sign up first)
            const signUpContainer = document.createElement('div');
            signUpContainer.appendChild(createAccount);

            // Create separator
            const separatorContainer = document.createElement('div');
            separatorContainer.className = 'separator';
            separatorContainer.innerHTML = '<hr />Don\'t have an account?<hr />';

            // Create forgot password container
            const forgotContainer = document.createElement('div');
            forgotContainer.appendChild(forgotPassword);

            // Add all elements in the new order (sign up first, then separator, then forgot password)
            options.appendChild(signUpContainer);
            options.appendChild(separatorContainer);
            options.appendChild(forgotContainer);
        }

        // Remove the intro section from social buttons
        const socialIntro = socialSection.querySelector('.intro');
        if (socialIntro) {
            socialIntro.remove();
        }

        return; // ✅ Done, stop recursion
    }

    if (++attempts <= maxAttempts) {
        setTimeout(tryMoveAuthLinks, 100);
    } else {
        console.warn('Login page elements not found in time');
    }
}

tryMoveAuthLinks();
