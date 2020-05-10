
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
  ['Cenozoic','rgb(246,236,57)',0, 66],
  ['Mesozoic','rgb(7,202,234)',66, 251.9],
  ['Paleozoic','rgb(146,195,160)',251.9, 541],
  ['Proterozoic','rgb(254,76,104)',541, 2500],
  ['Archean','rgb(254,0,124)',2500, 4000],
  ['Hadean','rgb(203,3,129)',4000, 4600]
];

var geologicepochs = [
  ['Holocene', 'rgb(254,241,224)', 0, 0.0117, ''],
  ['Pleistocene', 'rgb(254,239,184)', 0.0117, 2.58, ''],

  ['Pliocene', 'rgb(254,248,166)', 2.58, 5.333, ''],
  ['Miocene', 'rgb(254,239,0)', 5.333, 23.03, ''],

  ['Oligocene', 'rgb(254,195,134)', 23.03, 33.9, ''],
  ['Eocene', 'rgb(254,185,121)', 33.9, 56, ''],
  ['Paleocene', 'rgb(254,173,110)', 56, 66, ''],

  ['Late', 'rgb(166,212,104)', 66, 100.5, ''],
  ['Early', 'rgb(126,205,116)', 100.5, 145, ''],

  ['Late', 'rgb(151,227,250)', 145, 163.5, ''],
  ['Middle', 'rgb(52,209,235)', 163.5, 174.1, ''],
  ['Early', 'rgb(0,183,234)', 174.1, 201.3, ''],

  ['Late', 'rgb(198,152,194)', 201.3, 237, ''],
  ['Middle', 'rgb(191,124,177)', 237, 247.2, ''],
  ['Early', 'rgb(173,87,154)', 247.2, 251.902, ''],

  ['Lopingian', 'rgb(254,175,151)', 251.902, 259.1, ''],
  ['Guadalupian', 'rgb(254,131,103)', 259.1, 272.95, ''],
  ['Cisuralian', 'rgb(247,110,84)', 272.95, 298.9, ''],

  ['Pennsylvania', 'rgb(138,198,195)', 298.9, 332.2, ''],
  ['Mississippian', 'rgb(97,157,126)', 332.2, 358.9, ''],

  ['Late', 'rgb(244,224,169)', 358.9, 382.7, ''],
  ['Middle', 'rgb(246,200,122)', 382.7, 393.3, ''],
  ['Early', 'rgb(239,176,99)', 393.3, 419.2, ''],

  ['Pridoli', 'rgb(228,242,230)', 419.2, 423, ''],
  ['Ludlow', 'rgb(180,229,219)', 423, 427.4, ''],
  ['Wenlock', 'rgb(164,224,208)', 427.4, 433.4, ''],
  ['Llandovery ', 'rgb(126,215,198)', 433.4, 443.8, ''],

  ['Late', 'rgb(94,204,169)', 443.8, 458.4, ''],
  ['Middle', 'rgb(0,189,151)', 458.4, 470, ''],
  ['Early', 'rgb(0,175,137)', 470, 485.4, ''],

  ['Furongian', 'rgb(173,221,168)', 485.4, 497, ''],
  ['Miaolingian', 'rgb(161,207,155)', 497, 509, ''],
  ['Series 2', 'rgb(149,194,143)', 509, 521, ''],
  ['Terreneuvian', 'rgb(138,181,132)', 521, 541, '']
];

var geologictimeeons2 = [
  ['Cenozoic', 'rgb(246,236,57)', 0, 66, 'Ceno.'],
  ['Mesozoic', 'rgb(7,202,234)', 66, 251.9, 'Meso.'],
  ['Paleozoic', 'rgb(146,195,160)', 251.9, 541, 'Paleo.'],
  ['Neoproterozoic', 'rgb(254,183,87)', 541, 1000, 'Neoproto.']
];

