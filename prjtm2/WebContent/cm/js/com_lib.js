/**
 * @target 팝업, 세션, 공통 메시지 관련 함수
 */

/**
 * @type comLib
 */
var comLib = {};

comLib.STATUS_SUCCESS = "success";
comLib.STATUS_ERROR = "error";

/**
 * 메세지 팝업을 호출한다.
 * 
 * @date 2014. 12. 9.
 * @memberOf comLib
 * @param {String} messageTyp: 팝업창 타입 (alert || confirm)
 * @param {String} message 메시지
 * @param {String} closeCallbackFncName 콜백 함수명
 * @param {Boolean} isReturnValue Confirm 창인 경우 선택 결과(boolean)을 반환할지 여부
 * @param {String} title 팝업창 타이틀
 * @author Park, Sang Kyu
 * @example
 * comLib.messagBox("alert", message, closeCallbackFncName, isReturnValue, title);
 */
comLib.messagBox = function(messageType, message, closeCallbackFncName, isReturnValue, title) {
    var message = message || "";
    var messageType = messageType || "alert";
    var defaultTitle = null;
    
    if (messageType === "alert") {
        defaultTitle = "Alert";
    } else {
        defaultTitle = "Confirm";
    }
    
    if (typeof closeCallbackFncName === "undefined") {
        closeCallbackFncName = "";
    }
    
    if (typeof isReturnValue === "undefined") {
        isReturnValue = false;
    }

    var options = {
        title : title || defaultTitle,
        popupParam : {"message" : message, "closeCallbackFncName" : closeCallbackFncName, "isReturnValue" : isReturnValue},
        modal : true,
        width : 340,
        height : 150
    };
    comLib.openPopup(messageType, "/cm/common/message_box.xml", options);
};

/**
 * 
 * Confirm 메시지 창을 호출한다.
 * 
 * @date 2014. 12. 9.
 * @memberOf comLib
 * @param {String} message 메시지
 * @param {String} closeCallbackFncName 콜백 함수명
 * @param {String} isReturnValue Confirm 창인 경우 선택 결과(boolean)을 반환할지 여부
 * @param {String} title 팝업창 타이틀
 * @author Park, Sang Kyu
 * @example
 * comLib.confirm("변경된 코드 그룹 정보를 저장하시겠습니까?", "saveCodeGrpConfirmCallback");
 * comLib.confirm("하위에 새로운 조직을 추가하시겠습니까?", "insertConfirmCallBack", true);
 */
comLib.confirm = function(message, closeCallbackFncName, isReturnValue, title) {
    comLib.messagBox("confirm", message, closeCallbackFncName, isReturnValue, title);
};

/**
 * 
 * Alert 메시지 창을 호출한다.
 * 
 * @date 2014. 12. 9.
 * @memberOf comLib
 * @param {String} message 메시지
 * @param {String} closeCallbackFncName 콜백 함수명
 * @param {String} isReturnValue Confirm 창인 경우 선택 결과(boolean)을 반환할지 여부
 * @param {String} title 팝업창 타이틀
 * @author Park, Sang Kyu
 * @example
 * comLib.confirm("우편번호를 선택하시기 바랍니다.");
 * comLib.confirm("우편번호를 선택하시기 바랍니다.", "alertCallBack", true);
 */
comLib.alert = function(message, closeCallbackFncName, isReturnValue, title) {
    comLib.messagBox("alert", message, closeCallbackFncName, isReturnValue, title);
};

/**
 * 
 * 팝업창을 닫는다.
 * 
 * @date 2014. 12. 9.
 * @memberOf comLib
 * @param {String} popupId 화면을 닫을 팝업 윈도우 아이디
 * @param {String} callBackFnc 콜백 함수 이름 
 * @param {Object} rtnObj 반환할 객체 (JSON or XML)
 * @author Park, Sang Kyu
 * @example
 * comLib.closePopup(WebSquare.net.getParameter( "popupID" ), "setData", jsonObj);
 */
comLib.closePopup = function(popupId, callBackFnc, rtnObj) {

    requires("uiplugin.popup");
    if (typeof callBackFnc !== "undefined") {
        var func = window.scwin[callBackFnc];
        if(typeof func === "function") {
            if (typeof rtnObj !== "undefined") {
                var rtnStr = strLib.serialize(rtnObj);
                func(rtnStr);
            } else {
                func();
            }
        } else {
            var func = eval(callBackFnc);
            if(typeof func === "function") {
                if (typeof rtnObj !== "undefined") {
                    var rtnStr = strLib.serialize(rtnObj);
                    func(rtnStr);
                } else {
                    func();
                }
            }
        }     
    }
    WebSquare.util.closePopup(popupId);
};

