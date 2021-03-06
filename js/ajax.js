function ajax(options) {
  // 先准备一个默认值
  var defInfo = {
    url: "", // 地址不需要默认值
    type: "GET", // 请求方式的默认值是 GET
    async: true, // 默认值是异步
    data: "", // 参数没有默认值
    dataType: "string", // 默认不需要执行 json.parse
    success: function () {}, // 默认是一个函数
  }

  // 先来判断一下有没有传递 url，如果没有，直接抛出异常
  if (!options.url) {
    throw new Error("url 必须传递")
  }

  // 有了 url 以后就，我们就把用户传递的参数和我们的默认数据合并
  for (let key in options) {
    defInfo[key] = options[key]
  }

  // 接下来的一切我们都是使用我们的 defInfo 就可以了
  // 第一步就是判断参数 data
  // data 可以不传递，可以为空
  // data 也可以是一个 key=value&key=value 格式的字符串
  // data 也可以是一个对象
  // 否则就抛出异常
  if (
    !(
      (typeof defInfo.data === "string" &&
        /^(\w+=\w+&?)*$/.test(defInfo.data)) ||
      Object.prototype.toString.call(defInfo.data) === "[object Object]"
    )
  ) {
    throw new Error("请按照要求传递参数")
  }

  // 参数处理完毕以后，在判断 async 的数据类型
  // 只能传递 布尔数据类型
  if (typeof defInfo.async !== "boolean") {
    throw new Error("async 参数只接受布尔数据类型")
  }

  // 在接下来就判断 type
  // 请求方式我们只接受 GET 或着 POST
  if (
    !(
      defInfo.type.toUpperCase() === "GET" ||
      defInfo.type.toUpperCase() === "POST"
    )
  ) {
    throw new Error("目前本插件只接受 GET 和 POST 方式，请期待更新")
  }

  // 接下来就是判断 success 的判断，必须是一个函数
  if (Object.prototype.toString.call(defInfo.success) !== "[object Function]") {
    throw new Error("success 只接受函数数据类型")
  }

  // 参数都没有问题了
  // 我们就要把 data 处理一下了
  // 因为 data 有可能是对象，当 data 是一个对象的时候，我们要把它转换成一个字符串
  var str = ""
  if (Object.prototype.toString.call(defInfo.data) === "[object Object]") {
    for (let attr in defInfo.data) {
      str += `${attr}=${defInfo.data[attr]}&`
    }
    str = str.slice(0, -1)
    defInfo.data = str
  }

  // 参数全部验证过了以后，我们就可以开始进行正常的 ajax 请求了
  // 1. 准备一个 ajax 对象
  //    因为要处理兼容问题，所以我们准备一个函数
  function createXHR() {
    if (XMLHttpRequest) {
      return new XMLHttpRequest()
    } else {
      return new ActiveXObject("Microsoft.XMLHTTP")
    }
  }

  // 2. 创建一个 ajax 对象
  var xhr = createXHR()

  // 3. 进行 open
  xhr.open(
    defInfo.type,
    defInfo.url +
      (defInfo.type.toUpperCase() === "GET"
        ? `?${defInfo.data}&_=${new Date().getTime()}`
        : ""),
    defInfo.async
  )

  if (defInfo.type.toUpperCase() === "POST") {
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
  }

  // 4. 进行 send
  xhr.send(defInfo.type.toUpperCase() === "POST" ? `${defInfo.data}` : "")

  // 5. 接受响应
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /2\d{2}/.test(xhr.status)) {
      // 表示成功，我们就要执行 success
      // 但是要进行 dataType 的判断
      if (defInfo.dataType === "json") {
        defInfo.success(JSON.parse(xhr.responseText))
      } else {
        defInfo.success()
      }
    }
  }
}
