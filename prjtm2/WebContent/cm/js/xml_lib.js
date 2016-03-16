/**
 * @target XML 데이터 처리 관련 함수
 */

/**
 * @type xmlLib
 */
var xmlLib = {};

/**
 * XML Document 객체인지 여부를 검사한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf xmlLib
 * @param <Object> Object XML Document Object
 * @return
 */
xmlLib.isXmlCoc = function(data) {
    if (typeof data != 'object')
        return false;
    if ((typeof data.documentElement != 'undefined' && data.nodeType == 9) || (typeof data.documentElement == 'undefined' && data.nodeType == 1)) {
        return true;
    }
    return false;
};

/**
 * XML 객체를 문자열로 변환해서 반환한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf xmlLib
 * @param <Object> paramXml XML Object
 * @param <String> node Xpath 경로
 * @return <String> XML 문자열
 * @example xmlLib.getString(paramXml,"P_ENGG_NO")
 */
xmlLib.getString = function(paramXml, node) {
    var retValue = "";
    try {
        retValue = WebSquare.xml.getString(paramXml, node);
    } catch (e) {
        WebSquare.exception.printStackTrace(e);
    }
    return retValue;
};

/* ==========================================================================================
 * 해당 프로젝트에서 새로 만든 메소드들을 정의한다.
 * ========================================================================================== */