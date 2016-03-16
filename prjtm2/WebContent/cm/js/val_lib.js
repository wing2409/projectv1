/**
 * @target 유효성 검사를 위한 공통 함수
 */

/**
 * @type valLib
 */
var valLib = {};

valLib.status = {
    isValid : true,
    objectName : "",
    columnId : "",
    rowIndex : 0,
    message : ""
}; // 유효성 검사 상태

/**
 * 유효성 검사 정보를 초기화한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf valLib
 */
valLib.initValStatus = function() {
    valLib.status.isValid = true;
    valLib.status.objectName = "";
    valLib.status.columnId = "";
    valLib.status.rowIndex = 0;
    valLib.status.message = "";
};

/**
 * 그룹안에 포함된 컴포넌트의 입력 값에 대한 유효성을 검사한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf valLib 
 * @param <Object> grpObj 그룹 컴포넌트 객체
 * @param <Object> dcObj 데이터 컬렉션 객체 (DataList or DataMap)
 * @returns <Boolean> 유효성 검사 결과
 * @example 
 * if (valLib.validateGroup(grp_LoginInfo, dlt_Code) === false) { 
 * <br/>   return; (valLib.status.isValid === false)
 * <br/>}
 * @description
 * <※ 필수 입력, 입력 허용 문자, 입력 허용 불가 문자, 최대, 최소 입력 문자수 설정은 컴포넌트의 속성에서 설정한다. 
 * <br/>- mandatory : 필수 입력 항목 여부 
 * <br/>- allowChar : 입력 허용 문자 
 * <br/>- ignoreChar : 입력 허용 불가 문자 
 * <br/>- maxLength : 최대 입력 문자수 
 * <br/>- maxByteLength : 최대 입력 바이트수 
 * <br/>- minLength : 최소 입력 문자수 
 * <br/>- minByteLength : 최소 입력 바이트수
 */
