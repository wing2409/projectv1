<%@ page contentType="text/plain; charset=UTF-8" language="java" errorPage="" import="websquare.logging.util.*,websquare.util.*,java.util.*"
%><%
ServletInputStream in = null;
java.io.BufferedInputStream bin = null;
try {
	bin = new java.io.BufferedInputStream( request.getInputStream() );
	String namespace =  "websquare.client." + request.getRemoteAddr().replace('.', '_').replace(':', '_');
	String args = StreamUtil.getString( bin , "UTF-8" );
	if( args != null && !args.equals("") ) {
		LogUtil.info( namespace, "User-Agent : " + request.getHeader("User-Agent") + "\n=======  CLIENT LOG(" + request.getRemoteAddr() + ") =======\n" + args + "\n===========================\n" );
	}
} catch (Throwable e) {
	LogUtil.exception("[saveLog.jsp] Exception.", e);
}%>