package com.inswave.ws.tmpl.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;

public class FileUtil {

	/**
	 * 특정 경로의 파일을 읽어서 문자열로 반환한다.
	 * @param filePath	파일경로
	 * @param charSet	Character Set
	 * @return
	 * @throws IOException
	 */
	public static String readFile(String filePath, String charSet) throws IOException {
	
		InputStream in = new FileInputStream(filePath);
		Reader reader = new InputStreamReader(in, charSet);
		BufferedReader br = new BufferedReader(reader);
		
		StringBuilder sb = new StringBuilder();
		String temp;
		while( (temp = br.readLine()) != null ) {
			sb.append(temp);
		}
		
		br.close();
		reader.close();
		in.close();
		
		return sb.toString();
	}
	
	
	/**
	 * 디렉터리가 존재하는지 검사하고 없으면 생성한다.
	 * @param targetDir 생성할 디렉터리 경로
	 * @return 성공여부
	 */
	public static boolean directoryConfirmAndMake(String targetDir) {
		File file = new File(targetDir);
		
		if (!file.isDirectory()) {
			if (!file.mkdirs()) {
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	}	
}
