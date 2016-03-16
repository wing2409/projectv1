package project.v1.board.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BoardDaoImpl implements BoaradDao{
	
	@Autowired
	private SqlSession query;
	
	public List selectBoard() throws SQLException{
		
		return query.selectList("selectBoard");
		
	}
	public int insertBoard(Map paramMap) throws SQLException {
		
		return query.insert("insertBoard", paramMap);
	}
	

}
