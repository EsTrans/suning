/*
      思路：
        1、明确操作对象：最大的盒子
        2、把子元素中所有的点击事件都委托给大盒子操作
        3、单独创建函数计算总计
      */
//获取操作对象
var box = document.querySelector("#a1")
var foot1 = document.querySelector(".foot")
//获取小计对象
var xiaoji1 = document.querySelector(".xiaoji")
//获取所有商品
var divs = document.getElementsByClassName("content")
//获取所有选中框对象
var inps = document.getElementsByName("a1")
//获取全选框对象
var quans = document.querySelectorAll('[name="a0"]')
var a = 3 //图片名称
//获取提示对象
var tips1 = document.querySelector(".tips")
//获取商品栏对象
var goods = document.querySelector(".goodsbox")
// localstorage
var cartList = JSON.parse(localStorage.getItem("cartList")) || []
//给大盒子绑定点击事件
box.onclick = function (e) {
  var e = e || window.event
  //获取目标对象
  var target = e.target || e.srcElement
  //判断点击的对象是否为批量删除按钮
  if (target.value == "批量删除") {
    remtwo()
  }
  //判断点击的是否为加号
  if (target.value == "+") {
    adds(target)
    total1()
    paymon()
  }

  //判断点击的是否为-号
  if (target.value == "-") {
    //获取当前对象后面的数量
    var num = target.nextElementSibling.value
    //判断数量是否小于等于1
    if (num <= 1) {
      num = 1
    } else {
      num--
    }
    //从新把计算结果赋值给输入框
    target.nextElementSibling.value = num
    //获取单价
    var price =
      target.parentNode.previousElementSibling.lastElementChild.innerHTML
    //计算小计
    var xiaoji = parseFloat(price) * parseFloat(num)
    //获取当前商品中所有子元素节点
    var sons = target.parentNode.parentNode.children
    //把计算结果赋值给小计的位置
    sons[sons.length - 3].lastElementChild.innerHTML = xiaoji.toFixed(2)
    total1()
    paymon()
    // 获取当前商品id
    let onId = target.parentNode.parentNode.getAttribute("data-id")
    cartList = JSON.parse(localStorage.getItem("cartList"))
    cartList.forEach((item) => {
      if (item.id == onId) {
        item.num = num
        localStorage.setItem("cartList", JSON.stringify(cartList))
        return
      }
    })
  }
  //判断点击的是否为删除
  if (target.value == "删除") {
    // 获取当前商品id
    let onId = target.parentNode.parentNode.getAttribute("data-id")
    cartList = JSON.parse(localStorage.getItem("cartList"))
    cartList.forEach((item, index) => {
      if (item.id == onId) {
        cartList.splice(index, 1)
        localStorage.setItem("cartList", JSON.stringify(cartList))
        return
      }
    })
    target.parentNode.parentNode.remove()
    total1()
    checked1()
    paymon()
    tip()
  }
  //判断点击的是否为全选框
  if (target.value == "全选") {
    //遍历所有选中框对象
    for (var i = 0; i < inps.length; i++) {
      //判断全选框是否被选中
      if (target.checked) {
        inps[i].checked = true
      } else {
        inps[i].checked = false
      }
    }
    //遍历全选框
    for (let i = 0; i <= 1; i++) {
      quans[i].checked = target.checked
    }
    paymon()
  }
  //判断点击的是否为选中框对象
  if (target.value == "a1") {
    checked1()
    paymon()
    paymon()
  }
}

