package com.inswave.ws.tmpl.adapter;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.view.AbstractView;

import websquare.system.adapter.ResponseAdapter;


public class WqAdapterViewByMap extends AbstractView {

    protected final static Logger logger = Logger.getLogger(WqAdapterViewByMap.class);

    @Override
    protected void renderMergedOutputModel(Map model, HttpServletRequest request, HttpServletResponse response) throws Exception {
    	ResponseAdapter resAdapter = new ResponseAdapter();
    	resAdapter.convertAndSend(request, response, model);
    }
}
