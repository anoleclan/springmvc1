function getButton(d, order, detail,pcgc) {
    var userid = getCookie("UserID");

                var orderActionButtonText = "";
                var orderActionButtonClass = "";
                var orderActionButtonStatusCode = "";
                var orderActionButtonStatus = "";
                var orderActionButtonDisable = "";
                var pcgc = pcgc == undefined ? false : true;
                data = d;
                var userid = getCookie("UserID");


                if (hasCar == "0") { //用户操作
                    if (data.orderstatus == "0") { //等待接单
                        if(detail == 0){
                          orderActionButtonText = "取消";
                        }else{
                          orderActionButtonText = "取消订单";
                        }
                        orderActionButtonClass = "btn-danger";
                        if(pcgc){
                            if(d.userid!=userid){
                                orderActionButtonText = "未知状态";//modif by boom.yin at 5/15
								orderActionButtonClass = "btn-info";//add by boom.yin at 5/15
                                orderActionButtonDisable = "disabled";
								
                            }
                        }
                        

                        orderActionButtonStatus = "0";
                    } else if (data.orderstatus == "2") {
            
                          if(detail == 0){
                          orderActionButtonText = "失败";
                        }else{
                          orderActionButtonText = "失败订单";
                        }
                        orderActionButtonClass = "btn-danger";

                        orderActionButtonStatus = "NONE";
                        orderActionButtonDisable = "disabled";
                    } else if (data.orderstatus == "1") {
                        if(detail == 0){
                          orderActionButtonText = "等待";
                        }else{
                          orderActionButtonText = "等待司机";
                        }
                        
                        orderActionButtonClass = "btn-warning";

                        orderActionButtonStatus = "NONE";
                        orderActionButtonDisable = "disabled";
                    } else {
                         if(detail == 0){
                          orderActionButtonText = "成功";
                        }else{
                          orderActionButtonText = "成功订单";
                        }
                        
                        orderActionButtonClass = "btn-success";

                        orderActionButtonStatus = "NONE";
                        orderActionButtonDisable = "disabled";
                    }
                } else { //车主操作
                    //orderstatus == 0 等待接单 1 接单 2 用户取消 3 完成
                    if (data.orderstatus == "0") { //等待接单
                        if (order == 1) {
                          if(detail == 0){
                            orderActionButtonText = "接单";
                          }else{
                            orderActionButtonText = "我要接单";
                          }
                            orderActionButtonClass = "btn-success";
                            orderActionButtonStatus = "1";
                        } else {
                          if(detail == 0){
                            orderActionButtonText = "取消";
                          }else{
                            orderActionButtonText = "取消订单";
                          }
                            orderActionButtonClass = "btn-danger";
                            orderActionButtonStatus = "0";
                        }
                        if(pcgc){

                            if(d.userid==userid){
                                orderActionButtonText = "取消订单";
								orderActionButtonClass = "btn-danger"; //add by boom.yin at 5/15
                                orderActionButtonStatus = "0";
                            }
                        }

                    } else if (data.orderstatus == "1") { //接单
                        if (order == 1) {
                          if(detail == 0){
                          orderActionButtonText = "完成";
                          }else{
                                orderActionButtonText = "完成订单";
                          }
                          orderActionButtonClass = "btn-warning";
                          orderActionButtonStatus = "2";
              
                        }else{
                              if(detail == 0){
                                    orderActionButtonText = "等待";
                               }else{
                                    orderActionButtonText = "等待司机";
                              }
                          orderActionButtonClass = "btn-warning";
                          orderActionButtonStatus = "NONE";
                          orderActionButtonDisable = "disabled";
                        }

                         if(pcgc){
                            if(d.userid==userid){
                                orderActionButtonText = "等待司机";
                                orderActionButtonClass = "btn-warning";
                          orderActionButtonStatus = "NONE";
                          orderActionButtonDisable = "disabled";
                            }
                            if(d.picker==userid){
                                 orderActionButtonText = "完成订单";
                                 orderActionButtonClass = "btn-warning";
                          orderActionButtonStatus = "2";
                            }else{
                                orderActionButtonText = "等待司机";
                                orderActionButtonClass = "btn-warning";
                          orderActionButtonStatus = "NONE";
                          orderActionButtonDisable = "disabled";
                            }
                        }
                    } else if (data.orderstatus == "2") {
                       if(detail == 0){
                        orderActionButtonText = "失败";
                        }else{
                          orderActionButtonText = "失败订单";
                        }
                        orderActionButtonClass = "btn-danger";
                        orderActionButtonStatus = "NONE";
                        orderActionButtonDisable = "disabled";
                    } else if (data.orderstatus == "3") {
                      if(detail == 0){
                        orderActionButtonText = "成功";
                      }else{
                        orderActionButtonText = "成功订单";
                      }
                        orderActionButtonClass = "btn-success";
                        orderActionButtonStatus = "NONE";
                        orderActionButtonDisable = "disabled";
                    }
                }

                return {

                    "orderActionButtonText": orderActionButtonText,
                    "orderActionButtonClass": orderActionButtonClass,
                    "orderActionButtonStatusCode": orderActionButtonStatusCode,
                    "orderActionButtonStatus": orderActionButtonStatus,
                    "orderActionButtonDisable": orderActionButtonDisable

                }

            }

            function getIndexTime(unixTime, isorder) {

                order = isorder == undefined ? 0 : isorder;
                var date = new Date(parseInt(unixTime) * 1000);

                var today = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
                var week = today[date.getDay()];
                var month = parseInt(date.getMonth()) + 1;
                var day = parseInt(date.getDate());
                var hours = parseInt(date.getHours());
                var hour = hours == 0 ? "00": hours;
                var time = date.getMinutes();
                //console.log(month)
                //console.log(day)
                var myTime = "";
                if (order == 0) {
                    myTime = month + "月" + day + "日" + "（" + week + "） " + hour + ":" + time;
                } else {
                    myTime = month + "月" + day + "日 " + hour + ":" + time;
                }

                return myTime;
            }
