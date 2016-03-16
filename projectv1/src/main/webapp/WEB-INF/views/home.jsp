<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
</head>
<body>
<h1>
	Hello world!한글
</h1>

<P>  The time on the server is ${serverTime}. </P>
<c:forEach var="board" items="${list}" varStatus="status">
    ${board.ID}<br>
</c:forEach>
</body>
</html>
