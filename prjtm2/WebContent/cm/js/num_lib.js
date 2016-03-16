/**
 * @target 숫자 처리 관련 공통 함수
 */

/**
 * @type numLib
 */
var numLib = {};

/**
 * 소수점 자리 수를 체크한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf numLib
 * @param <Object> obj Component id
 * @param <Number> decLen 소수 이하 자리수
 * @return 컴포넌트에 데이터 값 리턴
 * @example numLib.chkeckDecimalFormat( in_Num, 2 ) <- 소수 2째 자리
 */
numLib.chkeckDecimalFormat = function(obj, decLen) {
    var data = obj.getValue();
    
    if (data.length < 1) {
        return;
    }

    var decIdx = data.indexOf('.');

    if (decIdx > -1) {
        var dataIdx = data.length - 1;
        var len = dataIdx - decIdx;

        if (len > decLen) {
            comLib.alert("소수 " + decLen + "자리까지 입력 가능합니다.");
            obj.setValue(data.substring(0, dataIdx));
            obj.focus();
        }
    }
};

/**
 * 입력받은 문자열이 숫자이면 true 아니면 false를 리턴한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf numLib
 * @param word : 문자열
 * @return 숫자이면 true, 그외는 false
 * @example numLib.isNumber("123456");
 */
numLib.isNumber = function(word) {
    var c;
    for ( var i = 0; i < word.length; i++) {
        c = word.charAt(i);
        if ((c < '0' || c > '9') && c != ',') {
            return false;
        }
    }
    return true;
};

/**
 * 
 * 특정일자 기준 만 나이 계산한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf numLib
 * @param <String> idx : 구분( 1:기준일자+6개월, 2:기준일자)
 * @param <String> sJumin : 주민번호
 * @param <String> cDate : 기준일자(미 입력 시 현재일자)
 * @return 계산된 만 나이
 * @example numLib.getAge("1", "8801011234567") numLib.getAge("1", "8801011234567", "20121231")
 */
numLib.getAge = function(idx, sJumin, cDate) {
    if ((typeof arguments[0] == "undefined" || arguments[0] == "")) {
        return 0;
    }
    if ((typeof arguments[1] == "undefined" || arguments[1] == "")) {
        return 0;
    }

    var CurrDt;
    var currentDate = gfn_com_getCurrentDate("yyyyMMdd"); // 서버 현재 시간

    // 기준일자 + 6개월
    if (idx == "1") {
        if (typeof arguments[2] == "undefined" || arguments[2] == "") {
            CurrDt = dateLib.addToDay(currentDate, "6"); // 현재일자 + 6개월
        } else {
            CurrDt = dateLib.addToDay(cDate, "6"); // 기준일자 + 6개월
        }

        // 기준일자
    } else if (idx == "2") {
        if (typeof arguments[2] == "undefined" || arguments[2] == "") {
            CurrDt = currentDate; // 현재일자
        } else {
            CurrDt = cDate; // 기준일자
        }

    } else {
        return 0;
    }

    var curr_yy = CurrDt.substring(0, 4);
    var curr_mm = CurrDt.substring(4, 6);
    var curr_dd = CurrDt.substring(6, 8);

    var birth_yy = sJumin.substring(0, 2);
    var birth_mm = sJumin.substring(2, 4);
    var birth_dd = sJumin.substring(4, 6);

    var birth_gbn = sJumin.substring(6, 7);
    if (birth_gbn == "3" || birth_gbn == "4") {
        birth_yy = "20" + birth_yy;
    } else {
        birth_yy = "19" + birth_yy;
    }

    var age = Number(curr_yy) - Number(birth_yy);
    if (Number(curr_mm) == Number(birth_mm)) {
        if (Number(curr_dd) < Number(birth_dd)) {
            age = Number(age) - Number(1);
        }
    } else if (Number(curr_mm) < Number(birth_mm)) {
        age = Number(age) - Number(1);

    }

    return age;
};

/**
 * 문자열 왼쪽에 일정길이(maxLen) 만큼 '0'으로 채우기
 * 
 * @date 2014. 12. 10.
 * @memberOf numLib
 * @param <String> str 문자열
 * @param <Number> maxLen 0 으로 채울 최대 길이
 * @example numLib.fillZero("24", 4) => 0024
 */
numLib.fillZero = function(str, maxLen) {
    var len = str;
    var zero = "";

    if (typeof str == 'number')  len = '' + str;

    if (len.length < maxLen) {
        for (var i=len.length; i<maxLen; i++) {
            zero += "0";
        }
    }
    return  (zero + '' + str);
}

/* ==========================================================================================
 * 해당 프로젝트에서 새로 만든 메소드들을 정의한다.
 * ========================================================================================== */