/**
 * 
 * 팝업창을 닫는다.
 * 
 * @date 2014. 12. 9.
 * @memberOf comLib
 * @param {String} id Popup창 id
 * @param {String} url 화면경로
 * @param {Object} options Popup창 파라미터 Object
 * @author Park, Sang Kyu
 * @example
 * comLib.openPopup("alert", "/template/common/xml/zzAlertPop.xml", options);
 */
comLib.openPopup = function(id, url, options) {

    var width = options.width || "400";
    var height = options.height || "400";

    var left = options.left || -1;
    var top = options.top || -1;
    
    if (left > 0) {
        left = left + (self.screenLeft || window.screenX);
    } else {
        left = Math.floor((document.body.clientWidth - width) / 2);
    }
    if (top > 0) {
        top = top + (self.screenTop || window.screenY);
    } else {
        top = Math.floor((document.body.clientHeight - height) / 2);
    }
    
    requires("uiplugin.popup");
    var options = {
        id : id,
        type : options.type || "litewindow", // window, litewindow
        width : width + "px",
        height : height + "px",
        top : top, // useIframe이 true인 경우 브라우져를 기준 false인 경우 모니터를 기준으로 한다.
        left : left,
        popupName : options.title || "", // useIframe : true시 popup 객체의 이름으로 popup 프레임의 표시줄에 나타납니다.
        modal : options.modal || false, // modal을 이용해서 뒤 쪽 배경을 동작하지 않도록 만들기 위한 인자 입니다. false이면 뒤쪽의 컴퍼넌트가 사용 가능합니다.
        useIFrame : options.useIFrame || false,// true : IFrame 을 사용하는 WebSquare popup / false: window.open 을 사용하는 popup
        style : "", // popup의 스타일을 지정합니다. 값이 있으면 left top width height는 적용되지 않습니다.
        resizable : options.resizable || false,
        status : false,
        menubar : false,
        scrollbars : options.scrollbar || false,
        title : options.title || false,
        xml : strLib.serialize(options.popupParam) || "", // popup에 넘길 xmlDocument의 string popup창에서 WebSquare.uiplugin.popup.getPopupParam() api를 사용하여 가져올수 있습니다.
        srcData : "", // popup 객체의 type 이 window 일 때 Parent 에서 넘길 xpath
        destData : "" // popup 객체의 type 이 window 일 때 popup 에 설정할 xpath
    };

    try {
        WebSquare.util.openPopup(ajaxLib.CONTEXT_PATH + url, options);
    } catch(e) { 
        $w.log("[comLib.openPopup] Exception :: " + e.message);
    } finally {
        options = null;
    }
};

/**
 * 
 * 현재 화면이 팝업인지 아닌지 여부 판단한다.
 * 
 * @date 2014. 12. 9.
 * @memberOf comLib
 * @author Park, Sang Kyu
 * @example
 * var isPopup = comLib.isPopup();
 */
comLib.isPopup = function()
{
    try {
        if (typeof window.opener == "undefined") {
            return  false;
        } else if (window.opener.closed) {
            return  false;
        } else {
            return  true;
        }
    } catch (e) {
        $w.log("[comLib.isPopup] Exception :: " + e.message);
        return  false;
    }
};

/**
 * 
 * Array Object 확인한다.
 * 
 * @date 2014. 12. 9.
 * @memberOf comLib
 * @param <Object> Object Array Object
 * @returns {Boolean}
 * @author Park, Sang Kyu
 * @example
 * var isArray = comLib.isArrayObj(arrObj);
 */
comLib.isArrayObj = function(targetObj) {
    if (typeof targetObj != 'undefined' && typeof targetObj == "object") {
        if (targetObj.constructor.name && targetObj.constructor.name.toLowerCase() == "array")
            return true;
        if (targetObj.constructor && targetObj.constructor === Array)
            return true;
    }
    return false;
};

/**
 * 
 * 쿠키 값을 셋팅한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @param <String> name 쿠키 명
 * @param <String> value 쿠키 값
 * @param <Number> 저장할 기간 (일)
 * @author Park, Sang Kyu
 * @example
 * comLib.setCookie("userid", "done", 7)
 */
