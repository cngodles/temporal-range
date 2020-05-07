
//var timebase = [];
var paper;
var dwn;
window.onload = function(){
  
  temporal.init();
  
  
  /*
  temporal.canvas = document.getElementById("timeline");
  temporal.timebase['x'] = 20;
  temporal.timebase['y'] = 0;
  var scale = 2;
  temporal.timebase['max'] = 541;
  //var svgwidth = (timebase['max'] * timebase['scale']) + (timebase['x'] * 2);

  temporal.paper = temporal.canvas.getContext('2d');
  temporal.drawTimeline(geologictimeeons2, 20, 25, scale);
  temporal.drawTimeline(geologictimeperiods, 45, 25, scale);
  temporal.drawExistanceBar('Petalodus', 'rgb(60, 60, 60)', 268, 318.1, 65, 10, scale);
  */
  dwn = document.getElementById('btndownload');
  dwn.onclick = function(){
    temporal.download(timelinediv, 'myimage.png');
  }
}

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

var temporal = {
  paper:null,
  timebase:[],
  canvas:null,
  init:function(){
    //Draw demo chart.
    this.canvas = document.getElementById("timeline");
    this.timebase['x'] = 20;
    this.timebase['y'] = 0;
    var scale = 2;
    this.timebase['max'] = 541;
    //var svgwidth = (timebase['max'] * timebase['scale']) + (timebase['x'] * 2);

    this.paper = temporal.canvas.getContext('2d');
    
    //Draw sample timeline.
    this.drawTimeline(geologictimeeons2, 20, 25, scale);
    this.drawTimeline(geologictimeperiods, 45, 25, scale);
    //this.drawExistanceBar('Petalodus', 'rgb(60, 60, 60)', 268, 318.1, 65, 10, scale);
  },
  tryTimeline:function(){
    
  },
  drawTimeline:function(data, topOffset, height, scale){
    //var eon = [];
    var eonX = this.timebase['x'];
    var drawtimebase = 0;
    for(var i = 0; i < data.length; i++){
      var reallength = data[i][2] - drawtimebase;
      var barlength = reallength * scale;
      reallength.toFixed(2);
      barlength.toFixed(2);
      var name;
      if(scale > 1){
        name = data[i][0];
      } else {
        name = data[i][3];
      }
      var texttop = this.timebase['y'] + topOffset + 12;

      this.paper.beginPath();
      this.paper.rect(eonX, this.timebase['y'] + topOffset, barlength, height);
      this.paper.fillStyle = data[i][1];
      this.paper.lineWidth = 1;
      this.paper.strokeStyle = 'black';
      this.paper.fill();
      this.paper.stroke();
      this.paper.font = "400 12px sans-serif";
      this.paper.fillStyle = "#000";
      this.paper.fillText(name, eonX+4, texttop);    

      console.log(name, eonX+4, texttop);

      eonX += barlength;
      drawtimebase += reallength;
    }
  },
  drawExistanceBar:function(name, color, start, finish, topOffset, height, scale){
    //var creature = [];
    var creatureX = this.timebase['x'] + (start * scale);
    //var drawtimebase = 0;
    var reallength = finish - start;
    var barlength = reallength * scale;

    var textcenter = creatureX + (barlength / 2);
    var texttop = this.timebase['y'] + topOffset + height + 15;
    var textname = name;
    var textage = start+' to '+finish+ ' Mya';

    reallength.toFixed(2);
    barlength.toFixed(2);

    this.paper.beginPath();
    this.paper.rect(creatureX, this.timebase['y'] + topOffset, barlength, height);
    this.paper.fillStyle = color;
    this.paper.fill();

    this.paper.textAlign = "center";
    this.paper.font = "700 16px sans-serif";
    this.paper.fillText(textname, textcenter, texttop);
    this.paper.font = "700 13px sans-serif";
    this.paper.fillText(textage, textcenter, texttop +20);

    console.log(name, barlength, creatureX, start);
  },
  download:function(paper, filename) {
    /// create an "off-screen" anchor tag
    var lnk = document.createElement('a'), e;

    /// the key here is to set the download attribute of the a tag
    lnk.download = filename;

    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = paper.toDataURL("image/png;base64");

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
}


//drawTimeline(geologictimeeons, 0, 50, 0.25);
//drawTimeline(geologictimeeons2, 20, 25, timebase['scale']);
//drawTimeline(geologictimeperiods, 45, 25, timebase['scale']);
//drawExistanceBar(creature1, 65, 10, timebase['scale']);
//drawExistanceBar(creature2, 180, 20, 2);
