function start(){
    timeStart();
    activateplaceholder();
}
function timeStart()
{
	var finish = new Date();
        finish.setDate(finish.getDate()+1);
        finish.setSeconds(0);
        finish.setMinutes(0);
        finish.setHours(0);
        var timeWrappers=$("[data-time='timeWrapper']");
        timeWrappers.each(function (){        
        var a=$("[data-time='intHours']",this)[0];
        var b=$("[data-time='intMinutes']",this)[0];
        var c=$("[data-time='intSeconds']",this)[0];
        var d=$("[data-time='strHours']",this)[0];
        var e=$("[data-time='strMinutes']",this)[0];
        var f=$("[data-time='strSeconds']",this)[0];
        tick(a,b,c,d,e,f);
        var zz=setInterval(function (){
                tick(a,b,c,d,e,f,zz);
            },1000);
        });
        
        function tick(divIntHours,divIntMinutes,divIntSeconds,divStrHours,divStrMinutes,divStrSeconds,zz){
            var diff=(finish-(new Date()))/1000;
            if (diff<0) {clearInterval(zz); return;}
            var intHours=Math.floor(diff/3600);
            var intMinutes=Math.floor(diff/60)-intHours*60;
            var intSeconds=Math.floor(diff-intHours*3600-intMinutes*60);
            switch (findWords(intHours)){
                case 1: divStrHours.innerHTML="час"; break;
                case 2: divStrHours.innerHTML="часа"; break;
                case 3: divStrHours.innerHTML="часов"; break;
            }
            switch (findWords(intMinutes)){
                case 1: divStrMinutes.innerHTML="&nbsp;минута"; break;
                case 2: divStrMinutes.innerHTML="&nbsp;минуты"; break;
                case 3: divStrMinutes.innerHTML="&nbsp;минут"; break;
            }
            switch (findWords(intSeconds)){
                case 1: divStrSeconds.innerHTML="секунда"; break;
                case 2: divStrSeconds.innerHTML="секунды"; break;
                case 3: divStrSeconds.innerHTML="секунд"; break;
            }
            if (intHours<10){
                intHours="&nbsp;"+intHours;
            }
            if (intMinutes<10){
                intMinutes="0"+intMinutes;
            }
            if (intSeconds<10){
                intSeconds="0"+intSeconds;
            }
            divIntHours.innerHTML=intHours;
            divIntMinutes.innerHTML="&nbsp;"+intMinutes;
            divIntSeconds.innerHTML=intSeconds;
        }
        function findWords(int){
            var x=int%10;
            var y=int/10%10;
            if (y==1) return 3;
            if (x==1) return 1;
            if (x>1&&x<5) return 2;
            return 3;
        }
}
function activateplaceholder(){
    $("form").each(function(){
        this.onkeydown=placehold;
    });
}
function placehold(e){
e=e||window.event;
e.target=e.target||e.srcElement;
    setTimeout(slowpok,1);
    function slowpok(){
        if (e.target.value){
            $("label[for='"+e.target.getAttribute("id")+"']",e.target.parentNode)[0].style.visibility="hidden";
        }
        else{
            $("label[for='"+e.target.getAttribute("id")+"']",e.target.parentNode)[0].style.visibility="visible";
        }
    }
}