package com.inswave.ws.tmpl.mvc.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.log4j.Logger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Transactional;

import com.inswave.ws.tmpl.handler.RequestData;
import com.inswave.ws.tmpl.mvc.bean.Login;
import com.inswave.ws.tmpl.mvc.dao.AuthorityDao;

/**
 * 권한 관련 처리를 위한 서비스 클래스
 * 
 * @author Park, Sang Kyu
 *
 */
@Service
public class AuthorityService {
	
	protected final static Logger logger = Logger.getLogger(AuthorityService.class);

	@Autowired
	private PlatformTransactionManager transactionManager;
	
	@Autowired
	private SqlSessionFactory sqlSessionFactory;
	
	@Autowired
	private AuthorityDao authorityDao;
	
	@Autowired
	private Login login;
	
	/**
	 * 권한 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getAuthorityList(Map param) {
		return this.authorityDao.getAuthorityList((Map) param.get("param"));
	}

	/**
	 * 여러 건의 권한 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param Client 전달한 데이터 맵 객체
	 */
	@Transactional
	public void saveAuthorityList(Map param) throws Exception {
		if (param.get("data") instanceof org.json.simple.JSONArray) {
			JSONArray list = (JSONArray) param.get("data");
			for (int i=0; i < list.size(); i++) {
				JSONObject item = (JSONObject) list.get(i);
				RequestData.setAccessInfo(item, login);
				saveAuthority(item);
			}
		} else if (param.get("data") instanceof JSONObject) {
			saveAuthority((JSONObject) param.get("data"));
		}
	}
	
	/**
	 * 권한 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param sqlSession
	 * @param data 데이터 맵 객체
	 */
	public void saveAuthority(JSONObject data) {
		String rowStatus = (String) data.get("rowStatus");
		
		if (rowStatus.equals("C")) {
			this.authorityDao.insertAuthority(data);
		} else if (rowStatus.equals("U")) {
			this.authorityDao.updateAuthority(data);
		} else if (rowStatus.equals("D")) {
			this.authorityDao.deleteAuthority(data);
			this.authorityDao.deletePersonAuthority(data);
		}
	}
	
	/**
	 * 메뉴별 권한 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getAuthorityMenuList(Map param) {
		return this.authorityDao.getAuthorityMenuList((Map) param.get("param"));
	}

	/**
	 * 여러 건의 메뉴 권한 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param Client 전달한 데이터 맵 객체
	 */
	@Transactional
	public void saveAuthorityMenuList(Map param) throws Exception {
		if (param.get("data") instanceof org.json.simple.JSONArray) {
			JSONArray list = (JSONArray) param.get("data");
			for (int i=0; i < list.size(); i++) {
				JSONObject item = (JSONObject) list.get(i);
				RequestData.setAccessInfo(item, login);
				saveAuthorityMenu(item);
			}
		} else if (param.get("data") instanceof JSONObject) {
			saveAuthorityMenu((JSONObject) param.get("data"));
		}
	}
	
	/**
	 * 메뉴 권한 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param sqlSession
	 * @param data 데이터 맵 객체
	 */
	public void saveAuthorityMenu(JSONObject data) {
		String rowStatus = (String) data.get("rowStatus");
		
		if (rowStatus.equals("C")) {
			this.authorityDao.insertAuthorityMenu(data);
		} else if (rowStatus.equals("D")) {
			this.authorityDao.deleteAuthorityMenu(data);
		}
	}
	
	/**
	 * 권한별 사원 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getPersonAuthorityList(Map param) {
		return this.authorityDao.getPersonAuthorityList((Map) param.get("param"));
	}

	/**
	 * 여러 건의 권한별 사원 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param Client 전달한 데이터 맵 객체
	 */
	@Transactional
	public void savePersonAuthorityList(Map param) throws Exception {
		if (param.get("data") instanceof org.json.simple.JSONArray) {
			JSONArray list = (JSONArray) param.get("data");
			for (int i=0; i < list.size(); i++) {
				JSONObject item = (JSONObject) list.get(i);
				RequestData.setAccessInfo(item, login);
				savePersonAuthority(item);
			}
		} else if (param.get("data") instanceof JSONObject) {
			savePersonAuthority((JSONObject) param.get("data"));
		}
	}
	
	/**
	 * 권한별 사원 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param sqlSession
	 * @param data 데이터 맵 객체
	 */
	public void savePersonAuthority(JSONObject data) {
		String rowStatus = (String) data.get("rowStatus");
		
		if (rowStatus.equals("C")) {
			this.authorityDao.insertPersonAuthority(data);
		} else if (rowStatus.equals("D")) {
			this.authorityDao.deletePersonAuthority(data);
		}
	}
}
