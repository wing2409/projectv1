package com.inswave.ws.tmpl.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class ControllerInterceptor implements HandlerInterceptor {
    
    protected final static Logger logger = Logger.getLogger(ControllerInterceptor.class);

    /**
     * 클라이언트의 요청을 컨트롤러에 전달하기 전에 호출되며, false를 리턴하면 다음 내용은 실행하지 않는다.
     */
    public boolean preHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler) throws Exception {
        ResponseData.setContextPath(request.getSession().getServletContext().getRealPath("/"));
        //logger.info("preHandle");
        return true;
    }

    /**
     * 클라이언트의 요청을 처리한 뒤에 호출되며, 컨트롤러에서 예외가 발생되면 실행하지 않는다.
     */
    public void postHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
        //logger.info("postHandle");
    }

    /**
     * 클라이언트 요청 처리뒤 클리이언트에 뷰를 통해 응답을 전송한뒤 실행 됨. 뷰를 생설항때 예외가 발생해도 실행된다
     */
    public void afterCompletion(HttpServletRequest request,
            HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        //logger.info("afterCompletion");
    }

}