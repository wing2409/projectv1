/**
 * @target JSON 처리 관련 공통 함수
 */

/**
 * @type jsonLib
 */
var jsonLib = {};

/**
 * JSON 을 정의한 NODE XML형태로 변환하여 반환한다. 
 * 
 * @date 2014. 12. 10.
 * @memberOf jsonLib
 * @param <Object> jsondata JSON 문자열
 * @return <Object> JSON 을 XML로 변환하여, 변환된 XML을 반환한다.
 * @description
 * config.xml 파일의 아래의 내용을 추가한다.
 * <br/><WebSquare> <json> <json2xmlFunction value="customJSON2XML" /> </json> </WebSquare>
 */
jsonLib.customJSON2XML = function(jsondata) {

    var objJson;

    if (jsondata.constructor === String) {
        objJson = eval("(" + jsondata + ")");
    } else {
        objJson = jsondata;
    }

    var resultArr = [];
    var objoptag = "<" + gParma.dataNode + ">";
    var arroptag = "<" + gParma.listNode + ">";
    var objcptag = "</" + gParma.dataNode + ">";
    var arrcptag = "</" + gParma.listNode + ">";
    var type = -1;

    if (gf_isArrayObj(objJson)) {
        type = 1;
        resultArr.push(arroptag);
    } else if (typeof objJson == "object") {
        type = 2;
        resultArr.push(objoptag);
    }

    for ( var i in objJson) {
        jsonLib.recursiveJSON2XML(resultArr, objJson[i], i, type);
    }

    if (gf_isArrayObj(objJson)) {
        resultArr.push(arrcptag);
    } else if (typeof objJson == "object") {
        resultArr.push(objcptag);
    }

    var xmlstr = resultArr.join("");
    var xmldoc = WebSquare.xml.parse(xmlstr);

    return xmldoc;
};

/**
 * JSON 을 정의한 NODE XML형태로 변환하여 반환한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf jsonLib
 * @param <Array> resultArr 결과 정보를 담는 Array
 * @param <Object> objJson JSON
 * @param <String> key 노드명
 * @param <String> type 상위 노드의 노드 타입 type (1:Array, 2:Object)
 * @return <Object> JSON 을 XML로 변환하여, 변환된 XML을 반환한다.
 */
jsonLib.recursiveJSON2XML = function(resultArr, objJson, key, type) {
    var objoptag = "<" + gParma.dataNode + " id=\"" + key + "\" type=\"object\">";
    var arroptag = "<" + gParma.listNode + " id=\"" + key + "\" type=\"array\">";
    var objcptag = "</" + gParma.dataNode + ">";
    var arrcptag = "</" + gParma.listNode + ">";

    if (objJson == null) {
        if (isNaN(parseInt(key))) {
            resultArr.push("<" + key + "/>");
        } else {
            resultArr.push("<NotKey id=\"" + key + "\"/>");
        }
    } else if (typeof objJson == "string") {
        if (type == 1) { // array
            resultArr.push("<value type=\"string\">" + WebSquare.xml.encode(objJson) + "</value>");
        } else if (type == 2) {
            if (isNaN(parseInt(key))) {
                resultArr.push("<" + key + " type=\"string\">" + WebSquare.xml.encode(objJson) + "</" + key + ">");
            } else {
                resultArr.push("<value id=\"" + key + "\" type=\"string\">" + WebSquare.xml.encode(objJson) + "</value>");
            }
        }
    } else if (typeof objJson == "number") {
        if (type == 1) { // array
            resultArr.push("<value type=\"number\">" + objJson + "</value>");
        } else if (type == 2) {
            if (isNaN(parseInt(key))) {
                resultArr.push("<" + key + " type=\"number\">" + objJson + "</" + key + ">");
            } else {
                resultArr.push("<value id=\"" + key + "\" type=\"number\">" + objJson + "</value>");
            }
        }
    } else if (typeof objJson == "boolean") {
        if (type == 1) { // array
            resultArr.push("<value type=\"boolean\">" + objJson + "</value>");
        } else if (type == 2) {
            if (isNaN(parseInt(key))) {
                resultArr.push("<" + key + " type=\"boolean\">" + objJson + "</" + key + ">");
            } else {
                resultArr.push("<value id=\"" + key + "\" type=\"boolean\">" + objJson + "</value>");
            }
        }
    } else if (gf_isArrayObj(objJson)) {
        type = 1;
        resultArr.push(arroptag);

        for ( var j in objJson) {
            jsonLib.recursiveJSON2XML(resultArr, objJson[j], j, type);
        }

        resultArr.push(arrcptag);
    } else if (typeof objJson == "object") {
        type = 2;
        resultArr.push(objoptag);

        for ( var j in objJson) {
            jsonLib.recursiveJSON2XML(resultArr, objJson[j], j, type);
        }

        resultArr.push(objcptag);
    }
};

