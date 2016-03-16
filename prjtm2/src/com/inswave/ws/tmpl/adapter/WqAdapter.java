package com.inswave.ws.tmpl.adapter;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.Logger;

import websquare.system.adapter.RequestAdapter;


public class WqAdapter implements UiAdapter {

    protected final static Logger logger = Logger.getLogger(WqAdapter.class);

	private Object obj;
	
	public Object convert(HttpServletRequest request) throws Exception {
		return convert(request, null);
	}

	public Object convert(HttpServletRequest request, Object beanDef) throws Exception {	
		RequestAdapter reqAdapter = new RequestAdapter();
		obj = reqAdapter.convert(request, beanDef);
		return obj;
	}
	
	public Class getModelName() {
		return Map.class;
	}

}
