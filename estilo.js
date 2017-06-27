var cont=0;

var density = 20,
		speed = 1,
		winHeight = $('window').height(),
		start = {yMin:winHeight + 50, yMax:winHeight + 50, xMin:100, xMax:200, scaleMin:0.1, scaleMax:0.25, opacityMin:0.2, opacityMax:0.4},
		mid = {yMin:winHeight * 0.3, yMax:winHeight * 0.5, xMin:75, xMax:300, scaleMin:0.2, scaleMax:0.3, opacityMin:0.5, opacityMax:1},
		end = {yMin:-180, yMax:-180, xMin:20, xMax:600, scaleMin:0.1, scaleMax:1, opacityMin:0.2, opacityMax:0.7},
		colors = ["#F16A28","#E50000","#FF4C4C"];

	function range(map, prop) {
		var min = map[prop + "Min"],
			max = map[prop + "Max"];
		return min + (max - min) * Math.random();
	}

	function spawn(particle) {
		var wholeDuration = (10 / speed) * (0.7 + Math.random() * 0.4),
			delay = wholeDuration * Math.random(),
			partialDuration = (wholeDuration + 1) * (0.3 + Math.random() * 0.4);

		//set the starting values
		TweenLite.set(particle, {y:range(start, "y"), x:range(start, "x"), scale:range(start, "scale"), opacity:range(start, "opacity"), visibility:"hidden", color:colors[ Math.floor(Math.random() * colors.length) ]});

		//the y tween should be continuous and smooth the whole duration
		TweenLite.to(particle, wholeDuration, {delay:delay, y:range(end, "y"), ease:Linear.easeNone});

		//now tween the x independently so that it looks more randomized (rather than linking it with scale/opacity changes too)
		TweenLite.to(particle, partialDuration, {delay:delay, x:range(mid, "x"), ease:Power1.easeOut});
		TweenLite.to(particle, wholeDuration - partialDuration, {delay:partialDuration + delay, x:range(end, "x"), ease:Power1.easeIn});

		//now create some random scale and opacity changes
		partialDuration = wholeDuration * (0.5 + Math.random() * 0.3);
		TweenLite.to(particle, partialDuration, {delay:delay, scale:range(mid, "scale"), autoAlpha:range(mid, "opacity"), ease:Linear.easeNone});
		TweenLite.to(particle, wholeDuration - partialDuration, {delay:partialDuration + delay, scale:range(end, "scale"), autoAlpha:range(end, "opacity"), ease:Linear.easeNone, onComplete:spawn, onCompleteParams:[particle]});
	}

	$(window).ready(function() {
		var body = $("#fountain-top"),
			i, particle;
		for (i = 0; i < density; i++) {
			spawn( $("<div />", {id:"heart"+i}).addClass("heart").html('&#10084;').appendTo(body) );
		}

		$('div#letter').click(function(event) {
			let footer=$('footer');
			footer.empty();
			if(cont>7){
				cont=0;
			}
			switch (cont) {
				case 0:
					footer.html('<p>Incluso si el mundo se convierte en tu enemigo ... Yo estare ahi para protegerte</p>');
					break;
				case 1:
					footer.html('<p>El regalo más bonito que pudiera desear, es estar contigo. </p>');
					break;
				case 2:
					footer.html('<p>Mientras nos recordemos el uno al otro, nunca estaremos separados.');
					break;
				case 3:
					footer.html('<p>Cuánto más conoces a alguien, menos necesitas explicar las cosas. </p>');
					break;

				case 4:
				footer.html('<p>Nuestros corazones están llenos de recuerdos, pero no todos ellos reflejan la verdad. </p>');
					break;
				case 5:
					footer.html('<p>Todo empieza y acaba en la oscuridad y el corazón no es diferente. La oscuridad brota en el, crece, lo consume, es su naturaleza, y al final, todo corazón regresa a la oscuridad de donde proviene. La oscuridad es la verdadera esencia del corazón. </p>');
					break;
				case 6:
					footer.html('<p>Cuanto más te acerques a la luz, mayor será tu sombra.</p>');
					break;
				case 7:
					footer.html('<p>Falleció el cielo, las nubes comenzaron a llorar y entonces... y entonces me prepare para cambiar</p>');
					break;
				default:
					// statements_def
					break;
			}
			cont++;

		});

	});




