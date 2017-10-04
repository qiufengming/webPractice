var wrap = document.getElementById("wrap");
var main = document.getElementById("main");
var pages = main.getElementsByClassName("page");
var pageLen = pages.length;
var pageH = document.body.clientHeight;
var pageW = document.body.clientWidth;
var pageNav = document.getElementById("page_nav");
var navLi = document.getElementById("page_nav").getElementsByTagName("li");//页面导航点
var navLiLen = navLi.length;//页面导航点
var navIndex = 0;

for(var i=0;i<pages.length;i++){
	pages[i].style.height = pageH + "px";
	pages[i].style.width = pageW + "px";
//	pages[i].getElementsByClassName("tableCell").style.height = pageH + "px";
}

//如果不加时间控制，滚动会过度灵敏，一次翻好几屏
var startTime = 0, //翻屏起始时间  
	endTime = 0,  
	now = 0;     
/**
 * 浏览器兼容      
 */
if ((navigator.userAgent.toLowerCase().indexOf("firefox")!=-1)){   
	document.addEventListener("DOMMouseScroll",scrollFun,false);        
}else if (document.addEventListener) {  
	document.addEventListener("mousewheel",scrollFun,false);  
}else if (document.attachEvent) {  
	document.attachEvent("onmousewheel",scrollFun);   
}else{  
	document.onmousewheel = scrollFun;  
}  

/**
 * 滚动事件处理函数
 * @param event
 */
function scrollFun(event){
	startTime = new Date().getTime(); 
	var delta = event.detail || (-event.wheelDelta);//统一，向上滚动为负，向下滚动为正
	//mousewheel事件中的 “event.wheelDelta” 属性值：返回的如果是正值说明滚轮是向上滚动
	//DOMMouseScroll事件中的 “event.detail” 属性值：返回的如果是负值说明滚轮是向上滚动
	
	if ((endTime - startTime) < -1000){
		if(delta>0 && parseInt(main.offsetTop) > -(pageH*(pageLen-1))){
			//向下滚动
			now = now - pageH;
			toPage(now,"down");
			navIndex = Math.round(-now/pageH);
			for(var i=0; i<navLiLen; i++){				
				var hasActive = $(navLi[i].getElementsByTagName("a")).hasClass("active");	
				if(hasActive){
					$(navLi[i].getElementsByTagName("a")).removeClass("active");
				}
				if(i == navIndex){
					$(navLi[i].getElementsByTagName("a")).addClass("active");
				}
			}
			
        } 
		if(delta<0 && parseInt(main.offsetTop) < 0){
			//向上滚动
			now = now + pageH;
			toPage(now,"up");
			navIndex = Math.round(-now/pageH);
			for(var i=0; i<navLiLen; i++){				
				var hasActive = $(navLi[i].getElementsByTagName("a")).hasClass("active");	
				if(hasActive){
					$(navLi[i].getElementsByTagName("a")).removeClass("active");
				}
				if(i == navIndex){
					$(navLi[i].getElementsByTagName("a")).addClass("active");
				}
			}
		}
		endTime = new Date().getTime();  
	}else{  
		event.preventDefault();    
	}    
}
/**
 * 原生js实现过度效果
 * @param now
 * @param direction
 */
var sliderTime = null;
function toPage(now,direction){    
	clearInterval(sliderTime);//执行当前动画同时清除之前的动画
	sliderTime = setInterval(function(){
		var speed = 0;
		if(direction == "down"){
			if(now<0 && now < main.offsetTop){
				speed = -10;
				main.style.top = main.offsetTop+speed + "px";
				if(main.style.top<=now){
					main.style.top = now + "px";
				}
			}else{
				main.style.top = now + "px";
				speed = 0;
				clearInterval(sliderTime);
			}
		}else{
			if(now<=0 && now >= main.offsetTop){
				speed = 10;
				main.style.top = main.offsetTop+speed + "px";
				if(main.style.top>=now){					
					main.style.top = now + "px";
				}
			}else{
				main.style.top = now + "px";
				speed = 0;
				clearInterval(sliderTime);
			}
		}		
	},10);
}   










