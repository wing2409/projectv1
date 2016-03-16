package com.inswave.ws.tmpl.mvc.controller;

import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.inswave.ws.tmpl.handler.ResponseData;
import com.inswave.ws.tmpl.mvc.service.AuthorityService;
import com.inswave.ws.tmpl.mvc.service.CodeService;

/**
 * 코드 관리 컨트롤러 클래스
 * @author Park, Sang Kyu
 *
 */
@Controller
@RequestMapping("/code")
public class CodeController extends AbstractController {

	protected final static Logger logger = Logger.getLogger(CodeController.class);

	@Autowired
	private CodeService codeService;
	
	/**
	 * 코드 그룹 데이터를 조회한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/getCodeGrpList")
	public ModelAndView getCodeGrpList(Map param) {
		return ResponseData.getResponseData(codeService.getCodeGrpList(param));
	}
	
	/**
	 * 한 건 또는 다 건의 코드 그룹 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/saveCodeGrpList")
	public ModelAndView saveCodeGrpList(Map param) throws Exception {
		codeService.saveCodeGrpList(param);
		return ResponseData.getResponseData(ResponseData.STATUS_SUCESS);
	}
	
	/**
	 * 코드 데이터를 조회한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/getCodeList")
	public ModelAndView getCodeList(Map param) {
		return ResponseData.getResponseData(codeService.getCodeList(param));
	}
	
	/**
	 * 한 건 또는 다 건의 코드 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/saveCodeList")
	public ModelAndView saveCodeList(Map param) throws Exception {
		codeService.saveCodeList(param);
		return ResponseData.getResponseData(ResponseData.STATUS_SUCESS);
	}
	
	/**
	 * 우편번호 데이터를 조회한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/getZipCodeList")
	public ModelAndView getZipCodeList(Map param) {
		return ResponseData.getResponseData(codeService.getZipCodeList(param));
	}
}
