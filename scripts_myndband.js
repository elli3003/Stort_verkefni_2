var siteprogram = (function() {
  var data;
  var nrlocal = localStorage.getItem("id");

  var request = new XMLHttpRequest();
  request.open('GET', 'videos.json', true);

  request.onload = function() {
    if (request.status >=200 && request.status < 400) {
       data = JSON.parse(request.response);

       for (var i = 0; i < data["videos"].length; i++) {
         var nr = data["videos"][i]["id"];


         if (nrlocal == nr ) {

           var body = document.querySelector('body');
           var posVideo = document.createElement('div');
           var video = document.createElement("video");
           var divOverlay = document.createElement('div');
           var title = document.createElement('h1');
           body.appendChild(title);
           body.appendChild(posVideo);
           divOverlay.className = "overlay";
           video.src = data["videos"][i]["video"];
           title.innerHTML = data["videos"][i]["title"];

           posVideo.appendChild(divOverlay);
           posVideo.appendChild(video);



           var div = document.createElement('div');

           var back = document.createElement('a');
           var play = document.createElement('a');
           var mute = document.createElement('a');
           var fullscreen = document.createElement('a');
           var next = document.createElement('a');

           var backImg = document.createElement('img');
           var playImg = document.createElement('img');
           var muteImg = document.createElement('img');
           var fullscreenImg = document.createElement('img');
           var nextImg = document.createElement('img');

           backImg.src = "img/back.svg";
           back.href = "javascript:back()"
           backImg.height = "120";

           playImg.src = "img/play.svg";
           play.href = "javascript:play()";
           playImg.className = "playImg";
           play.className = "play";
           playImg.height = "120";

           muteImg.src = "img/mute.svg";
           mute.href = "javascript:mute()";
           muteImg.className = "muteImg";
           mute.className = "mute";
           muteImg.height = "120";

           fullscreenImg.src = "img/fullscreen.svg"
           fullscreen.href = "javascript:fullscreen()";
           fullscreen.className = "fullscreen";
           fullscreenImg.height = "120";

           nextImg.src = "img/next.svg";
           next.href = "javascript:next()";
           nextImg.height = "120";

           div.className = "takkar";

           back.appendChild(backImg);
           div.appendChild(back);

           play.appendChild(playImg);
           div.appendChild(play);

           mute.appendChild(muteImg);
           div.appendChild(mute);


           fullscreen.appendChild(fullscreenImg);
           div.appendChild(fullscreen);

           next.appendChild(nextImg);
           div.appendChild(next);


           posVideo.appendChild(div);

           var a = document.createElement('a');
           a.className = "back";
           a.href = "index.html";

           a.innerHTML = "Til baka";
           body.appendChild(a);

         }
       }
    } else {
      var data1 = JSON.parse(request.response);
      console.log('Villa kom upp: ' + data1.error);
    }
  }


  request.send();

})();

var back = (function() {
  var video = document.querySelector('video');

  video.currentTime += -3;


});

var play = (function() {
  var video = document.querySelector('video');
  var play = document.querySelector('.play');
  var playImg = document.querySelector('.playImg');

  video.play();

  playImg.src = "img/pause.svg";
  play.href ="javascript:pause()";
});

var pause = (function() {
  var video = document.querySelector('video');
  var play = document.querySelector('.play');
  var playImg = document.querySelector('.playImg');

  video.pause();

  playImg.src = "img/play.svg";
  play.href ="javascript:play()";
});

var mute = (function() {
  var video = document.querySelector('video');
  var mute = document.querySelector('.mute');
  var muteImg = document.querySelector(".muteImg");

  video.muted = true;

  muteImg.src = "img/unmute.svg";
  mute.href = "javascript:unmute()"

});

var unmute = (function() {
  var video = document.querySelector('video');
  var mute = document.querySelector('.mute');
  var muteImg = document.querySelector(".muteImg");

  video.muted = false;

  muteImg.src = "img/mute.svg";
  mute.href = "javascript:mute()"

});

var fullscreen = (function() {
  var video = document.querySelector('video');
  var fullscreen = document.querySelector('.fullscreen');
  fullscreen.addEventListener('click', function(e){
    if (video.requestFullscreen) {
      video.requestFullscreen();
      setInterval(function(){	video.controls = !video.controls; })
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
      setInterval(function(){	video.controls = !video.controls; })
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
      setInterval(function(){	video.controls = !video.controls; })
    }
  });
});

var next = (function() {
  var video = document.querySelector('video');

  video.currentTime += 3

});
