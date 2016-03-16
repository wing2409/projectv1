<%@ page import="java.net.*" language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%
	request.setCharacterEncoding("UTF-8");
	String xmlData = URLDecoder.decode(request.getParameter("__Rexpert_PrintData__"), "UTF-8");
	String colData = request.getParameter("__Rexpert_PrintCol__");
	String headerColData = URLDecoder.decode(request.getParameter("__Rexpert_PrintHeaderCol__"), "UTF-8");
	String columnsSize = request.getParameter("columnsSize");
	String columnsAlign = request.getParameter("columnsAlign");
	String useHeader = request.getParameter("useHeader");
	String headerColor = request.getParameter("headerColor");
	String headerFontName = request.getParameter("headerFontName");
	String headerFontColor = request.getParameter("headerFontColor");
	String headerFontSize = request.getParameter("headerFontSize");
	String bodyColor = request.getParameter("bodyColor");
	String bodyFontName = request.getParameter("bodyFontName");
	String bodyFontColor = request.getParameter("bodyFontColor");
	String bodyFontSize = request.getParameter("bodyFontSize");
	String useTitle = request.getParameter("useTitle");
	String userTitle = URLDecoder.decode(request.getParameter("userTitle"), "UTF-8");
	String landScape = request.getParameter("landScape");
	String fitWidth = request.getParameter("fitWidth");
	String fitHeight = request.getParameter("fitHeight");
	String paperType = request.getParameter("paperType");
	String margin = request.getParameter("margin");
	String sUrl = request.getRequestURL().toString();
	String bNode = request.getParameter("bNode");
	String rNode = request.getParameter("rNode");
	sUrl = sUrl.replace("/CLIPReport.jsp", "");
%>
<HTML>
<HEAD>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<TITLE>Sample</TITLE>
<script type="text/javascript">
var colData = "<%=colData%>";
var headerColData = "<%=headerColData%>";
var columnsSize = "<%=columnsSize%>";
var columnsAlign = "<%=columnsAlign%>";
var useHeader = "<%=useHeader%>";
var headerColor = "<%=headerColor%>";
var headerFontName = "<%=headerFontName%>";
var headerFontColor = "<%=headerFontColor%>";
var headerFontSize = "<%=headerFontSize%>";
var bodyColor = "<%=bodyColor%>";
var bodyFontName = "<%=bodyFontName%>";
var bodyFontColor = "<%=bodyFontColor%>";
var bodyFontSize = "<%=bodyFontSize%>";
var useTitle = "<%=useTitle%>";
var userTitle = "<%=userTitle%>";
var landScape = "<%=landScape%>";
var fitWidth = "<%=fitWidth%>";
var fitHeight = "<%=fitHeight%>";
var paperType = "<%=paperType%>";
var margin = "<%=margin%>";
var xmlData = '<%=xmlData%>';
var bNode = '<%=bNode%>';
var rNode = '<%=rNode%>';

