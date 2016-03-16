package com.inswave.ws.tmpl.util;

import java.sql.SQLException;
import java.util.Hashtable;

import javax.naming.NamingException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.inswave.ws.tmpl.mvc.dao.CodeDao;

import websquare.i18n.AbstractMessage;

public class MultiLangMessageLoader  extends AbstractMessage {
	
	private Hashtable loadMessage(HttpServletRequest request) throws Exception {
		Hashtable languageHash = new Hashtable();

		try {
			WebApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(request.getSession().getServletContext());
			CodeDao code = (CodeDao)context.getBean("CodeDao");
			
			/*
			String flag = "";
			String curFlag = "";
			Hashtable messages = null;
			while( rset.next() ) {
				curFlag = rset.getString(1);
				if( !flag.equals( curFlag ) ) {
					if( !flag.equals("") ) {
						languageHash.put( flag, messages );
					}
					messages = new Hashtable();
				}
				
				messages.put( rset.getString(2), rset.getString(3) );
				flag = curFlag;
				
//				System.out.println( "[" + rset.getString(1) + "][" + rset.getString(2) + "][" + rset.getString(3) + "]" );
			}
			languageHash.put( flag, messages );
			*/
			System.out.println( "작업 완료" );
		} catch( Exception e ) {
			System.err.println( "Exception" );
			e.printStackTrace();
		} finally {
		}		
		
		return languageHash;
	}
	
	public Hashtable initializeProperty(int storageType, String path) throws Exception {
		Hashtable languageHash = null;
		System.out.println("initializeProperty");
		/*
		try {
			languageHash = loadMessage();
		} catch( Exception e ) {
			Logger.exception( "[DBMessageSampleImpl.initializeProperty] exception occured.", e );
		}
		*/
		return languageHash;
	}

	public Hashtable loadProperty(int storageType, HttpServletRequest request, String path) throws Exception {
		Hashtable languageHash = null;
		System.out.println("loadProperty");
		try {
			languageHash = loadMessage(request);
		} catch( Exception e ) {
			//Logger.exception( "[DBMessageSampleImpl.initializeProperty] exception occured.", e );
		}		
		return languageHash;
	}

}
