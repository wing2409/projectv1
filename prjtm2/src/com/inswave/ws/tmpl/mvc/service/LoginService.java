package com.inswave.ws.tmpl.mvc.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import com.inswave.ws.tmpl.handler.ResponseData;
import com.inswave.ws.tmpl.mvc.bean.Login;
import com.inswave.ws.tmpl.mvc.dao.PersonDao;

/**
 * 코드 그룹 관련 처리를 위한 서비스 클래스
 * 
 * @author Park, Sang Kyu
 *
 */
@Service
public class LoginService {
	
	protected final static Logger logger = Logger.getLogger(LoginService.class);
	
	@Autowired
	private PersonDao personDao;
	
	@Autowired
	private Login login;
	
	public ModelAndView login(Map param, HttpServletRequest request) throws Exception {
		
		JSONObject searchParam = (JSONObject) (param.get("param"));
		List result = (List) personDao.getLoginInfo(searchParam);

		String password = (String) searchParam.get("PASSWORD");
		
		if (result.size() > 0) {
			Map<String, Object> userInfo = (Map<String, Object>) result.get(0);
			if (userInfo.get("PASSWORD").equals(password)) {
				login.setUserId((String) userInfo.get("EMP_CD"));
				login.setUserName((String) userInfo.get("EMP_NM"));
				login.setPassword((String) userInfo.get("PASSWORD"));
				login.setRemoteAddr(request.getRemoteAddr());
				
				HttpSession session = request.getSession(true);
				session.setAttribute("EMP_CD", userInfo.get("EMP_CD"));

				return ResponseData.getResponseData(ResponseData.STATUS_SUCESS, "로그인에 성공했습니다.", login.getUserInfo());
			} else {
				return ResponseData.getResponseData("error_password", "비밀번호가 잘못되었습니다.");
			}
		} else {
			return ResponseData.getResponseData(ResponseData.STATUS_ERROR, "로그인에 실패했습니다.");
		}
	}
	
	public ModelAndView logout(HttpServletRequest request) {
		login.setUserId("");
		login.setUserName("");
		login.setPassword("");
		
		HttpSession session = request.getSession(true);
		session.setAttribute("EMP_CD", "");
		return ResponseData.getResponseData(ResponseData.STATUS_SUCESS, "로그아웃 처리가 완료 되었습니다.");
	}
	
	public ModelAndView isLogin() {
		if (login == null) {
			return ResponseData.getResponseData(ResponseData.STATUS_ERROR, "로그인 상태가 아닙니다.");
		} else {
			return ResponseData.getResponseData(ResponseData.STATUS_SUCESS, "로그인 상태입니다.", login.getUserInfo());
		}
	}
}
