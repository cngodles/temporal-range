
//var timebase = [];
//var paper;
//var dwn;
$(document)
.ready(function(){
  temporal.init();
})
.on("click", "#btndownload", function(){
  temporal.download(temporal.timelinediv, 'myimage.png');
})
.on("submit", "#set-chart", function(e){
  e.preventDefault();
  temporal.tryTimeline();
})
;

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
  scale:2,
  init:function(){
    //Draw demo chart.
    this.canvas = document.getElementById("timeline");
    this.timebase['x'] = 40;
    this.timebase['y'] = 0;
    //pixels per MY
    this.scale = 2;
    this.timebase['max'] = 541;
    //var svgwidth = (timebase['max'] * timebase['scale']) + (timebase['x'] * 2);
    
    
    var size = [];
    size['w'] = 1162;
    size['h'] = 140;
    this.canvas.style.width = size['w'] + "px";
    this.canvas.style.height = size['h'] + "px";

    // Set actual size in memory (scaled to account for extra pixel density).
    var devicescale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    this.canvas.width = Math.floor(size['w'] * devicescale);
    this.canvas.height = Math.floor(size['h'] * devicescale);
    
    this.paper = this.canvas.getContext('2d');
    this.paper.scale(devicescale, devicescale);
    
    /*
    
    
    
    
    this.canvas.style.width = 2324;
    this.canvas.style.height = 800;
    */
    
    
    //Draw sample timeline.
    this.drawTimeline(geologictimeeons2, 20, 25, this.scale);
    this.drawTimeline(geologictimeperiods, 45, 25, this.scale);
    this.drawExistanceBar('Petalodus', 'rgb(60, 60, 60)', 268, 318.1, 65, 10, this.scale);
  },
  tryTimeline:function(){
    this.paper.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //Get form values
    var rangetype = $("#range-type").val();
    var creaturename = $("#creature-name").val();
    var range1 = parseFloat($("#range-1").val());
    var range2 = parseFloat($("#range-2").val());
    if(range1 <= 541 && range2 <= 541 && range1 >= 0 && range2 > 0 && range1 < range2){
      this.drawTimeline(geologictimeeons2, 20, 25, this.scale);
      this.drawTimeline(geologictimeperiods, 45, 25, this.scale);
      this.drawExistanceBar(creaturename, 'rgb(60, 60, 60)', range1, range2, 65, 10, this.scale);
    } else {
      alert("Must fall within range!");
      return false;
    }
    
    
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
      this.paper.textAlign = "left";
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
    var texttop = this.timebase['y'] + topOffset + height + 18;
    var textname = name;
    var textage = start+' to '+finish+ ' Mya';

    reallength.toFixed(2);
    barlength.toFixed(2);

    this.paper.beginPath();
    this.paper.rect(creatureX, this.timebase['y'] + topOffset, barlength, height);
    this.paper.fillStyle = color;
    this.paper.fill();

    this.paper.textAlign = "center";
    this.paper.font = "700 20px sans-serif";
    this.paper.fillText(textname, textcenter, texttop);
    this.paper.font = "700 15px sans-serif";
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
    lnk.href = this.canvas.toDataURL("image/png;base64");

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
