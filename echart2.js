//Practically all this code comes from https://github.com/alangrafu/radar-chart-d3
//I only made some additions and aesthetic adjustments to make the chart look better 
//(of course, that is only my point of view)
//Such as a better placement of the titles at each line end, 
//adding numbers that reflect what each circular level stands for
//Not placing the last level and slight differences in color
//
//For a bit of extra information check the blog about it:
//http://nbremer.blogspot.nl/2013/09/making-d3-radar-chart-look-bit-better.html

var RadarChart = {
  draw: function(id, xd, options,cs){
  var cfg = {
	 radius: 5,
	 w: 600,
	 h: 600,
	 factor: 1,
	 factorLegend: .85,
	 levels: 3,
	 maxValue: 0,
	 radians: 2 * Math.PI,
	 opacityArea: 0.5,
	 ToRight: 5,
	 TranslateX: 80,
	 TranslateY: 30,
	 ExtraWidthX: 100,
	 ExtraWidthY: 100,
	 color: d3.scale.category10()
	};
	
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){
		  cfg[i] = options[i];
		}
	  }
	}
	cfg.maxValue = 1.0; //Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
	var allAxis = (xd[0].map(function(i, j){return i.axis}));
	var total = allAxis.length;
	var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
	var Format = d3.format('%');
	d3.select(id).select("svg").remove();
	
	var g = d3.select(id)
			.append("svg")
			.attr("width", cfg.w+cfg.ExtraWidthX)
			.attr("height", cfg.h+cfg.ExtraWidthY)
			.append("g")
			.attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
			

	var tooltip;
	
	//Circular segments
	for(var j=0; j<cfg.levels-1; j++){
	  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
	  g.selectAll(".levels")
	   .data(allAxis)
	   .enter()
	   .append("svg:line")
	   .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
	   .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
	   .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
	   .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
	   .attr("class", "line")
	   .style("stroke", "grey")
	   .style("stroke-opacity", "0.85")
	   .style("stroke-width", "0.3px")
	   .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
	}

	//Text indicating at what % each level is
	for(var j=0; j<cfg.levels; j++){
	  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
	  g.selectAll(".levels")
	   .data([1]) //dummy data
	   .enter()
	   .append("svg:text")
	   .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
	   .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
	   .attr("class", "legend")
	   .style("font-family", "sans-serif")
	   .style("font-size", "10px")
	   .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
	   .attr("fill", "#737373")
	   .text(Format((j+1)*cfg.maxValue/cfg.levels));
	}
	
	series = 0;

	var axis = g.selectAll(".axis")
			.data(allAxis)
			.enter()
			.append("g")
			.attr("class", "axis");
function setDefaultValues(id,i,type,v1,v2){
//console.log(id,i,type,v1,v2);
angular.forEach(xd,function(obj,i){
	if (i==0){
		angular.forEach(obj,function(obj1,i1){
		if (obj1.axis==id){
		if (type=="x"){
		if (v1!="") obj1["x1"] = v1;
		if (v2!="") obj1["x2"] = v2;
		}
		if (type=="y"){
		obj1["y1"]=0;
		obj1["y2"]=0;
				if (v1!="") obj1["y1"] = v1;
				if (v2!="") obj1["y2"] = v2;
		}
		if (type=="a"){
				if (v1!="") obj1["ax"] = v1;
				if (v2!="") obj1["ay"] = v2;
		}
		}
		
		//console.log(obj1,i1);
		});
	}
});

//console.log("xd:",xd);
}
	axis.append("line")
		.attr("x1", cfg.w/2)
		.attr("y1", cfg.h/2)
		.attr("x2", function(d, i){x2 = cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total)); setDefaultValues(d,i,"x",cfg.w/2,x2); return x2;})
		.attr("y2", function(d, i){ y2=cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total)); setDefaultValues(d,i,"y",cfg.h/2,y2);return y2;})
		.attr("class", "line")
		.style("stroke", "grey")
		.style("stroke-width", "1px");

	axis.append("text")
		.attr("class", "legend")
		.text(function(d){return d})
		.style("font-family", "sans-serif")
		.style("font-size", "11px")
		.attr("text-anchor", "middle")
		.attr("dy", "1.5em")
		.attr("transform", function(d, i){return "translate(0, -10)"})
		.attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
		.attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});

 
	d.forEach(function(y, x){
	  dataValues = [];
	  g.selectAll(".nodes")
		.data(y, function(j, i){
		  dataValues.push([
			cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
			cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
		  ]);
		});
	  dataValues.push(dataValues[0]);
	  g.selectAll(".area")
					 .data([dataValues])
					 .enter()
					 .append("polygon")
					 .attr("class", "radar-chart-serie"+series)
					 .style("stroke-width", "2px")
					 .style("stroke", cfg.color(series))
					 .attr("points",function(d) {
						 var str="";
						 for(var pti=0;pti<d.length;pti++){
							 str=str+d[pti][0]+","+d[pti][1]+" ";
						 }
						 return str;
					  })
					 .style("fill", function(j, i){return cfg.color(series)})
					 .style("fill-opacity", cfg.opacityArea)
					 .on('mouseover', function (d){
										z = "polygon."+d3.select(this).attr("class");
										g.selectAll("polygon")
										 .transition(200)
										 .style("fill-opacity", 0.1); 
										g.selectAll(z)
										 .transition(200)
										 .style("fill-opacity", .7);
									  })
					 .on('mouseout', function(){
										g.selectAll("polygon")
										 .transition(200)
										 .style("fill-opacity", cfg.opacityArea);
					 });
	  series++;
	});
	series=0;
