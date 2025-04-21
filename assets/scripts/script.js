alert('Script working');

const observer = new MutationObserver(() => {
    const forgotPassword = document.getElementById('forgotPassword');
    const createAccount = document.getElementById('createAccount');
    const nextButton = document.getElementById('next');

    if (!forgotPassword || !createAccount || !nextButton) return;

    console.log({
        forgotPassword,
        createAccount,
        nextButton,
        nextButtonParent: nextButton.parentNode
    });

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

    if (nextButton.parentNode) {
        nextButton.parentNode.insertBefore(wrapper, nextButton.nextSibling);
    }

    observer.disconnect();
});

observer.observe(document.body, { childList: true, subtree: true });