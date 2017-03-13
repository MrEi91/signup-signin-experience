$('#loginform').submit(function(e) {
  e.preventDefault()

  $.ajax({
    url: `http://localhost:3000/users/login`,
    type: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    success: function(data) {
      if (data) {
        if (data.usernotfound) {
          sweetAlert('Oops...', 'user not found!', 'error')
        }
        if (data.passerror) {
          sweetAlert('Oops...', 'Password wrong!', 'error')
        }
        if (data.token) {
          let token = data.token
          localStorage.setItem('token', token)

          window.location.href = 'http://127.0.0.1:8080/home.html'
        }
      }
    },
    error: function(err) {
      console.log(err)
    }

  })
})
