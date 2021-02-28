$(function () {
  $(".goreg").on("click", () => {
    var name = $(".input-box>input").eq(0).val()
    var pass = $(".input-box>input").eq(1).val()
    console.log(name)
    $.ajax({
      url: "../php/reg.php",
      data: {
        name: name,
      },
      success(dt) {
        if (dt == 1) {
          alert("账号已注册")
        } else {
          alert("注册成功")
          $.ajax({
            url: "../php/reg2.php",
            data: {
              name: name,
              pass: pass,
            },
          })
          document.cookie = "name=" + name
          location.href = "../pages/index.html"
        }
      },
    })
  })
})