function orderAction(dom) {
    var actionButton = ""

    if (dom != undefined) {
        actionButton = $(dom);
    }

    else {
        actionButton = $(".action-btn");
    }

    actionButton.click(function(e) {
        pcMask.show();
        var actionData = {};
        var orderId = $(this).attr("title");
        var hasCar = getCookie("HasCar");
        var actorUserId = getCookie("UserID");

        var actionCode = $(this).attr("rel");
        actionData = {
            "orderid": orderId,
            "hascar": hasCar,
            "actionuserid": actorUserId,
            "action": actionCode
        }
        if (document.location.hostname == "localhost") {
            myHostName = "http://localhost/woclain/pinche";
        }else if (document.location.hostname == "112.124.37.204") {
            myHostName = "http://112.124.37.204";
        } else {
            myHostName = "http://woclain-pinche.mybluemix.net";
        }
        formSubmit.init(myHostName + "/admin/order-action.php", actionData,function() {}, function(data) {

            hintOverlayObj.setTitle(data.message);
            hintOverlayObj.setBody("");
            pcMask.hide(function() {

                hintOverlayObj.show();

                hintOverlayObj.shown(function() {

                    window.location.reload();
                    
                });

            });

        });

    })
}
var pcMaskCount = 0;
var pcMask = {
    pt: 500,
    delay:800,
    maskid : "",
    dom: '<div id="mask"><div class="progress"><div class="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div></div>',
     init: function () {
        this.t = this.pt + this.delay;
        $("body").after(this.dom);
        this.maskid = "mask"

        $("#"+this.maskid).css({
                "display": "none",
                "padding": "20px",
                "background-color": "#000",
                "position": "absolute",
                "z-index": "999",
                "top": "0px",
                "left": "0px",
                "opacity": "0.5"
            });
         this.setMaskSize();
         return this;
    },
    
    setMaskSize: function () {
        var w = $(document).width();
        var h = $(document).height();
        var sctop = $(document).scrollTop();
        $("#"+this.maskid).css("width", w);
        $("#"+this.maskid).css("height", h);
        $("#"+this.maskid+ " .progress").css("margin-top", $(document).height() / 2 - $("#"+this.maskid+ " .progress").height());
    },
    show: function (dark,progress_time) {

        if(dark==true){
            $("#"+this.maskid).css({
               
                "opacity": "1"
            });

        }else{
            $("#"+this.maskid).css({
                "opacity": "0.5"
            });
        }
            
        
        this.setMaskSize();
        if (progress_time != undefined){
            this.pt = progress_time;
        }
            
        $("#"+this.maskid).slideDown("fast");
        //this.progress_bar_default();
        this.progress();
    },
    hide: function (exe) {
        __this = this;

        setTimeout(function () {

            __this.progress_bar_default();
            $("#"+__this.maskid).slideUp("fast");

        }, this.pt + this.t);
        setTimeout(function(){

           exe();
           
        },this.t);

    },
    progress: function () {
        w = $("#"+this.maskid+ " .progress").width();
        attr = {
            width: '+=' + w + 'px'
        }
        $("#"+this.maskid+ " .progress-bar").animate(attr, this.pt);
    },
    progress_bar_default: function () {
        $("#"+this.maskid+ " .progress-bar").css("width", 0);
        $("#"+this.maskid+ " .progress-bar").attr("aria-valuenow", 0);
    },
   
}

