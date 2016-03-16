package com.inswave.ws.tmpl.mvc.controller;

import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.inswave.ws.tmpl.handler.ResponseData;
import com.inswave.ws.tmpl.mvc.service.AuthorityService;
import com.inswave.ws.tmpl.mvc.service.MenuService;

/**
 * 메뉴 관리 컨트롤러 클래스
 * @author Park, Sang Kyu
 *
 */
@Controller
@RequestMapping("/menu")
public class MenuController extends AbstractController {

	protected final static Logger logger = Logger.getLogger(MenuController.class);

	@Autowired
	private MenuService menuService;
	
	/**
	 * 메뉴 데이터를 조회한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/getMenuList")
	public ModelAndView getMenuList(Map param) {
		return ResponseData.getResponseData(menuService.getMenuList(param));
	}
	
	/**
	 * 개인별 메뉴 데이터를 조회한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/getPersonMenuList")
	public ModelAndView getPersonMenuList(Map param) {
		return ResponseData.getResponseData(menuService.getPersonMenuList(param));
	}
	
	/**
	 * 한 건 또는 다 건의 메뉴 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/saveMenuList")
	public ModelAndView saveAuthorityList(Map param) throws Exception {
		menuService.saveMenuList(param);
		return ResponseData.getResponseData(ResponseData.STATUS_SUCESS);
	}
}
