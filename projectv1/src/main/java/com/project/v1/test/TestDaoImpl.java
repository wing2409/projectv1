package com.project.v1.test;

import java.sql.SQLException;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TestDaoImpl implements TestDao{
	
	@Autowired
	private SqlSession sqlSession;
	
	public String test() throws SQLException {
		System.out.println("2222");
		return sqlSession.selectOne("query.test");
	}
}
