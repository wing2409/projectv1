package com.inswave.ws.tmpl.handler;

import java.util.Map;

import com.inswave.ws.tmpl.mvc.bean.Login;
import com.inswave.ws.tmpl.util.DateUtil;

/**
 * Client에 받은 Request 데이터 관련 처리를 위한 클래스
 * 
 * @author Park, Sang Kyu
 */
public class RequestData {

	public static void setAccessInfo(Map data, Login login) {
		data.put("CREATED_DATE", DateUtil.getCurrentDate());
		data.put("UPDATED_DATE", DateUtil.getCurrentDate());
		data.put("UPDATED_ID", login.getUserId());
		data.put("UPDATED_IP", login.getRemoteAddr());
	}
}
