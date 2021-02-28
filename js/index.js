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
  // 轮播图
  var mySwiper = new Swiper(".swiper-container", {
    // direction: "vertical", // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay: true,
    effect: "fade",

    // 如果需要分页器
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    // 如果需要前进后退按钮
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  })

  // 轮播图背景
  var cols = [
    "#ff4508",
    "#b51311",
    "#7400d7",
    "#3c4aea",
    "#fecef6",
    "#062576",
    "#bf060b",
    "#8e1112",
  ]
  var col = $(".swiper-slide")
  for (let i = 0; i < col.length; i++) {
    col
      .eq(i)
      .css("background-color", cols[col.eq(i).attr("data-swiper-slide-index")])
  }

  // 猜你喜欢选项卡切换
  var timer1
  $(".tab-nav li").hover(
    function () {
      timer1 = setTimeout(() => {
        $(".tab-nav li").removeClass("cur")
        $(this).toggleClass("cur")
        $(".rec-tab .tab-content").css("display", "none")
        $(".rec-tab .tab-content").eq($(this).index()).css("display", "block")
      }, 300)
    },
    function () {
      clearTimeout(timer1)
    }
  )
  $(".rec-tab .tab-content").eq(0).css("display", "block")

  // 猜你喜欢选项卡渲染
  var li1 = []
  function newTab(datas = [], space) {
    for (let t = space * 20; t < space * 20 + 20; t++) {
      var title1 = $.trim(datas[t].title)
      var price1 = datas[t].price
      var img1 = datas[t].img
      var id1 = datas[t].id
      if (!li1[space]) {
        li1[space] = ""
      }
      li1[space] += `<li>
      <a href="../pages/goods.html?id=${id1}" data-id=${id1}>
        <img src="${img1}" alt="">
        <p class="title">
          <i class="zyIcon"></i>
          ${title1}
        </p>
        <p class="price-box">
          <span class="price">
            <i>￥</i>
            <em>${price1}.00</em>
          </span>
          <span class="refprice">
            <i>￥</i>
            <em>6799.00</em>
          </span>
        </p>
      </a>
    </li>
    `
    }
  }

  $.ajax({
    url: "../php/index.php",
    type: "get",
    success(dt) {
      dt = JSON.parse(dt)
      for (let i = 0; i < 7; i++) {
        newTab(dt, i)
        var zz = `
        <div class="tab-content clearfix">
          <ul>${li1[i]}</ul>
        </div>`
        $(".rec-tab").append(zz)
      }
      $(".rec-tab .tab-content").eq(0).css("display", "block")
    },
  })

  $(".list-box .list-ul li").append(`
  <div class="more-tab">
                <ul>
                  <li>
                    <p>
                      <a href="../pages/list.html">小手机</a><span>/</span>
                      <a href="../pages/list.html">大手机</a><span>/</span>
                      <a href="../pages/list.html">白手机</a><span>/</span>
                      <a href="../pages/list.html">黑手机</a><span>/</span>
                      <a href="../pages/list.html">绿手机</a><span>/</span>
                    </p>
                    <p>
                      <a href="../pages/list.html">小手机</a><span>/</span>
                      <a href="../pages/list.html">大手机</a><span>/</span>
                      <a href="../pages/list.html">白手机</a><span>/</span>
                      <a href="../pages/list.html">黑手机</a><span>/</span>
                      <a href="../pages/list.html">绿手机</a><span>/</span>
                    </p>
                    <p>
                      <a href="../pages/list.html">小手机</a><span>/</span>
                      <a href="../pages/list.html">大手机</a><span>/</span>
                      <a href="../pages/list.html">白手机</a><span>/</span>
                      <a href="../pages/list.html">黑手机</a><span>/</span>
                      <a href="../pages/list.html">绿手机</a><span>/</span>
                    </p>
                  </li>
                </ul>
              </div>`)
})
