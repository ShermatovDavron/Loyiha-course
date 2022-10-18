function form(){
    //Form

  const forms =document.querySelectorAll('form')

  forms.forEach((form)=>{
    postData(form)
  })

  const msg = {
    loading: "Loading...",
    success:"thank's for submitting for info",
    failure:'Something went wrong'
  }

  function postData(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault()

      const statusMessage = document.createElement('div')
      statusMessage.textContent = msg.loading
      form.append(statusMessage)

      const request = new XMLHttpRequest
      request.open('Post', 'server.php')
      // request.setRequestHeader('content-Type', 'multipart/form-data')
      const formData = new FormData(form)
      request.send(formData)

      request.addEventListener('load', ()=>{
        if(request.status ===200){
          console.log(request.response)
          statusMessage.textContent = msg.success
          form.reset()
          setTimeout(()=>{
            statusMessage.remove()
          }, 2000)
        }
        else{
          statusMessage.textContent= msg.failure
        }
      })
    })
  }
  fetch('db.json')
  .then((data)=>data.json())
  .then((res)=>console.log(res))
}

module.exports = form