/**
 * @target 날짜 관련 공통 함수
 */

/**
 * @type dateLib
 */
var dateLib = {};

/**
 * 오늘 날짜(년월일시분초)를 YYYYMMDDHH24MISS 포맷의 문자열로 반환한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf dateLib
 * @return <String> YYYYMMDDHH24MISS
 */
dateLib.getDate = function() {

    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1);
    var day = today.getDate();
    var hour = today.getHours();
    var min = today.getMinutes();
    var second = today.getSeconds();
    var millisecond = today.getMilliseconds();

    if (parseInt(month) < 10)
        month = "0" + month;
    if (parseInt(day) < 10)
        day = "0" + day;
    if (parseInt(hour) < 10)
        hour = "0" + hour;
    if (parseInt(min) < 10)
        min = "0" + min;
    if (parseInt(second) < 10)
        second = "0" + second;
    if (parseInt(millisecond) < 10) {
        millisecond = "00" + millisecond;
    } else {
        if (parseInt(millisecond) < 100)
            millisecond = "0" + millisecond;
    }

    return String(year) + String(month) + String(day) + String(hour) + String(min) + String(second);
};

/**
 * 날짜형 변수로 변환한다. (yyyyMMdd)
 * 
 * @date 2014. 12. 10.
 * @memberOf dateLib
 * @param <String> pdate 날짜
 * @param <String> flag 구분자(/, .)
 * @return <String> 날짜형 변수
 * @example 
 * dateLib.makeDateFormat("20120719", "/") ==> 2012/07/19
 */
dateLib.makeDateFormat = function(pdate, flag) {
    var yy = "", mm = "", dd = "", yymmdd;
    var ar;
    if (pdate.indexOf(".") > -1) { // yyyy.mm.dd
        ar = pdate.split(".");
        yy = ar[0];
        mm = ar[1];
        dd = ar[2];
        if (mm < 10)
            mm = "0" + mm;
        if (dd < 10)
            dd = "0" + dd;
    } else if (pdate.indexOf("-") > -1) { // yyyy-mm-dd
        ar = pdate.split("-");
        yy = ar[0];
        mm = ar[1];
        dd = ar[2];
        if (mm < 10)
            mm = "0" + mm;
        if (dd < 10)
            dd = "0" + dd;
    } else if (pdate.length == 8) {
        yy = pdate.substr(0, 4);
        mm = pdate.substr(4, 2);
        dd = pdate.substr(6, 2);
    }
    var p = "/";
    if ((typeof flag != "undefined" && flag != "" && flag != null)) {
        p = flag;
    }

    yymmdd = yy + p + mm + p + dd;
    // yymmdd = new Date(yymmdd);

    return yymmdd;
};

/**
 * 특정일자에 날짜를 더한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf dateLib
 * @param <String> 년월일 (yyyyMMdd)
 * @param <Number> arg 더할 날짜
 * @return YYYYMMDD
 */
dateLib.addDay = function(pYmd, offset) {

    var yyyy = pYmd.substr(0, 4);
    var mm = eval(pYmd.substr(4, 2) + "- 1");
    var dd = pYmd.substr(6, 2);

    var dt3 = new Date(yyyy, mm, eval(dd + '+' + offset));

    yyyy = dt3.getFullYear();

    mm = (dt3.getMonth() + 1) < 10 ? "0" + (dt3.getMonth() + 1) : (dt3.getMonth() + 1);
    dd = dt3.getDate() < 10 ? "0" + dt3.getDate() : dt3.getDate();

    return "" + yyyy + "" + mm + "" + dd;
};

/**
 * 오늘 일자에 날짜를 던한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf dateLib
 * @param <Number> arg 더할 날짜
 * @return YYYYMMDD
 */
dateLib.addToDay = function(arg) {

    var sz_ymd;
    if (arg == "")
        arg = 0;

    var date = new Date();
    date.setFullYear(date.getFullYear());// y년을 더함
    date.setMonth(date.getMonth());// m월을 더함
    date.setDate(date.getDate() + arg);// d일을 더함

    sz_ymd = "" + date.getFullYear();

    if (date.getMonth() < 9) {
        sz_ymd += "0" + (date.getMonth() + 1);
    } else {
        sz_ymd += (date.getMonth() + 1);
    }
    if (date.getDate() < 10) {
        sz_ymd += "0" + date.getDate();
    } else {
        sz_ymd += "" + date.getDate();
    }
    return sz_ymd;
};

