<%@ page language="java" contentType="text/html;charset=UTF-8" import="java.io.*,java.util.*,websquare.util.*,websquare.logging.util.*,websquare.system.*,websquare.*"%><%
	BufferedInputStream ins     = null;
	BufferedOutputStream outs   = null;
	byte[] b = new byte[4 * 1024]; 
	String svg = null;
	String type = null;
	String fileName = null;
	String width = null;
	String ext = null;

	Vector cmd = new Vector();
    String rasterizer = null;
    String websquareHome = null;
    String svgTempPath = null;
    String svgTempFileName = null;
    String outputFileName = null;
    String svgTempAbsolutePath = null;
    String outputAbsolutePath = null;
    
	try {
	    svg = HttpUtil.getParameter( request, "svg" );
	    type = HttpUtil.getParameter( request, "type" );
	    fileName = HttpUtil.getParameter( request, "filename" );
	    width = HttpUtil.getParameter( request, "width" );
	    websquareHome = System.getProperty("WEBSQUARE_HOME");
	    if(fileName == null) fileName = "chart";
	    rasterizer = websquare.WebSquareConfig.getInstance().getRasterizer();
	    if( rasterizer.length() == 0 ) {
	        rasterizer = FileUtil.toPlatform(websquareHome) + File.separator + "ext" + File.separator + "batik" + File.separator + "batik-rasterizer.jar";
	    }
	    
		if( fileName.indexOf("%00") > -1 || fileName.toLowerCase().indexOf("%zz") > -1 || fileName.indexOf(";") > -1) {
			throw new Exception("[" + fileName + "]This file has been rejected by the server. please check file name[%00,%zz, ;]");
		}
	    if( fileName.indexOf("." + File.separator) > -1 || fileName.indexOf("..") > -1 || fileName.indexOf(File.separator) > -1 ) {
    	    throw new Exception( "This file has been rejected by the server. please check file name["+fileName+"]");
    	}
	    String headerFileName = fileName.replaceAll("\r\n", "");

	    long currentMillis = System.currentTimeMillis();
        java.util.Random rand = new java.util.Random(currentMillis);
        svgTempPath = "temp" + 
                      File.separator + "highchart_temp" + 
                      File.separator + currentMillis + "_" + rand.nextInt(100);    //$WEBSQUARE_HOME/temp/chart_temp/213023032203_7
	    svgTempFileName = fileName + ".xml";
	    svgTempAbsolutePath = websquareHome + File.separator + svgTempPath + File.separator + svgTempFileName;
        
	    cmd.add("java");
	    cmd.add("-jar");
	    cmd.add(rasterizer);
		   
	    //allow no other than predefined types
        if ( type.equals("image/png") ) {
            cmd.add("-m");
            cmd.add(type);
            ext = "png";
        } else if ( type.equals("image/jpeg") ) {
            cmd.add("-m");
            cmd.add(type);
            ext = "jpg";
        } else if ( type.equals("application/pdf") ) {
            cmd.add("-m");
            cmd.add(type);
            ext = "pdf";
		} else if ( type.equals("image/svg+xml") ) {
		    ext = "svg";   
		} else {
			out.print("<pre>invalid type</pre>");
			return;
		}

        //generate the temporary file
        if(! FileUtil.makeFile(websquareHome, svgTempPath, svgTempFileName, svg.getBytes(WebSquareConfig.getInstance().getPostMethodEncoding())) ) {
            LogUtil.severe("[exportHighChart.jsp]Couldn't create temporary file. Check that the directory permissions for the /temp directory are set to 777.");
        }

        String [] cmdResult = null;
	    if(ext.equals("svg")) {
	    	outputFileName = svgTempFileName;
	    	outputAbsolutePath = websquareHome + File.separator + svgTempPath + File.separator + outputFileName;

	    } else {
			outputFileName = fileName + "." + ext;
			outputAbsolutePath = websquareHome + File.separator + svgTempPath + File.separator + outputFileName;
			
			cmd.add("-d");
			cmd.add(outputAbsolutePath);
			if( width != null )  {
				cmd.add("-w");
				cmd.add(width);
			}
			cmd.add(websquareHome + File.separator + svgTempPath + File.separator + svgTempFileName);
			
			//run rasterizer
	        Execute executor = new Execute();
	        cmdResult = executor.execArray((String [])cmd.toArray(new String[0]));
	    }
	    
        //response     
        File of = new File(outputAbsolutePath);
        if(of.exists() && of.length() > 0) {
        	if( cmdResult != null && cmdResult.length > 0 ) {
        		   LogUtil.info("[exportHighChart.jsp] ret:" + cmdResult[1]);
        	}
        } else {
        	if( cmdResult != null && cmdResult.length > 0 ) {
	        	LogUtil.severe("[exportHighChart.jsp] Error while converting SVG:" + cmdResult[1]);
	            out.print("<pre>" + cmdResult[1] + "</pre>");
        	} else {
         	}
            return;
        }
        
        response.setHeader("Content-Disposition", "attachment; filename=" + headerFileName + "." + ext);
        response.setContentType(type);
        
        ins    = new BufferedInputStream(new FileInputStream(of));
        outs   = new BufferedOutputStream(response.getOutputStream());
        
        int read = 0;

        while ((read = ins.read(b)) != -1) {
            outs.write(b,0,read);
        }

        outs.flush();
        outs.close();
        ins.close();        
        
	} catch (Exception e) {
		LogUtil.exception("[exportHighChart.jsp]Exception occurs!", e);
	} finally {
        //delete tmep files
        try {
            String deletePath = websquareHome + File.separator + svgTempPath;
            File f = new File(deletePath);
            if( f.exists() ) {
                boolean ret = FileUtil.delete(f);
                if(! ret ) {
            	    LogUtil.fine("[exportHighChart.jsp]Couldn't delete file : " + deletePath);
            	}
            }
        } catch (Exception ex) {
            LogUtil.exception("[exportHighChart.jsp]delete fail!", ex);
        }

        if( outs != null ) {
            try {
                if( outs != null) outs.flush();
                if( outs != null) outs.close();
                if( outs != null) outs = null;
                if( ins != null) ins.close();
                if( ins != null) ins = null;
            } catch( Exception e ) {
            	LogUtil.exception("[exportHighChart.jsp] BufferedOutputStream/BufferedInputStream clear Exception.", e);
            }
        }
	}
 %>