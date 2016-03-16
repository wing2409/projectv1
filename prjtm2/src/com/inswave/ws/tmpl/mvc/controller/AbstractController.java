package com.inswave.ws.tmpl.mvc.controller;

import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import com.inswave.ws.tmpl.handler.CustomException;
import com.inswave.ws.tmpl.handler.ResponseData;

/**
 * 추상 공통 컨트롤러 클래스
 * @author Park, Sang Kyu
 *
 */
public abstract class AbstractController {
	
	protected final static Logger logger = Logger.getLogger(AbstractController.class);
	
	@ExceptionHandler(Exception.class)
	public ModelAndView handleException(Exception ex) {
		logger.error(ex);
		return ResponseData.getResponseData(ResponseData.STATUS_ERROR, ex.getMessage());
	}

	@ExceptionHandler(CustomException.class)
	public ModelAndView handleCustomException(CustomException ex) {
		logger.error(ex);
		return ResponseData.getResponseData(ex.getErrorCode(), ex.getErrorMessage());
	}
}
