package com.inswave.ws.tmpl.mvc.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.inswave.ws.tmpl.handler.ResponseData;
import com.inswave.ws.tmpl.mvc.service.AuthorityService;
import com.inswave.ws.tmpl.mvc.service.LoginService;

/**
 * 권한 관리 컨트롤러 클래스
 * @author Park, Sang Kyu
 *
 */
@Controller
@RequestMapping("/loginout")
public class LoginController extends AbstractController {

	protected final static Logger logger = Logger.getLogger(LoginController.class);

	@Autowired
	private LoginService loginService;
	
	/**
	 * 로그인 처리를 한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/login")
	public ModelAndView login(Map param, HttpServletRequest request) throws Exception {
		return loginService.login(param, request);
	}
	
	/**
	 * 로그아웃 처리를 한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/logout")
	public ModelAndView logout(Map param, HttpServletRequest request) throws Exception {
		return loginService.logout(request);
	}
	
	/**
	 * 로그인 상태를 체크한다.
	 * @param param 클라이언트에서 전달한 데이터 맵 객체
	 * @return
	 */
	@RequestMapping(value = "/isLogin")
	public ModelAndView isLogin(Map param) throws Exception {
		return loginService.isLogin();
	}
}
