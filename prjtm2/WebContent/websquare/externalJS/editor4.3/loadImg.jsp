<%@ page contentType="charset=euc-kr" language="java" errorPage="" import="java.io.*,org.w3c.dom.*,websquare.WebSquareConfig,java.net.*,websquare.upload.handl.*,websquare.util.*,websquare.logging.util.LogUtil" 
%><%
BufferedInputStream ins     = null;
BufferedOutputStream outs   = null;

try {
	String fileName = URLDecoder.decode( HttpUtil.getParameter( request, "fileName" ), "UTF-8");
	String subDir = HttpUtil.getParameter( request, "subDir" );

	if( fileName.indexOf("%00") > -1 || fileName.toLowerCase().indexOf("%zz") > -1 || fileName.indexOf(";") > -1) {
		throw new Exception("[" + fileName + "]This file has been rejected by the server. please check file name[%00,%zz, ;]");
	}
    if( fileName.indexOf("." + File.separator) > -1 || fileName.indexOf("..") > -1 || fileName.indexOf(File.separator) > -1 ) {
        throw new Exception( "This file has been rejected by the server. please check file name["+fileName+"]");
    }
    String mimeType = "image/gif";
    response.setContentType( mimeType );

    String uplodBaseDir = WebSquareConfig.getInstance().getStringValue("//upload/imgUpload/baseDir/@value", "");
	String uplodsubDirold = WebSquareConfig.getInstance().getStringValue("//upload/imgUpload/subDir/@value", "");
	String uplodsubDir = WebSquareConfig.getInstance().getStringValue("//upload/imgUpload/baseDir/subDir/@value","");

    if( subDir != null && !subDir.equals("") ) {
		String userDir = WebSquareConfig.getInstance().getStringValue("//upload/imgUpload/" + subDir + "/@value","");
		if( userDir != null && !userDir.equals("") ) {
			uplodBaseDir = userDir;
		}
	} else if(uplodsubDirold != null && uplodsubDirold.equals("") ){
		uplodBaseDir = uplodBaseDir + File.separator + uplodsubDirold;
	} else if(uplodsubDir != null && uplodsubDir.equals("") ){
		uplodBaseDir = uplodBaseDir + File.separator + uplodsubDir;
	}
	
	uplodBaseDir = UploadFileManager.getInstance().getUploadImageDefiner().getFilePath(uplodBaseDir);
	
    File file = new File( uplodBaseDir+File.separator+fileName );
    byte[] b  = new byte[2 * 1024];        

    ins    = new BufferedInputStream(new FileInputStream(file));
    outs   = new BufferedOutputStream(response.getOutputStream());
    
    int read = 0;

    while ((read = ins.read(b)) != -1) {
        outs.write(b,0,read);
    }

} catch (Throwable e) {
    System.out.println("Error Exception:" + e.getMessage());
    return;
} finally {
    try {
        if( outs != null) outs.flush();
        if( outs != null) outs.close();
        if( ins != null) ins.close();
    } catch( Exception e ) {
    	LogUtil.exception("[editor4.3 loadImg.jsp] Output/InputStream clear Exception.", e);
    }
}
%>