var navObj = {};
var hintOverlayObj = {};
var postURL = "";

$(function(){


    
    

    pcMask.init();

    var checkPcgc = /yy\.html|pcgc\.html|profile\.html|message\.html$/.test(document.location.href);
    var UID_COOKIE = getCookie("UserID");
    var backUrl = getCookie("BackUrl") == undefined || getCookie("BackUrl") == null ? "" : getCookie("BackUrl");

    if(checkPcgc && UID_COOKIE==undefined){
            setCookie("BackUrl","main.html");
            pcMask.show(true);
            pcMask.hide(function(){
                 document.location.href = "login.html";
            });
    }else{
        if(backUrl==window.location.href)
            setCookie("BackUrl","main.html");
        //setCookie("BackUrl","pcgc.html");
    }
    navObj = pcNav.init();
    var myHostName  = "";
    if(document.location.hostname == "localhost"){
        myHostName = "http://localhost/woclain/pinche";
         }else if (document.location.hostname == "112.124.37.204") {
            myHostName = "http://112.124.37.204";
    }else{
        myHostName = "http://woclain-pinche.mybluemix.net";
    }
    if(/login\.html/.test(document.location.href)){
        postURL = myHostName+"/admin/login.php";
    }else if(/reg\.html/.test(document.location.href)){
        postURL = myHostName+"/admin/reg.php";
    }else if(/pcgc\.html|main\.html/.test(document.location.href)){
        postURL = myHostName+"/admin/order-list.php";
    }else if(/yy\.html/.test(document.location.href)){
        postURL = myHostName+"/admin/order.php";
    }else if(/reg\-info\.html/.test(document.location.href)){
        postURL = myHostName+"/admin/reg-info.php";
    }else{
        postURL = myHostName+"/admin/order-action.php"; 
    }
    


    //console.log(window.history);
    /*
    var checkIndex = /index\.html|\/pinche\/$|\/pinche$/.test(document.location.href);
    if(checkIndex)
        navObj.navBrand('最初页面',"javascript:void(0);");
    else{
        navObj.navBrand('<span aria-hidden="true" class="glyphicon glyphicon-menu-left" id="back">返回</span>');
        
    }*/
    navObj.navBrand('<img src="images/home-logo.png" width="25" height="25" style="margin:-3px 0 0 0" />',"main.html");
    //navObj.navBrand('最初页面',"javascript:void(0);");
 

    navObj.navTab();
    //if(getCookie("HasCar")=="1")
        //navObj.setTabActive("cz");
    hintOverlayObj = hintOverlay.init();
    //detailOverlayObj = hintOverlay.init(1);
    //console.log(hintOverlayObj);
    /*hintOverlayObj.setTitle("abc");
    hintOverlayObj.setBody("abc");
    hintOverlayObj.show();
    hintOverlayObj.shown(function(){
        console.log("fuck");
    });*/
    //toumingmask = pcMask.init();


    $(window).resize(function(){
        pcMask.setMaskSize();
    });
    $("#back").click(function(){
        window.history.go(-1);
    })

   $("#exit").click(function(e){
        
        e.preventDefault();
        if(getCookie("Phone") != undefined){
         removeCookie("Phone");
        removeCookie("UserID");
        removeCookie("HasCar");
        removeCookie("BackUrl");
        removeCookie("ClickTab");
        hintOverlay.setBody("成功退出!");
        hintOverlay.show();
         hintOverlay.shown(function(){
            
            document.location.href = "main.html";
         });
        }else{
            hintOverlay.setBody("请登录!");
            hintOverlay.show();
            hintOverlay.shown(function(){
            
            document.location.href = "login.html";
         });
        }
       
        
    });

});