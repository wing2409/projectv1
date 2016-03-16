<%@page contentType="text/html; charset=utf-8" language="java" import="java.net.*,java.util.*,java.io.*"%>
<%
	String empCd = (String)session.getAttribute("EMP_CD");
	String redirectUrl = request.getParameter("w2xPath");

	if ((redirectUrl != null) && (redirectUrl.contains("login.xml") == false) && (redirectUrl.contains("db_manager.xml") == false) 
			&& ((empCd == null) || empCd.equals(""))) {
		response.sendRedirect("/prjtm2/websquare/websquare.jsp?w2xPath=/prjtm2/cm/main/login.xml");
	}
%>
