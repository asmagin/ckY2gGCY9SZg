let attempts = 0;
const maxAttempts = 30;

function tryMoveAuthLinks() {
    const forgotPassword = document.getElementById('forgotPassword');
    const createAccount = document.getElementById('createAccount');
    const nextButton = document.getElementById('next');

    if (forgotPassword && createAccount && nextButton) {
        forgotPassword.classList.add('link');
        forgotPassword.innerHTML = 'Forgot Password?';
        forgotPassword.style.display = 'block';

        createAccount.classList.add('link');
        createAccount.innerHTML = 'Sign Up';

        const wrapper = document.createElement('div');
        wrapper.className = 'input-wrapper';
        wrapper.style.textAlign = 'center';
        wrapper.style.marginTop = '16px';

        const separator = document.createElement('div');
        separator.className = 'separator';
        separator.innerHTML = `<hr />Don’t have an account?<hr />`;

        wrapper.appendChild(forgotPassword);
        wrapper.appendChild(separator);
        wrapper.appendChild(createAccount);

        nextButton.parentNode.insertBefore(wrapper, nextButton.nextSibling);
        return; // ✅ Done, stop recursion
    }

    if (++attempts <= maxAttempts) {
        setTimeout(tryMoveAuthLinks, 1);
    } else {
        console.warn('Auth elements not found in time');
    }
}

const isLoginPage = document.querySelector('[data-name="Unified"]');

if(isLoginPage) {
    tryMoveAuthLinks()
}