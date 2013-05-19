//기존 코드
(function() {
  console.log("repoll loaded");
  head.js(
    window.location.origin + '/socket.io/socket.io.js',
    'https://raw.github.com/nnnick/Chart.js/master/Chart.min.js',
    function() {
      var ctx = document.getElementById("myChart").getContext("2d");
      var chart = new Chart(ctx);

      var chartData = [
        {
          value : 0,
          color : "#F38630",
          desc : "java"
        },
        {
          value : 0,
          color : "#E0E4CC",
          desc : "javascript"
        },
        {
          value : 0,
          color : "#69D2E7",
          desc : "ruby"
        }
      ];
      var sio = io.connect(window.location.origin + '/master');

      sio.on('error', function() {
        var host = sio.socket.options.host;
        console.log('error connect to ' + host);
      });

      sio.on('connect', function() {
        console.log('socket.io connected to ' + sio.socket.options.host);
        sio.emit('master_ready', JSON.stringify(chartData));
      });

      sio.on('client_vote', function(data) {
        console.log("client_vote event");
        chartData[data.selected].value += 1;
        chart.Pie(chartData);
      });

      window.onbeforeunload = function() {
        sio.emit('force_disconnect');
      }
    }
  );
})();

//Reveal.js와의 연동처리 부분
(function(){
	var isEnabled = true;
  //repoll 모듈
	var repoll = (function() {
		var currentSlide;

		function getSurveyInfo(slideEl){
			//currentSlide 이걸로

			return {
				title : "", //String
				options : [
					{
						text : ""
					}
				]
			};
		}

		function sendToServer (surveyInfo) {
			// 소켓 구현	
		}

		function listenToServer() {
			// 소켓 받는다.

			//render()
		}

		function render (data) {
			var containerEl;
			// 데이터 예시
			// data = [
			// 	"options1" : 2,
			// 	"options2" : 2,
			// 	"options3" : 2,
			// 	"options4" : 2,
			// 	"options5" : 2,
			// 	"options6" : 2,
			// 	"options6" : 2
			// ];

			// repoll-result
			containerEl	 = currentSlide.querySelector(".repoll-result");

			// ?????.render(contains,data);
		}

		function init (slide) {
			currentSlide = slide;
			options = slide.dataset;

			sendToServer(getSurveyInfo(slideEl));
			listenToServer();
		}

		return {
			init : init
		};
	})();

	if (Reveal.getCurrentSlide().classList.contains("repoll")) {
		repoll.init(Reveal.getCurrentSlide());
	};

	Reveal.addEventListener( 'slidechanged', function( event ) {
    if(event.currentSlide.classList.contains("repoll")){
    	repoll.init(Reveal.getCurrentSlide());
    }
	});

  Reveal.addEventListener( 'overviewshown', function(event) { } );
  Reveal.addEventListener( 'overviewhidden', function(event) { } );

})();
