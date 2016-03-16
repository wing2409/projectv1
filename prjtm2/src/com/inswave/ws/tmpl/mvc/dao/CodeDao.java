package com.inswave.ws.tmpl.mvc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * 코드 관련 테이블의 데이터를 조작하는 DAO 클래스
 * 
 * @author Park, Sang Kyu
 *
 */
@Repository
public class CodeDao {
	
	protected final static Logger logger = Logger.getLogger(CodeDao.class);

	@Autowired
	private SqlSession sqlSession;
	
	/**
	 * 코드 그룹 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getCodeGrpList(Map param) {
		return this.sqlSession.selectList("code.getCodeGrpList", param);
	}
	
	/**
	 * 코드 그룹 데이터를 추가한다.
	 * @param param
	 */
	public void insertCodeGrp(Map param) {
		this.sqlSession.insert("code.insertCodeGrp", param);
	}
	
	/**
	 * 코드 그룹 데이터를 업데이트한다.
	 * @param param
	 */
	public void updateCodeGrp(Map param) {
		this.sqlSession.update("code.updateCodeGrp", param);
	}
	
	/**
	 * 코드 그룹 데이터를 삭제한다.
	 * @param param
	 */
	public void deleteCodeGrp(Map param) {
		this.sqlSession.delete("code.deleteCodeGrp", param);
	}
	
	/**
	 * 코드 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getCodeList(Map param) {
		return this.sqlSession.selectList("code.getCodeList", param);
	}
	
	/**
	 * 코드 데이터를 추가한다.
	 * @param param
	 */
	public void insertCode(Map param) {
		this.sqlSession.insert("code.insertCode", param);
	}
	
	/**
	 * 코드 데이터를 업데이트한다.
	 * @param param
	 */
	public void updateCode(Map param) {
		this.sqlSession.update("code.updateCode", param);
	}
	
	/**
	 * 코드 데이터를 삭제한다.
	 * @param param
	 */
	public void deleteCode(Map param) {
		this.sqlSession.delete("code.deleteCode", param);
	}
	
	/**
	 * 우편번호 데이터를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getZipCodeList(Map param) {
		return this.sqlSession.selectList("code.getZipCodeList", param);
	}
}
