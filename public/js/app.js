const form = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  
  fetch(`http://localhost:3000/weather?address=${e.target.location.value}`).then(res => {
    res.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error
        messageTwo.textContent = ''
      }
      else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })
})

