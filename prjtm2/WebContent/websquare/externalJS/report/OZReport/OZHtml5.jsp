<%@ page import="java.net.*" language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%	
	request.setCharacterEncoding("UTF-8");
	String[]	ozrParamVal	= request.getParameterValues("ozrParamVal");
	String		ozData		= URLDecoder.decode(request.getParameter("ozData"), "UTF-8");
%>
<!DOCTYPE html>
<html style="height:100%">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
	<script src="/oz/viewer/jquery-1.8.3.min.js"></script>	
	<script src="/oz/viewer/jquery-ui.min.js"></script>
	<link rel="stylesheet" href="/oz/viewer/jquery-ui.css" type="text/css"/>
	
	<link rel="stylesheet" href="/oz/viewer/html5/ui.dynatree.css" type="text/css"/>
	<script type="text/javascript" src="/oz/viewer/html5/jquery.dynatree.js" charset="utf-8"></script>
	<script type="text/javascript" src="/oz/viewer/html5/OZJSViewer.js" charset="utf-8"></script>
	<script language ="JavaScript">
		var oz_url	= "<%=request.getScheme()%>://<%=request.getServerName()%>";
		var oz_port	= "<%=request.getServerPort()%>";
		var oz_viewer	= "/oz/viewer/html5/";
		var oz_data	= <%=ozData%>;
	</script>
</head>
<body style="width:98%;height:98%">
<div id="OZViewer" style="width:98%;height:98%"></div>
<script type="text/javascript" >	
	function SetOZParamters_OZViewer() {
		var oz = document.getElementById("OZViewer");
		
		oz.sendToActionScript("connection.servlet"			,  oz_url + ":" + oz_port + "/oz/server");
		oz.sendToActionScript("connection.reportname"			, "/common/grid.ozr");
<%	
if (ozrParamVal != null) {
%>
		oz.sendToActionScript("connection.pcount"			,"<%=Integer.toString(ozrParamVal.length)%>");
<%
	for (int i = 0; i < ozrParamVal.length; i++) {
		if (ozrParamVal[i].indexOf("=") > -1) {
%>
		oz.sendToActionScript("connection.args<%=Integer.toString(i + 1)%>",	"<%=URLDecoder.decode(ozrParamVal[i], "UTF-8")%>");
<%			
		}
	}
}
%>
		oz.sendToActionScript("connection.datafromserver"		, "false");		
		oz.sendToActionScript("odi.odinames"				, "grid");
		oz.sendToActionScript("odi.grid.usescheduleddata"	, "ozp://OZSdmMakerJSON.js");
		oz.sendToActionScript("odi.grid.pcount"			, "2");
		oz.sendToActionScript("odi.grid.args1"			, "ozData=oz_data");
		oz.sendToActionScript("odi.grid.args2"			, "ViewerType=HTML5");		
		oz.sendToActionScript("information.debug"			, "true");		
		oz.sendToActionScript("viewer.isframe"				, "false");

		return true;
	}

	start_ozjs("OZViewer",  oz_url + ":" + oz_port + oz_viewer);
</script>
</body>
</html>	