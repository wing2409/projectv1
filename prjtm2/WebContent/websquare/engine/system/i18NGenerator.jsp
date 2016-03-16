<%@ page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" %>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>
<%@ page import="websquare.*" %>
<%@ page import="websquare.util.*" %>
<%@ page import="websquare.system.Execute" %>
<%@ page import="websquare.logging.util.LogUtil" %>
<%@ page import="websquare.WebSquareConfig" %>
<%!
	public String stringToUnicode(String s, boolean flag, boolean flag1) {
        int i = s.length();
        int j = i * 2;
        if(j < 0)
            j = 2147483647;
        StringBuffer stringbuffer = new StringBuffer(j);
        for(int k = 0; k < i; k++)
        {
            char c = s.charAt(k);
            if(c > '=' && c < '\177')
            {
                if(c == '\\')
                {
                    stringbuffer.append('\\');
                    stringbuffer.append('\\');
                } else
                {
                    stringbuffer.append(c);
                }
                continue;
            }
            switch(c)
            {
            case 32: // ' '
                if(k == 0 || flag)
                    stringbuffer.append('\\');
                stringbuffer.append(' ');
                break;

            case 9: // '\t'
                stringbuffer.append('\\');
                stringbuffer.append('t');
                break;

            case 10: // '\n'
                stringbuffer.append('\\');
                stringbuffer.append('n');
                break;

            case 13: // '\r'
                stringbuffer.append('\\');
                stringbuffer.append('r');
                break;

            case 12: // '\f'
                stringbuffer.append('\\');
                stringbuffer.append('f');
                break;

            case 33: // '!'
            case 35: // '#'
            case 58: // ':'
            case 61: // '='
                stringbuffer.append('\\');
                stringbuffer.append(c);
                break;

            default:
                if((c < ' ' || c > '~') & flag1)
                {
                    stringbuffer.append('\\');
                    stringbuffer.append('u');
                    stringbuffer.append(toHex(c >> 12 & 15));
                    stringbuffer.append(toHex(c >> 8 & 15));
                    stringbuffer.append(toHex(c >> 4 & 15));
                    stringbuffer.append(toHex(c & 15));
                } else
                {
                    stringbuffer.append(c);
                }
                break;
            }
        }

        return stringbuffer.toString();
	}
	
	private static char toHex(int i)
    {
        return hexDigit[i & 15];
    }

    private static final char hexDigit[] = {
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
        'A', 'B', 'C', 'D', 'E', 'F'
    };
    
    boolean initI18Ngenerator = false;
    
