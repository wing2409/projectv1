package com.inswave.ws.tmpl.adapter;

import javax.servlet.http.HttpServletRequest;

public interface UiAdapter {

	public Object convert(HttpServletRequest request) throws Exception;
	public Object convert(HttpServletRequest request, Object beanDef) throws Exception;
	
	public Class getModelName();
}
