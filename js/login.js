if (document.cookie.indexOf("name") != -1) {
  alert("您已登录")
  location.href = "../pages/shopping.html"
}
// 选项卡切换
function zz(i) {
  $(".tab-item").removeClass("on")
  $(".tab-item:eq(" + i + ")").addClass("on")
  if (i == 0) {
    $(".login-cont-l").css("display", "block")
    $(".login-cont-r").css("display", "none")
  } else {
    $(".login-cont-l").css("display", "none")
    $(".login-cont-r").css("display", "block")
  }
}

// 登录
function cc() {
  var username = $("#username").val()
  var password = $("#password").val()
  // 调用ajax
  $.ajax({
    url: "../php/login.php",
    data: { name: username, pass: password },
    type: "get",
    success(dt) {
      if (dt == "1") {
        alert("登录成功")
        location.href = "../pages/shopping.html"
        document.cookie = "name=" + username
      } else {
        alert("登录失败")
      }
    },
  })
}
