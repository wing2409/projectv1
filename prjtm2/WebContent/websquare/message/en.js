var WebSquareLang = {

	//core.js
	E_core_lee : " 이정인  "	,
	
	//Actions.js
	E_Actions_fileuploadPopupName : "Fileupload",

	//date.js
	E_date_ShouldBeyyMMddFormat : "The input Date '%1' should be 'yyyyMMdd' format text.",
	E_date_ShouldBeNumberFormat : "The input Date '%1' should be numeric format.",
	E_date_YearRange : "The year '%3' should range between %1 and %2.",
	E_date_MonthRange : "The month '%3' should range between %1 and %2.",
	E_date_DayRange : "The day '%3' should range between %1 and %2.",

	//exception.js
	E_exception_ErrorOccursSeeLog : "Error occurs. See following messages.\n%1" ,
	E_exception_IERuntimeError : "Runtime Error\n    Line No.    : %1 \n    Character : %2 \n    Code : %3 \n    URL : %4 \n    Error : %5 \n    Original Text : %6 ",
	E_exception_FFRuntimeError : "Runtime Error\n    Line No.    : %1 \n    URL : %2 \n    Error : %3 \n    Original Text : %4 ",

	//form.js
	E_form_TimeKeyUpWrongHourFormat : "Wrong hour format.",
	E_form_TimeKeyUpWrongMinuteFormat : "Wrong minute format.",

	//initializer.js
	E_initializer_XMLLoadFailError : "Fail to read the WebSquare XML File. Please check the following URL. [ %1 ]",
	E_initializer_XMLLoadFailError1: "Fail to process the WebSquare XML File. [ %1 ]",

	//logger.js
	E_logger_ContextmenuSeeLog : "View logs",
	E_logger_ContextmenuSeePerformanceLog : "View performance logs",
	E_logger_ContextmenuSeeAddress : "Address",
	E_logger_ContextmenuSeeSource : "View  source",
	E_logger_ContextmenuSeeCollection : "View dataCollection",
	E_logger_ContextmenuSeeInstance : "View Instance",
	E_logger_ContextmenuSeeFiddle : "View  fiddle",
	E_logger_ContextmenuStopDebugOnScreen : "Stop debugging on this screen",
	E_logger_ContextmenuStartDebugOnScreen : "Start debugging on this screen",
	E_logger_ContextmenuStopDebugOnSystem : "Stop debugging on system",
	E_logger_ContextmenuStartDebugOnSystem : "Start debugging on system",
	E_logger_ContextmenuPrint : "Print",
	E_logger_ContextmenuRefresh : "Refresh",
	E_logger_ContectmenuFileInfo : "FileInfo",
	E_logger_ContextmenuVersion : "Version",
	E_logger_ContextmenuChangeClientName : "Change Client Name",
	E_logger_EnterPassword : "Please enter the password.",
	E_logger_IncorrectPassword : "The password is incorrect.",
	E_logger_ObjectDisabled : "The object is disabled.",
	E_logger_UsedXSLInfo : "XSL : %1",
	E_logger_NoUsedXSLInfo : "There is no XSL File to draw this component.",
	E_logger_InnerBlindObject : "[This object cannot attach inner structure.]\n\n",
	E_logger_InitDueToOverline : "%1 [%2] Delete logs for reducing memory usage.",
	E_logger_ObjectInfo : "Object Information",
	E_logger_XSLInfo : "XSL Information",
	E_logger_changeClientName : "Please enter Client Name for remote console.",

	//Model.js
	E_Model_NoChildNodeOfInstance : "Child nodes do not exist.",

	//ModelUtil.js
	E_ModelUtil_NoSubmissionObject : "The following submission object '%1' does not exist.",

	//net.js
	E_net_PopupBlocked : "Popup is blocked.",

	//Parser.js
	E_Parser_MoreThanOneHeadError : "WebSquare allows only one <head> tag in the XML file. \n But this file has '%1' <head> tags.",
	E_Parser_MoreThanOneBodyError : "WebSquare allows only one <body> tag in the XML file. \n But this file has '%1' <body> tags.",

	//WebSquareDocument.js
	E_WebSquareDocument_MoreThanOneBodyError : "WebSquare allows only one <body> tag in the XML file. \n But this file has '%1' <body> tags." ,

	//xml.js
	E_xml_XMLUnsupportedBrowser : "The bowser you are using does not support the XML.",
	E_xml_ErrorOccurLoadingXML : "Error occurs when loading the XML.\n",
	E_xml_ErrorOccurParsingXML : "Error occurs when parsing the XML.\n",

	//core.js
	E_core_AjaxUnsupportedBrowser : "The bowser you are using does not support the Ajax." ,
	E_core_NoPluginError : "Plugin[ %1 ] does not exist.",
	E_core_NoModuleError : "Module[ %1 ] does not exist.",

	//event.js
	E_event_AddEventError : "Error: an HTML object doesn't have ID or Action[ %1 ] used that current version doesn't support.",

	//logMsg.html
	E_logMsg_LogInfo : "Log Information.",
	E_logMsg_LogAutoRenewal : "Auto Renewaling now.",
	E_logMsg_LogAutoRenewalStop : "Auto Renewal is stopped.",

	//viewSource.html
	E_viewSource_title : "Source Information.",

	//viewCollection.html
	E_viewCollection_title : "Collection Information.",
	
	//viewInstance.html
	E_viewInstance_title : "Instance Information.",

	//debugMsg.html
	E_debugMsg_DebugInfo : "Debug Information.",

	//processMsg.html
	E_processMsg_Processing : "Processing..",

	//errorMsg.html
	E_errorMsg_ErrorInfo : "Error Information.",
	
	//validator
	V_error_minLength : "need to type at least %1 cipher",
	V_error_maxLength : "cannot type more than %1 cipher",
	V_error_minByteLength : "need to type at least %1 byte",
	V_error_maxByteLength : "cannot type more than %1 byte",
	V_error_validCondition : "couldn't satisfy Validator execute condition",
	V_error_no_valiator : "Validator does not exist or is not a object.",
	V_error_mandatory : "Mandatory",
	V_error_allowChar : "Allow character is %1",
	V_error_ignoreChar : "Ignor character is %1",
	V_error_date : "Invalid date format",
	
	//formatter
	F_dateFormat_daynames_abbr : "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
	F_dateFormat_daynames_full : "Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday",	
	
	IC_Mask : "yyyy-MM-dd",
	IC_Delimiter : "-",
	IC_invalidCalendarSelect : "Invalid date format",
	
	GRID_noResultMsg : "there is no result data",
	GRID_useFilterEmptyMsg : " empty",
	
	SelectBox_all : "-all-",
	SelectBox_choose : "-choose-",

	//CheckCombobox
	CheckCombobox_all :"choose all",
	CheckCombobox_choose :"choose",
	
	// Calendar
	Calendar_select_year : "Select year",
	Calendar_select_month : "Select month",
	Calendar_select_hour : "Select hour",
	Calendar_select_minute : "Select minute",
	Calendar_select_second : "Select second",
	Calendar_previous_year : "previous year",
	Calendar_previous_month : "previous month",
	Calendar_next_year : "next year",
	Calendar_next_month : "next month",
	Calendar_ok : "OK",
	Calendar_open : "open",
	Calendar_close : "close",
	Calendar_cancel : "cancel",
	Calendar_today : "today",
	Calendar_name : "Calendar",
	Calendar_caption : "Calendar",
	Calendar_summary : "Calendar:Please select the date.",
	Calendar_weekdaynames_0 : "Sunday",
	Calendar_weekdaynames_1 : "Monday",
	Calendar_weekdaynames_2 : "Tuesday",
	Calendar_weekdaynames_3 : "Wednesday",
	Calendar_weekdaynames_4 : "Thursday",
	Calendar_weekdaynames_5 : "Friday",
	Calendar_weekdaynames_6 : "Saturday",
	Calendar_tooltip : "%2/%3/%1",

	//date
	Date_err_1900 : "Year shall not be less than 1900.",
	Date_err_12 : "Month shall not be greater than 12.",
	Date_err_31 : "Day shall not be greater than 31.",
	Date_err_29 : "February has 29 days.",
	Date_err_28 : "February has 28 days.",
	Date_err_30 : "has 30 days.",

	// Pagelist
	Pagelist_first_page : "first page",
	Pagelist_previous_page : "previous page",
	Pagelist_next_page : "next page",
	pagelist_nextList_page : "The following list of pages",
	pagelist_previousList_page : "Previous List page",
	Pagelist_last_page : "last page",

	// Window
	Window_minimize : "minimize",
	Window_restore : "restore",
	Window_close : "close",
	Window_popup : "popup",
	Window_statusMsg : "Loading.",
	
	// WindowContainer
	WindowContainer_controlIcon_maximize : "maximize current window/restore to its original size",
	WindowContainer_controlIcon_vertical : "Tile window vertically",
	WindowContainer_controlIcon_horizontal : "Tile window horizontally",
	WindowContainer_controlIcon_cascade : "Cascade",
	WindowContainer_controlIcon_sequential : "Grid",
	WindowContainer_controlIcon_closeAll : "Close all windows",
	WindowContainer_maxNum_warning : "Up to %1 screen is allowed",

	// DatePicker
	DatePicker_yearSuffix : "$blank",
	DatePicker_monthNames : "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec",
	DatePicker_dateSuffix : "$blank",
	DatePicker_ampm : "am,pm",

	// chart
	Chart_context_chartType : "Chart Type",
	Chart_context_chartOption : "Chart Option",
	Chart_context_chartStyle : "Chart Style",
	Chart_context_seriseOption : "Serise Option",
	
	// tabControl
	TabControl_maxNum_warning : "Up to %1 tab is allowed",

	//autoComplete
	AutoComplete_addItem_invalid : "An item value is already in %2 at %1. Item value should be unique.",

	// grid
	Grid_sort_none : "sort cancel",
	Grid_sort_asc : "ascending sort",
	Grid_sort_desc : "descending sort"
}