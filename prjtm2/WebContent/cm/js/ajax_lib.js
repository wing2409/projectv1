/**
 * @target 서버와 통신(Ajax, Submission)을 위한 함수
 */

/**
 * @type ajaxLib
 */
var ajaxLib = {};

ajaxLib.CONTEXT_PATH = "/prjtm2"; // Context Path 경로
ajaxLib.SERVICE_URL = "/"; // Service Url
ajaxLib.DEFAULT_OPTIONS_MODE = "asynchronous"; // 기본 통신 모드 ( asynchronous / synchronous)
ajaxLib.DEFAULT_OPTIONS_MEDIATYPE = "application/json"; // 기본 미디어 타입

/**
 * 서버와 Ajax 통신을 수행한다.
 * 
 * @date 2014. 12. 9.
 * @memberOf ajaxLib
 * @param {Object} options
 * <br/>※ options JSON형태 객체 
 * <br/>options.action       : ajax 요청주소
 * <br/>options.mode         : asynchronous(default)/synchronous
 * <br/>options.mediatype    : mediatype
 * <br/>options.method       : get/post/put/delete
 * <br/>options.isProcessMsg : 서비스 처리중에 메시지를 보여줄지 여부 설정 (true || false)
 * <br/>options.processMsg   : 서비스 처리중에 보여줄 메시지 (ex. "요청하신 서비스를 처리중입니다"), 설정하지 않는 경우 기본 메시지를 출력한다. 
 * <br/>                       processMsg 옵션을 설정하는 경우에는 isProcessMsg 메시지를 설정하지 않아도 서버 통신중에 메시지를 출력한다.
 * <br/>options.reqData      : 요청 데이터 (XML Object, XML String, JSON Object, JSON String)
 * <br/>options.timeout      : ajax요청후 timeout 시간. 이시간이 초과해도 응답이 오지 않는 경우 error callback함수를 실행
 * <br/>options.type         : xml/json. xml인 경우 success callback함수의 인자객체의 responseBody속성에 xml객체가 설정된고, json인 경우 자바스크립트 객체가 설정된다.
 * <br/>                       나머지 경우는 text형식이 설정.
 * <br/>options.beforeAjax   : 요청전에 실행되는 함수로 이 함수내에서 false를 return하면 ajax요청을 하지 않는다
 * <br/>options.success      : 요청이 성공한 경우 실행되는 callback함수
 * <br/>options.error        : 요청이 실패한 경우 실행되는 callback함수
 * <br/>options.resData      : Response된 데이터를 세팅할 DataCollection(DataList, DataMap) 객체
 * <br/>options.isShowMeg    : callback 함수가 지정되지 않은 경우에 서버에서 전달받은 메시지를 Alert 할 것인지 여부
 * @author Park, Sang Kyu
 * @example
 * ajaxLib.executeAjax(options);
 */
