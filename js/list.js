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
  $(".banner-nav-list").hover(
    function () {
      $(".list-box").slideToggle(300)
    },
    function () {
      $(".list-box").slideToggle(300)
    }
  )

  // 收起筛选
  $(".crumbs .push-btn").click(function () {
    $(".advanced-filter").slideToggle(300)
  })

  // 商品列表渲染

  function newTab(datas = [], begin) {
    let newLi = ""
    for (let i = begin; i < begin + 20; i++) {
      var title1 = $.trim(datas[i].title)
      var price1 = datas[i].price
      var img1 = datas[i].img
      var tall1 = datas[i].tall
      var id1 = datas[i].id
      newLi += `
      <li>
          <div class="item-bg" data-id="${id1}">
            <a class="goods-img" href="../pages/goods.html?id=${id1}">
              <img src="${img1}" alt="">
            </a>
            <div class="price-box">
              <span class="price"><i>￥</i><b>${price1}</b><i>.00</i></span>
            </div>
            <h2 class="title">
              <a data-name="${id1}" href="../pages/goods.html?id=${id1}">${title1}</a>
            </h2>
            <p class="talls"><span>${tall1}</span>评价</p>
            <a class="join" href="javascript:void(0);">加入购物车</a>
          </div>
        </li>
      `
    }
    return newLi
  }
  $.ajax({
    url: "../php/list.php",
    type: "get",
    async: false,
    success(dt) {
      dt = JSON.parse(dt)
      let newLi1 = newTab(dt, 0)
      var zz = `
          <div class="tab-content clearfix">
            <ul>${newLi1}</ul>
          </div>`
      $(".goods-list").append(zz)
      joinCart()
      // pag()
    },
  })
  // localstorage
  var cartList = JSON.parse(localStorage.getItem("cartList")) || []
  // 加入购物车
  function joinCart() {
    $(".join").on("click", function () {
      let part = $(this).parent()
      let jid = part.attr("data-id")
      let jimg = part.children(".goods-img").children("img").attr("src")
      let jprice = part
        .children(".price-box")
        .children(".price")
        .children("b")
        .text()

      let jtitle = part.children(".title").children("a").html()
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

  // 分页器
  // function pag() {
  var pagin = document.querySelector(".pagination")
  var pagObj = {
    textInfo: {
      first: "首页",
      prev: "上一页",
      next: "下一页",
      last: "尾页",
    },
  }
  var p1 = new Pagination(pagin, pagObj)

  // 分页器点击
  //获取当前所在页thisON
  var thisON = $(".onc")
  $(".pagination").on("click", function () {
    // 判断页码是否发生了改变
    if ($(".onc")[0] != thisON[0]) {
      thisON = $(".onc")
      let beginNum = parseInt(thisON.html())
      $.ajax({
        url: "../php/list.php",
        type: "get",
        async: false,
        success(dt) {
          dt = JSON.parse(dt)
          $(".goods-list").empty()
          let newLi1 = newTab(dt, beginNum)
          var zz = `
              <div class="tab-content clearfix">
                <ul>${newLi1}</ul>
              </div>`
          $(".goods-list").append(zz)
          joinCart()
        },
      })
    }
  })
  // }
})
