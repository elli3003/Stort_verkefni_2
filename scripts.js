var siteprogram = (function() {
  var flokkar = document.querySelector('body');

  flokkar.addEventListener('click', function(e) {
    localStorage.setItem("id", e.target.className);

  }, false);

  /*
  * hérna á að fara opna videos.JSON skrána og reyna að lesa allt upp úr henni
  */
  var data;

  var request = new XMLHttpRequest();
  request.open('GET', 'videos.json', true);

  request.onload = function(){
    if (request.status >=200 && request.status < 400) {

      data = JSON.parse(request.response);

        for (var i = 0; i < data["categories"].length; i++) {

          /*
          * hér er section búið til svo hægt sé að skipta categories upp rétt
          * hérna er líka sett fyrirsögn með tiltunum sem er að finna í categories.
          */
          var body = document.querySelector('body');
          var section = document.createElement('section');
          var h2 = document.createElement('h2');

          section.className = "flokkar";

          h2.innerHTML = data["categories"][i]["title"];

          section.appendChild(h2);
          body.appendChild(section);


          /* búa til a tag með mynd inn í sem færir mann yfir á video.html*/
          for (var j = 0; j < data["categories"][i]["videos"].length; j++) {
            var a = document.createElement('a');
            var img = document.createElement('img');
            var k = data["categories"][i]["videos"][j];
            var p1 = document.createElement('p');
            var p2 = document.createElement('p');
            var div = document.createElement('div');
            var div2 = document.createElement('div');

            var created_cal = created(data["videos"][k-1]["created"]);
            var duration = dur(data["videos"][k-1]["duration"]);

            div2.className = "overlay";
            img.src = data["videos"][k-1]["poster"];
            a.href = "video.html";
            img.className = k;
            p1.innerHTML = data["videos"][k-1]["title"];
            p2.innerHTML = "Fyrir " +created_cal + " síðan";
            div.className = "myndband";
            div2.innerHTML = duration;

            a.appendChild(img);

            div.appendChild(div2);
            div.appendChild(a);
            div.appendChild(p1);
            div.appendChild(p2);

            section.appendChild(div);
          }
        }


    } else {
      var data1 = JSON.parse(request.response);
      console.log('villa kom upp: ' + data1.error);

    }

  }

  request.send();

})();

function created(millisec) {

        var seconds = (millisec / 1000).toFixed(0);

        var minutes = (millisec / (1000 * 60)).toFixed(0);

        var hours = (millisec / (1000 * 60 * 60)).toFixed(0);

        var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(0);

        var weeks = (millisec / (1000 * 60 * 60 * 24 * 7)).toFixed(0);

        var month = (millisec / (1000 * 60 * 60 * 24 * 30)).toFixed(0);

        var year = (millisec / (1000 * 60 * 60 * 24 * 30 * 12)).toFixed(0);

        if (seconds < 60) {
            return seconds + " sekúndum";
        } else if (minutes < 60) {
            return minutes + " Mínútum";
        } else if (hours < 24) {
            return hours + " Klukkutímum";
        } else if (days < 7) {
            return days + " Dögum";
        }else if (days < 30) {
          return weeks + " Vikum";
        }else if (days < 365) {
          return month + " Mánuðum";
        }else {
          return year + " Árum";
        }
}

function dur(duration) {
  var seconds = duration;

  var minutes = Math.floor(duration/60);
  if (seconds < 60) {

    return "00:"+seconds;
  }else {
    seconds = (seconds-(minutes*60));

    return minutes + ":" + seconds;
  }

}
