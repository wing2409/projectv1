package com.inswave.ws.tmpl.mvc.bean;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.context.annotation.ScopedProxyMode;

@Component
@Scope(value="session", proxyMode=ScopedProxyMode.TARGET_CLASS)
public class Login {

	private String userId;
	
	private String userName;
	
	private String password;
	
	private String RemoteAddr;
	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
    public Map<String, Object> getUserInfo() {
        Map<String, Object> userInfo = new HashMap<String, Object>();
        userInfo.put("EMP_CD", this.getUserId());
        userInfo.put("EMP_NM", this.getUserName());
        userInfo.put("PASSWORD", this.getPassword());
        return userInfo;
    }

	public String getRemoteAddr() {
		return RemoteAddr;
	}

	public void setRemoteAddr(String remoteAddr) {
		RemoteAddr = remoteAddr;
	}
}
