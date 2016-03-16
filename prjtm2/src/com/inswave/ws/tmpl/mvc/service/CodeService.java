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
import com.inswave.ws.tmpl.mvc.dao.CodeDao;

/**
 * 코드 그룹 관련 처리를 위한 서비스 클래스
 * 
 * @author Park, Sang Kyu
 *
 */
@Service
public class CodeService {
	
	protected final static Logger logger = Logger.getLogger(CodeService.class);

	@Autowired
	private PlatformTransactionManager transactionManager;
	
	@Autowired
	private SqlSessionFactory sqlSessionFactory;
	
	@Autowired
	private CodeDao codeDao;
	
	@Autowired
	private Login login;
	
	/**
	 * 코드 그룹 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getCodeGrpList(Map param) {
		return this.codeDao.getCodeGrpList((Map) param.get("param"));
	}

	/**
	 * 여러 건의 코드 그룹 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param Client 전달한 데이터 맵 객체
	 */
	@Transactional
	public void saveCodeGrpList(Map param) throws Exception {
		if (param.get("data") instanceof org.json.simple.JSONArray) {
			JSONArray list = (JSONArray) param.get("data");
			for (int i=0; i < list.size(); i++) {
				JSONObject item = (JSONObject) list.get(i);
				RequestData.setAccessInfo(item, login);
				saveCodeGrp(item);
			}
		} else if (param.get("data") instanceof JSONObject) {
			saveCodeGrp((JSONObject) param.get("data"));
		}
	}
	
	/**
	 * 코드 그룹 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param sqlSession
	 * @param data 데이터 맵 객체
	 */
	public void saveCodeGrp(JSONObject data) {
		String rowStatus = (String) data.get("rowStatus");
		
		if (rowStatus.equals("C")) {
			this.codeDao.insertCodeGrp(data);
		} else if (rowStatus.equals("U")) {
			this.codeDao.updateCodeGrp(data);
		} else if (rowStatus.equals("D")) {
			this.codeDao.deleteCodeGrp(data);
		}
	}
	
	/**
	 * 코드 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getCodeList(Map param) {
		return this.codeDao.getCodeList((Map) param.get("param"));
	}

	/**
	 * 여러 건의 코드 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param param Client 전달한 데이터 맵 객체
	 */
	@Transactional
	public void saveCodeList(Map param) throws Exception {
		if (param.get("data") instanceof org.json.simple.JSONArray) {
			JSONArray list = (JSONArray) param.get("data");
			for (int i=0; i < list.size(); i++) {
				JSONObject item = (JSONObject) list.get(i);
				RequestData.setAccessInfo(item, login);
				saveCode(item);
			}
		} else if (param.get("data") instanceof JSONObject) {
			saveCode((JSONObject) param.get("data"));
		}
	}
	
	/**
	 * 코드 데이터를 변경(등록, 수정, 삭제)한다.
	 * @param sqlSession
	 * @param data 데이터 맵 객체
	 */
	public void saveCode(JSONObject data) {
		String rowStatus = (String) data.get("rowStatus");
		
		if (rowStatus.equals("C")) {
			this.codeDao.insertCode(data);
		} else if (rowStatus.equals("U")) {
			this.codeDao.updateCode(data);
		} else if (rowStatus.equals("D")) {
			this.codeDao.deleteCode(data);
		}
	}
	
	/**
	 * 우편번호 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getZipCodeList(Map param) {
		return this.codeDao.getZipCodeList((Map) param.get("param"));
	}
}
