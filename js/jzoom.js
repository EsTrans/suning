function jzoom(options) {
  //初始化
  var zoommain = options["zoommain"] //显示图片的盒子
  var zoomimg = options["zoomimg"] //显示图片
  var zoomsort = options["zoomsort"] //遮罩层
  var list = options["list"] //图片列表
  var zoompop = options["zoompop"] //放大镜
  //点击图片列表切换
  list.click(function () {
    let srcs = $(this).attr("src")
    zoomimg.attr("src", srcs)
    zoompop.attr("src", srcs)
  })

  //鼠标移入
  zoommain.mousemove(function (e) {
    zoomsort.css("display", "block")
    zoompop.offsetParent().css("display", "block")
    //获取遮罩层盒子的位置
    var offsetX =
      e.clientX - $(this).offset().left - parseInt(zoomsort.width() / 2)
    var offsetY =
      e.clientY - $(this).offset().top - parseInt(zoomsort.height() / 2)
    //设置遮罩层的最大移动范围
    var sortmaxX = $(this).width() - zoomsort.width()
    var sortmaxY = $(this).height() - zoomsort.height()
    //设置右边大图片的显示
    var rightX, rightY
    //控制移动范围
    zoomsort.css({
      left: offsetX,
      top: offsetY,
    })
    rightX = offsetX
    rightY = offsetY
    if (offsetX <= 0) {
      zoomsort.css("left", 0)
    }
    if (offsetY <= 0) {
      zoomsort.css("top", 0)
    }
    if (offsetX >= sortmaxX) {
      zoomsort.css("left", sortmaxX)
    }
    if (offsetY >= sortmaxY) {
      zoomsort.css("top", sortmaxX)
    }
    //设置右边放大图片的position
    zoompop.css({
      left: -zoomsort.position().left * 2,
      top: -zoomsort.position().top * 2,
    })
  })

  //鼠标离开
  zoommain.mouseleave(function () {
    zoomsort.css("display", "none")
    zoompop.offsetParent().css("display", "none")
  })
}
