<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ page isELIgnored="false"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix='fmt' uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="description" content="" />
<meta name="keywords" content="" />
<title>404错误</title>
<link type="text/css" href="<%=path %>/css/main.css" rel="stylesheet" />
<style type="text/css">
.err {
	padding: 30px 0 20px;
}

.err p {
	text-align: center;
}

.err img {
	margin-bottom: 15px;
}

.err h3 {
	font-size: 16px;
	line-height: 30px;
	margin-bottom: 10px;
	color: #FF3300;
	text-align: center;
}

.err p {
	font-size: 14px;
	line-height: 24px;
}
</style>
</head>
<body>
	<div class="content">
		<div class="err">
			<p>
				<img src="<%=path %>/images/404.jpg" />
			</p>
			<h3>您访问的页面未找到</h3>

		</div>
	</div>
</body>
</html>
