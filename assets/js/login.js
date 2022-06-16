$(function() {
  // 点击去注册账号的链接
  $('#link_reg').on('click', function() {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击去登录的链接
  $('#link_login').on('click', function() {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 从layUI中获取from对象
  var from = layui.form
  var layer = layui.layer
  //  通过form.verify( 函数自定义校验规则
  from.verify({
    // 自定义一个叫做pwd的效验规则
    pwd: [/^[\S]{6,12}$/ ,'密码必须6到12位，且不能出现空格'],
    // 效验两次密码是否一致的规则
    repwd: function(value) {
      // 通过形参拿到确认密码框中的内容
      // 在拿到密码框的内容
      // 然后进行一次判断
      // 判断失败则return一个提示消息即可
      var pwd = $('.reg-box [name=password]')
      .val()
      if (pwd !== value) {
        return '两次密码不一致!'
      }
    }

  })  
  
  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 阻止默认的提交行为
    e.preventDefault();
    // 发起Ajax的post请求
    var data = {username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
    $.post('/api/reguser', data, function (res) { 
      if (res.status !== 0) {
      
        return layer.msg(res.message)
      }
      layer.msg('注册成功, 请登录!');
      // 模拟人的点击事件
      $('#link_login').click()
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').submit(function(e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if(res.status !== 0) {
          return layer.msg('登录失败!')
        }
        layer.msg('登录成功!')
        // 将登录成功的token字符串 保存到localstorage中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      } 
    })
  })
})