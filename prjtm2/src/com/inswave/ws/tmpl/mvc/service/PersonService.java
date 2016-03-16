package com.inswave.ws.tmpl.mvc.service;

import java.util.HashMap;
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
import com.inswave.ws.tmpl.mvc.dao.PersonDao;

/**
 * 개인 관련 처리를 위한 서비스 클래스
 * 
 * @author Park, Sang Kyu
 *
 */
@Service
public class PersonService {
	
	protected final static Logger logger = Logger.getLogger(PersonService.class);

	@Autowired
	private PlatformTransactionManager transactionManager;
	
	@Autowired
	private SqlSessionFactory sqlSessionFactory;
	
	@Autowired
	private PersonDao personDao;
	
	@Autowired
	private Login login;
	
	private int familySeq = 0;
	
	private int projectSeq = 0;
	
	/**
	 * 개인 기본 정보 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getPersonBasic(Map param) {
		return this.personDao.getPersonBasic((Map) param.get("param"));
	}
	
	/**
	 * 현재 로그인된 사용자의 개인 기본 정보 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getLoginPersonBasic() {
		JSONObject searchParam = new JSONObject();
		searchParam.put("EMP_CD", login.getUserId());
		return this.personDao.getPersonBasic(searchParam);
	}
	
	/**
	 * 개인 및 조직 정보 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getPersonOrg(Map param) {
		return this.personDao.getPersonOrg((Map) param.get("param"));
	}

	/**
	 * 여러 건의 개인 기본 정보 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param Client 전달한 데이터 맵 객체
	 */
	@Transactional
	public void savePersonBasicList(Map param) throws Exception {
		if (param.get("dataPersonBasic") instanceof org.json.simple.JSONArray) {
			JSONArray list = (JSONArray) param.get("dataPersonBasic");
			for (int i=0; i < list.size(); i++) {
				JSONObject item = (JSONObject) list.get(i);
				RequestData.setAccessInfo(item, login);
				savePersonBasic(item);
			}
		} else if (param.get("dataPersonBasic") instanceof JSONObject) {
			savePersonBasic((JSONObject) param.get("dataPersonBasic"));
		}
	}
	
	/**
	 * 개인 기본 정보 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param data 데이터 맵 객체
	 */
	public void savePersonBasic(JSONObject data) {
		String rowStatus = (String) data.get("rowStatus");
		
		if (rowStatus.equals("C")) {
			this.personDao.insertPersonBasic(data);
		} else if (rowStatus.equals("U")) {
			this.personDao.updatePersonBasic(data);
		} else if (rowStatus.equals("D")) {
			this.personDao.deletePersonBasic(data);
		}
	}
	
	/**
	 * 개인별 가족 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getPersonFamilyList(Map param) {
		return this.personDao.getPersonFamilyList((Map) param.get("param"));
	}

	/**
	 * 여러 건의 개인별 가족 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param Client 전달한 데이터 맵 객체
	 */
	@Transactional
	public void savePersonFamilyList(Map param) throws Exception {
		if (param.get("dataPersonFamily") instanceof org.json.simple.JSONArray) {
			JSONArray list = (JSONArray) param.get("dataPersonFamily");
			familySeq = 0;
			
			for (int i=0; i < list.size(); i++) {
				if ((familySeq == 0) && (list.size() > 0)) {
					Map item = (Map) list.get(0);
					familySeq = this.personDao.getPersonFamilyMaxSeq(item);
				}
				
				JSONObject item = (JSONObject) list.get(i);
				RequestData.setAccessInfo(item, login);
				savePersonFamily(item);
			}
		} else if (param.get("dataPersonFamily") instanceof JSONObject) {
			savePersonFamily((JSONObject) param.get("dataPersonFamily"));
		}
	}
	
	/**
	 * 개인별 가족 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param data 데이터 맵 객체
	 */
	public void savePersonFamily(JSONObject data) {
		String rowStatus = (String) data.get("rowStatus");
		
		if (rowStatus.equals("C")) {
			data.put("SEQ", ++familySeq);
			this.personDao.insertPersonFamily(data);
		} else if (rowStatus.equals("U")) {
			this.personDao.updatePersonFamily(data);
		} else if (rowStatus.equals("D")) {
			this.personDao.deletePersonFamily(data);
		}
	}
	
	/**
	 * 개인별 프로젝트 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getPersonProjectList(Map param) {
		return this.personDao.getPersonProjectList((Map) param.get("param"));
	}

	/**
	 * 여러 건의 개인별 프로젝트 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param Client 전달한 데이터 맵 객체
	 */
	@Transactional
	public void savePersonProjectList(Map param) throws Exception {
		if (param.get("dataPersonProject") instanceof org.json.simple.JSONArray) {
			JSONArray list = (JSONArray) param.get("dataPersonProject");
			projectSeq = 0;
			
			for (int i=0; i < list.size(); i++) {
				if ((projectSeq == 0) && (list.size() > 0)) {
					JSONObject item = (JSONObject) list.get(0);
					projectSeq = this.personDao.getPersonProjectMaxSeq(item);
				}
				
				JSONObject item = (JSONObject) list.get(i);
				RequestData.setAccessInfo(item, login);
				savePersonProject(item);
			}
		} else if (param.get("dataPersonProject") instanceof JSONObject) {
			savePersonProject((JSONObject) param.get("dataPersonProject"));
		}
	}
	
	/**
	 * 사원별 프로젝트 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param data 데이터 맵 객체
	 */
	public void savePersonProject(JSONObject data) {
		String rowStatus = (String) data.get("rowStatus");
		
		if (rowStatus.equals("C")) {
			data.put("SEQ", ++projectSeq);
			this.personDao.insertPersonProject(data);
		} else if (rowStatus.equals("U")) {
			this.personDao.updatePersonProject(data);
		} else if (rowStatus.equals("D")) {
			this.personDao.deletePersonProject(data);
		}
	}

	/**
	 * 한 개인 기본 정보와 가족, 프로젝트 정보를 모두 변경한다.
	 * @param data
	 */
	@Transactional
	public void savePersonInfo(Map data) throws Exception {
		this.savePersonBasicList(data);
		this.savePersonFamilyList(data);
		this.savePersonProjectList(data);
	}
}