function redraw(id,x,y){
//console.log(xd);
angular.forEach(xd[1],function(obj,i){
	//console.log("axis:",obj.axis,id);
if (obj.axis==id.axis){
	console.log("axis:",id);
myObj = obj;
//console.log("base:",id);
baseVal = id.value;

xLength = id.x2 - id.x1;
yLength = id.y2 - id.y1;
//console.log("xlen:ylen",x,y,xLength,yLength);
if (xLength<0) xLength = xLength * -1;
if (yLength<0) yLength = yLength * -1;
if (xLength>0){
newValue = 1-(x/xLength);
}
else
{
newValue = 1-(y/yLength);
}
//console.log(i,baseVal,newValue);
if (newValue<0) newValue = -1 * newValue;
if (newValue>1) newValue = 1;
//if (newValue>1) newValue=1;
//console.log(baseVal,newValue);
if (isNaN(newValue)) newValue=1;
obj.value = newValue;
if(i!=0) xd[1][0].value = xd[0][0].value;
if(i!=1) xd[1][1].value = xd[0][1].value;
if(i!=2) xd[1][2].value = xd[0][2].value;
if(i!=3) xd[1][3].value = xd[0][3].value;
if(i!=4) xd[1][4].value = xd[0][4].value;
xd[1][i].value = newValue;

//Compute scores for quadChart
cs.categories[0].score = xd[1][0].value;
cs.categories[1].score = xd[1][1].value;
cs.categories[2].score = xd[1][2].value;
cs.categories[3].score = xd[1][3].value;
cs.categories[4].score = xd[1][4].value;
cs.totalRiskScore = (cs.categories[0].score * cs.categories[0].weight) + (cs.categories[1].score * cs.categories[1].weight) + (cs.categories[2].score * cs.categories[2].weight) + (cs.categories[3].score * cs.categories[3].weight) + (cs.categories[4].score * cs.categories[4].weight) 
/*xd[1][0].value=0.4;
xd[1][1].value=0.34;
xd[1][2].value=0.45;
xd[1][3].value=0.64;
xd[1][4].value=0.74;
*/
//console.log(xLength,yLength,x,y,baseVal);
}
});


console.log(xd);
//RadarChart.draw("#chart", xd, mycfg,cs);
drawCharts();
}
var dragArmId="",startX=-1,startY=-1;
var drag = d3.behavior.drag()
		.on('dragstart',function(id,i){
		//console.log("Start", id,d3.event.x,d3.event.y);
		dragArmId = id;
		startX = d3.event.x;
		startY = d3.event.y;
		 setDefaultValues(id,i,"a",startX,startY);
		//redraw(id,d3.event.x,d3.event.y);
		
		})
		.on('drag',function(id){
		//console.log("drag", id,d3.event.x,d3.event.y);
		redraw(id,d3.event.x,d3.event.y);
		})
		.on('dragend',function(id){
	//	console.log("end", id,d3.event.x,d3.event.y);
		//redraw(id,d3.event.x,d3.event.y);
		dragArmId="";
		startX=-1;
		startY=-1;
		});
		
	d.forEach(function(y, x){
	  g.selectAll(".nodes")
		.data(y).enter()
		.append("svg:circle")
		.attr("class", "radar-chart-serie"+series)
		.attr('r', cfg.radius)
		.call(drag)
		.attr("alt", function(j){return Math.max(j.value, 0)})
		.attr("cx", function(j, i){
		  dataValues.push([
			cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
			cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
		]);
		return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
		})
		.attr("cy", function(j, i){
		  return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
		})
		.attr("data-id", function(j){return j.axis})
		.style("fill", cfg.color(series)).style("fill-opacity", .9)
		.on('mouseover', function (d){
					newX =  parseFloat(d3.select(this).attr('cx')) - 10;
					newY =  parseFloat(d3.select(this).attr('cy')) - 5;
					
					tooltip
						.attr('x', newX)
						.attr('y', newY)
						.text(Format(d.value))
						.transition(200)
						.style('opacity', 1);
						
					z = "polygon."+d3.select(this).attr("class");
					g.selectAll("polygon")
						.transition(200)
						.style("fill-opacity", 0.1); 
					g.selectAll(z)
						.transition(200)
						.style("fill-opacity", .7);
				  })
		.on('mouseout', function(){
					tooltip
						.transition(200)
						.style('opacity', 0);
					g.selectAll("polygon")
						.transition(200)
						.style("fill-opacity", cfg.opacityArea);
				  })
		.append("svg:title")
		.text(function(j){return Math.max(j.value, 0)});

	  series++;
	});
	//Tooltip
	tooltip = g.append('text')
			   .style('opacity', 0)
			   .style('font-family', 'sans-serif')
			   .style('font-size', '13px');
  }
};