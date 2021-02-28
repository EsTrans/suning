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
  // 推荐商品

  function newTab(datas = [], tab) {
    var li1 = ""
    for (let i = tab; i < tab + 10; i++) {
      var title1 = $.trim(datas[i].title)
      var price1 = datas[i].price
      var img1 = datas[i].img
      var id1 = datas[i].id
      li1 += `
        <li class="list">
        <img src="${img1}" class="img1">
        <a class="title" data-id="${id1}" href="../pages/goods.html?id=${id1}">${title1}</a>
        <p class="price"><span>￥</span><span>${price1}</span></p>
        <a class="join" href="javascript:void(0);">加入购物车</a>
        </li>
      `
    }
    var zz = `
      <ul class="goodsul clearfix">${li1}</ul>`
    $(".goodsbox").append(zz)
  }
  $.ajax({
    url: "../php/shop.php",
    type: "get",
    // async: false,
    success(dt) {
      dt = JSON.parse(dt)
      newTab(dt, 0)
      newTab(dt, 10)
      joinCart()
    },
  })

  // 加入购物车
  function joinCart() {
    $(".join").on("click", function () {
      var jprice = $(this).prev().children("span:last").html()
      var jparent = $(this).parent().children()
      var jimg = jparent.eq(0).attr("src")
      var jtitle = jparent.eq(1).html()
      var jid = jparent.eq(1).attr("data-id")
      var goodsItem = {
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
      newElem(
        goodsItem.img_src,
        goodsItem.title,
        goodsItem.price,
        goodsItem.num,
        goodsItem.id
      )
    })
  }

  // localstorage
  var cartList = JSON.parse(localStorage.getItem("cartList")) || []
  show()
  function show() {
    //判断当前localstorage中是否有内容
    if (cartList.length > 0) {
    }
    cartList.forEach(function (item) {
      newElem(item.img_src, item.title, item.price, item.num, item.id)
    })
  }

  //选项卡切换
  $(".goods-left").on("click", function () {
    if ($(".goodsul").eq(0).css("display") == "none") {
      $(".goodsul").eq(0).css("display", "block")
      $(".goodsul").eq(1).css("display", "none")
      $(".dian").eq(0).css("background-position", "left")
      $(".dian").eq(1).css("background-position", "right")
    }
  })
  $(".goods-right").on("click", function () {
    if ($(".goodsul").eq(1).css("display") == "none") {
      $(".goodsul").eq(1).css("display", "block")
      $(".goodsul").eq(0).css("display", "none")
      $(".dian").eq(1).css("background-position", "left")
      $(".dian").eq(0).css("background-position", "right")
    }
  })
})