var pcNav = {
    commonId : ["navbar","navbar-inverse","navbar-brand"],
    commonAttr : {
        active : "active",
        profile : {
            link : "profile.html",
            text : "用户中心"
        },
        message : {
            link : "message.html",
            text : "消息中心"
        },
        exit : {
            link : "#",
            text : "退出"
        },
        login : {
                link : "login.html",
                text : "登录"
            },

        navLink : {
            login : {
                link : "login.html",
                text : "登录"
            },
            reg : {
                link : "reg.html",
                text : "注册"
            }
            
        },
        navTab : {
            userText : "我是乘客",
            userLink : "pcgc.html",
            hasCar : "我是车主",
            hasCarLink : "我是乘客",
            buttonColor : "btn-default",
            hasCarId : "pc-hasCar",
            userId : "pc-user",
            active : ""
        }
    },
    topContainer : "#pc-header",
    init : function(){
       this.createDom();
       //this.navBrand('<span aria-hidden="true" class="glyphicon glyphicon-menu-left">返回</span>');
       //this.navTab();
       return this;
    },
    createDom : function(){
        topContainer = $('<nav>').appendTo(this.topContainer).addClass(this.commonId[0]).addClass(this.commonId[1]).end();
        fluidContianer = $('<div class="container-fluid">').appendTo(topContainer).end();
        this.navbarHeader = $('<div class="navbar-header">').appendTo(fluidContianer).end();
        $(this.navbarHeader).after('<div class="collapse navbar-collapse" id="navbar-menu"><ul class="nav navbar-nav"><li><a href="'+this.commonAttr.profile.link+'"><span aria-hidden="true" class="glyphicon glyphicon-user"></span> '+this.commonAttr.profile.text+'</a></li><li role="presentation" class="divider"></li><li><a href="'+this.commonAttr.message.link+'"><span aria-hidden="true" class="glyphicon glyphicon-envelope"></span> '+this.commonAttr.message.text+' <span class="badge" style="background-color:#FF3333; color:#fff;font-weight:normal;">1</span></a></li><li><a href="'+this.commonAttr.login.link+'"><span aria-hidden="true" class="glyphicon glyphicon-globe"></span> '+this.commonAttr.login.text+'</a></li><li><a href="'+this.commonAttr.exit.link+'" id="exit"><span aria-hidden="true" class="glyphicon glyphicon-off"></span> '+this.commonAttr.exit.text+'</a></li></ul></div>');
    },
    setTabActive : function(hc){


        if(hc=="1"){

            $('#'+this.commonAttr.navTab.hasCarId).removeClass("btn-success").removeClass("btn-default").addClass("btn-success");
            $('#'+this.commonAttr.navTab.userId).removeClass("btn-success").removeClass("btn-default").addClass("btn-default");
        }else{
            $('#'+this.commonAttr.navTab.hasCarId).removeClass("btn-success").removeClass("btn-default").addClass("btn-default");
            $('#'+this.commonAttr.navTab.userId).removeClass("btn-success").removeClass("btn-default").addClass("btn-success");

        }
    },
    navTab : function(){
        hasCarActive = "";
        userActive = "";
        clickTab = getCookie("ClickTab");

        if(clickTab==undefined){
            hasCarActive=" btn-default"; 
            userActive=" btn-success"; 
            setCookie("ClickTab",0);
        }else{
            if(clickTab==1){
                hasCarActive=" btn-success";
                userActive="  btn-default";
                setCookie("ClickTab",1);
            }else{
                 hasCarActive=" btn-default";
                userActive="  btn-success";
                setCookie("ClickTab",0);
            }
        }
        
            

            
   
        html = '<div class="btn-group" role="group" style="float: left;margin: 8px 0 0 30px;"><button id="'+this.commonAttr.navTab.hasCarId+'" type="button" class="btn'+hasCarActive+'">'+this.commonAttr.navTab.hasCar+'</button><button id="'+this.commonAttr.navTab.userId+'" type="button" class="btn'+userActive+'">'+this.commonAttr.navTab.userText+'</button></div>';

        $(html).appendTo(this.navbarHeader).end();

        this.navTabEvent();
    },
    navTabEvent:function(){
        phone = getCookie("Phone") == undefined ? false : getCookie("Phone");
        hasCar = getCookie("HasCar") == undefined ? false : getCookie("HasCar");
        clickTab = getCookie("ClickTab");

        _this = this;
            $("#"+this.commonAttr.navTab.hasCarId).click(function(){

                setCookie("ClickTab",1);

                _this.setTabActive(1);
                if(phone==false){// not login
                    window.location.href="login.html";
                }else{// have login
                     if(hasCar == false){
                            window.location.href="reg-info.html";
                        }else{
                            window.location.href="pcgc.html";
                        }

                }
            });
            $("#"+this.commonAttr.navTab.userId).click(function(){
                 setCookie("ClickTab",0);
                _this.setTabActive(0);
                 window.location.href="main.html";
                 /*
               
                if(phone==false){// not login
                    window.location.href="main.html";
                }else{// have login
                    if(hasCar == false){
                        window.location.href="main.html";
                    }else{
                        window.location.href="main.html";
                    }
                    
                }*/
            });
      
    },
    navBrand : function(content,url){
        html = "";
        link = url == undefined ? "#" : url;
        html += '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>';
        html += '<a class="'+this.commonId[2]+'" href="'+link+'">'+content+"</a>";
        $(html).appendTo(this.navbarHeader).end();
    }

};

