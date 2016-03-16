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
import com.inswave.ws.tmpl.mvc.dao.OrganDao;

/**
 * 조직 관련 처리를 위한 서비스 클래스
 * 
 * @author Park, Sang Kyu
 *
 */
@Service
public class OrganService {
	
	protected final static Logger logger = Logger.getLogger(OrganService.class);

	@Autowired
	private PlatformTransactionManager transactionManager;
	
	@Autowired
	private SqlSessionFactory sqlSessionFactory;
	
	@Autowired
	private OrganDao organDao;
	
	@Autowired
	private Login login;
	
	/**
	 * 조직 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getOrganBasicList(Map param) {
		return this.organDao.getOrganBasicList((Map) param.get("param"));
	}

	/**
	 * 여러 건의 조직 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param Client 전달한 데이터 맵 객체
	 */
	@Transactional
	public void saveOrganBasicList(Map param) throws Exception {
		if (param.get("data") instanceof org.json.simple.JSONArray) {
			JSONArray list = (JSONArray) param.get("data");
			for (int i=0; i < list.size(); i++) {
				JSONObject item = (JSONObject) list.get(i);
				RequestData.setAccessInfo(item, login);
				saveOrganBasic(item);
			}
		} else if (param.get("data") instanceof JSONObject) {
			saveOrganBasic((JSONObject) param.get("data"));
		}
	}
	
	/**
	 * 조직 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param sqlSession
	 * @param data 데이터 맵 객체
	 */
	public void saveOrganBasic(JSONObject data) {
		String rowStatus = (String) data.get("rowStatus");
		
		if (rowStatus.equals("C")) {
			this.organDao.insertOrganBasic(data);
		} else if (rowStatus.equals("U")) {
			this.organDao.updateOrganBasic(data);
		} else if (rowStatus.equals("D")) {
			this.organDao.deleteOrganBasic(data);
		}
	}
}
