<%@ page contentType="text/xml; charset=UTF-8" language="java" errorPage="" import="websquare.i18n.*,websquare.logging.util.LogUtil"
%><%
	/**
	 * cache되어 있는 다국어 언어셋을 초기화 후 reload 한다.
	 */
	try {
		// 코드 삭제
		LabelMessageLoader.getInstance().reload();
		
		// 업무 화면삭제
		Web2FileCache.getInstance().cacheClear();
	} catch  (Exception e) {
		LogUtil.exception("[I18NReload.jsp] Exception.", e);
	}
%>