function remtwo() {
  cartList = JSON.parse(localStorage.getItem("cartList"))
  //遍历所有商品
  for (var i = divs.length - 1; i >= 0; i--) {
    //获取当前商品选中框对象
    let check1 = divs[i].firstElementChild.lastElementChild
    let remId = divs[i].getAttribute("data-id")
    let remItem = $(divs[i]).index() - 2
    //判断当前商品是否被选中
    if (check1.checked) {
      //删除当前被选中的商品
      divs[i].remove()
      cartList.forEach((item) => {
        if (item.id == remId) {
          cartList.splice(remItem, 1)
          localStorage.setItem("cartList", JSON.stringify(cartList))
          return
        }
      })
    }
  }
  total1()
  checked1()
  paymon()
  tip()
}
//创建添加相同商品或+商品的函数
function adds(target) {
  // 获取当前商品id
  let onId = target.parentNode.parentNode.getAttribute("data-id")
  //获取当前对象前面的数量
  var num = target.previousElementSibling.value
  //给当前数量加加
  num++
  //在把计算之后的结果赋值给输入框对象
  target.previousElementSibling.value = num
  //获取单价
  var price =
    target.parentNode.previousElementSibling.lastElementChild.innerHTML
  //计算小计
  var xiaoji = parseFloat(price) * parseFloat(num)
  //获取当前商品中所有子元素节点
  var sons = target.parentNode.parentNode.children
  //把计算结果赋值给小计的位置
  sons[sons.length - 3].lastElementChild.innerHTML = xiaoji.toFixed(2)

  cartList = JSON.parse(localStorage.getItem("cartList"))
  cartList.forEach((item) => {
    if (item.id == onId) {
      item.num = num
      localStorage.setItem("cartList", JSON.stringify(cartList))
      return
    }
  })
}
function checked1() {
  //判断当前购物车中是否存在商品
  if (inps.length > 0) {
    var mm = 0 //被选中的次数
    //遍历所有的选中框
    for (var i = 0; i < inps.length; i++) {
      //判断当前选中框是否被选中
      if (inps[i].checked) {
        mm++
      }
    }
    //判断当前选中框被选中的次数是否等于长度
    if (inps.length == mm) {
      quans[0].checked = true
      quans[1].checked = true
    } else {
      quans[0].checked = false
      quans[1].checked = false
    }
  } else {
    quans[0].checked = false
    quans[1].checked = false
  }
}
//获取所有的input输入框
var inputs = document.getElementsByClassName("cc")
//给每个输入框绑定一个oninput事件
for (var i = 0; i < inputs.length; i++) {
  inputs[i].oninput = function () {
    console.log(1)
    //获取当前输入框中的文本
    var val = this.value
    var reg = /^[1-9]\d{0,4}$/
    if (reg.test(val)) {
      //获取单价
      var price = this.parentNode.nextElementSibling.lastElementChild.innerHTML
      //计算小计
      var xiaoji = parseInt(val) * parseFloat(price)
      //重新给小计赋值
      this.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.innerHTML = xiaoji
    } else {
      alert("数量有误，请重新输入")
      this.value = 1
      //获取单价
      var price = this.parentNode.nextElementSibling.lastElementChild.innerHTML

      //重新给小计赋值
      this.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.innerHTML = price
    }
    total1()
  }
}
//创建统计函数，计算总计
function total1() {
  var sum = 0 //总计
  //遍历所有商品
  for (var i = 0; i < divs.length; i++) {
    //获取当前商品中所有的子元素节点
    var sons = divs[i].children
    //获取小计
    var xiaoji = sons[sons.length - 3].lastElementChild.innerHTML
    sum += parseFloat(xiaoji)
  }
  //把当前总计赋值
  // foot1.lastElementChild.innerHTM = sum
  xiaoji1.lastElementChild.lastElementChild.innerHTML = sum.toFixed(2)
}
total1()
//创建添加商品函数
function newElem(imgs, ps, mons, num, id1) {
  //创建div对象
  var newDiv = document.createElement("div")
  //给当前div对象添加class属性
  newDiv.className = "content"
  newDiv.setAttribute("data-id", id1)
  newDiv.style =
    //给div对象中添加内容
    newDiv.innerHTML = `
    <h4 class="top_1"><input type="checkbox" name="a1" value="a1"></h4>
    <h4 class="top_2"><img class="imagess" src="${imgs}" height="148px" width="114px"> <span>${ps}</span> </h4>
    <h4>$<span>${mons}</span></h4>
    <h4><input class="aa" type="button" value="-"><input class="cc" type="text" name="wenben" value="${num}" ><input class="aa" type="button" value="+"></h4>
    <h4>$<span>${mons}</span></h4>
    <h4><input type="button" value="删除"></h4>
    <div class="clear"></div>
  `
  // 判断购物车中是否存在该商品
  var imagess = document.getElementsByClassName("imagess")
  var flag = false
  for (let i = 0; i < imagess.length; i++) {
    if (imagess[i].getAttribute("src") == imgs) {
      var ttarget =
        imagess[i].parentElement.nextElementSibling.nextElementSibling
          .lastElementChild
      adds(ttarget)
      total1()
      paymon()
      flag = true
    }
  }
  //把当前新的div对象插入到指定位置
  if (!flag) {
    box.insertBefore(newDiv, xiaoji1)
  }
  a++
  if (a > 7) {
    a = 1
  }

  tip()
}
//创建结算统计函数
function paymon() {
  let sums = 0 //总计
  //遍历所有已选商品
  for (let i = 0; i < inps.length; i++) {
    if (inps[i].checked) {
      let papa = inps[i].parentNode.parentNode
      let mon =
        papa.lastElementChild.previousElementSibling.previousElementSibling
          .lastElementChild.innerHTML
      sums += parseFloat(mon)
    }
  }
  foot1.lastElementChild.lastElementChild.previousElementSibling.innerHTML = sums.toFixed(
    2
  )
}
paymon()

//创建提示的显示方法
function tip() {
  if (inps.length <= 0) {
    tips1.style.display = "block"
  } else {
    tips1.style.display = "none"
  }
}

//创建添加商品的方法
//给对象父级添加事件委托
goods.onclick = function (e) {
  var e = e || window.event
  var target = e.target || e.srcElement
  //判断是否为加入购物车按钮
  if (target.className == "mark") {
    //获取点击盒子内容
    //获取li盒子
    var markPapa = target.parentNode.children
    //获取图片路径
    var imgsrc1 = markPapa[0].getAttribute("src")
    // 获取标题
    var title1 = markPapa[1].innerHTML
    //获取价格
    var money1 = markPapa[2].lastElementChild.innerHTML
    newElem(imgsrc1, title1, money1)
  }
}

// 结算
$(".pay").on("click", function () {
  if (document.cookie.indexOf("name") == -1) {
    alert("还未登录，请登录")
    location.href = "../pages/login.html"
  } else {
    let pay = $(this).prev().html()
    if (pay == 0) {
      alert("还未选中任何商品")
    } else {
      let ff = confirm("确认付款" + pay + "元？")
      if (ff) {
        remtwo()
      }
    }
  }
})
