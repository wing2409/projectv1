<%@ page contentType="charset=UTF-8" language="java" import="java.io.*,java.text.*,java.util.*,java.net.*,websquare.logging.util.LogUtil"%><%!
	private static Hashtable cacheInfo = new Hashtable();
	private class CacheEntity {
		String name;
		String lastModified;
		String expires;
		String eTag;
	}
%><%
	String name = null;
	String hostUrl = null;
	String urlString = null;
	InputStream  is = null;
	OutputStream os = null;

	try {
		name = request.getParameter("url");
    	hostUrl = request.getParameter("hostUrl");
		String eTag = request.getHeader("If-None-Match");
		String ifModified = request.getHeader("If-Modified-Since");
		if( name != null && ifModified != null && eTag != null ) {
			try {
				CacheEntity cache = (CacheEntity)cacheInfo.get( name );
				if( cache != null && ifModified.equals( cache.lastModified ) ) {
					//System.out.println( "SEND 304 " + name + "  " + eTag + "  " + ifModified );
					response.setHeader("Expires", cache.expires.replaceAll("\r\n", ""));
					response.setHeader("Last-Modified",	cache.lastModified.replaceAll("\r\n", ""));
					response.setHeader("ETag", cache.eTag.replaceAll("\r\n", ""));
					response.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
					return;
				}
			} catch( Exception pe ) {
				System.err.println("Header의 If-Modified-Since 항목을 확인하는데 실패했습니다. 이 에러는 무시하셔도 됩니다.");
				LogUtil.exception("[image.jsp] If-Modified-Since Check Exception.", pe);
			}
		}

		CacheEntity cache = new CacheEntity ();
		cache.name = name;
		SimpleDateFormat formatter = new SimpleDateFormat( "EEE, dd MMM yyyy HH:mm:ss z", Locale.US );
		formatter.setTimeZone(TimeZone.getTimeZone("GMT"));
		
		if(hostUrl == null) {
		    urlString = "http://" + request.getServerName() + ":" + request.getServerPort() + name;
	    } else {
	        urlString = "http://" + hostUrl + name;
	    }

//		만료일은 설정파일에서 읽어온다. 기본값은 현재일 + 1년 - 1일로{HTTP 1.1의 Never Expired) 설정한다. (이 값이 설정되어야 서버에 요청을 보내지 않는다.)
		Calendar cal = Calendar.getInstance();
		cal.add( Calendar.YEAR, 1 );
		cache.expires = formatter.format( cal.getTime() );


		URL url = new URL(urlString);
		URLConnection conn = url.openConnection();
		
		is = conn.getInputStream();

		cache.eTag = conn.getHeaderField("ETag");
		cache.lastModified = formatter.format( new Date( conn.getLastModified() ) );

		response.setHeader("Expires", cache.expires.replaceAll("\r\n", ""));
		response.setHeader("ETag", cache.eTag.replaceAll("\r\n", ""));
		response.setHeader("Last-Modified",	cache.lastModified.replaceAll("\r\n", ""));		// 이 값이 설정되어 있으면 이미지파일의 경우 Local Cache조회도 하지 않는다.

//		response.setHeader("Expires",	"Thu, 22 Jan 2009 00:00:00 GMT" );
//		response.setHeader("Last-Modified",	"Sun, 16 Dec 2007 11:56:02 GMT");		// 이 값이 설정되어 있으면 이미지파일의 경우 Local Cache조회도 하지 않는다.
//		파일의 변경을 브라우저에서 체크할 때 사용하는 값으로 랜덤하면서 유일한 값을 내려보낸다. 파일이 변경되기 전에는 변경될 필요가 없다.
//		response.setHeader("ETag", "FFFFEDFFFF" );
//		실제 파일 생성일을 빌드시점에 가져온다. (Class에서 읽어오는 구조이기 때문에 현재는 불가능함)
//		if( entity.getBuildDate() != null ) {
//			response.setHeader("Last-Modified",	entity.getBuildDate());
//		}

		os = response.getOutputStream();

		response.setContentType(conn.getContentType());
//		if( name.endsWith(".gif") ) {
//			response.setContentType("image/gif");
//		} else if( name.endsWith(".jpg") ) {
//			response.setContentType("image/jpg");
//		} else if( name.endsWith(".png") ) {
//			response.setContentType("image/png");
//		} else {
//			response.setContentType("image/gif");
//		}
		
		int length = 0;
		byte buffer[] = new byte[2048];
		while ((length = is.read(buffer)) != -1) {
			os.write(buffer,0,length);
		}
		
		cacheInfo.put( name, cache );
	} catch (Exception e) {
		return;
	} finally {
		try {
			is.close();
		} catch( Exception e ) {
			LogUtil.exception("[image.jsp] InputStream close Exception.", e);
		}
		try {
			os.flush();
		} catch( Exception e ) {
			LogUtil.exception("[image.jsp] OutputStream flush Exception.", e);
		}
		try {
			os.close();
		} catch( Exception e ) {
			LogUtil.exception("[image.jsp] OutputStream close Exception.", e);
		}
	}
%>