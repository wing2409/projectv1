package project.v1.board;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import project.v1.board.service.BoardService;

@Controller
public class BoardController {
	
	@Autowired
	BoardService boradService;
	
	@RequestMapping("boardInsert")
	public String boardInsert(@RequestParam Map<String,Object> paramMap ) 
			throws Exception{
		
		boradService.insertBoard(paramMap);
		
		return "write";
	}
	
	@RequestMapping("write")
	public String write(Map<String, Object> paramMap){
		
		return "write";
	}
	
	@RequestMapping("list")
	public ModelAndView list() throws Exception{
		ModelAndView mav = new ModelAndView("home");
		
		List list = boradService.selectBoard();
		
		for(int i = 0; i < list.size(); i++){
			Map map = (Map)list.get(i);
			System.out.println(map.get("CONTENT"));
		}
		
		mav.addObject("list", list);
		
		return mav;
	}

}
