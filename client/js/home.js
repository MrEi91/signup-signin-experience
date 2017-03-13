$(document).ready(function () {
  let token = localStorage.getItem('token')

  if (!token) {
    window.location.href = 'http://127.0.0.1:8080/index.html'
  } else {
    $.ajax({

      url: `http://localhost:3000/users/verify/${token}`,
      type: 'GET',
      success: function (data) {
        if (!data.user) {
          window.location.href = 'http://127.0.0.1:8080/index.html'
        }
      },
      error: function (err) {
        console.log(err)
      }
    })
  }
})

$('#logout').click(function () {
  localStorage.clear()
})
