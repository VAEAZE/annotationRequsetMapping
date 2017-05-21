<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
  String path = request.getContextPath();
  String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
  long versions = new java.util.Date().getTime();
%>
<!DOCTYPE html>
<html>
<head lang="zh">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta charset="utf-8">
  <meta content="yes" name="apple-mobile-web-app-capable">
  <meta content="yes" name="apple-touch-fullscreen">
  <meta content="telephone=no" name="format-detection">
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
  <title>商家登录</title>
  <link href="<%=path%>/css/style.css" rel="stylesheet" type="text/css">
  <script src="<%=path%>/js/jquery-1.9.1.min.js"></script>
  <script src="<%=path%>/js/layer/layer.js" type="text/javascript"></script>
  <script src="<%=path%>/js/jquery.form.js"></script>
  <script type="text/javascript">
    function save(){
      var options = {
        beforeSubmit :	function showRequest() {},
        success: function(data) {
          if (data && data.state) {
            /*var index1 = layer.alert(data.msg, {icon: 6,closeBtn: 0}, function(){*/
                  window.location.href='<%=basePath%>couponController/queryForCoupon.do';
            /*});*/
          } else {
            layer.alert(data.msg, {icon: 5,closeBtn: 0});
          }
        }
      };

      var account = $.trim($('#account').val());
      var code = $.trim($('#code').val());
      if(!account){
          alert('手机号不能为空');
          return false;
      }
      if(!code){
        alert('验证码不能为空');
        return false;
      }

      $('#form').ajaxSubmit(options);
    }

    function sendCode() {
      var phoneNumber = $('#account').val();
      $.ajax({
        type: "get",
        url: "<%=basePath%>common/test.do?phoneNumber=" +new Date().getTime(),
        beforeSend:function(){
          $("#send").hide();
          $(".btn-retransmit-disabled").show();
        },
        success: function (data) {
          if(data.state){
            alert(data.msg);
            var _i=180;
            var _t=window.setInterval(function(){
              _i--;
              if(_i<1){
                window.clearInterval(_t);
                $("#send").show();
                $(".btn-retransmit-disabled").hide();
              }else{
                $('#timeout').html('('+_i+')');
              }
            },1000);
          }else{
            $("#send").show();
            $(".btn-retransmit-disabled").hide();
            alert(data.msg);
          }
        }
      });
    }

  </script>
</head>
<body>
<%--<header>
  <div class="new-header">
    <a href="" class="h_close"><em></em></a>
    <h2>周边惠商家登录</h2>
  </div>
</header>--%>

<div class="main">
  <div class="logo"><img src="<%=path%>/images/logo.png"></div>
  <form id="form" action="<%=basePath%>loginController/login.do" method="post">
    <div class="loginbox">
      <div class="user">
        <input name="account" id="account" type="text" value="" placeholder="请输入您的手机号">
      </div>
      <div class="yzm">
        <input name="code" id="code" type="text" value="" placeholder="填写手机验证码">
        <span>
          <a href="javascript:void(0)" onclick="sendCode()" id="send">获取验证码</a>
          <a href="javascript:void(0)" class="btn-retransmit-disabled" style="display: none">重新发送<label style="width: auto" id="timeout">(180)</label></a>
        </span>
      </div>
    </div>
    <div class="login_btn"><input name="" type="button" value="登录" onclick="save()"></div>
  </form>
</div>

</body>
</html>