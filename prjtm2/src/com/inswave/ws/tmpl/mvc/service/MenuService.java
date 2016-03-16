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
import com.inswave.ws.tmpl.mvc.dao.MenuDao;

/**
 * 메뉴 관련 처리를 위한 서비스 클래스
 * 
 * @author Park, Sang Kyu
 *
 */
@Service
public class MenuService {
	
	protected final static Logger logger = Logger.getLogger(MenuService.class);

	@Autowired
	private PlatformTransactionManager transactionManager;
	
	@Autowired
	private SqlSessionFactory sqlSessionFactory;
	
	@Autowired
	private MenuDao menuDao;
	
	@Autowired
	private Login login;
	
	/**
	 * 메뉴별 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getMenuList(Map param) {
		return this.menuDao.getMenuList((Map) param.get("param"));
	}
	
	/**
	 * 개인별 메뉴 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getPersonMenuList(Map param) {
		return this.menuDao.getPersonMenuList(login.getUserInfo());
	}

	/**
	 * 여러 건의 메뉴 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param Client 전달한 데이터 맵 객체
	 */
	@Transactional
	public void saveMenuList(Map param) throws Exception {
		if (param.get("data") instanceof org.json.simple.JSONArray) {
			JSONArray list = (JSONArray) param.get("data");
			for (int i=0; i < list.size(); i++) {
				JSONObject item = (JSONObject) list.get(i);
				RequestData.setAccessInfo(item, login);
				saveMenu(item);
			}
		} else if (param.get("data") instanceof JSONObject) {
			saveMenu((JSONObject) param.get("data"));
		}
	}
	
	/**
	 * 메뉴 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param sqlSession
	 * @param data 데이터 맵 객체
	 */
	public void saveMenu(JSONObject data) {
		String rowStatus = (String) data.get("rowStatus");
		
		if (rowStatus.equals("C")) {
			this.menuDao.insertMenu(data);
		} else if (rowStatus.equals("U")) {
			this.menuDao.updateMenu(data);
		} else if (rowStatus.equals("D")) {
			this.menuDao.deleteMenu(data);
		}
	}
}
