let attempts = 0;
const maxAttempts = 30;

const interval = setInterval(() => {
    const forgotPassword = document.getElementById('forgotPassword');
    const createAccount = document.getElementById('createAccount');
    const nextButton = document.getElementById('next');
    if (forgotPassword && createAccount && nextButton) {
        clearInterval(interval);

        forgotPassword.classList.add('link');
        forgotPassword.innerHTML = 'Forgot Password?';

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
    }

    if (++attempts > maxAttempts) {
        clearInterval(interval);
        console.warn('Auth elements not found in time');
    }
}, 10);

