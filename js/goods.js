$(function () {
  // 登录判断
  if (document.cookie.indexOf("name") != -1) {
    $(".top-nav-right")
      .children()
      .eq(0)
      .children()
      .html(document.cookie.split("=")[1])
    $(".top-nav-right").children().eq(1).remove()
  }
  // 渲染
  var val = location.href.split("=")[1]
  $.ajax({
    url: "../php/goods.php",
    type: "get",
    data: { id: val },
    success(dt) {
      dt = JSON.parse(dt)
      var title1 = $.trim(dt.title)
      var price1 = dt.price
      var img1 = dt.img
      var id1 = dt.id
      var goods1 = `
    <!-- 放大镜 -->
  <div class="zooms">
    <div class="zoomimg">
      <img src="${img1}" alt="">
      <div class="imgzoom-sort"></div>
    </div>
    <div class="imglist">
      <img src="${img1}" alt="">
      <img src="../images/1.jpg" alt="">
      <img src="../images/2.jpg" alt="">
      <img src="../images/5.jpg" alt="">
      <img src="../images/4.jpg" alt="">
    </div>
    <div class="imgzoom-pop">
      <img src="${img1}" alt="">
    </div>
  </div>
  <!-- 文字介绍 -->
  <div class="intor-cont"  data-id="${id1}">
    <h1 class="title">${title1}</h1>
    <div class="price-box">
      <label>活动价</label>
      <span class="price"><i>￥</i><b>${price1}</b><i>.00</i></span>
    </div>
    <div class="btn">
      <a href="../pages/shopping.html" class="go">立即购买</a>
      <a href="javascript:void(0);" class="join">加入购物车</a>
    </div>
  </div>`
      $(".goods-intor").append(goods1)
      zoom()
      joinCart()
    },
  })

  function zoom() {
    // 放大镜
    //初始化
    var zoom = $(".zoomimg") //显示图片的盒子
    var zoomimg = $(".zoomimg>img") //显示图片
    var zoomsort = $(".imgzoom-sort") //遮罩层
    var list = $(".imglist>img") //图片列表
    var zoompop = $(".imgzoom-pop") //放大镜
    var popimg = zoompop.children("img") //放大镜图片
    //点击图片列表切换
    list.click(function () {
      let srcs = $(this).attr("src")
      zoomimg.attr("src", srcs)
      popimg.attr("src", srcs)
    })

    //鼠标移入
    zoom.mousemove(function (e) {
      zoomsort.css("display", "block")
      zoompop.css("display", "block")
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
      popimg.css({
        left: -zoomsort.position().left * 2,
        top: -zoomsort.position().top * 2,
      })
    })

    //鼠标离开
    zoom.mouseleave(function () {
      zoomsort.css("display", "none")
      zoompop.css("display", "none")
    })
  }
  // 详情选项卡切换
  $(".nav-item").on("click", function () {
    $(".nav-item").removeClass("on")
    $(this).addClass("on")
    if ($(this).index() == 0) {
      $(".xiang-cont").addClass("show")
      $(".xiang-cont").eq(1).removeClass("show")
    } else if ($(this).index() == 1) {
      $(".xiang-cont").eq(1).addClass("show")
      $(".xiang-cont").eq(0).removeClass("show")
    } else {
      $(".xiang-cont").removeClass("show")
      $(".xiang-cont").eq(2).addClass("show")
    }
  })

  // localstorage
  var cartList = JSON.parse(localStorage.getItem("cartList")) || []
  // 加入购物车
  function joinCart() {
    $(".join").on("click", function () {
      let jid = $(".goods-intor .intor-cont").attr("data-id")
      let jimg = $(".goods-intor .zoomimg>img").attr("src")
      let jprice = $(".price>b").html()
      let jtitle = $(".goods-intor .title").html()
      let goodsItem = {
        id: jid,
        title: jtitle,
        price: jprice,
        img_src: jimg,
        num: 1,
      }
      // 获取Localstorage
      cartList = JSON.parse(localStorage.getItem("cartList"))
      if (cartList) {
        let flag = false
        cartList.forEach((item) => {
          // 判断购物车中是否存在当前要添加的商品
          if (item.id == goodsItem.id) {
            // 如果其中有该商品则将数量++
            item.num++
            flag = true
            return
          }
        })
        //购物车中没有该商品的情况
        if (!flag) {
          cartList.push(goodsItem)
        }
        localStorage.setItem("cartList", JSON.stringify(cartList))
      } else {
        // 如果localstorage中不存在cartList,添加进去
        localStorage.setItem("cartList", JSON.stringify([goodsItem]))
      }
    })
  }
})
