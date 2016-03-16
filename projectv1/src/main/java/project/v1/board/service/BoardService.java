package project.v1.board.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface BoardService {
	
	public List selectBoard() throws Exception;
	
	public int insertBoard(Map paramMap) throws Exception;
}