var geologictimeperiods = [
  ['Quanternary','rgb(254,246,145)', 0, 2.58, ''],
  ['Neogene','rgb(254,221,45)', 2.58, 23.03, 'N'],
  ['Paleogene','rgb(254,161,99)', 23.03, 66, 'Pg'],
  ['Cretaceous','rgb(111,200,107)', 66, 145, 'K'],
  ['Jurassic','rgb(0,187,231)', 145, 201.3, 'J'],
  ['Triassic','rgb(153,78,150)', 201.3, 251.9, 'T'],
  ['Permian','rgb(247,88,60)', 251.9, 298.9, 'P'],
  ['Carboniferous','rgb(63,174,173)', 298.9, 358.9, 'C'],
  ['Devonian','rgb(221,150,81)', 358.9, 419.2, 'D'],
  ['Silurian','rgb(166,223,197)', 419.2, 443.8, 'S'],
  ['Ordovician','rgb(0,169,138)', 443.8, 485.4, 'O'],
  ['Cambrian','rgb(129,170,114)', 485.4, 541, 'Є'],
  ['Ediacaran','rgb(254,214,123)', 541, 635, 'Ed'],
  ['Cryogenian','rgb(254,204,111)', 635, 720, 'Cr'],
  ['Tonian','rgb(254,194,98)', 720, 1000, 'Ton.']
];

var temporal = {
  paper:null,
  timebase:[],
  canvas:null,
  scale:2,
  size:{
    'w':1162,
    'h':160
  },
  init:function(){
    //Draw demo chart.
    this.canvas = document.getElementById("timeline");
    this.timebase['x'] = 40;
    this.timebase['y'] = 0;
    //pixels per MY
    this.scale = 2;
    this.timebase['max'] = 541;
    //var svgwidth = (timebase['max'] * timebase['scale']) + (timebase['x'] * 2);
    
    
    //var size = [];
    this.size['w'] = (1000 * this.scale) + 80;
    //size['h'] = 160;
    this.canvas.style.width = this.size['w'] + "px";
    this.canvas.style.height = this.size['h'] + "px";

    // Set actual size in memory (scaled to account for extra pixel density).
    var devicescale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    this.canvas.width = Math.floor(this.size['w'] * devicescale);
    this.canvas.height = Math.floor(this.size['h'] * devicescale);
    
    this.paper = this.canvas.getContext('2d');
    this.paper.scale(devicescale, devicescale);
    
    /*
    
    
    
    
    this.canvas.style.width = 2324;
    this.canvas.style.height = 800;
    */
    
    
    //Draw sample timeline.
    this.drawTimeline(geologictimeeons2, 20, 25, this.scale);
    this.drawTimeline(geologictimeperiods, 45, 25, this.scale);
    //this.drawTimeline(geologicepochs, 70, 25, this.scale);
    
    this.drawExistanceBar('Petalodus', 'rgb(60, 60, 60)', 268, 318.1, 90, 10, this.scale);
  },
  tryTimeline:function(){
    this.paper.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //Get form values
    var rangetype = $("#range-type").val();
    var creaturename = $("#creature-name").val();
    var range1 = parseFloat($("#range-1").val());
    var range2 = parseFloat($("#range-2").val());
    var scale = parseFloat($("#chart-scale").val());
    this.scale = scale;
    if(range1 <= 1000 && range2 <= 1000 && range1 >= 0 && range2 > 0 && range1 < range2){
      
      
      
      //var size = [];
      this.size['w'] = (1000 * this.scale) + 80;
      this.size['h'] = 200;
      this.canvas.style.width = this.size['w'] + "px";
      this.canvas.style.height = this.size['h'] + "px";

      // Set actual size in memory (scaled to account for extra pixel density).
      var devicescale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
      this.canvas.width = Math.floor(this.size['w'] * devicescale);
      this.canvas.height = Math.floor(this.size['h'] * devicescale);

      this.paper = this.canvas.getContext('2d');
      this.paper.scale(devicescale, devicescale);
      
      
      
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
      var reallength = data[i][3] - data[i][2];
      var barlength = reallength * scale;
      reallength.toFixed(2);
      barlength.toFixed(2);
      var name;
      if(scale > 1){
        name = data[i][0];
      } else {
        name = data[i][4];
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

