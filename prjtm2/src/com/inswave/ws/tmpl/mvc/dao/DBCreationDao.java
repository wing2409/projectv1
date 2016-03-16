package com.inswave.ws.tmpl.mvc.dao;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * 템플릿 테이블 및 데이터를 생성하는 DAO 클래스
 * 
 * @author Park, Sang Kyu
 *
 */
@Repository
public class DBCreationDao {
	
	protected final static Logger logger = Logger.getLogger(DBCreationDao.class);

	@Autowired
	private SqlSession sqlSession;
	
	public int executeSQL(String[] statements) {
		int count = 0;
		
		for (int i = 0, iCnt = statements.length; i < iCnt; i++) {
			Map sqlMap = new HashMap();
			sqlMap.put("sql", statements[i]);
			count += this.sqlSession.update("custom.update", sqlMap);
			logger.info(statements[i]);
		}
		
		return count;
	}
}