valLib.validateGroup = function(grpObj, dcObj) {
    if (valLib.checkModified(dcObj) === false) {
        return false;
    }

    valLib.initValStatus();
    
    var objArr = WebSquare.util.getChildren(grpObj, {
        excludePlugin : "group trigger textbox output calendar image span anchor",
        recursive : true
    });
    
    var i = 0;
    try {
        for (i = 0; i < objArr.length; i++) {
            objArr[i].validate();
            if (valLib.status.isValid === true) {
                valLib.extendValidation(objArr[i]);
                if (valLib.status.isValid === false) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    } catch(e) { 
        $w.log("[valLib.validateGroup] Exception - ID : " + objArr[i].getID() + ", Plugin : " + objArr[i].getPluginName() + ", message : " + e.message);
    } finally {
        objArr = null;
    }
};

/**
 * 유효성 검사 실패시 출력할 메시지를 반환한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf valLib
 * @returns {String} 메시지
 */
valLib.validateMsg = function() {
    var msg = "";
    var invalidType = this.getType(); // invalid 타입
    var invalidValue = this.getValue(); // invalid 타입별 설정값
    var callerObj = this.getCaller(); // validator를 호출한 컴포넌트
    var columnName = valLib.getColumnName(callerObj);

    switch (invalidType) {
    case "mandatory":
        msg = strLib.attachPostposition(columnName) + "필수 입력 항목 입니다.";
        break;
    case "minLength":
        msg = strLib.attachPostposition(columnName) + "최소 길이 " + invalidValue + "자리 이상으로 입력해야 합니다.";
        break;
    case "minByteLength":
        msg = strLib.attachPostposition(columnName) + "최소 길이 " + invalidValue + "바이트 이상으로 입력해야 합니다.";
        break;
    }

    if (msg !== "") {
        valLib.status.isValid = false;
    }

    valLib.status.objectName = callerObj.getID();
    comLib.alert(msg, "valLib.groupValidationCallback");
};

/**
 * 추가적으로 확장한 사용자 정의 유효성 검사를 수행한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf valLib
 * @param <Object> comObj 유효성 검증 대상 컴포넌트 객체
 * @description
 * 1. isHangul
 * <br/>   - 한글 포함 여부 검사한다. 
 * <br/>   - false : 한글이 포함되면 안됨 
 * <br/>   - 컴포넌트 태그에 'isHangul'이라는 사용자 정의 속성을 추가한다.
 * <br/>   - ex. <xf:input id="ibx_AuthorityCd" mandatory="true" maxlength="5" minlength="5" isHangul="false"></xf:input> 
 * <br/>2. isEmail
 * <br/>   - 이메일 유효성을 검사한다.
 * <br/>   - true : 입력받은 이메일 주소에 대한 검사를 수행한다.
 * <br/>   - 컴포넌트 태그에 'isEmail'이라는 사용자 정의 속성을 추가한다.
 * <br/>   - ex. <xf:input id="ibx_AuthorityCd" mandatory="true" maxlength="5" minlength="5" isEmail="true"></xf:input> 
 */
valLib.extendValidation = function(comObj) {
    var isHangul =  comObj.getUserData("isHangul");
    var isEmail =  comObj.getUserData("isEmail");
    
    if ((typeof isHangul !== "undefined") && (isHangul === "false")) {
        if (strLib.isKoreanWord(comObj.getValue()) === true) {
            valLib.status.isValid = false;
            valLib.status.objectName = comObj.getID();
            var columnName = valLib.getColumnName(comObj);
            comLib.alert(columnName + "은(는) 한글을 입력해서는 안됩니다.");
            return;
        }
    } else if ((typeof isEmail !== "undefined") && (isEmail === "true")) {
        if (valLib.isEmail(comObj.getValue()) === false) {
            valLib.status.isValid = false;
            valLib.status.objectName = comObj.getID();
            var columnName = valLib.getColumnName(comObj);
            comLib.alert(columnName + "은(는) 이메일 주소 형식이 올바르지 않습니다.", "valLib.groupValidationCallback");
            return;
        }
    }
};

/**
 * 유효성 검사 실패에 대한 Alert 메시지 창이 닫힌 후에 수행되는 콜백 함수이다.
 * 
 * @date 2014. 12. 10.
 * @memberOf valLib
 * @returns
 */
valLib.groupValidationCallback = function() {
    if (valLib.status.objectName !== "") {
        var obj = WebSquare.util.getComponentById(valLib.status.objectName);
        obj.focus();
    }
};

/**
 * 특정 컴포넌트에 바인된 DataList나 DataMap의 컬럼 이름을 반환한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf valLib
 * @param <Object> callerObj 컴포넌트
 * @return <String> 컬럼명
 */
valLib.getColumnName = function(comObj) {
    try {
        if ((typeof comObj.getRef) === "function") {
            var ref = comObj.getRef();
            var refArray = ref.substring(5).split(".");
            var dataCollectionName = refArray[0];
            var columnId = refArray[1];
            if ((typeof refArray !== "undefined") && (refArray.length === 2)) {
                var dataCollection = WebSquare.util.getComponentById(dataCollectionName);
                var dataType = dataCollection.getObjectType().toLowerCase();
                if (dataType === "datamap") {
                    return dataCollection.getName(columnId);
                } else if (dataType === 'datalist') {
                    return dataCollection.getColumnName(columnId);
                }
            } else {
                return "";
            }
        }
    } catch(e) { 
        $w.log("[valLib.getColumnName] Exception :: " + e.message);
    } finally {
        dataCollection = null;
    }
};

/**
 * GridView를 통해서 입력된 데이터에 대해서 유효성을 검증한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf valLib
 * @param <Object> gridViewObj GridView 객체
 * @param <Object> valInfo 데이터 유효성 검증 옵션 JSON 객체 
 * <br/>([{id : [columnId], mandatory : [boolean], minlength = [number], isHangul : [boolean], isEmail = [boolean], valFunc : [userFunc]}])
 * @return <Boolean> 유효성검사 결과
 * @example 
 * var valInfo = [ {id : "grp_cd", mandatory : true, minlength : 5, isHangul : false}, {id : "grp_nm", mandatory : true, isHangul : true} ];
 * <br/>if (valLib.validateGridView(grd_MenuAuthority, valInfo)) {
 * <br/>    comLib.confirm("변경된 메뉴별 등록 사원 정보를 저장하시겠습니까?", "saveMenuAuthorityConfirmCallback");
 * <br/>}
 * @description
 * 입력 허용 문자, 입력 허용 불가 문자, 최대 입력 문자수 설정은 GridView의 Column의 속성에서 설정한다. 
 * <br/>- allowChar : 입력 허용 문자 
 * <br/>- ignoreChar : 입력 허용 불가 문자 
 * <br/>- maxLength : 최대 입력 문자수
 */
valLib.validateGridView = function(gridViewObj, valInfo) {
    var dataList = comLib.getGridViewDataList(gridViewObj);
    if (dataList === null) {
        return;
    }
    
    valLib.initValStatus();

    try {
        var modifiedIdx = dataList.getModifiedIndex();

        if (modifiedIdx.length === 0) {
            dataList.undoAll();
            dataList.removeRows(dataList.getInsertedIndex());
            comLib.alert("저장할 데이터가 없습니다.");
            return false;
        }
        var modifiedData = dataList.getModifiedJSON();
    
        for ( var dataIdx = 0; dataIdx < modifiedData.length; dataIdx++) {
            if ((valLib.status.isValid === false) || (modifiedData[dataIdx].rowStatus === "D")) {
                break;
            }
            for ( var valIdx = 0; valIdx < valInfo.length; valIdx++) {
                if (valLib.status.isValid === false) {
                    break;
                }
               
                if ((typeof valInfo[valIdx].id !== "undefined") && (typeof modifiedData[dataIdx][valInfo[valIdx].id] !== "undefined")) {
    
                    var value = modifiedData[dataIdx][valInfo[valIdx].id];
                    
                    if ((typeof valInfo[valIdx].mandatory !== "undefined") && (valInfo[valIdx].mandatory === true) && (value.length === 0)) {
                        setResult(valInfo[valIdx].id, modifiedIdx[dataIdx], dataList, gridViewObj, "필수 입력 항목 입니다.");
                    } else if ((typeof valInfo[valIdx].minlength !== "undefined") && (valInfo[valIdx].minlength > 0) && (value.length < valInfo[valIdx].minlength)) {
                        setResult(valInfo[valIdx].id, modifiedIdx[dataIdx], dataList, gridViewObj, "최소 길이 " + valInfo[valIdx].minlength + "자리 이상으로 입력해야 합니다.");
                    } else if ((typeof valInfo[valIdx].isHangul !== "undefined") && (valInfo[valIdx].isHangul === false) && (strLib.isKoreanWord(value) === true)) {
                        setResult(valInfo[valIdx].id, modifiedIdx[dataIdx], dataList, gridViewObj, "한글을 입력해서는 안됩니다.");
                    } else if ((typeof valInfo[valIdx].isEmail !== "undefined") && (valInfo[valIdx].isEmail === true) && (valLib.isEmail(value) === false)) {
                        setResult(valInfo[valIdx].id, modifiedIdx[dataIdx], dataList, gridViewObj, "이메일 주소 형식이 올바르지 않습니다.");
                    } else if (typeof valInfo[valIdx].valFunc === "function") {
                        var resultMsg = valInfo[valIdx].valFunc(value);
                        if (resultMsg !== "") {
                            setResult(valInfo[valIdx].id, modifiedIdx[dataIdx], dataList, gridViewObj, resultMsg);
                        }
                    }
                }
            }
        }
        return valLib.status.isValid;
    
        function setResult(columnId, rowIndex, dataList, gridViewObj, message) {
                valLib.status.isValid = false;
                valLib.status.objectName = gridViewObj.getID();
                valLib.status.columnId = columnId;
                valLib.status.rowIndex = rowIndex;
                valLib.status.message = strLib.attachPostposition(dataList.getColumnName(columnId)) + message;
                comLib.alert(valLib.status.message, "valLib.validateGridViewCallback");
        }
    } catch(e) { 
        $w.log("[valLib.validateGridView] Exception :: " + e.message);
    } finally {
        modifiedData = null;
        modifiedIdx = null;
        dataList = null;
        gridViewObj = null;
    }
};

/**
 * 유효성 검사 실패에 대한 Alert 메시지 창이 닫힌 후에 수행되는 콜백 함수이다.
 * 
 * @date 2014. 12. 10.
 * @memberOf valLib
 */
valLib.validateGridViewCallback = function() {
    if (valLib.status.objectName !== "") {
        var obj = WebSquare.util.getComponentById(valLib.status.objectName);
        obj.setFocusedCell(valLib.status.rowIndex, valLib.status.columnId, true);
        valLib.initValStatus();
    }
};

/**
 * DataCollection 객체의 변경된 데이터가 있는지 검사한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf valLib
 * @param <Object> dcObj
 * @returns <Boolean> 검사결과
 */
valLib.checkModified = function(dcObj) {
    if (typeof dcObj !== "undefined") {
        var modifiedIndex = dcObj.getModifiedIndex();
        if (modifiedIndex.length === 0) {
            comLib.alert("변경된 데이터가 없습니다.");
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
};

/**
 * 사업자번호 유효성을 검사한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf valLib
 * @param <String> str 문자열
 * @return <Boolean> 올바른 번호가 아닌경우 false
 * @example valLib.checkBizID("1102112345");
 */
valLib.checkBizID = function(str) {
    var sum = 0;
    var aBizID = new Array(10);
    var checkID = new Array("1", "3", "7", "1", "3", "7", "1", "3", "5");

    for ( var i = 0; i < 10; i++) {
        aBizID[i] = str.substring(i, i + 1);
    }
    for ( var i = 0; i < 9; i++) {
        sum += aBizID[i] * checkID[i];
    }
    sum = sum + parseInt((aBizID[8] * 5) / 10);
    temp = sum % 10;
    temp1 = 0;

    if (temp != 0) {
        temp1 = 10 - temp;
    } else {
        temp1 = 0;
    }
    if (temp1 != aBizID[9]) {
        return false;
    }
    return true;
};

/**
 * 법인등록번호 유효성을 검사한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf valLib
 * @param <String> str 문자열
 * @return <Boolean> 올바른 번호가 아닌경우 false
 * @example valLib.checkCorpID("110211234567");
 */
valLib.checkCorpID = function(str) {
    var checkID = new Array(1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2);
    var sCorpNo = str;
    var lV1 = 0;
    var nV2 = 0;
    var nV3 = 0;

    for ( var i = 0; i < 12; i++) {
        lV1 = parseInt(sCorpNo.substring(i, i + 1)) * checkID[i];

        if (lV1 >= 10) {
            nV2 += lV1 % 10;
        } else {
            nV2 += lV1;
        }
    }
    nV3 = nV2 % 10;

    if (nV3 > 0) {
        nV3 = 10 - nV3;
    } else {
        nV3 = 0;
    }
    if (sCorpNo.substring(12, 13) != nV3) {
        return false;
    }
    return true;
};

/**
 * 내외국인 주민등록번호 유효성을 검사한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf valLib
 * @param <String> str 문자열
 * @return <Boolean> 올바른 번호가 아닌경우 false
 * @example valLib.checkPersonID("9701011234567");
 */
valLib.checkPersonID = function(str) {

    var checkID = new Array(2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5);
    var i = 0, sum = 0;
    var temp = 0;
    var yy = "";

    if (str.length != 13) {
        return false;
    }
    for (i = 0; i < 13; i++) {
        if (str.charAt(i) < '0' || str.charAt(i) > '9') {
            return false;
        }
    }

    // foreigner PersonID Pass
    if (str.substring(6, 13) == "5000000" || str.substring(6, 13) == "6000000" || str.substring(6, 13) == "7000000" || str.substring(6, 13) == "8000000") {
        return true;
    }
    for (i = 0; i < 12; i++) {
        sum += str.charAt(i) * checkID[i];
    }
    temp = sum - Math.floor(sum / 11) * 11;
    temp = 11 - temp;
    temp = temp - Math.floor(temp / 10) * 10;

    // 나이 (-) 체크
    if (str.charAt(6) == '1' || str.charAt(6) == '2' || str.charAt(6) == '5' || str.charAt(6) == '6') {
        yy = "19";
    } else {
        yy = "20";
    }
    if (parseInt(common_util.getCurrentDate('yyyy')) - parseInt(yy + str.substring(0, 2)) < 0) {
        return false;
    }

    // 외국인 주민번호 체크로직 추가
    if (str.charAt(6) != '5' && str.charAt(6) != '6' && str.charAt(6) != '7' && str.charAt(6) != '8') {
        if (temp == eval(str.charAt(12))) {
            return true;
        } else {
            return false;
        }
    } else {
        if ((temp + 2) % 10 == eval(str.charAt(12))) {
            return true;
        } else {
            return false;
        }
    }
    return false;
};

/**
 * 메일주소 체크한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf valLib
 * @param <String> str 메일주소
 * @return <Boolean> 정상이면 공백("")을 반환, 그외는 에러 메시지 반환
 * @example valLib.isEmail("emailTest@email.com")
 */
valLib.isEmail = function(str) {
    if (typeof str != "undefined" && str != "") {
        var format = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (format.test(str)) {
            return  true;
        } else {
            return  false;
        }
    }
    return  true;
};

/* ==========================================================================================
 * 해당 프로젝트에서 새로 만든 메소드들을 정의한다.
 * ========================================================================================== */