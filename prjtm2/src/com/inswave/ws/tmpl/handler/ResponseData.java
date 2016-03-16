package com.inswave.ws.tmpl.handler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.servlet.ModelAndView;

/**
 * Client에 전달할 Response 데이터 관련 처리를 위한 클래스
 * 
 * @author Park, Sang Kyu
 */
public class ResponseData {

    public final static String STATUS_SUCESS = "success";
    public final static String STATUS_ERROR = "error";
    
    private static String contextPath = null;
    
    /**
     * Context Path를 설정한다.
     * @param path
     */
    public static void setContextPath(String path) {
        if (contextPath == null) {
            contextPath = path;
        }
    }
    
    public static String getContexntPath() {
        return contextPath;
    }

    /**
     * Client에 전달할 Response 데이터를 생성한다.
     * @param status 처리결과 상태코드 ("success", "error")
     * @return ModelAndView 객체
     */    
    public static ModelAndView getResponseData(String status) {
        if (status.equals(ResponseData.STATUS_SUCESS)) {
            return getResponseData(status, "서비스 처리에 성공했습니다.");
        } else if (status.equals(ResponseData.STATUS_ERROR)) {
            return getResponseData(status, "서비스 처리에 실패했습니다.");
        } else {
            return getResponseData(status, "서비스 처리 결과를 알 수 없습니다.");
        }
    }
    
    /**
     * Client에 전달할 Response 데이터를 생성한다.
     * @param status 처리결과 상태코드 ("success", "error")
     * @return ModelAndView 객체
     */    
    public static ModelAndView getResponseData(Map<String, Object> data) {
        return getResponseData(ResponseData.STATUS_SUCESS, data);
    }
    
    public static ModelAndView getResponseData(List<Map> data) {
        return getResponseData(ResponseData.STATUS_SUCESS, data);
    }

    /**
     * Client에 전달할 Response 데이터를 생성한다.
     * @param status 처리결과 상태코드 ("success", "error")
     * @param message 처리결과 메시지
     * @return ModelAndView 객체
     */
    public static ModelAndView getResponseData(String status, String message) {
        ModelAndView mav = new ModelAndView("wqView");
        
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("status", status);
        result.put("message", message);
        
        mav.addObject("result", result);

        return mav;
    }
    
    /**
     * Client에 전달할 Response 데이터를 생성한다.
     * @param status 처리결과 상태코드 ("success", "error")
     * @param data 처리결과 데이터
     * @return ModelAndView 객체
     */
    public static ModelAndView getResponseData(String status, Map<String, Object> data) {
        ModelAndView mav = getResponseData(status);
        
        if (data != null) {
            mav.addObject("data", data);
        }
        
        return mav;
    }
    
    public static ModelAndView getResponseData(String status, List<Map> data) {
        ModelAndView mav = getResponseData(status);
        
        if (data != null) {
            mav.addObject("data", data);
        }
        
        return mav;
    }
    
    /**
     * Client에 전달할 Response 데이터를 생성한다.
     * @param status 처리결과 상태코드 ("success", "error")
     * @param message 처리결과 메시지
     * @param data 처리결과 데이터
     * @return ModelAndView 객체
     */
    public static ModelAndView getResponseData(String status, String message, Map<String, Object> data) {
        ModelAndView mav = new ModelAndView("wqView");
        
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("status", status);
        result.put("message", message);
        
        mav.addObject("result", result);
        
        if (data != null) {
            mav.addObject("data", data);
        }
        
        return mav;
    }
    
    public static ModelAndView getResponseData(String status, String message, List<Map> data) {
        ModelAndView mav = new ModelAndView("wqView");
        
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("status", status);
        result.put("message", message);
        
        mav.addObject("result", result);
        
        if (data != null) {
            mav.addObject("data", data);
        }
        
        return mav;
    }
    
}
