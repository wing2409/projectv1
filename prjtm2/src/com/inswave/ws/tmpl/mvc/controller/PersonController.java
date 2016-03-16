package com.inswave.ws.tmpl.mvc.controller;

import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.inswave.ws.tmpl.handler.ResponseData;
import com.inswave.ws.tmpl.mvc.service.PersonService;

/**
 * 개인 관련 관리 컨트롤러 클래스
 * @author Park, Sang Kyu
 *
 */
@Controller
@RequestMapping("/person")
public class PersonController extends AbstractController {

	protected final static Logger logger = Logger.getLogger(PersonController.class);

	@Autowired
	private PersonService personService;
	
	/**
	 * 개인 기본 데이터를 조회한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/getPersonBasic")
	public ModelAndView getPersonBasic(Map param) {
		return ResponseData.getResponseData(personService.getPersonBasic(param));
	}
	
	/**
	 * 현재 로그인된 사용자의 개인 기본 데이터를 조회한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/getLoginPersonBasic")
	public ModelAndView getLoginPersonBasic(Map param) {
		return ResponseData.getResponseData(personService.getLoginPersonBasic());
	}
	
	/**
	 * 개인 및 조직 정보 데이터를 조회한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/getPersonOrg")
	public ModelAndView getPersonOrg(Map param) {
		return ResponseData.getResponseData(personService.getPersonOrg(param));
	}
	
	/**
	 * 한 건 또는 다 건의 개인 기본 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/savePersonBasicList")
	public ModelAndView savePersonBasicList(Map param) throws Exception {
		personService.savePersonBasicList(param);
		return ResponseData.getResponseData(ResponseData.STATUS_SUCESS);
	}
	
	/**
	 * 개인별 가족 데이터를 조회한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/getPersonFamilyList")
	public ModelAndView getPersonFamilyList(Map param) {
		return ResponseData.getResponseData(personService.getPersonFamilyList(param));
	}
	
	/**
	 * 여러 건의 개인별 가족 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/savePersonFamilyList")
	public ModelAndView savePersonFamilyList(Map param) throws Exception {
		personService.savePersonFamilyList(param);
		return ResponseData.getResponseData(ResponseData.STATUS_SUCESS);
	}
	
	/**
	 * 개인별 프로젝트 데이터를 조회한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/getPersonProjectList")
	public ModelAndView getPersonProjectList(Map param) {
		return ResponseData.getResponseData(personService.getPersonProjectList(param));
	}
	
	/**
	 * 여러 건의 개인별 프로젝트 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/savePersonProjectList")
	public ModelAndView savePersonProjectList(Map param) throws Exception {
		personService.savePersonProjectList(param);
		return ResponseData.getResponseData(ResponseData.STATUS_SUCESS);
	}
	
	/**
	 * 한 개인 기본 정보와 가족, 프로젝트 정보를 모두 변경한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/savePersonInfo")
	public ModelAndView savePersonInfo(Map param) throws Exception {
		personService.savePersonInfo(param);
		return ResponseData.getResponseData(ResponseData.STATUS_SUCESS);
	}
}
