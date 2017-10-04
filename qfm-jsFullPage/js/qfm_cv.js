$(document).ready(function(){
	clickNav();
	projectImgHeight();
});
/**
 * 鼠标点击导航点
 */
function clickNav(){
	var navA = document.getElementById("page_nav").getElementsByTagName("a");
	var pageH = document.getElementById("main").getElementsByClassName("page")[0].style.height;
	
	$(navA).bind("click",function(){
		var navActive = document.getElementById("page_nav").getElementsByClassName("active");
		var activeIndex = $(navActive).parent().index();			
		var thisIndex = $(this).parent().index();
		var nowTop = -parseInt(pageH)*thisIndex;
		now = nowTop;//now 全局变量
		$(navActive).removeClass("active");
		$(this).addClass("active");
		
		if(activeIndex < thisIndex){
			toPage1(nowTop,"down");
		}else if(activeIndex > thisIndex){
			toPage1(nowTop,"up");
		}else{
			return;
		}
	});
}
/**
 * 点击导航滚动动画
 * @param now
 * @param direction
 */
var sliderTime = null;
function toPage1(now,direction){    
	var main = document.getElementById("main");
	clearInterval(sliderTime);//执行当前动画同时清除之前的动画
	sliderTime = setInterval(function(){
		var speed = 0;
		if(direction == "down"){
			if(now<0 && now < main.offsetTop){
				speed = -100;
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
				speed = 100;
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
/**
 * 项目经验图片
 * @return {[type]} [description]
 */
function projectImgHeight(){
	var pageH = document.body.clientHeight;
	var pageW = document.body.clientHeight;
	var proLi = document.getElementById("project").getElementsByTagName("li");
	var proImg = document.getElementById("project").getElementsByClassName("img");
	var proImgLen = proImg.length;
	for(var i=0; i<proImgLen; i++){
		proImg[i].style.height = pageH*0.36 + "px";
	}
} 
function showEnergyImg(){}