/**
 * 일자에 월을 더해서 반환한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf dateLib
 * @param <String> date 일자
 * @param <Number> add 추가할 개월 수
 * @return 날짜 문자열(yyyyMMdd)
 * @description
 * 1.임의의 년월일(yyyyMMdd)에 원하는 월 수만큼 가감(+/-)한 결과의 년월일에 해당하는 yyyyMMdd 문자열을 리턴한다 
 * 2.임의의 년월(yyyyMM)에 원하는 월 수만큼 가감(+/-)한 결과의 년월에 해당하는 yyyyMM 문자열을 리턴한다
 */
dateLib.addToDay = function(date, add) {
    
    // var add = "-1";
    var rtnGb = "1"; // 8자리

    // 6자리 입력 시 01 을 추가하여 8자리 날자로 처리한다.
    if (date.length == 6) {
        date = date + "01";
        rtnGb = "2";
    }

    var yyyy = date.substring(0, 4);
    var mm = date.substring(4, 6);
    var dd = date.substring(6, 8);

    mm = (mm * 1) + (add * 1);

    var cDate = new Date(yyyy, mm - 1, dd);
    var cYear = cDate.getFullYear();
    var cMonth = cDate.getMonth() + 1;

    if ((cMonth + "").length < 2) {
        cMonth = "0" + cMonth;
    }

    var cDay = cDate.getDate();

    if ((cDay + "").length < 2) {
        cDay = "0" + cDay;
    }

    var ynDay = "";

    if (rtnGb == "1") {
        ynDay = cYear + "" + cMonth + "" + cDay;
    } else {
        ynDay = cYear + "" + cMonth;
    }
    return ynDay;
};

/**
 * 오늘날짜에서 년/월/일을 자유롭게 더하고 뺀 결과를 문자열로 반환한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf dateLib
 * @param year 가감할년수
 * @param month 가감할월수
 * @param day 가감할일수
 * @return YYYYMMDD
 */
dateLib.calcToday = function(year, month, day) {
    var sz_ymd;
    if (year == "")
        year = 0;
    if (month == "")
        month = 0;
    if (day == "")
        day = 0;

    var date = new Date();
    date.setFullYear(date.getFullYear() + year);// y년을 더함
    date.setMonth(date.getMonth() + month);// m월을 더함
    date.setDate(date.getDate() + day);// d일을 더함

    sz_ymd = "" + date.getFullYear();

    if (date.getMonth() < 9) {
        sz_ymd += "0" + (date.getMonth() + 1);
    } else {
        sz_ymd += (date.getMonth() + 1);
    }
    if (date.getDate() < 10) {
        sz_ymd += "0" + date.getDate();
    } else {
        sz_ymd += "" + date.getDate();
    }
    return sz_ymd;
};

/**
 * 날짜를 받아서 요일로 변환한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf dateLib
 * @param <String> v_date 날짜(yyyyMMdd)
 * @return int
 */
dateLib.getDayNum = function(v_date) {

    if (v_date.length < 0)
        return;

    var v_year = v_date.substr(0, 4);
    var v_month = v_date.substr(4, 2);
    var v_day = v_date.substr(6, 2);

    var m = parseInt(v_month, 10) - 1;
    var d = parseInt(v_day, 10);

    var end = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if ((v_year % 4 == 0 && v_year % 100 != 0) || v_year % 400 == 0) {
        end[1] = 29;
    }

    if (d < 1 || d > end[m]) {
        return;
    }

    var newDate = new Date(v_year, v_month, v_day);

    return parseInt(String(newDate.getDay()));
};

/**
 * 두 개의 날짜를 비교한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf dateLib
 * @param <String> fromDate 시작일자
 * @param <String> toDate 종료일자
 * @description fromDate 가 toDate 보다 큰지 체크
 * @example dateLib.compareDate( "20110204", "20110305" )
 * @return <String> 9 : 비교 조건부족, 0 : 오류, 1 : 정상
 */
dateLib.compareDate = function(fromDate, toDate) {
    var flag = "9";
    if (fromDate != "" && toDate != "") {
        if (fromDate > toDate)
            flag = "0";
        else
            flag = "1";
    }
    return flag;
};

/**
 * 두 날짜 사이의 차일을 리턴한다
 * 
 * @date 2014. 12. 10.
 * @memberOf dateLib
 * @param <String> fromdate 시작날짜
 * @param <String> todate 종료날짜
 * @return 종료날짜에서 시작날짜의 차일
 * @example dateLib.minusDates("20120102", "20121201")
 */
