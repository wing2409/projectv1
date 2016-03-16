package com.inswave.ws.tmpl.mvc.controller;

import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.inswave.ws.tmpl.handler.ResponseData;
import com.inswave.ws.tmpl.mvc.service.DBCreationService;

/**
 * 템플릿 프로젝트 데이터베이스 생성을 위한 컨트롤러 
 * @author Park, Sang Kyu
 *
 */
@Controller
@RequestMapping("/db")
public class DBCreationController extends AbstractController {

	protected final static Logger logger = Logger.getLogger(DBCreationController.class);

	@Autowired
	private DBCreationService dbCreationService;
	
	/**
	 * 전체 테이블을 생성한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/createAllTable")
	public ModelAndView createAllTable(Map param) throws Exception {
		dbCreationService.createAllTable();
		return ResponseData.getResponseData(ResponseData.STATUS_SUCESS);
	}
	
	/**
	 * 초기 데이터를 Insert한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/insertBasicData")
	public ModelAndView insertBasicData(Map param) throws Exception {
		dbCreationService.insertBasicData();
		return ResponseData.getResponseData(ResponseData.STATUS_SUCESS);
	}
	
	/**
	 * 우편번호 데이터를 Insert한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/insertZipCodeData")
	public ModelAndView insertZipCodeData(Map param) throws Exception {
		dbCreationService.insertZipCodeData();
		return ResponseData.getResponseData(ResponseData.STATUS_SUCESS);
	}
	
	/**
	 * 전체 테이블을 Drop한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "dropAllTable")
	public ModelAndView dropAllTable(Map param) throws Exception {
		dbCreationService.dropAllTable();
		return ResponseData.getResponseData(ResponseData.STATUS_SUCESS);
	}
}
