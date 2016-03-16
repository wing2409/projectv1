<%@ page import="java.net.*" language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%	
	//request.setCharacterEncoding("UTF-8");
	String[] m2ParamVal	= request.getParameterValues("m2ParamVal");
	String		m2Data		= request.getParameter("m2Data");
	m2Data = URLDecoder.decode(m2Data,"UTF-8");
	m2Data = m2Data.replaceAll("\"", "\'");
	for(int i=0;i<m2ParamVal.length;i++){
		m2ParamVal[i] = URLDecoder.decode(m2ParamVal[i],"UTF-8");
	}
%>
<HTML>
<HEAD>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<TITLE>M2soft_CrownixViewer</TITLE>
<script type="text/javascript">
	var url	= "<%=request.getScheme()%>://<%=request.getServerName()%>";
	var port	= "<%=request.getServerPort()%>";
	var wqUrl = "<%=request.getRequestURL().toString()%>";
	wqUrl = wqUrl.split('externalJS');
	wqUrl = wqUrl[0];

	function fnTest(){

		var xmldata = "<%=m2Data%>";
		cxviewer.CheckRDStatus();
		cxviewer.SetXmlReportOpt(1);
		cxviewer.setRData(xmldata);
		cxviewer.LoadFormFile(wqUrl+"/externalJS/report/CrownixReport/m2.mrd", "/rf["+url+":"+port+"/DataServer/rdagent.jsp");

		var columnsSize = "<%=m2ParamVal[0]%>";
		columnsSize = columnsSize.split(",");

		var columnsAlign = "<%=m2ParamVal[1]%>";
		columnsAlign = columnsAlign.split(",");

		var useHeader = "<%=m2ParamVal[2]%>";
		var useTitle = "<%=m2ParamVal[3]%>";
		var userTitle = "<%=m2ParamVal[4]%>";

		var landScape = "<%=m2ParamVal[5]%>";
		var fitWidth = "<%=m2ParamVal[6]%>";
		var fitHeight = "<%=m2ParamVal[7]%>";
		var paperType = "<%=m2ParamVal[8]%>";
		var margin = "<%=m2ParamVal[9]%>";
		var userViewColumns = "<%=m2ParamVal[10]%>";

		//var columnsIDArr = "<%=m2ParamVal[11]%>";
		var columnsIDArr = [];
		for(var i=0;i<200;i++){
			columnsIDArr[i]="c"+(i+1);
		}

		var headerIdArr = "<%=m2ParamVal[12]%>";
		headerIdArr = headerIdArr.split(";");

		var headerAttributeName = "<%=m2ParamVal[13]%>";
		var headerAttributeValue = "<%=m2ParamVal[14]%>";
		var ColumnAttributeName = "<%=m2ParamVal[15]%>";
		var ColumnAttributeValue = "<%=m2ParamVal[16]%>";

		var userViewColumnsArr = userViewColumns.split(",");

		if(userViewColumnsArr){
			for(var i=0;i<headerIdArr.length;i++){
				if(useHeader){
					cxviewer.SetCellInfo(1, headerIdArr[i], "", "", headerAttributeName, headerAttributeValue, 0,"");
				}
				cxviewer.SetCellInfo(2, "", columnsIDArr[userViewColumnsArr[i]], "", ColumnAttributeName+"@HA@VA", ColumnAttributeValue+"@"+columnsAlign[i]+"@2", 0,"");
				cxviewer.AppendTableColumn("columns" , columnsSize[i], 1);
			}
		} else {
			for(var i=0;i<headerIdArr.length;i++){
				if(useHeader){
					cxviewer.SetCellInfo(1, headerIdArr[i], "", "", headerAttributeName, headerAttributeValue, 0,"");
				}
				cxviewer.SetCellInfo(2, "", columnsIDArr[i], "", ColumnAttributeName+"@HA@VA", ColumnAttributeValue+"@"+columnsAlign[i]+"@2", 0,"");
				cxviewer.AppendTableColumn("columns" , columnsSize[i], 1);
			}
		}

		cxviewer.AppendTableColumn("columns" , 0 , 1);
		cxviewer.AutoAdjust = true;
		cxviewer.ZoomRatio=100;
		cxviewer.FileOpen("", "");
	}
</script>
</HEAD>
<BODY OnLoad="fnTest()">
<script language="javascript">
 document.write("<object id='cxviewer' name='cxviewer' width='100%' height='100%' classid='clsid:04931AA4-5D13-442f-AEE8-0F1184002BDD' codebase='"+wqUrl+"/externalJS/report/CrownixReport/cab/cxviewer60u.cab#version=6,3,0,160'>");
 document.write("</object>");
 </script>
</BODY>
</HTML>