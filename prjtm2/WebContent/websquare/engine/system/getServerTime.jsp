<%@ page contentType="text/html;charset=UTF-8" language="java" errorPage="" import="java.util.Locale, java.util.Calendar, websquare.util.*,websquare.logging.util.LogUtil"
%><%
    String date = null;
    try {
        String pattern = HttpUtil.getParameter( request, "pattern" );
        String offset = HttpUtil.getParameter( request, "offset" );
        String offsetType = HttpUtil.getParameter( request, "offsetType" );
	    
	    if ( offset == null || offset.trim().length() == 0 ) {
    	    if(pattern == null ||  pattern.trim().length() == 0) {
                pattern = "yyyyMMdd";
            }

            java.util.Date currentDate = new java.util.Date();
            //java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(pattern, Locale.KOREA);
            java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(pattern);
        	date = formatter.format(currentDate);
        } else {
            int iOffset = Integer.parseInt( offset );
    		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(pattern);
    		Calendar cal = Calendar.getInstance();
    		if( offsetType != null && offsetType.equals("M") ) {
    			cal.add(Calendar.MONTH, iOffset);
    		} else {
    			offsetType = "D";
    			cal.add(Calendar.DATE, iOffset);
    		}
    		date = formatter.format(cal.getTime());            
        }
        out.print( XMLUtil.XMLEncoder( date ) );
    } catch (Exception e) {
        LogUtil.exception("[getServerTime.jsp] Exception.", e);
    }
%>