%>
<%
    String oriStr = HttpUtil.getParameter( request, "textarea1", "" );
	String charset = "UTF-8";
    oriStr = new String(oriStr.getBytes(WebSquareConfig.getInstance().getPostMethodEncoding()),charset);
    String outStr = "";
    String source = "";
    String destination = "";
	try {
		String websquareHome = FileUtil.toPlatform(WebSquareConfig.getInstance().WEBSQUARE_HOME);
		if(websquareHome == null || websquareHome.length() == 0) {
			throw new Exception("Can not find the property 'WEBSQUARE_HOME'");
		}
		String folder = "temp" + File.separator + "i18NGenerator";
		long currentTime = System.currentTimeMillis();
		String sourceFileName = "source_" + currentTime + ".txt";
		String destFileName = "dest_" + currentTime + ".txt";
		if(!initI18Ngenerator) {
		    File delFile = new File(FileUtil.toPlatform(websquareHome + File.separator + folder));
		    FileUtil.delete(delFile);
		}
		
		if(FileUtil.makeFile(websquareHome, folder, sourceFileName, oriStr.getBytes(charset))) {
			ArrayList<String> cmd = new ArrayList();
			source = FileUtil.toPlatform(websquareHome + File.separator + folder + File.separator + sourceFileName);
			destination = FileUtil.toPlatform(websquareHome + File.separator + folder + File.separator + destFileName);
			cmd.add("native2ascii");
			cmd.add("-encoding");
			cmd.add(charset);
			cmd.add(source);
			cmd.add(destination);
			LogUtil.info("[i18NGenerator] cmd:" + cmd.toString());
			Execute executor = new Execute();
			String [] cmdResult = executor.execArray((String [])cmd.toArray(new String[0]));
			LogUtil.info("[i18NGenerator] ret:" + cmdResult[1]);
			
			File f = new File(FileUtil.toPlatform(websquareHome + File.separator + folder + File.separator + destFileName));
			if(f.exists()) {
				outStr = StreamUtil.getString(new BufferedInputStream(new FileInputStream(f)));
			} 
		}
	} catch(Exception e) {
		LogUtil.exception("[i18NGenerator]Exception", e);
	} finally {	
	    File df = new File(source);
	    if(df.exists()) {
	        FileUtil.delete(df);
	    }
	    df = new File(destination);
	    if(df.exists()) {
	        FileUtil.delete(df);
	    }	    
	}
    
    if( oriStr.trim().length() == 0 ) {
        //샘플
//        oriStr = "SAMPLE1=샘플입니다.\r\nSAMPLE2=KEY=VALUE로 작성합니다.";
//        oriStr = "{ \n    E_date_ShouldBeyyMMddFormat : \"입력값은 yyyyMMdd형식이어야 합니다. 입력값 : %1\", \n    E_date_ShouldBeNumberFormat : \"입력값은 yyyyMMdd형식이어야 합니다. 입력값 : %1\" \n}";
        oriStr = "SAMPLE1=\uc0d8\ud50c\uc785\ub2c8\ub2e4.\r\nSAMPLE2=KEY=VALUE\ub85c \uc791\uc131\ud569\ub2c8\ub2e4.";
    }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<title>WebSquare 2.0 I18N Unicode Generator</title>
	<script type="text/javascript" src="javascript.wq?q=/bootloader"></script>
	<style type="text/css">
	    /*<![CDATA[*/
			body {
				font-family:\ub9d1\uc740 \uace0\ub515,verdana,dotum;
			}
			.center {
				text-align: center;
			}
			.center table {
				margin-left: auto;
				margin-right: auto;
				text-align: left;
			}
			h1 {
				font-size:20px;
				font-weight:bold;
			}
			#license_table td {
				color:#950000;
			}
			#license_table td {
				padding:5px;
				font-size:12px;
				border-bottom: dotted 1px #333;
			}
			#license_table th {
				padding:5px;
				font-size:12px;
				border-bottom: dotted 1px #333;
                width:70px;
                text-align:center;			
			}
			#license_table {
				border-collapse:collapse;
				background:#EFF4FB url(/websquare/engine/system/image/teaser.gif) repeat-x;
				border:1px solid #686868;
			}
			.header {
				background:#333 url(/websquare/engine/system/image/llsh.gif) repeat-x;
				color:#fff;
				font-weight:bold;
				font-size:14px;
				height:30px;
				margin:0;
				padding:2px;
			}
			#license_table .header th {
				padding:0 0 0 5px;
			}
			#footer th {
				background:#333 url(/websquare/engine/system/image/llsh.gif) repeat-x;
				text-align:right;
				height:24px;
				padding-right:10px;
				color:#fff;
				font-size:10px;
				margin:0;
				padding:2px;
			}
		/*]]>*/
	</style>
	<script>
        function executeGenerator() {
            var str = document.getElementById("textarea1").value;
            if( str.wq_trim().length == 0 ) {
                //alert("변환 실행할 문자를 입력하세요.\nex)\ntest1=테스트1\ntest2=테스트2");
                alert("\ubcc0\ud658 \uc2e4\ud589\ud560 \ubb38\uc790\ub97c \uc785\ub825\ud558\uc138\uc694.\nex)\ntest1=\ud14c\uc2a4\ud2b81\ntest2=\ud14c\uc2a4\ud2b82");
                document.getElementById("textarea1").focus();
                return;
            }
            form1.submit();
        }
        
    </script>
</head>
<body>
    <form name="form1" action="./i18NGenerator.jsp" method="post">
    	<div class="center">
    		<table border="0" cellpadding="3" style="width:600px; height:50px;">
    			<tr class="h">
    				<td><a href="http://www.websquare.co.kr/"><img border="0" src="/websquare/engine/system/image/logo.png" alt="Websquare" /></a></td>
    			</tr>
    		</table>        
    		<table id="license_table" style="width:600px;">                 
    			<tr class="header"><th colspan="2" >MultiLanguage i18N Properties Generator</th></tr>         
    			<tr>
    				<th>source</th>
    				<td style="height:300px;">
    				    <textarea id="textarea1" name="textarea1" style="height:300px;width:100%;"><%=oriStr%></textarea>
                    </td>
    			</tr>
    			<tr>
    				<td style="text-align:center;" colspan="2"><input id="btn1" type="button" value="generate" onclick="executeGenerator();" /></td>
    			</tr>
    			<tr>
    				<th>result</th>
    				<td style="height:300px;">
    				    <textarea id="textarea2" name="textarea2"  style="height:300px;width:100%;"><%=outStr%></textarea>
                    </td>
    			</tr>
    		</table>
    	</div>
    </form>
</body>
</html>