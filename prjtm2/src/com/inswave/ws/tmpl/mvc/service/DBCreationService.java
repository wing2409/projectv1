package com.inswave.ws.tmpl.mvc.service;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.util.ArrayList;

import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;

import com.inswave.ws.tmpl.handler.ResponseData;
import com.inswave.ws.tmpl.mvc.dao.DBCreationDao;

@Service
public class DBCreationService {

	protected final static Logger logger = Logger.getLogger(DBCreationService.class);

	@Autowired
	private PlatformTransactionManager transactionManager;
	
	@Autowired
	private SqlSessionFactory sqlSessionFactory;
	
	@Autowired
	private DBCreationDao dbCreationDao;
	
	private String sqlFilePath = "/WEB-INF/classes/database/creation/";
	
	/**
	 * 템플릿 TYPE1 프로젝트에 사용하는 테이블 및 데이터를 생성하고 삭제하는 작업을 제어한다.
	 * @param serviceId 서비스 아이디
	 * @param action	액션
	 * @param param	 파라미터(데이터)
	 * @return 처리결과(처리결과 코드, 처리결과 메세지, 데이터)
	 * @throws Exception
	 */
	/*
	public Map<String, Object> control(String serviceId, String action, Map param) throws Exception {
		
		if (serviceId.equals("CM0001") && action.equals("C")) {
			return createAllTable();
		} else if (serviceId.equals("CM0001") && action.equals("I")) {
			return insertAllData();
		} else if (serviceId.equals("CM0101") && action.equals("I")) {
			return insertZipCodeData();
		} else if (serviceId.equals("CM0001") && action.equals("D")) {
			return dropAllTable();
		} else {
			return DataUtil.getReusltMessage(DataUtil.RESULT_STATUS_ERROR, "액션이 정의되지 않았습니다.");
		}
	}
	*/
	
	/**
	 * 전체 테이블을 생성하는 SQL을 실행한다.
	 * @throws Exception
	 */
	public void createAllTable() throws Exception {
		String[] statements = getSQLStatementsFromFile("create_table_tmpl_type2.sql");
		dbCreationDao.executeSQL(statements);
	}

	/**
	 * 초기 데이터를 Insert하는 SQL을 실행한다.
	 * @throws Exception
	 */
	public void insertBasicData() throws Exception {
		String[] statements = getSQLStatementsFromFile("insert_data_tmpl_type2.sql");
		dbCreationDao.executeSQL(statements);
	}
	
	/**
	 * 우편번호 데이터를 Insert하는 SQL을 실행한다.
	 * @throws Exception
	 */
	public void insertZipCodeData() throws Exception {
		String[] statements = getSQLStatementsFromFile("insert_zipcode_tmpl_type2.sql");
		dbCreationDao.executeSQL(statements);
	}
	
	/**
	 * 전체 테이블을 Drop하는 SQL을 실행한다.
	 * @throws Exception
	 */
	public void dropAllTable() throws Exception {
		String[] statements = getSQLStatementsFromFile("drop_table_tmpl_type2.sql");
		dbCreationDao.executeSQL(statements);
	}
	
	/**
	 * DB Script 파일을 읽어서 실행 SQL 문장 단위로 잘라서 문자열 배열에 저장해서 반환한다.
	 * @param filePath DB Script 파일명
	 * @return
	 * @throws IOException
	 */
	public String[] getSQLStatementsFromFile(String filePath) throws IOException {
		StringWriter buffer = new StringWriter();
		BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(ResponseData.getContexntPath() + this.sqlFilePath + filePath), "UTF8"));

		ArrayList statements = new ArrayList();

		for (int read = reader.read(); read != -1; read = reader.read()) {
			if (read == 59) {
				statements.add(buffer.toString());
				buffer.getBuffer().delete(0, buffer.getBuffer().length());
			} else {
				buffer.write(read);
			}
		}
		return (String[]) statements.toArray(new String[statements.size()]);
	}
}
