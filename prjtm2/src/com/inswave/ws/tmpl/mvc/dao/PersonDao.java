package com.inswave.ws.tmpl.mvc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * 개인 관련 테이블의 데이터를 조작하는 DAO 클래스
 * 
 * @author Park, Sang Kyu
 *
 */
@Repository
public class PersonDao {
	
	protected final static Logger logger = Logger.getLogger(PersonDao.class);

	@Autowired
	private SqlSession sqlSession;
	
	/**
	 * 개인 기본 정보 데이터 정보를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getPersonBasic(Map param) {
		return this.sqlSession.selectList("person.getPersonBasic", param);
	}
	
	/**
	 * 로그인 정보를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getLoginInfo(Map param) {
		return this.sqlSession.selectList("person.getLoginInfo", param);
	}
	
	/**
	 * 개인 및 조직 정보 데이터 정보를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getPersonOrg(Map param) {
		return this.sqlSession.selectList("person.getPersonOrg", param);
	}
	
	/**
	 * 개인 기본 정보 데이터를 추가한다.
	 * @param param
	 */
	public void insertPersonBasic(Map param) {
		this.sqlSession.insert("person.insertPersonBasic", param);
	}
	
	/**
	 * 개인 기본 정보 데이터를 업데이트한다.
	 * @param param
	 */
	public void updatePersonBasic(Map param) {
		this.sqlSession.update("person.updatePersonBasic", param);
	}
	
	/**
	 * 개인 기본 정보 데이터를 삭제한다.
	 * @param param
	 */
	public void deletePersonBasic(Map param) {
		this.sqlSession.delete("person.deletePersonBasic", param);
	}
	
	/**
	 * 개인별 가족 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getPersonFamilyList(Map param) {
		return this.sqlSession.selectList("person.getPersonFamilyList", param);
	}
	
	/**
	 * 개인별 가족 최대 순번을 조회한다.
	 * @param param
	 * @return
	 */
	public int getPersonFamilyMaxSeq(Map param) {
		return this.sqlSession.selectOne("person.getPersonFamilyMaxSeq", param);
	}
	
	/**
	 * 개인별 가족 데이터를 추가한다.
	 * @param param
	 */
	public void insertPersonFamily(Map param) {
		this.sqlSession.insert("person.insertPersonFamily", param);
	}
	
	/**
	 * 개인별 가족 데이터를 업데이트한다.
	 * @param param
	 */
	public void updatePersonFamily(Map param) {
		this.sqlSession.update("person.updatePersonFamily", param);
	}
	
	/**
	 * 개인별 가족 데이터를 삭제한다.
	 * @param param
	 */
	public void deletePersonFamily(Map param) {
		this.sqlSession.delete("person.deletePersonFamily", param);
	}
	
	/**
	 * 개인별 프로젝트 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getPersonProjectList(Map param) {
		return this.sqlSession.selectList("person.getPersonProjectList", param);
	}
	
	/**
	 * 개인별 프로젝트 최대 순번을 조회한다.
	 * @param param
	 * @return
	 */
	public int getPersonProjectMaxSeq(Map param) {
		return this.sqlSession.selectOne("person.getPersonProjectMaxSeq", param);
	}
	
	/**
	 * 개인별 프로젝트 데이터를 추가한다.
	 * @param param
	 */
	public void insertPersonProject(Map param) {
		this.sqlSession.insert("person.insertPersonProject", param);
	}
	
	/**
	 * 개인별 프로젝트 데이터를 업데이트한다.
	 * @param param
	 */
	public void updatePersonProject(Map param) {
		this.sqlSession.update("person.updatePersonProject", param);
	}
	
	/**
	 * 개인별 프로젝트 데이터를 삭제한다.
	 * @param param
	 */
	public void deletePersonProject(Map param) {
		this.sqlSession.delete("person.deletePersonProject", param);
	}
}