dateLib.minusDates = function(fromdate, todate) {

    var tmpFromDate = new Date(parseInt(Number(fromdate.substring(0, 4))), parseInt(Number(fromdate.substring(4, 6))) - 1, parseInt(Number(fromdate
            .substring(6))));
    var tmpNextDate = new Date(parseInt(Number(todate.substring(0, 4))), parseInt(Number(todate.substring(4, 6))) - 1, parseInt(Number(todate.substring(6))));
    var days = (tmpNextDate - tmpFromDate) / (3600 * 24 * 1000);

    return days;
};

/**
 * 입력받은 from월로부터 입력to월까지 개월 수를 반환한다.
 * 
 * @date 2014. 12. 10.
 * @memberOf dateLib
 * @param <String> fMonth 시작월
 * @param <String> tMonth 종료월
 * @return <number> 개월 수
 * @example dateLib.getMonthTerm("201102", "201303")
 */
dateLib.getMonthTerm = function(fMonth, tMonth) {
    var iMonth = 0; // 계산된 개월수
    var iYear = 0; // 계산된 년도
    var rMonth = 0; // 반환할 개월수

    if (parseInt(fMonth) <= parseInt(tMonth)) {
        iYear = parseInt(tMonth.substr(0, 4)) - parseInt(fMonth.substr(0, 4));
        iMonth = parseInt(tMonth.substr(4, 2), 10) - parseInt(fMonth.substr(4, 2), 10);
        rMonth = (12 * iYear) + iMonth + 1;
        return rMonth;
    } else {
        return 0;
    }
};

/**
 * 입력받은 fromQuarter로부터 입력toQuarter까지 Quarter수반환하기
 * 
 * @date 2014. 12. 10.
 * @memberOf dateLib
 * @param <String> fQuarter 시작 Quarter
 * @param <String> tQuerter 종료 Quarter
 * @return 총 Quarter 수
 * @example dateLib.getQuarterTerm( "20111", "20132" )
 */
dateLib.getQuarterTerm = function(fQuarter, tQuarter) {
    var iQuarter = 0; // 계산된 Quarter수
    var iYear = 0; // 계산된 년도
    var rQuarter = 0; // 반환할 Quarter수

    if (parseInt(fQuarter) <= parseInt(tQuarter)) {
        iYear = parseInt(tQuarter.substr(0, 4)) - parseInt(fQuarter.substr(0, 4));
        iQuarter = parseInt(tQuarter.substr(4, 1), 10) - parseInt(fQuarter.substr(4, 1), 10);
        rQuarter = (4 * iYear) + iQuarter + 1;
        return rQuarter;
    } else {
        return 0;
    }
};

/**
 * 날짜형식 체크한다. (yyyyMMdd)
 * 
 * @date 2014. 12. 10.
 * @memberOf dateLib
 * @param <String> str 날짜
 * @return 정상이면 true, 그외는 false
 * @example dateLib.isDate("20120719")
 */
dateLib.isDate = function(str) {
    var year_data = "";
    var month_data = "";
    var date_data = "";
    var i;

    str = objString.prototype.replaceAll(str, "/", "");
    str = objString.prototype.replaceAll(str, "-", "");
    str = objString.prototype.replaceAll(str, ".", "");
    if (str.length != 8)
        return false;

    for (i = 0; i < 8; i++) {
        var c = str.charAt(i);
        if (c < '0' || c > '9') {
            return false;
        }
        if (i < 4)
            year_data += c;
        else if (i >= 4 && i < 6)
            month_data += c;
        else if (i >= 6)
            date_data += c;
    }

    var mnthst = month_data;
    var mnth = parseInt(mnthst, 10);
    var dy = parseInt(date_data, 10);

    if (mnth < 1 || mnth > 12 || dy < 1 || dy > 31) {
        return false;
    }

    if (mnth != 2) {
        if (mnth == 4 || mnth == 6 || mnth == 9 || mnth == 11) {
            if (dy > 30) {
                return false;
            }
        } else if (mnth == 1 || mnth == 3 || mnth == 5 || mnth == 7 || mnth == 8 || mnth == 10 || mnth == 12) {
            if (dy > 31) {
                return false;
            }
        }
    } else {
        var yr1 = parseInt(year_data);
        var maxdy;
        if ((yr1 % 400 == 0) || ((yr1 % 4 == 0) && (yr1 % 100 != 0))) {
            maxdy = 29;
        } else {
            maxdy = 28;
        }

        if (dy > maxdy) {
            return false;
        }
    }
    return true;
};

/* ==========================================================================================
 * 해당 프로젝트에서 새로 만든 메소드들을 정의한다.
 * ========================================================================================== */