ajaxLib.executeAjax = function(options) {
    var action = ajaxLib.CONTEXT_PATH + ajaxLib.SERVICE_URL + options.action;
    var mode = options.mode || ajaxLib.DEFAULT_OPTIONS_MODE;
    var mediatype = options.mediatype || ajaxLib.DEFAULT_OPTIONS_MEDIATYPE;
    var method = (options.method || "post").toLowerCase();
    var processMsg = options.processMsg || "";
    var requestHeader = options.requestHeader || {};
    var reqData = "";
    var successCallBack = options.success || "";
    var errorCallBack = options.error || "";
    var isShowMeg = false;

    if ((options.isProcessMsg === true) && (processMsg === "")) {
        processMsg = "해당 작업을 처리중입니다";
    }

    if (typeof options.isShowMeg !== "undefined") {
        isShowMeg = options.isShowMeg;
    }

    if ((mediatype.indexOf("xml") >= 0) && ((typeof options.reqData) === "object")) {
        reqData = WebSquare.xml.serialize(options.reqData);
    } else if ((mediatype.indexOf("json") >= 0) && ((typeof options.reqData) === "object")) {
        reqData = JSON.stringify(options.reqData);
    } else {
        reqData = options.reqData;
    }
    var resBody = null;

    var ajaxOptions = {
        action : action,
        mode : mode,
        mediatype : mediatype,
        method : method,
        processMsg : processMsg,
        requestData : reqData,
        requestHeader : requestHeader,
        beforeAjax : function(e) {
        },
        success : function(e) {
            if (mediatype === "application/xml") {
                if (typeof e.responseBody != "undefined")
                    resBody = WebSquare.xml.parse(e.responseBody);
                var resData = WebSquare.xml.findNode(resBody, "data");
                if ((typeof options.resData !== "undefined") && (typeof resData !== "undefined")) {
                    options.resData.setXML(resData);
                }
            } else if (mediatype === "application/json") {
                resBody = e.responseJSON;
                if ((typeof options.resData !== "undefined") && (typeof resBody.data !== "undefined")) {
                    var dataType = options.resData.getObjectType().toLowerCase();
                    if (dataType === "datamap") {
                        options.resData.setJSON(resBody.data[0]);
                    } else if (dataType === 'datalist') {
                        options.resData.setJSON(resBody.data);
                    }
                }
            } else {
                resBody = e.responseText;
            }

            if (successCallBack !== "") {
                var func = window.scwin[successCallBack];
                if (typeof func === "function") {
                    func(resBody, e);
                } else {
                    func = eval(successCallBack);
                    if (typeof func === "function") {
                        func(resBody, e);
                    }
                }
            } else {
                if (resBody.result.status === comLib.STATUS_ERROR) {
                    comLib.alert(resBody.result.message);
                } else if ((resBody.result.status === comLib.STATUS_SUCCESS) && (isShowMeg === true)) {
                    comLib.alert(resBody.result.message);
                }
            }
        },
        error : function(e) {
            //공통에러처리
            ajaxLib.errorHandler(e);

            if (errorCallBack !== "") {
                var func = window.scwin[errorCallBack];
                if (typeof func === "function") {
                    func(resBody, e);
                } else {
                    func = eval(errorCallBack);
                    if (typeof func === "function") {
                        func(resBody, e);
                    }
                }
            }
        }
    };

    try {
        WebSquare.net.ajax(ajaxOptions);
        return resBody;
    } catch (e) {
        $w.log("[ajaxLib.executeAjax] Exception :: " + e.message);
    } finally {
        AjaxCallptions = null;
        resBody = null;
    }
};

/**
 * Submission 객체를 동적으로 생성한다.
 * 
 * @date 2014. 12. 9.
 * @memberOf ajaxLib
 * @param {Object} options
 * @author Park, Sang Kyu
 * @example
 * ajaxLib.createSubmission(options);
 */
ajaxLib.createSubmission = function(options) {
    var ref = options.ref || "";
    var target = options.target || "";
    var action = ajaxLib.CONTEXT_PATH + ajaxLib.SERVICE_URL + options.action;
    var mode = options.mode || ajaxLib.DEFAULT_OPTIONS_MODE;
    var mediatype = options.mediatype || ajaxLib.DEFAULT_OPTIONS_MEDIATYPE;
    var method = (options.method || "post").toLowerCase();
    var processMsg = options.processMsg || "";
    var instance = options.instance || "";
    var replace = options.replace || "instance";
    var submitHandler = options.submitHandler || "";
    var submitDoneHandler = options.submitDoneHandler || "";
    var submitErrorHandler = options.submitErrorHandler || "";
    var isShowMeg = false;
    var resBody = null;

    if ((options.isProcessMsg === true) && (processMsg === "")) {
        processMsg = "해당 작업을 처리중입니다";
    }
    
    if (typeof options.isShowMeg !== "undefined") {
        isShowMeg = options.isShowMeg;
    }

    var submissionObj = {
        "id" : options.id,
        "ref" : ref,
        "target" : target,
        "action" : action,
        "method" : method,
        "mediatype" : mediatype,
        "encoding" : "UTF-8",
        "instance" : instance,
        "replace" : replace,
        "mode" : mode,
        "processMsg" : processMsg,
        "submitHandler" : submitHandler,
        "submitDoneHandler" : function(e) {
            if (mediatype === "application/xml") {
                if (typeof e.responseBody !== "undefined") {
                    resBody = WebSquare.xml.parse(e.responseBody);
                }
            } else if (mediatype === "application/json") {
                if (typeof e.responseJSON !== "undefined") {
                    resBody = e.responseJSON;
                }
            } else {
                if (typeof e.responseText !== "undefined") {
                    resBody = e.responseText;
                }
            }
            if (submitDoneHandler !== "") {
                var func = window.scwin[submitDoneHandler];
                if (typeof func === "function") {
                    func(resBody, e);
                } else {
                    func = window[submitDoneHandler];
                    if (typeof func === "function") {
                        func(resBody, e);
                    }
                }
            } else {
                if (resBody.result.status === comLib.STATUS_ERROR) {
                    comLib.alert(resBody.result.message);
                } else if ((resBody.result.status === comLib.STATUS_SUCCESS) && (isShowMeg === true)) {
                    comLib.alert(resBody.result.message);
                }
            }
        },
        "submitErrorHandler" : function(e) {
            //공통에러처리
            ajaxLib.errorHandler(e);

            if (submitErrorHandler !== "") {
                var func = window.scwin[submitErrorHandler];
                if (typeof func === "function") {
                    func(e);
                } else {
                    func = eval(submitErrorHandler);
                    if (typeof func === "function") {
                        func(e);
                    }
                }
            }
        }
    };

    $w.createSubmission(submissionObj);
};

