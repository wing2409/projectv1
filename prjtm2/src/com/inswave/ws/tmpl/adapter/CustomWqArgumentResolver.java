package com.inswave.ws.tmpl.adapter;

import java.lang.annotation.Annotation;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.Logger;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebArgumentResolver;
import org.springframework.web.context.request.NativeWebRequest;

import websquare.system.adapter.annotation.BEAN_DEF;

public class CustomWqArgumentResolver implements WebArgumentResolver {

    protected final static Logger logger = Logger.getLogger(CustomWqArgumentResolver.class);

    private UiAdapter uiA;

    public void setUiAdaptor(UiAdapter uiA) {
        this.uiA = uiA;
    }

    public Object resolveArgument(MethodParameter param, NativeWebRequest request) throws Exception {
        
        Class parameterType = param.getParameterType();
        String name = param.getParameterName();

        if (parameterType.equals(Map.class)) {
            return (Map) uiA.convert((HttpServletRequest) request.getNativeRequest());
            
        } else if (parameterType.equals(BaseBean.class)) {
            
            // 1. Server에서 Map 형태의 bean definition을 설정하는 방식
            Map beanDef = new HashMap();

            // 2. Controller method의 Annotation으로 처리하는 방식 (JDK1.5 이상 지원)
            Annotation annotation = param.getMethodAnnotation(BEAN_DEF.class);

            if (annotation != null) {
                // server에서 BEAN_DEF를 설정하는 형태 (Annotation)
                return (BaseBean) uiA.convert((HttpServletRequest) request.getNativeRequest(), (BEAN_DEF) annotation);
            } else if (beanDef == null || beanDef.isEmpty()) {
                // client에서 BEAN_DEF를 전달하는 경우
                return (BaseBean) uiA.convert((HttpServletRequest) request.getNativeRequest());
            } else {
                // server에서 BEAN_DEF를 설정하는 형태 (Map type)
                return (BaseBean) uiA.convert((HttpServletRequest) request.getNativeRequest(), beanDef);
            }
        }

        return UNRESOLVED;
    }

}
