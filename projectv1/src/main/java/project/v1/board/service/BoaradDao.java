package project.v1.board.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface BoaradDao {
	
	public List selectBoard() throws SQLException;
	
	public int insertBoard(Map paramMap) throws SQLException;
}
