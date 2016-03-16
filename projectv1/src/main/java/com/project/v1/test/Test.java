package com.project.v1.test;

import org.springframework.beans.factory.annotation.Autowired;

public class Test {

	public static void main(String[] args) {
		
			String result = null;
			System.out.println("111");
			TestDao testDao = new TestDaoImpl();
			
			try{
				result = (String)testDao.test();
				System.out.println(result);
			}
			catch(Exception e){
				e.printStackTrace();
			}
	}

}
