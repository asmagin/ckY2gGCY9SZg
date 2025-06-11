const config = {
    maxAttempts: 30,
    checkInterval: 10, // ms
    // defaultHeading: "WELCOME BACK!",
    separatorText: "Don't have an account?"
};


function waitForElements() {
    return new Promise((resolve, reject) => {
        let attempts = 0;

        function checkElements() {

            const elements = {
                forgotPassword: document.getElementById('ForgotPasswordExchange'),
                createAccount: document.getElementById('SignUpExchange'),
                form: document.getElementById('localAccountForm'),
                isLoginPage: document.querySelector('#api.signIn'),
                heading: document.querySelector('.heading h1'),
                divider: document.querySelector('.divider'),
                socialSection: document.querySelector('.claims-provider-list-buttons.social')
            };

            const requiredElements = ['forgotPassword', 'createAccount', 'form', 'isLoginPage', /*'heading', 'socialSection'*/];
            const allElementsFound = requiredElements.every(key => elements[key]);

            if (allElementsFound) {
                resolve(elements);
            } else if (++attempts <= config.maxAttempts) {
                setTimeout(checkElements, config.checkInterval);
            } else {
                reject(new Error('Login page elements not found in time'));
            }
        }

        checkElements();
    });
}


function updateHeading(heading) {
    heading.innerHTML = window.CONTENT?.social_intro || config.defaultHeading;
}


function removeDivider(divider) {
    if (divider) {
        divider.remove();
    }
}


function styleAuthLinks(forgotPassword, createAccount) {
    forgotPassword.classList.add('link');
    createAccount.classList.add('link');
}


function moveSocialSection(form, socialSection) {
    form.parentNode.insertBefore(socialSection, form.nextSibling);
}


function reorganizeOptions(socialSection, createAccount, forgotPassword) {
    const options = socialSection.querySelector('.options');
    if (!options) return;


    options.innerHTML = '';


    const signUpContainer = document.createElement('div');
    signUpContainer.appendChild(createAccount);


    const separatorContainer = document.createElement('div');
    separatorContainer.className = 'separator';
    separatorContainer.innerHTML = `<hr />${config.separatorText}<hr />`;


    const forgotContainer = document.createElement('div');
    forgotContainer.appendChild(forgotPassword);

    options.appendChild(forgotContainer);
    options.appendChild(separatorContainer);
    options.appendChild(signUpContainer);
    options.style = "display: block;"

}


function removeSocialIntro(socialSection) {
    const socialIntro = socialSection.querySelector('.intro');
    if (socialIntro) {
        socialIntro.remove();
    }
}

function addEyeIconIntoPasswordField() {
    const passwordInput = document.querySelector('input[type="password"]');

    if (!passwordInput) return


    const parent = passwordInput.closest('.entry-field');
    if (parent) parent.style.position = 'relative';

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

    parent.appendChild(eyeIcon);
}


async function reorganizeLoginPage() {
    try {
        const elements = await waitForElements();

        // updateHeading(elements.heading);
        addEyeIconIntoPasswordField()
        removeDivider(elements.divider);
        styleAuthLinks(elements.forgotPassword, elements.createAccount);
        moveSocialSection(elements.form, elements.socialSection);
        reorganizeOptions(elements.socialSection, elements.createAccount, elements.forgotPassword);
        removeSocialIntro(elements.socialSection);

        console.log('Login page successfully reorganized');
    } catch (error) {
        console.warn(error.message);
    }
}

reorganizeLoginPage();