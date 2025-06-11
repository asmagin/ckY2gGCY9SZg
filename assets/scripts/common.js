function addEyeIconIntoPasswordField() {
    const passwordInput = document.querySelector('input[type="password"]');
    if (!passwordInput) return;

    const entryItem = passwordInput.closest('.entry-item');
    const attrEntry = passwordInput.closest('.attrEntry');

    const wrapperItem = entryItem || attrEntry;

    if (!wrapperItem) return;

    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-block';
    wrapper.style.width = '100%';

    passwordInput.parentNode.insertBefore(wrapper, passwordInput);
    wrapper.appendChild(passwordInput);


    passwordInput.style.paddingRight = '30px';

    const eyeIcon = document.createElement('span');
    eyeIcon.textContent = '👁️';
    eyeIcon.style.position = 'absolute';
    eyeIcon.style.right = '10px';
    eyeIcon.style.top = '50%';
    eyeIcon.style.transform = 'translateY(-50%)';
    eyeIcon.style.cursor = 'pointer';
    eyeIcon.style.userSelect = 'none';
    eyeIcon.style.fontSize = '16px';
    eyeIcon.style.zIndex = '2';

    eyeIcon.addEventListener('click', () => {
        const isHidden = passwordInput.type === 'password';
        passwordInput.type = isHidden ? 'text' : 'password';
        eyeIcon.textContent = isHidden ? '🙈' : '👁️';
    });

    wrapper.appendChild(eyeIcon);
}

$(document).ready(function () {
    addEyeIconIntoPasswordField()
})