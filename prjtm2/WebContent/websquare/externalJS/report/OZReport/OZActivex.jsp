<%@ page import="java.net.*" language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%	
	request.setCharacterEncoding("UTF-8");
	String[]	ozrParamVal	= request.getParameterValues("ozrParamVal");
	String		ozData		= request.getParameter("ozData");
	ozData = URLDecoder.decode(ozData,"UTF-8");
	ozData = ozData.replaceAll("\"", "\'");
	for(int i=0;i<ozrParamVal.length;i++){
		ozrParamVal[i] = URLDecoder.decode(ozrParamVal[i],"UTF-8");
	}
%>
<html style="height:100%">
<head>
	<script language = "JavaScript" src = "/oz/viewer/activex/ztransferx_browers.js"></script>
	<script language = "JavaScript" src = "/oz/viewer/activex/ozviewer_browers.js"></script>
	<script language ="JavaScript">
		var oz_url		= "<%=request.getScheme()%>://<%=request.getServerName()%>";
		var oz_port		= "<%=request.getServerPort()%>";
		var oz_viewer		= "/oz/viewer/activex/";
		var oz_namespace	= "inswave";
		var oz_data	= "<%=ozData%>";
	
		function ZTInstallEndCommand_ZTransferX(param1,param2) {
			Create_Div();
			Initialize_OZViewer("OZReportViewer", "CLSID:0DEF32F8-170F-46f8-B1FF-4BF7443F5F25", "98%", "98%", "application/OZRViewer");
			Insert_OZViewer_Param("connection.servlet"			, oz_url + ":" + oz_port + "/oz/server");
			Insert_OZViewer_Param("connection.reportname"			, "/common/grid.ozr");
<%	
if (ozrParamVal != null) {
%>
			Insert_OZViewer_Param("connection.pcount"			,"<%=Integer.toString(ozrParamVal.length)%>");
<%
	for (int i = 0; i < ozrParamVal.length; i++) {
		if (ozrParamVal[i].indexOf("=") > -1) {
%>
			Insert_OZViewer_Param("connection.args<%=Integer.toString(i + 1)%>",	"<%=ozrParamVal[i]%>");
<%			
		}
	}
}
%>
			Insert_OZViewer_Param("connection.datafromserver"		, "false");
			Insert_OZViewer_Param("odi.odinames"				, "grid");
			Insert_OZViewer_Param("odi.grid.usescheduleddata"	, "ozp://OZSdmMakerJSON.js");
			Insert_OZViewer_Param("odi.grid.pcount"			, "2");
			Insert_OZViewer_Param("odi.grid.args1"			, "ozData="+oz_data);
			Insert_OZViewer_Param("odi.grid.args2"			, "ViewerType=ActiveX");
			Insert_OZViewer_Param("information.debug"			, "true");		
			Insert_OZViewer_Param("viewer.isframe"				, "false");
			Insert_OZViewer_Param("viewer.namespace"			, oz_namespace + "\\ozviewer");
			Start_OZViewer();
	    }
	</script>
</head>
<body style="height:100%">
<div id="InstallOZViewer">
	<script language = "JavaScript">
		Initialize_ZT("ZTransferX"		, "CLSID:C7C7225A-9476-47AC-B0B0-FF3B79D55E67", "0", "0", oz_url + ":" + oz_port + oz_viewer + "ZTransferX.cab#version=2,2,4,4", "CLSID:C7C7225A-9476-47AC-B0B0-FF3B79D55E67", "application/OZTransferX_1022");
		Insert_ZT_Param("download.Server"	, oz_url + oz_viewer);
		Insert_ZT_Param("download.Port"		, oz_port);
		Insert_ZT_Param("download.Instruction"	, "ozrviewer.idf");
		Insert_ZT_Param("install.Base"		, "<PROGRAMS>/Forcs");
		Insert_ZT_Param("install.Namespace"	, oz_namespace);
		Insert_ZT_Param("messagetitle"		, "Now installing OZViewer on your system. Please Wait...");
		Insert_ZT_Param("imageurl"		, oz_url + ":" + oz_port + oz_viewer + "logo.gif");
		Start_ZT(oz_url + ":" + oz_port + oz_viewer);
	</script>
</div>
</body>
</html>