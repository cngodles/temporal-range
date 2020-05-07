
var timebase = [];
var paper;
window.onload = function(){
  var timelinediv = document.getElementById("timeline");
  
  timebase['x'] = 20;
  timebase['y'] = 0;
  timebase['scale'] = 2;
  timebase['max'] = 541;
  //var svgwidth = (timebase['max'] * timebase['scale']) + (timebase['x'] * 2);

  paper = timelinediv.getContext('2d');
  drawTimeline(geologictimeeons2, 20, 25, timebase['scale']);
  drawTimeline(geologictimeperiods, 45, 25, timebase['scale']);
  //drawExistanceBar(creature1, 65, 10, timebase['scale']);
  
  
}
//var paper = Raphael(document.getElementById("timeline"), svgwidth, 120);

//var alltime = paper.rect(timebase['x'], timebase['y'], 1200, 300, 0);
//alltime.attr("fill", "#ddd");
//alltime.attr("stroke", "#202020");

var geologictimeeons = [
  ['Cenozoic','rgb(246,236,57)',66],
  ['Mesozoic','rgb(7,202,234)',251.9],
  ['Paleozoic','rgb(146,195,160)',541],
  ['Proterozoic','rgb(254,76,104)',2500],
  ['Archean','rgb(254,0,124)',4000],
  ['Hadean','rgb(203,3,129)',4600]
];

var geologictimeeons2 = [
  ['Cenozoic', 'rgb(246,236,57)', 66, 'Ceno.'],
  ['Mesozoic', 'rgb(7,202,234)', 251.9, 'Meso.'],
  ['Paleozoic', 'rgb(146,195,160)', 541, 'Paleo']
];

var creature1 = ['Petalodus','rgb(60, 60, 60)', 268, 318.1];
var creature2 = ['Us','rgb(60, 60, 60)', 0, 0];
var creature3 = ['Mourlonia', 'rgb(60, 60, 60)', 0.012, 466];

var geologictimeperiods = [
  ['Quanternary','rgb(254,246,145)', 2.58, ''],
  ['Neogene','rgb(254,221,45)', 23.03, 'N'],
  ['Paleogene','rgb(254,161,99)', 66, 'Pg'],
  ['Cretaceous','rgb(111,200,107)', 145, 'K'],
  ['Jurassic','rgb(0,187,231)', 201.3, 'J'],
  ['Triassic','rgb(153,78,150)', 251.9, 'T'],
  ['Permian','rgb(247,88,60)', 298.9, 'P'],
  ['Carboniferous','rgb(63,174,173)', 358.9, 'C'],
  ['Devonian','rgb(221,150,81)', 419.2, 'D'],
  ['Silurian','rgb(166,223,197)', 443.8, 'S'],
  ['Ordovician','rgb(0,169,138)', 485.4, 'O'],
  ['Cambrian','rgb(129,170,114)', 541, 'Є']
];

function drawTimeline(data, topOffset, height, scale){
  var eon = [];
  var eonX = timebase['x'];
  var drawtimebase = 0;
  for(var i = 0; i < data.length; i++){
    var reallength = data[i][2] - drawtimebase;
    var barlength = reallength * scale;
    reallength.toFixed(2);
    barlength.toFixed(2);
    
    paper.beginPath();
    paper.rect(eonX, timebase['y'] + topOffset, barlength, height);
    paper.fillStyle = data[i][1];
    paper.fill();
    
    //eon[data[i][0]] = paper.rect(eonX, timebase['y'] + topOffset, barlength, height, 0);
    //eon[data[i][0]].attr("fill", data[i][1]);
    //eon[data[i][0]].data("name", data[i][0]);
    /*
    var name;
    if(scale > 1){
      name = data[i][0];
    } else {
      name = data[i][3];
    }
    var texttop = timebase['y'] + topOffset + 10;
    paper
      .text(eonX+4, texttop, name)
      .attr("text-anchor", "start")
      .attr("font-size", "12px");
    */
    eonX += barlength;
    drawtimebase += reallength;
  }
}

function drawExistanceBar(data, topOffset, height, scale){
  var creature = [];
  var creatureX = timebase['x'] + (data[2] * scale);
  var drawtimebase = 0;
  var reallength = data[3] - data[2];
  var barlength = reallength * scale;
  var textcenter = creatureX + (barlength / 2);
  
  reallength.toFixed(2);
  barlength.toFixed(2);
  creature[data[0]] = paper.rect(creatureX, timebase['y'] + topOffset, barlength, height, 0);
  creature[data[0]].attr("fill", data[1]);
  creature[data[0]].data("name", data[0]);
  var texttop = timebase['y'] + topOffset + height + 10;
  
  paper.text(textcenter, texttop, data[0]).attr("font-size", "16px").attr("font-weight", "700");
  paper.text(textcenter, texttop + 20, data[2]+' to '+data[3]+ ' Mya').attr("font-size", "12px");
  console.log(data, barlength, creatureX, data[2]);
}

/* Canvas Download */
function download(canvas, filename) {
  /// create an "off-screen" anchor tag
  var lnk = document.createElement('a'), e;

  /// the key here is to set the download attribute of the a tag
  lnk.download = filename;

  /// convert canvas content to data-uri for link. When download
  /// attribute is set the content pointed to by link will be
  /// pushed as "download" in HTML5 capable browsers
  lnk.href = canvas.toDataURL("image/png;base64");

  /// create a "fake" click-event to trigger the download
  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false,
                     false, 0, null);

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}


//drawTimeline(geologictimeeons, 0, 50, 0.25);
//drawTimeline(geologictimeeons2, 20, 25, timebase['scale']);
//drawTimeline(geologictimeperiods, 45, 25, timebase['scale']);
//drawExistanceBar(creature1, 65, 10, timebase['scale']);
//drawExistanceBar(creature2, 180, 20, 2);
