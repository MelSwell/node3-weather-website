const form = document.querySelector('form')
let messageOne = document.querySelector('#message-1')
let messageTwo = document.querySelector('#message-2')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  
  fetch(`/weather?address=${e.target.location.value}`).then(res => {
    res.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error
      }
      else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })
})

