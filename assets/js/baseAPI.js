$.ajaxPrefilter(function(options) {
  // 发起真正的Ajax请求之前，统一拼接请求的根目录
  options.url = 'http://www.liulongbin.top:3007' + options.url
  console.log(options.url);
})