function reportRenderStart() {
	RexGen.create();
	var report = RexGen.getMainReport();

	var colArr = colData.split(";");
	var colSize = columnsSize.split(",");
	dataset = report.createDataSetXML("xmldata", bNode+"/"+rNode);
	for (var i=0; i < colArr.length; i++) {
		dataset.addFieldData(colArr[i], colArr[i]);
	}

	var page = report.getPage();
	if (paperType == "") paperType = "1";
	if (landScape == "") landScape = "0";
	if (fitWidth == "") {
		if (landScape == "0") {
			switch (paperType) {
				case "0" : fitWidth = 2969; break;	//A3 Transverse A3, 297 * 420 mm
				case "1" : fitWidth = 2100; break;	//A4, 210 * 297 mm
				case "2" : fitWidth = 1480; break;	//A5, 148 * 210 mm
				case "3" : fitWidth = 2570; break;	//B4, 257 * 364 mm
				case "4" : fitWidth = 2500; break;	// Envelope B4, 250 * 353 mm
				case "5" : fitWidth = 1820; break;	//B5, 182 * 257 mm
				case "6" : fitWidth = 1760; break;	//Envelope B5, 176 * 250 mm
				case "7" : fitWidth = 1760; break;	//Envelope B6, 176 * 125 mm
				case "8" : fitWidth = 3239; break;	//Envelope C3, 324 * 458 mm
				case "9" : fitWidth = 2289; break;	//Envelope C4, 229 * 324 mm
				case "10" : fitWidth = 1620; break;	//Envelope C5, 162 * 229 mm
				case "11" : fitWidth = 1140; break;	//Envelope C65, 114 * 229 mm
				case "12" : fitWidth = 1140; break;	//Envelope C6, 114 * 162 mm
				case "13" : fitWidth = 4310; break;	// C size sheet, 17 * 22 in
			}
		} else {
			switch (paperType) {
				case "0" : fitWidth = 4199; break;
				case "1" : fitWidth = 2969; break;
				case "2" : fitWidth = 2100; break;
				case "3" : fitWidth = 3640; break;
				case "4" : fitWidth = 3530; break;
				case "5" : fitWidth = 2570; break;
				case "6" : fitWidth = 2500; break;
				case "7" : fitWidth = 1249; break;
				case "8" : fitWidth = 4580; break;
				case "9" : fitWidth = 3239; break;
				case "10" : fitWidth = 2289; break;
				case "11" : fitWidth = 2289; break;
				case "12" : fitWidth = 1620; break;
				case "13" : fitWidth = 5580; break;
			}
		}
	}
	if (fitHeight == "") {
		if (paperType != "255") {
			fitHeight = 0;
		} else {
			fitHeight = 2970;
		}
	}
	page.setPaper(parseInt(paperType), fitWidth, fitHeight, parseInt(landScape));
	
	//�щ갚��������⑹���理�� ��� 怨��
	var maxWidth = fitWidth;
	if (margin != "") {
		var marginArr = margin.split(" ");
		page.setMargin(parseInt(marginArr[0]), parseInt(marginArr[2]), parseInt(marginArr[1]), parseInt(marginArr[3]));
		maxWidth = maxWidth - parseInt(marginArr[0]) - parseInt(marginArr[1]);
	} else {
		maxWidth = maxWidth - 100;
	}
	
	if (useTitle == "true") {
		var hSection = page.getSectionReportHeader();
		var hSubSection = hSection.addSubSection();
		hSubSection.visible = true;
		hSubSection.height = 70;
		label =	hSubSection.createLabel("label1");
		label.text = userTitle;
		label.horizAlign = 1;
		label.setPosition(0, 0, maxWidth, 50);
		label.setFontProperty("援대┝", 13, RGB(0, 0, 0), true, false, false, false);
	}
	
	if (useHeader == "true") {
		var headerData = headerColData.split(";");
		var hSection = page.getSectionPageHeader();
		var hSubSection = hSection.addSubSection();
		hSubSection.visible = true;
		hSubSection.visible = true;
		hSubSection.height = 70;
		table =	hSubSection.createTable("header1", 1, colArr.length);
		table.x = 0;
		table.y = 0;
		table.setRowHeight(0, 70);
		table.tableKeepTogether = 2;
		for (var i=0; i < colArr.length; i++) {
			cell = table.getCell(0, i);
			cell.text = headerData[i];
			cell.wordWrap = true;
			cell.setBackgroundProperty(0, headerColor, 0, 0);
			cell.setFontProperty(headerFontName, parseInt(headerFontSize), parseInt(headerFontColor), true, false, false, false);
			cell.vertAlign = 1;
			cell.horizAlign = 1;
			cell.canGrow = true;
			table.setColumnWidth(i, colSize[i]);
		}
		table.setWidth(maxWidth);
	}
	var section = page.getSectionDetail();
	var subSection2 = section.addSubSection();
	subSection2.height = 50;
	subSection2.keepTogether = true;
	table =	subSection2.createTable("Grid��1", 1, colArr.length);
	table.x = 0;
	table.y = 0;
	table.tableKeepTogether = 2;
	var columnsAlignArr = columnsAlign.split(",");
	for (var i=0; i < colArr.length; i++) {
		cell = table.getCell(0, i);
		cell.setFieldByIndex(1, i);
		cell.wordWrap = true;
		cell.setBackgroundProperty(0, bodyColor, 0, 0);
		cell.setFontProperty(bodyFontName, parseInt(bodyFontSize), parseInt(bodyFontColor), true, false, false, false);
		cell.vertAlign = 1;
		cell.horizAlign = columnsAlignArr[i];
		cell.canGrow = true;
		
		table.setColumnWidth(i, colSize[i]);
	}
	table.setWidth(maxWidth);
//	RexGen.saveToFile("c:\\inswave_testgen.reb");
	RexCtl.OpenOOF(fnCreateOOF4Base64(RexGen.saveToString()));
}

function RGB(r, g, b) {
	return (r | (g<<8) | (b<<16));
}

function fnCreateOOF4Base64(sFileBase64) {
	var sOOF = "";
	sOOF += "<?xml version='1.0' encoding='utf-8'?>\r\n";
	sOOF += "<oof version='3.0'>\r\n";
	sOOF += "<document titile='Sample'>\r\n";
	sOOF += "<file-list>\r\n";
	sOOF += "   <file type='reb.base64'  path='" + sFileBase64 + "'/>\r\n";
	sOOF += "</file-list>\r\n";
	sOOF += "<connection-list>";

	sOOF += "<connection type='memo' namespace='*'>";

	sOOF += "<config-param-list>";
	sOOF += "<config-param name='data'>"+xmlData+"</config-param>";
	sOOF += "</config-param-list>";

	sOOF += "<content content-type='xml'>";
	sOOF += "<content-param name='root'>"+bNode+"/"+rNode+"</content-param>";
	sOOF += "<content-param name='preservedwhitespace'>1</content-param>";
	sOOF += "<content-param name='bindmode'>name</content-param>";

	sOOF += "</content>";
	sOOF += "</connection>";
	sOOF += "</connection-list>";
	sOOF += "</document>\r\n";
	sOOF += "</oof>";	
	
	return sOOF;
}

</script>
</HEAD>
<BODY onload="reportRenderStart()">
<script language="javascript">
 document.write("<OBJECT ID='RexCtl' CLASSID='CLSID:FC035099-833E-4AB1-BF48-37D08F5E553C'  WIDTH='100%' HEIGHT='100%' codebase='<%=sUrl%>/Rexpert30Viewer.cab'>");
 document.write("</OBJECT>");
 document.write("<OBJECT ID='RexGen' CLASSID='CLSID:4DC62095-31CB-4E6B-90F1-AC41D1261E1C' codebase='<%=sUrl%>/RexpertGenerator.cab'>");
 document.write("</OBJECT>");
</script>
</BODY>
</HTML>