/**
 * XML정보를 JSON으로 변환한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf jsonLib
 * @param <Object> node JSON변환 대상 XML
 * @param <Array> jsonStr JSON 형태의 Array 데이터
 * @param <Boolean> isPair 노드명을 " 로 감싸기 위한 flag
 */

jsonLib.parseXmlForJSON = function(node, jsonStr, isPair) {

    var type = node.getAttribute("type");
    var nodeid = node.getAttribute("id");

    if (!type) {
        type = jsonLib.parseType(node);
    }

    if (isPair) {
        jsonStr.push("\"");
        if (nodeid != null && nodeid != "")
            jsonStr.push(nodeid);
        else
            jsonStr.push(node.nodeName);
        jsonStr.push("\" : ");
    }

    if (type === "object") {
        var isFirst = true;
        jsonStr.push("{");

        for ( var i = 0; i < node.childNodes.length; i++) {
            if (node.childNodes[i].nodeType == 1) {
                if (isFirst) {
                    isFirst = false;
                } else {
                    jsonStr.push(", ");
                }

                jsonStr.push(jsonLib.parseXmlForJSON(node.childNodes[i], jsonStr, true));
            }
        }

        jsonStr.push("}");
    } else if (type === "array") {
        var isFirst = true;
        jsonStr.push("[");

        for ( var i = 0; i < node.childNodes.length; i++) {
            if (node.childNodes[i].nodeType == 1) {
                if (isFirst) {
                    isFirst = false;
                } else {
                    jsonStr.push(", ");
                }

                jsonStr.push(jsonLib.parseXmlForJSON(node.childNodes[i], jsonStr, false));
            }
        }

        jsonStr.push("]");
    } else if (type === "number") {
        if (node.childNodes && node.childNodes[0].nodeValue) {
            jsonStr.push(node.childNodes[0].nodeValue);
        }
    } else if (type === "true") {
        jsonStr.push("true");
    } else if (type === "false") {
        jsonStr.push("false");
    } else if (type === "null") {
        jsonStr.push("null");
    } else {
        jsonStr.push("\"");

        if (node.childNodes && node.childNodes[0]) {
            jsonStr.push(WebSquare.xml.decode(node.childNodes[0].nodeValue).replaceAll("\\", "\\\\").replaceAll("\"", "\\\"").replaceAll("\n", "\\n"));
        }

        jsonStr.push("\"");
    }
};

/**
 * XML을 JSON으로 변환하여 String으로 반환한다. 
 * 
 * @date 2014. 12. 10.
 * @memberOf jsonLib
 * @param <Object> JSON 변환 대상 XML
 * @return <String> string
 * @description
 * config.xml 파일에 아래의 내용을 추가한다.
 * <WebSquare> <json> <xml2jsonFunction value="customXML2JSON" /> </json> </WebSquare>
 */
jsonLib.customXML2JSON = function(data) {

    var jsonStr = [];

    if (WebSquare.xml.isDocumentString(data)) {
        data = WebSquare.xml.parse(data);
    }

    if (WebSquare.xml.isDocument(data)) {
        jsonLib.parseXmlForJSON(data.documentElement, jsonStr, false);
    }

    return jsonStr.join("");
};

/**
 * XML 노드를 입력 받아 Type(array, string, object, string)을 반환한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf jsonLib
 * @param <Object> node JSON변환 대상 XML
 * @return <String> 노드의 Type 정보
 */
jsonLib.parseType = function(node) {
    if (node && node.childNodes && node.childNodes.length > 0) {
        var tmp = {};
        var elementCnt = 0;

        for ( var i = 0; i < node.childNodes.length; i++) {
            if (node.childNodes[i].nodeType == 1) {
                if (tmp[node.childNodes[i].nodeName] == true) {
                    return "array";
                }

                tmp[node.childNodes[i].nodeName] = true;
                elementCnt++;
            }
        }
        if (elementCnt == 0) {
            return "string";
        } else {
            return "object";
        }
    } else {
        return "string";
    }
};

/**
 * JSON Object인지 여부를 검사한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf jsonLib
 * @param <Object> jsonObj JSON Object
 * @returns {Boolean}
 */
jsonLib.isJSON = function(jsonObj) {
    if (typeof jsonObj !== 'object')
        return false;
    try {
        JSON.stringify(jsonObj);
        return true;
    } catch (e) {
        return false;
    }
    ;
};

/**
 * JSON Object로 변환해서 반환한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf jsonLib
 * @param <string> str 문자열
 * @returns {JSON}
 */
jsonLib.parse = function(str) {
    if (typeof str !== "string")
        return null;
    
    try {
        return JSON.parse(str);
    } catch (e) {
        return null;
    }
};

/* ==========================================================================================
 * 해당 프로젝트에서 새로 만든 메소드들을 정의한다.
 * ========================================================================================== */