comLib.setCookie = function(name, value, expiredays) {
    var today = new Date();
    today.setDate(today.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + today.toGMTString() + ";";
};

/**
 * 
 * 셋팅한 쿠키 값을 가져온다.
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @param <String> name 쿠키 명
 * @param <String> value 쿠키 값
 * @return <String> 쿠키 명에 해당하는 쿠키 값 가져온다.
 * @author Park, Sang Kyu
 * @example
 * var ret = comLib.getCookie("userid");
 */
comLib.getCookie = function(name) {
    var cook = document.cookie + ";";
    var idx = cook.indexOf(name, 0);
    var val = "";
    if (idx != -1) {
        cook = cook.substring(idx, cook.length);
        begin = cook.indexOf("=", 0) + 1;
        end = cook.indexOf(";", begin);
        val = unescape(cook.substring(begin, end));
    }
    return val;
};

/**
 * 
 * 새창을 띄울때 해상도에 맞춰 최대크기로 창의 크기를 조정한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @author Park, Sang Kyu
 * @example
 * comLib.setPageFull()
 */
comLib.setPageFull = function() {
    top.window.moveTo(0, 0);
    if (document.all) {
        top.window.resizeTo(screen.availWidth, screen.availHeight);
    } else if (document.layer || document.getElementById) {
        if (top.window.outerHeight < screen.availHieght || top.window.outerWidth < screen.availWidth) {
            top.window.outerHeight = screen.availHieght;
            top.window.outerWidth = screen.availWidth;
        }
    }
};

/**
 * 
 * 새창을 띄울때 해상도에 맞춰 최대크기로 창의 크기를 조정한다. (기준 : 1280*1024)
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @author Park, Sang Kyu
 * @example
 * comLib.setPageFull2()
 */
comLib.setPageFull2 = function() {
    // 1280*1024 기준으로 띄우기
    var sWidth = screen.availWidth;
    var sHeight = screen.availHeight;
    if (sWidth > 1280)
        sWidth = 1280;
    if (sHeight > 1024)
        sHeight = 1024;
    top.window.moveTo(0, 0);
    if (document.all) {
        top.window.resizeTo(sWidth, sHeight);
    } else if (document.layer || document.getElementById) {
        if (top.window.outerHeight < sHeight || top.window.outerWidth < sWidth) {
            top.window.outerHeight = sHeight;
            top.window.outerWidth = sWidth;
        }
    }
};

/**
 * 
 * 객체를 클리어한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @param <Object> 클리어 대상 오브젝트
 * @author Park, Sang Kyu
 * @example
 * comLib.setPageFull2()
 */
comLib.clearObject = function(object) {
    for ( var key in object) {
        object[key] = null;
    }
    object = null;
};

/**
 * 
 * 객체에 onclick, onkeyup 이벤트 발생 시, 실행할 함수를 바인딩한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @param <String> eventName 이벤트 이름 (onclick, onkeyup)
 * @param <String> objArr에 붙는 object prefix
 * @param <Object> btnArr 버튼 객체 배열 ("이벤트", ["버튼 아이디1", "버튼 아이디2"]) 
 * @param <Object> objFunc 함수 객체 또는 배열 
 * @author Park, Sang Kyu
 * @example 
 * comLib.bindEventForObject("onclick", "btn_", ["InsertCode", "DeleteCode", "SaveCode", "CancelCode", "ExcelCode"]);
 * comLib.bindEventForObject("onkeyup", "grd_", ["CodeGrp"], ["changeGridView"]);
 * 
 * // 1. 버튼 자동 바인딩을 위해서는 버튼으로 사용한 컴포넌트 ID를 'btn_' + '버튼 아이디'로 정의해야 한다. 
 * // btn_InsertCodeGrp, btn_DeleteCodeGrp
 * // 2. 버튼의 onClick 이벤트에 바인딩할 함수 이름을 'scwin.' + '버튼 아이디'로 정의해야 한다. 
 * // scwin.insertCode, scwin.deleteCode
 */
comLib.bindEventForObject = function(eventName, objPrefix, objArr, objFunc) {
    for ( var i = 0; i < objArr.length; i++) {
        try {
            var comObject = null;
            if (typeof objArr[i] === "string") {
                comObject = WebSquare.util.getComponentById(objPrefix + strLib.firstUpperCase(objArr[i]));
                if (typeof comObject === "undefined") {
                    $w.log("[comLib.bindEventForObject] 바인딩할" + objArr[i] + " 객체를 찾을 수 없습니다.");
                    continue;
                }
            }
            
            if (typeof comObject !== "undefined") {
                
                var funcName = null;
                if (typeof objFunc === "undefined") {
                    funcName = strLib.firstLowerCase(objArr[i]);
                } else {
                    if (typeof objFunc === "string") {
                        funcName = strLib.firstLowerCase(objFunc);
                    } else {
                        funcName = strLib.firstLowerCase(objFunc[i]);
                    }
                }
                
                if (typeof window.scwin[funcName] === "function") {
                    comObject.setUserData(eventName + "Func", funcName);
                    comObject.bind(eventName, function(e) {
                        var eventFuncName = this.getUserData(eventName + "Func");
                        var eventfunc = window.scwin[eventFuncName];
                        if(typeof eventfunc === "function") {
                            eventfunc(e);
                        } else {
                            $w.log("[comLib.bindEventForObject] " + eventFuncName + " 함수를 찾을 수 없습니다.");
                        }
                    });
                } else {
                    $w.log("[comLib.bindEventForObject] 바인딩할 " + funcName + " 함수를 찾을 수 없습니다.");
                }
            }
        } catch(e) { 
            $w.log("[comLib.bindEventForObject] Exception :: " + e.message);
        } finally {
            comObject = null;
        }
    }
};

/**
 * 
 * 그룹 안에 객체에 onclick, onkeyup 이벤트 발생 시, 실행할 함수를 바인딩한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @param <String> eventName 이벤트 이름 (onclick, onkeyup)
 * @param <Object> grpObj 그룹 객체
 * @param <Object> objFunc 함수 객체 또는 배열 
 * @author Park, Sang Kyu
 * @example 
 * comLib.bindEventForGroup("onkeyup", grp_AuthorityDetail, "changeGrpAuthority");
 */
comLib.bindEventForGroup = function(eventName, grpObj, objFunc) {
    var objArr = WebSquare.util.getChildren(grpObj, {
        excludePlugin : "group trigger textbox output calendar image span",
        recursive : true
    });
    comLib.bindEventForObject(eventName, "", objArr, objFunc);
};

/**
 * 해당 그룹 안의 컴포넌트에서 엔터키가 발생하면 해당 컴포넌트의 값을 DataColletion에 저장하고 objFunc 함수를 실행한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @param <Object> grpObj 그룹 객체
 * @param <Object> objFunc 함수 객체
 * @param <Number> rowIndex DataList인 경우 현재 포커스된 DataList의 focusedRowIndex (ex. gridView1.getFocusedRowIndex())
 *               DataMap인 경우에는 rowIndex는 생략하면 됨
 * @example 
 * comLib.setEnterKeyEvent(grp_AuthorityDetail, scwin.search);
 * comLib.setEnterKeyEvent(grp_AuthorityDetail, scwin.search, gridView1.getFocusedRowIndex());
 */
comLib.setEnterKeyEvent = function(grpObj, objFunc, rowIndex) {
    
    var objArr = WebSquare.util.getChildren(grpObj, {
        excludePlugin : "group trigger textbox output calendar image span",
        recursive : true
    });
    
    try {
        for (var i = 0; i < objArr.length; i++) {
            try {
                if (typeof objFunc === "function") {
                    objArr[i].bind("onkeyup", function(e) {
                        if (e.keyCode === 13) {
                            if (typeof this.getRef === "function") {
                                var ref = this.getRef();
                                var refArray = ref.substring(5).split(".");
                                if ((typeof refArray !== "undefined") && (refArray.length === 2)) {
                                    var dataCollectionName = refArray[0];
                                    var columnId = refArray[1];
                                    var dataCollection = WebSquare.util.getComponentById(dataCollectionName);
                                    var dataType = dataCollection.getObjectType().toLowerCase();
                                    if (dataType === "datamap") {
                                        dataCollection.set(columnId, this.getValue());
                                    } else if ((dataType === 'datalist') && (typeof rowIndex !== "undefined")) {
                                        dataCollection.setCellData(rowIndex, columnId, this.getValue());
                                    }
                                }
                                objFunc();
                            }
                        }
                    });
                }
            } catch(e) { 
                $w.log("[comLib.setEnterKeyEvent] Exception :: " + e.message);
            } finally {
                dataCollection = null;
            }
        }
    } catch(e) { 
        $w.log("[comLib.setEnterKeyEvent] Exception :: " + e.message);
    } finally {
        objArr = null;
    }
}

/**
 * 세션의 정보를 조회한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @example 
 * var sessionInfo = comLib.getSessionInfo();
 */
comLib.getSessionInfo = function() {
    var option = {
        action : "serviceId=CM0001&action=IN",
        mode : "synchronous"
    };
    var result = ajaxLib.executeAjax(option);

    var obj = JSON.parse(result);
    return obj;
};

/**
 * GridView의 데이터를 엑셀 파일로 다운로드한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @param <Object> grdViewObj 엑셀 파일로 다운로드 받을 GridView 객체
 * @param <Object> options JSON형태로 저장된 그리드의 엑셀 다운로드 옵션
 * | options.fileName        : [defalut: excel.xls] 다운로드하려는 파일의 이름
 * | options.sheetName      : [defalut: sheet] excel의 sheet의 이름
 * | options.type            : [defalut: 0] type이 0인 경우 실제 데이터 1인 경우 눈에 보이는 데이터를  2이면 들어가 있는 data 그대로(filter무시 expression 타입의 셀은 나오지 않음)
 * | options.removeColumns  : [defalut: 없음] 다운로드시 excel에서 삭제하려는 열의 번호(여러 개일 경우 ,로 구분)
 * | options.removeHeaderRows : [defalut: 없음] 다운로드시 excel에서 삭제하려는 Header의 row index(여러 개일 경우 ,로 구분)
 * | options.foldColumns      : [defalut: 없음] 다운로드시 excel에서 fold하려는 열의 번호(여러 개일 경우 ,로 구분)
 * | options.startRowIndex  : [defalut: 0] excel파일에서 그리드의 데이터가 시작되는 행의 번호(헤더 포함)
 * | options.startColumnIndex : [defalut: 0] excel파일에서 그리드의 데이터가 시작되는 열의 번호(헤더 포함)
 * | options.headerColor      : [defalut: #33CCCC] excel파일에서 그리드의 header부분의 색
 * | options.bodyColor      : [defalut: #FFFFFF] excel파일에서 그리드의 body부분의 색
 * | options.subTotalColor  : [defalut: #CCFFCC] excel파일에서 그리드의 subtotal부분의 색
 * | options.footerColor      : [defalut: #008000] excel파일에서 그리드의 footer부분의 색
 * | options.showProcess      : [defalut: true] 다운로드 시 프로세스 창을 보여줄지 여부
 * | options.massStorage      : [defalut: true] 대용량 다운로드 여부 (default는 true 이 옵션을 true로 하고 showConfirm을 false로 한 경우에 IE에서 신뢰할만한 사이트를 체크하는 옵션이 뜬다.)
 * | options.showConfirm      : [defalut: false] 다운로드 확인창을 띄울지 여부(옵션을 킨 경우 advancedExcelDownload를 호출후 사용자가 window의 버튼을 한번더 클릭해야 한다. massStorage는 자동으로 true가 된다)
 * | options.dataProvider    : [defalut: 없음] 대량데이터 처리 및 사용자 데이터를 가공할 수 있는 Provider Package
 * | options.providerRequestXml   : [defalut: 없음] Provider 내부에서 사용할 XML 문자열
 * | options.userDataXml      : [defalut: 없음] 사용자가 서버모듈 개발 시 필요한 데이터를 전송 할 수 있는 변수
 * | options.bodyWordwrap    : [defalut: false] 다운로드시 바디의 줄 바꿈 기능
 * | options.useEuroLocale  : [defalut: false] 다운로드시 유로화 처리 기능(,와 .이 반대인 경우처리)
 * | options.useHeader      : [defalut: true] 다운로드시 Header를 출력 할지 여부( "true"인경우 출력, "false"인경우 미출력)
 * | options.useSubTotal      : [defalut: false] 다운로드시 SubTotal을 출력 할지 여부( "true"인경우 출력, "false"인경우 미출력)
 * | options.useFooter      : [defalut: true] 다운로드시 Footer를 출력 할지 여부( "true"인경우 출력, "false"인경우 미출력)
 * | options.separator      : [defalut: ,] 다운로드시 서버로 데이터 전송할때, 데이터를 구분짓는 구분자, default는 comma(,)
 * | options.subTotalScale  : [defalut: -1] 다운로드시 subTotal 평균계산시 소수점 자리수를 지정
 * | options.subTotalRoundingMode  : [defalut: 없음] 다운로드시 subTotal 평균계산시 Round를 지정 한다. ("CEILING","FLOOR","HALF_UP")
 * | options.useStyle        : [defalut: false] 다운로드시 css를 제외한, style을 excel에도 적용할 지 여부 (배경색,폰트)
 * | options.printSet JSON형태로 저장된 Excel Print관련 설정
 * | options.printSet.fitToPage : [defalut: false] 엑셀 프린터 출력시 쪽맞춤 사용 유무 
 * | options.printSet.landScape : [defalut: false] 엑셀 프린터 출력시 가로 방향 출력 유무
 * | options.printSet.fitWidth  : [defalut: 1] 엑셀 프린터 출력시 용지너비
 * | options.printSet.fitHeigth : [defalut: 1] 엑셀 프린터 출력시 용지높이
 * | options.printSet.scale   : [defalut: 100] 엑셀 프린터 출력시 확대/축소 배율, scale을 사용할 경우 fitToPage는 false로 설정 해야 한다.
 * 
 * @param <Object> infoArr 그리드에 대한 내용을 추가로 다른 셀에 표현하는 경우 사용하는 배열
 * | infoArr.rowIndex        : 내용을 표시할 행번호  
 * | infoArr.colIndex        : 내용을 표시할 열번호
 * | infoArr.rowSpan          : 병합할 행의 수 
 * | infoArr.colSpan          : 병합할 열의 수
 * | infoArr.text            : 표시할 내용
 * | infoArr.textAlign      : 표시할 내용의 정렬 방법 (left, center, right)
 * | infoArr.fontSize        : font size 설정 ( ex) "20px" )
 * | infoArr.color          : font color 설정 ( ex) "red" )
 * | infoArr.fontWeight    : font weight 설정 ( ex) "bold" )
 * | infoArr.drawBorder    : cell의 border 지정 ( ex) true )
 * 
 * @example
 * var options = {
 *   fileName:         "user.xls", 
 *   type:             "1", 
 *   removeColumns:   "", 
 *   foldColumns:       "", 
 *   startRowIndex:   3, 
 *   startColumnIndex:   0, 
 *   headerColor:       "#DBEEF3", 
 *   footerColor:       "#92CDDC", 
 *   showProcess:       true, 
 *   dataProvider:     "",
 *   useStyle:         true
 * }; 
 *
 * var infoArr = []; 
 * var infoObj = {
 *   rowIndex:   1, 
 *   colIndex:   0, 
 *   rowSpan:   1, 
 *   colSpan:   3, 
 *   text:     "그리드 다운로드 샘플", 
 *   textAlign:  "left" 
 * }; 
 * infoArr.push(infoObj);
 */
comLib.downloadExcel = function(grdViewObj, options, infoArr) {
    if (grdViewObj.getTotalRow() > 0) {
        grdViewObj.advancedExcelDownload(options, infoArr);
    } else {
        comLib.alert("내려받을 데이터가 존재하지 않습니다.");
    }
    
};

/**
 * GridView에 엑셀 파일 데이터 업로드한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @param <Object> grdViewObj 엑셀 파일의 데이터를 업로드할 GridView 객체
 * @param <Object> options JSON형태로 저장된 그리드의 엑셀 업로드 옵션
 * | options.type            : [defalut: 0] 1이면 엑셀 파일이 그리드의 보이는 결과로 만들어져있을때  0이면 엑셀 파일이 그리드의 실제 데이터로 구성되어있을때 
 * | options.sheetNo          : [defalut: 0] excel파일에서 그리드의 데이터가 있는 sheet번호
 * | options.startRowIndex  : [defalut: 0] excel파일에서 그리드의 데이터가 시작되는 행의 번호(헤더 포함)
 * | options.startColumnIndex : [defalut: 0] excel파일에서 그리드의 데이터가 시작되는 열의 번호
 * | options.headerExist      : [defalut: 0] excel파일에서 그리드의 데이터에 header가 있는지 여부(1이면 header 존재 0이면 없음)
 * | options.footerExist      : [defalut: 1] excel파일에서 그리드의 데이터에 footer가 있는지 여부(1이면 footer 존재 0이면 없음 기본값은 1 그리드에 footer가 없으면 적용되지 않음)
 * | options.append        : [defalut: 0] excel파일에서 가져온 데이터를 그리드에 append시킬지 여부(1이면 현재 그리드에 데이터를 추가로 넣어줌 0이면 현재 그리드의 데이터를 삭제하고 넣음)
 * | options.hidden        : [defalut: 0] 읽어들이려는 엑셀파일에 hidden column이 저장되어 있는지 여부를 설정하는 int형 숫자(0이면  엑셀파일에 hidden 데이터가 없으므로 그리드 hidden column에 빈 데이터를 삽입  1 : 엑셀파일에 hidden 데이터가 있으므로 엑셀 파일로부터 hidden 데이터를 삽입 ) 
 * | options.fillHidden    : [defalut: 0] Grid에 hiddenColumn에 빈 값을 넣을지를 결정하기 위한 int형 숫자(1이면 hidden Column에 빈 값을 저장하지 않음,0이면 hidden column이 저장되어있지 않은 Excel File이라 간주하고 hidden Column에 빈 값을 넣어줌)(hidden이 0인 경우에는 fillhidden은 영향을 끼치지 않음) 
 * | options.skipSpace      : [defalut: 0] 공백무시 여부(1이면 무시 0이면 포함)
 * | options.insertColumns  : radio, checkbox와 같은 컬럼을 엑셀에서 받아 오지 않고, 사용자 컬럼 설정 으로 업로드 ( 데이터 구조 : [ { columnIndex:1, columnValue:"1" } ] )   
 * | options.popupUrl        : 업로드시에 호출할 popup의 url
 * 
 * @example
 * var options = {};
 * options.headerExist ="1"; //헤더의 존재 여부 입니다.
 * options.startRowIndex = "3"; //excel파일에서 gird의 데이터가 시작되 row의 index입니다..(헤더 포함)
 * options.startColumnIndex = "0";  //excel파일에서 gird의 데이터가 시작되는 column의 index입니다.(헤더 포함)
 * options.sheetNo=0; //excel의 sheet번호입니다.
 * options.append ="0";  //append 여부입니다. 0이면 append하지 않고 새로 쓰고 1이면 그리드의 뒤쪽에 데이터를 추가로 붙여줍니다.
 * options.hidden ="1";  //1이면 그리드에서 엑셀 다운로드시에 hidden을 포함했다는 의미입니다. 즉 upload시에 그리드의 hidden Column에 값을 넣는다는 의미입니다.
 */
comLib.uploadExcel = function(grdViewObj, options) {
    grdViewObj.advancedExcelUpload(options); //엑셀 업로드를 시작합니다.
};

/**
 * GridView와 바인딩된 DataList 객체를 반환한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @param <Object> gridViewObj
 * @returns {Boolean}
 */
comLib.getGridViewDataList = function(gridViewObj) {
    var dataListId = gridViewObj.getDataList();

    if (dataListId !== "") {
        var dataList = WebSquare.util.getComponentById(dataListId);
        if ((typeof dataList === "undefined") || (dataList === null)) {
            $w.log("DataList(" + dataListId + ")를 찾을 수 없습니다.");
            return null;
        } else {
            return dataList;
        }
    } else {
        $w.log(grd_Code.getID() + "는 DataList가 세팅되어 있지 않습니다.");
        return null;
    } 
};

/**
 * DataList와 DataMap에 변경된 데이터를 반환한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @param <Object> dcObj 데이터 컬렉션 컴포넌트 (DataList or DataMap)
 * @param <String> rowStatus rowStatus 컬럼이 없는 경우 Default Row 상태 ("C" : Create, "U" : Update, "D" : Delete)
 * @param <String> key JSON 데이터의 키 값
 * @example
 * var modifiedData = comLib.getModifiedData(dlt_CodeGrp);
 */
comLib.getModifiedData = function(dcObj, rowStatus, keyData) {
    
    if (typeof dcObj !== "undefined") {
        var dataType = dcObj.getObjectType().toLowerCase();

        var key = "data";
        if ((typeof keyData !== "undefined") && (keyData !== "")) {
            key = keyData;
        }
        
        if (dataType === "datamap") {
            var modifiedData = $w.data.get("JSON", [{"id" : dcObj.getID(), "key" : key, action : "modified"}]);
            if (typeof rowStatus === "undefined") {
                modifiedData.data.rowStatus = "U";
            } else {
                modifiedData.rowStatus = rowStatus;
            }
            return modifiedData;
        } else if (dataType === 'datalist') {
            return $w.data.get("JSON", [{"id" : dcObj.getID(), "key" : key, action : "modified"}]);
        }
    }
};

/**
 * GridView 업데이트 이전 상태로 RollBack한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @param <Object> gridViewObj GridView 객체
 * @param <Number> rowIndex RollBack 후에 포커스를 이동할 Row Index
 * @param <String> rowCol RollBack 후에 포커스를 이동할 Column Index or Column Id
 * @param <String> chkHeaderId RollBack 후에 GridView Header에 Uncheck할 CheckBox Id
 * @example 
 * comLib.rollbackGridView(grd_Code);
 * comLib.rollbackGridView(grd_Code, 0, "GRP_CD", "chkHeader");
 */
comLib.rollbackGridView = function(gridViewObj, rowIndex, column, chkHeaderId) {
    try {
        if ((typeof gridViewObj === "object") && (typeof gridViewObj.getPluginName === "function") && (gridViewObj.getPluginName() === "gridView")) {
            var dltObj = comLib.getGridViewDataList(gridViewObj);
            if (dltObj === null) {
                return;
            }
            
            dltObj.removeRows(dltObj.getInsertedIndex());
            dltObj.removeRows(dltObj.getRowIndexByStatus("V"));
            dltObj.undoAll();
            
            if ((typeof rowIndex !== "undefined") && (typeof column !== "undefined")) {
                gridViewObj.setFocusedCell(rowIndex, column);
            }
             
            if (typeof chkHeaderId !== "undefined") {
                chkHeaderId = "chkHeader";
            }
            
            if (typeof  gridViewObj.getHeaderIndex(chkHeaderId) !== "undefined") {
                gridViewObj.setHeaderValue(chkHeaderId, "0");
            }
        }
    } catch(e) { 
        $w.log("[comLib.rollbackGridView] Exception :: " + e.message);
    } finally {
        dltObj = null;
    }
};

/**
 * GridView의 행을 삭제한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @param <Object> gridViewObj
 * @example
 * // GridView의 행 삭제를 위한 checkBox 컬럼의 아이디를 "chk"로 하고 값은 1: checked, 0: unchecked로 설정해야 한다.
 * comLib.removeGridView(grd_CodeGrp);
 */

comLib.removeGridView = function(gridViewObj) {
    try {
        if ((typeof gridViewObj === "object") && (typeof gridViewObj.getPluginName === "function") && (gridViewObj.getPluginName() === "gridView")) {
            var dltObj = comLib.getGridViewDataList(gridViewObj);
            if (dltObj === null) {
                return;
            }
            
            var checkedIdxArr = dltObj.getMatchedIndex("CHK", "1", true, 0, dltObj.getRowCount());
            if (checkedIdxArr.length > 0) {
                for (var i = 0; i < checkedIdxArr.length; i++) {
                    dltObj.deleteRow(checkedIdxArr[i]);
                }
            } else {
                dltObj.deleteRow(gridViewObj.getFocusedRowIndex());
            }
        }
    } catch(e) { 
        $w.log("[comLib.removeGridView] Exception :: " + e.message);
    } finally {
        dltObj = null;
    }
};

/**
 * 전체 공통 코드 데이터를 요청한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 */
comLib.getAllCode = function() {
    var option = {action : "code/getCodeList", success : "comLib.setAllCodeCallback", isShowMeg : false};
    ajaxLib.executeAjax(option);
};

/**
 * 전체 공통 코드 데이터 요청에 대한 콜백 함수로 전역 공간에 코드 데이터를 저장한다.  
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @param <Object> resBody
 * @param <Object> e
 */
comLib.setAllCodeCallback = function(resBody, e) {
    WebSquare.session.setAttribute("code", strLib.serialize(resBody.data));
};

/**
 * 공통 코드 DataList를 생성한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 */
comLib.createCodeDataList = function() {
    var option = {"id" :"dlt_Code" ,
                  "type" : "dataList" ,
                  "option":{ "baseNode": "list", "repeatNode": "map"},
                  "columnInfo":[{"id":"GRP_CD", "name":"코드그룹", "dataType":"text"},
                                {"id":"COM_CD", "name":"코드", "dataType":"text"},
                                {"id":"CODE_NM", "name":"코드이름", "dataType":"text"},
                                {"id":"ATTR_VALUE1", "name":"속성값1", "dataType":"text"}]
                 };

    $w.data.create(option);
    
    var codeJsonStr = WebSquare.session.getAttribute("code");
    dlt_Code.setJSON(jsonLib.parse(codeJsonStr));
};

/**
 * 공통코드 LinkedDataList를 생성한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 */
comLib.createCodeLinkedDataList = function(filterCond) {

    for ( var i = 0 ; i < filterCond.length ; i++) {
        var grpCd = filterCond[i].substring(9);
        var option = {"id" :filterCond[i] ,
                      "type" : "linkedDataList" ,
                      "option" : { "valueAttribute" : "",
                                   "bind" : "dlt_Code", "filterCondition" : "GRP_CD == '" + grpCd + "'", "sortCondition": ""}
                     };
        $w.data.create(option);
    }
};

/**
 * 공통 코드를 생성한다.
 * 
 * @date 2014. 12. 10.
 * @param <Object> filterCond
 * @memberOf comLib
 * @example 
 * comLib.setCode(["ldt_Code_20", "ldt_Code_19", "ldt_Code_18"]);
 */
comLib.setCode = function(fiterCond) {
    comLib.createCodeDataList();
    comLib.createCodeLinkedDataList(fiterCond);
};

/**
 * 공통 코드를 생성하고, 공통 코드를 사용하는 객체에 설정한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @param <Object> options
 * @example 
 * <br/>var codeOption1 = [{group : "20", object : [sbx_OrgClassCd] }];
 * <br/>comLib.setCodeObject(codeOption1);
 * <br/>
 * <br/>var codeOption2 = [{group : "01", object : [sbx_Duty1, sbx_Duty2] }, 
 * <br/>                   {group : "02", object : [sbx_Postion1, sbx_Postion2] },
 * <br/>                   {group : "04", object : [sbx_Religion] }];
 * <br/>comLib.setCodeObject(codeOption2);
 */
comLib.setCodeObject = function(options) {
    comLib.createCodeDataList();

    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            var grpCd = options[key].group;
            var option = {"id" : "ldt_Code_" + grpCd,
                          "type" : "linkedDataList" ,
                          "option" : { "valueAttribute" : "",
                                       "bind" : "dlt_Code", "filterCondition" : "GRP_CD == '" + grpCd + "'", "sortCondition": ""}
                         };
            $w.data.create(option);
            
            var objects = options[key].object;
            for (var objKey in objects) {
                if (objects.hasOwnProperty(objKey)) {
                    var object = objects[objKey];
                    object.setNodeSet("data:ldt_Code_" + grpCd, "CODE_NM", "COM_CD");
                }
            }
        }
    } 
};

/**
 * 다국어 지원을 처리 서비스를 호출한다.
 * 
 * @date 2015. 03. 03.
 * @memberOf comLib
 */
comLib.getI18NUrl = function() {
    var locale = WebSquare.cookie.getCookie( "locale" );
    if( locale == null || locale == '' ) {
        return ajaxLib.CONTEXT_PATH + "/websquare/engine/servlet/I18N.jsp?w2xPath=";
    } else{
        return ajaxLib.CONTEXT_PATH + "/websquare/engine/servlet/I18N.jsp?locale="+unescape(locale)+"&w2xPath=";}
};


/* ==========================================================================================
 * 해당 프로젝트에서 새로 만든 메소드들을 정의한다.
 * ========================================================================================== */
