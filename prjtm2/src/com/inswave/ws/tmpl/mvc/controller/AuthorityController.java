package com.inswave.ws.tmpl.mvc.controller;

import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.inswave.ws.tmpl.handler.ResponseData;
import com.inswave.ws.tmpl.mvc.service.AuthorityService;

/**
 * 권한 관리 컨트롤러 클래스
 * @author Park, Sang Kyu
 *
 */
@Controller
@RequestMapping("/authority")
public class AuthorityController extends AbstractController {

	protected final static Logger logger = Logger.getLogger(AuthorityController.class);

	@Autowired
	private AuthorityService authorityService;
	
	/**
	 * 권한 데이터를 조회한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/getAuthorityList")
	public ModelAndView getAuthorityList(Map param) {
		return ResponseData.getResponseData(authorityService.getAuthorityList(param));
	}
	
	/**
	 * 한 건 또는 다 건의 권한 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/saveAuthorityList")
	public ModelAndView saveAuthorityList(Map param) throws Exception {
		authorityService.saveAuthorityList(param);
		return ResponseData.getResponseData(ResponseData.STATUS_SUCESS);
	}
	
	/**
	 * 메뉴별 권한 데이터를 조회한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/getAuthorityMenuList")
	public ModelAndView getAuthorityMenuList(Map param) {
		return ResponseData.getResponseData(authorityService.getAuthorityMenuList(param));
	}
	
	/**
	 * 한 건 또는 다 건의 메뉴별 권한 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/saveAuthorityMenuList")
	public ModelAndView saveAuthorityMenuList(Map param) throws Exception {
		authorityService.saveAuthorityMenuList(param);
		return ResponseData.getResponseData(ResponseData.STATUS_SUCESS);
	}
	
	/**
	 * 권한별 사원 데이터를 조회한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/getPersonAuthorityList")
	public ModelAndView getPersonAuthorityList(Map param) {
		return ResponseData.getResponseData(authorityService.getPersonAuthorityList(param));
	}
	
	/**
	 * 한 건 또는 다 건의 권한별 사원 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/savePersonAuthorityList")
	public ModelAndView savePersonAuthorityList(Map param) throws Exception {
		authorityService.savePersonAuthorityList(param);
		return ResponseData.getResponseData(ResponseData.STATUS_SUCESS);
	}
}