/**
 * Submission 정보를 세팅한다.
 * 
 * @date 2014. 12. 9.
 * @memberOf ajaxLib
 * @param {Object} options
 * @author Park, Sang Kyu
 * @example
 * ajaxLib.setSubmission(submissionObj, options);
 */
ajaxLib.setSubmission = function(submissionObj, options) {
    var ref = options.ref || "";
    var target = options.target || "";
    var action = ajaxLib.CONTEXT_PATH + ajaxLib.SERVICE_URL + options.action;
    var mode = options.mode || ajaxLib.DEFAULT_OPTIONS_MODE;
    var mediatype = options.mediatype || ajaxLib.DEFAULT_OPTIONS_MEDIATYPE;
    var method = (options.method || "post").toLowerCase();
    var processMsg = options.processMsg || "";

    if ((options.isProcessMsg === true) && (processMsg === "")) {
        processMsg = "해당 작업을 처리중입니다";
    }

    var instance = options.instance || "";
    var replace = options.replace || "instance";

    submissionObj.id = options.id;
    submissionObj.ref = ref;
    submissionObj.target = target;
    submissionObj.action = action;
    submissionObj.method = method;
    submissionObj.mediatype = mediatype;
    submissionObj.encoding = "UTF-8";
    submissionObj.instance = instance;
    submissionObj.replace = replace;
    submissionObj.mode = mode;
    submissionObj.processMsg = processMsg;
};

/**
 * Submission를 실행합니다.
 * 
 * @date 2014. 12. 9.
 * @memberOf ajaxLib
 * @param {Object} options
 * @param {Object} 요청 데이터
 * @param {Object} 전송중 disable시킬 컴퍼넌트
 * @author Park, Sang Kyu
 * @example
 * <br/>var searchCodeGrpOption = { id : "sbm_SearchCodeGrp",
 * <br/>               action : "serviceId=CD0001&action=R",
 * <br/>               target : 'data:json,{"id":"dlt_CodeGrp","key":"data"}',
 * <br/>               submitDoneHandler : "searchCodeGrpCallback", isShowMeg : false };
 * <br/>ajaxLib.executeSubmission(searchCodeGrpOption);
 */
ajaxLib.executeSubmission = function(options, requestData , obj) {
    var submissionObj = $w.getSubmission(options.id);
    if (submissionObj === null) {
        ajaxLib.createSubmission(options);
    } else {
        ajaxLib.setSubmission(submissionObj, options);
    }
    $w.executeSubmission(options.id, requestData, obj);
};

/**
 * SubmissionId에 해당하는 Submission을 실행합니다.
 * 
 * @date 2014. 12. 9.
 * @memberOf ajaxLib
 * @param {String} submissionId Submission 아이디
 * @author Park, Sang Kyu
 * @example
 * ajaxLib.executeSubmissionById("sbm_SearchCodeGrp");
 */
ajaxLib.executeSubmissionById = function(submissionId) {
    $w.executeSubmission(submissionId);
};

/**
 * 서버 통신 과정에서 에러가 발생할 경우 에러 메시지를 출력한다.
 * 
 * @date 2014. 12. 9.
 * @memberOf ajaxLib
 * @param {Object} options
 * @author Park, Sang Kyu
 * @example
 * ajaxLib.errorHandler(e);
 */
ajaxLib.errorHandler = function(e) {
    /* 공통에러 처리 필요. */
    var msg = e.responseBody;
    if (msg.indexOf("text/") >= 0) {
        msg = msg.replace("text/", "");
    }
    comLib.alert("서버통신 중 에러가 발생하였습니다 (" + msg + ")");
};

/* ==========================================================================================
 * 해당 프로젝트에서 새로 만든 메소드들을 정의한다.
 * ========================================================================================== */