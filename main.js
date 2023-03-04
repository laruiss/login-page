const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const loginForm = document.querySelector('.login-form')
const passwordMessageEl = document.querySelector('#password-message')
const emailMessageEl = document.querySelector('#email-message')

function isValidEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

passwordInput.addEventListener('change', function (event) {
  const val = passwordInput.value
  const isStrongPassword = /[0-9]/.test(val)
    && /[a-z]/.test(val)
    && /[A-Z]/.test(val)
    && /[@!;:-_*]/.test(val)
  console.log({isStrongPassword})
  passwordMessageEl.innerHTML = ''
  if (!isStrongPassword) {
    passwordMessageEl.innerHTML = 'Votre mot de passe n’est pas assez fort'
    return 
  }
})

emailInput.addEventListener('change', function (event) {
  const invalidEmail = !isValidEmail(emailInput.value)
  emailInput.classList.toggle('error', invalidEmail)
  emailMessageEl.innerHTML = ''
  if (invalidEmail) {
    emailMessageEl.innerHTML = 'Votre email ne semble pas valide'
    return
  }
})

emailInput.addEventListener('input', function (event) {
  if (!emailInput.classList.contains('error')) {
    return
  }
  const invalidEmail = !isValidEmail(emailInput.value)
  emailInput.classList.toggle('error', invalidEmail)
  emailMessageEl.innerHTML = ''
  if (invalidEmail) {
    emailMessageEl.innerHTML = 'Votre email ne semble pas valide'
    return
  }
})

loginForm.addEventListener('submit', function (event) {
  event.preventDefault()
  fetch('/api/auth/token', {
    method: 'post',
    body: JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value
    })
  }).then(res => res.json())
})
