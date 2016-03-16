package project.v1.board.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("BoardServiceImpl")
public class BoardServiceImpl implements BoardService{
	
	@Autowired
	BoaradDao boardDao;
	
	public List selectBoard() throws Exception{
		return boardDao.selectBoard();
	}
	
	public int insertBoard(Map paramMap) throws Exception{
		return boardDao.insertBoard(paramMap);
	}
}