var orderList = {
    topContainer : "#pc-content",
    init : function(){
        this.getList();
        
        return this;
    },
    orderCompleateEvent : function(){
        $("#order-compleate").click(function(e){
            console.log(e);
        })
    },
    getList : function(){

        var postAttr = {
            "userid" : getCookie("UserID"),
            "hasCar" : getCookie("HasCar")=="1" ? 1 : 0,

        };
        _orderListThis = this;
        var orderData = {};
        formSubmit.init(postURL,postAttr,function(){},function(data){


            var html = '';
            //var html = '<div class="panel"><div class="panel-body"><table class="table table-bordered table-hover"><caption>'+formatPhone(getCookie("Phone"))+'</caption><thead><tr class="danger"><th>订单号</th><th>出发地点</th><th>目的地</th><th>预约日期时间</th><th>状态</th><th>操作</th></tr></thead><tbody>';
            _orderListThis.orderData = data;
            $.each(data["data"],function(t,obj){
                orderData[obj.orderid] = obj;
                var dateTime = getIndexTime(obj.when, 1);
                 var bd = getButton(obj, 1,1,1);
                        var button = '<button type="button" rel="' + bd.orderActionButtonStatus + '" class="btn ' + bd.orderActionButtonClass + ' action-btn" ' + bd.orderActionButtonDisable + ' title="' + obj.orderid + '">' + bd.orderActionButtonText + '</button>';
                        var detailButton = '<button type="button" class="btn btn-primary btn-xs detail-button" data-toggle="modal" title="' + obj.orderid + '"><span class="glyphicon glyphicon-plus-sign"></span></button>';

                html += '<tr><td>'+obj.from+'</td><td>'+obj.to+'</td><td>'+dateTime+'</td><td>'+detailButton+'</td></tr>';
html += '<tr><td colspan="4" style="border-top:none;">'+button+'</td></tr>';

            });
            
            //html += '</tbody></table></div></div>';
    
            $(html).appendTo(_orderListThis.topContainer).end();
        },function(){
            orderAction(".action-btn");
         $(".detail-button").click(function(e) { //yy on detail Action start
             
                var orderId = $(this).attr("title");
                tData = orderData[orderId];

                hintOverlayObj.setTitle("订单详情");
                var content = "";
                var ordertime = getIndexTime(tData["when"],1);
                 var bd = getButton(tData, 1, 1,1);

                var button = '<button type="button" rel="' + bd.orderActionButtonStatus + '" class="btn ' + bd.orderActionButtonClass + ' detail-order-action-btn" ' + bd.orderActionButtonDisable + ' title="' + tData.orderid + '">' + bd.orderActionButtonText + '</button>';

                    content += '<p><strong>乘客电话：</strong>' + tData["phone"] + ' <a href="tel:' + tData["phone"] + '"><span class="glyphicon glyphicon-earphone" style="color:#339900"></span></a></p>';
     
                content += '<p><strong>预约：</strong>从 <strong style="color:#009966">' + tData["from"] + '</strong> 到 <strong style="color:#FF0000">' + tData["to"] + '</strong></p>';

                content += '<p><strong>预约时间：</strong>' + ordertime + '</p>';
                content += '<p>' + button + '</p>';
                hintOverlayObj.setBody(content);
                
                hintOverlayObj.show();
                        //$(".detail-order-action-btn").click(function(){
                          //  var samebutton = ".action-btn[title="+this.title+"]";
             
                            //$(samebutton).click();
                            //window.document.location.reload();
                        //})
      orderAction(".detail-order-action-btn");
                
            }); //yy on detail Actio
        }); // order list end

          


        
    },
    orderContainer : function(data){
        var hasCar = getCookie("HasCar");
        //status label;
        var orderStatusText = "";
        var orderStatusClass = "";
     
        if(data.orderstatus=="0"){
            if(hasCar == "0"){
                orderStatusText = "等待接单";
            }else{
                orderStatusText = "可以接单";
            }
                
            orderStatusClass = "label-success";
        }else if(data.orderstatus=="1"){
            orderStatusText = "已接单";
            orderStatusClass = "label-primary";
        }else if(data.orderstatus=="3"){
            orderStatusText = "完成订单";
            orderStatusClass = "label-info";
        }else{
            orderStatusText = "已取消";
            orderStatusClass = "label-default";
        }
        var orderStatusStr = '<h4><span class="label '+orderStatusClass+' action-label" title="'+data.orderid+'">'+orderStatusText+'</span></h4>';
        //action button

        var orderActionButtonText = "";
        var orderActionButtonClass = "";
        var orderActionButtonStatusCode = "";
        var needButton = false;
       if(hasCar=="0"){//用户操作
            if(data.orderstatus=="0"){//等待接单

                if(data.userid==getCookie("UserID")){
                   orderActionButtonText = "取消订单";
                
                    needButton = true; 
                }else{
                    orderActionButtonText = "";
                    
                    needButton = false;
                }
                orderActionButtonClass = "btn-danger";
                    orderActionButtonStatus = "0";

            }
        }else{//车主操作
           if(data.orderstatus=="0"){//等待接单

                orderActionButtonText = "接单";
                orderActionButtonClass = "btn-danger";
                orderActionButtonStatus = "1";
                needButton = true;
           }else if(data.orderstatus=="1"){//等待接单
            console.log(data);
               if(data.picker==getCookie("UserID")){
                   needButton = true;
               }else{
                   needButton = false;
               }
               orderActionButtonText = "完成订单";
                orderActionButtonClass = "btn-warning";
                orderActionButtonStatus = "2";
             
           }
        }
        var orderActionButtonStr = "";
        if(needButton){
            orderActionButtonStr = '<button type="button" rel="'+orderActionButtonStatus+'" class="btn '+orderActionButtonClass+' action-btn" title="'+data.orderid+'">'+orderActionButtonText+'</button>';
        }else{
            orderActionButtonStr = "";
        }
        
        //var html = '<tr><td>'+data.orderid+'</td><td>'+data.from+'</td><td>'+data.to+'</td><td>'+data.when+'</td><td><h4 style="height:35px;margin-top:5px;margin-bottom:0px;text-align:right;">'+orderStatusStr+'</h4></td><td style="text-align:right;">'+orderActionButtonStr+'</td></tr>';
        var html = '<div class="panel panel-info"><div class="panel-body"><div class="row"><div class="col-md-2">用户：'+formatPhone(data.phone)+'<br />'+data.orderid+'</div><div class="col-md-2">'+data.from+'</div><div class="col-md-2">'+data.to+'</div><div class="col-md-2">'+data.when+'</div><div class="col-md-2">'+orderStatusStr+'</div><div class="col-md-2">'+orderActionButtonStr+'</div></div></div></div>';
        return html;
    }
}
var hintOverlay = {
    topContainer : "body",
    commonId : ["alert-title","alert-body","commonDialog","commonDialog1"],
    init : function(detail){
        this.detail = detail==undefined ? false : true;
        if(detail){
            html = '<div class="modal fade" id="'+this.commonId[3]+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="'+this.commonId[0]+'"></h4></div><div class="modal-body" id="'+this.commonId[1]+'"></div><div class="modal-footer"><button type="submit" class="btn btn-default" data-dismiss="modal">关闭</button></div></div></div></div>';
         
        }else{
           html = '<div class="modal fade" id="'+this.commonId[2]+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="'+this.commonId[0]+'"></h4></div><div class="modal-body" id="'+this.commonId[1]+'"></div><div class="modal-footer"><button type="submit" class="btn btn-default" data-dismiss="modal">关闭</button></div></div></div></div>';
         
        }
        $(html).appendTo(this.topContainer).end();
        return this;
    },
    setTitle : function(html){
        $('#'+this.commonId[0]).html(html);
    },
    setBody : function(html){
        $('#'+this.commonId[1]).html(html);
    },
    setClose : function(text){
           if(this.detail){
        $('#'+this.commonId[3]+" [type=submit]").html(text);
        }else{
            $('#'+this.commonId[2]+" [type=submit]").html(text);
        }
    },
    show : function(exe){
           if(this.detail){
        $('#'+this.commonId[3]).modal('show');
    }else{
            $('#'+this.commonId[2]).modal('show');
    }
       
    },
    shown : function(exe){
        _this = this;
        if(this.detail){
        $('#'+this.commonId[3]).on('shown.bs.modal', function(){

            $('#'+_this.commonId[3]+',#'+_this.commonId[3]+' .close,#'+_this.commonId[3]+' button[data-dismiss=modal]').click(function(){

                exe();
            });
            
        });
    }else{
         $('#'+this.commonId[2]).on('shown.bs.modal', function(){

            $('#'+_this.commonId[2]+',#'+_this.commonId[2]+' .close,#'+_this.commonId[2]+' button[data-dismiss=modal]').click(function(){

                exe();
            });
            
        });
    }
    }
};

