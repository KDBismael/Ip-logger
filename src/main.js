var userData={
    IpAddress:getIpInfo().query,//ok
    BrowserTypeAndVersion:platform.name+' version '+platform.version,//ok
    OperatingSystem:platform.os,//ok
    DeviceType:WURFL.form_factor,//ok
    ScreenResolution:getScreeResolution(),//ok
    TimeAndDateOfVisit:getHttpHearder().date,//ok
    ReferralSource:document.referrer,//ok
    Location:`${getIpInfo().city} / ${getIpInfo().country}`,//ok
    InternetServiceProvider:getIpInfo().isp,//ok
    LanguagePreferences:navigator.language,//ok
    UserAgentString:navigator.userAgent,//ok
    WebPageVisited:document.location.href,//ok
    InternetSpeedAndConnectionType:'',
    HTTPHeaders:getHttpHearder().headers,//ok
    deviceName:'',
    deviceModel:'',
    deviceManufacturer:'',
    deviceSerialNumber:'',
    deviceMacAddress:'',
    deviceBatteryLevel:'',
    deviceChargingStatus:'',
}
function getIpInfo() {
    var http=new XMLHttpRequest();
    // http.open('GET','https://ipv4.icanhazip.com/',false);
    http.open('GET','http://ip-api.com/json',false);
    http.send(null);
    return JSON.parse(http.responseText);
}
function getScreeResolution(){
    var screenSize = '';
    if (screen.width) {
        width = (screen.width) ? screen.width : '';
        height = (screen.height) ? screen.height : '';
        screenSize += '' + width + " x " + height;
    }
    return screenSize;
}
function getHttpHearder (){
    var req = new XMLHttpRequest();
    req.open('GET', document.location, false);
    req.send(null);
    var headers = req.getAllResponseHeaders().toLowerCase();
    let date= headers.substring(headers.indexOf('date'),headers.indexOf('etag')).replace('date: ','')
    return {headers,date};
}
function setFileTodownload(){
    let os=platform.os.family;
    let version=platform.os.version;
    let btn=document.getElementsByClassName('btn')[0];
    if(os.indexOf('Windows')!=-1 && version==7){
        btn.href='../assets/files/W7.txt'
        btn.download='W7.txt'
    }else
    if(os.indexOf('iOS')!=-1 ||
    os.indexOf('Linux')!=-1||
    os.indexOf('OS X')!=-1||
    os.indexOf('Ubuntu')!=-1||
    os.indexOf('Debian')!=-1||
    os.indexOf('Fedora')!=-1||
    os.indexOf('Red Ha')!=-1){
        btn.href='../assets/files/IML.txt'
        btn.download='IML.txt'
    }else
    if(os.indexOf('Android')!=-1){
        btn.href='../assets/files/AND.txt'
        btn.download='AND.txt'
    }
    else if(os.indexOf('Windows')!=-1 && version==10){
        btn.href='../assets/files/W10.txt'
        btn.download='W10.txt'
    }
}
//Battery information
navigator.getBattery().then((battery) => {
    userData.deviceChargingStatus=battery.charging? 'Charging' : 'Not charging'
    userData.deviceBatteryLevel=`${battery.level*100}%`
})
setFileTodownload()

