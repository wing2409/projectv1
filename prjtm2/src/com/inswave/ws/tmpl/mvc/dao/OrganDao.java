package com.inswave.ws.tmpl.mvc.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * 조직 관련 테이블의 데이터를 조작하는 DAO 클래스
 * 
 * @author Park, Sang Kyu
 *
 */
@Repository
public class OrganDao {
	
	protected final static Logger logger = Logger.getLogger(OrganDao.class);

	@Autowired
	private SqlSession sqlSession;
	
	/**
	 * 조직 데이터 정보를 조회한다.
	 * @param param
	 * @return
	 */
	public List<Map> getOrganBasicList(Map param) {
		return this.sqlSession.selectList("organ.getOrganBasicList", param);
	}
	
	/**
	 * 조직 데이터를 추가한다.
	 * @param param
	 */
	public void insertOrganBasic(Map param) {
		this.sqlSession.insert("organ.insertOrganBasic", param);
	}
	
	/**
	 * 조직 데이터를 업데이트한다.
	 * @param param
	 */
	public void updateOrganBasic(Map param) {
		this.sqlSession.update("organ.updateOrganBasic", param);
	}
	
	/**
	 * 조직 데이터를 삭제한다.
	 * @param param
	 */
	public void deleteOrganBasic(Map param) {
		this.sqlSession.delete("organ.deleteOrganBasic", param);
	}
}