var formSubmit = {
    attr : {
        //type: "get",
        url: "",
        data: {},
        dataType: "jsonp", //"xml", "html", "script", "json", "jsonp", "text".
        jsonp: "callback",
        jsonpCallback:"pcCallBack",
        beforeSend: function(exe){
            exe();
        },
        success: function(exe){
            exe(response);
        },
        complete: function(exe){
            exe(XMLHttpRequest, textStatus);
        },
        error: function(exe){
            exe();
        }
    },
    init : function(url,data,beforeExe,successExe,completeExe,errorExe){
        time = (new Date()).valueOf();

        this.attr.jsonpCallback = "pcCallBack" + time;
        this.attr.url = url;
        this.attr.data = data;
        this.attr.beforeSend = beforeExe;
        this.attr.success = successExe;
        this.attr.complete = completeExe;
        this.attr.error = errorExe;
        $.ajax(this.attr);
    }
};

function getCookie(name){
    return $.cookie(name);
}
function setCookie(name,value){
    //var attr = {expires：7,path：'/',domain: 'localhost',secure: false,raw:true};
    //var attr = {expires：7};
    var attr = {};
    return $.cookie(name,value,attr);
}
function removeCookie(name){
    return $.cookie(name,null,{expires:0});
}
function formatPhone(str){
  
  return str.substring(0,3)+"-"+str.substring(3,7)+"-"+str.substring(7,11);
}

function setPostData(name,value){
    var obj = {};
    obj["name"] = name;
    obj["value"] = value;
    return obj;
}