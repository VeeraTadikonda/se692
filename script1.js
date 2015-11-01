var w = 500,
	h = 500;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['Smartphone','Tablet'];

//Data
var d = [
		  [
			{axis:"Force 1",value:0.59},
			{axis:"Force 2",value:0.56},
			{axis:"Force 3",value:0.42},
			{axis:"Force 4",value:0.34},
			{axis:"Force 5",value:0.48}
			 ],
			 [
			{axis:"Force 1",value:0},
			{axis:"Force 2",value:0},
			{axis:"Force 3",value:0},
			{axis:"Force 4",value:0},
			{axis:"Force 5",value:0}
			 ]
		];
var computedScores = {
				"totalRiskScore":0.8,
				"totalRiskScoreOrig":0.8,
				"categories":[
				{"name":"Force 1","weight":0.7,"score":0.5,"orig":0.5},
				{"name":"Force 2","weight":0.05,"score":0.75,"orig":0.75},
				{"name":"Force 3","weight":0.05,"score":0.55,"orig":0.55},
				{"name":"Force 4","weight":0.1,"score":0.6,"orig":0.6},
				{"name":"Force 5","weight":0.1,"score":0.7,"orig":0.7}
				]
			};		
var customerData={"Customers":[
		{"Id":1,"dba":"","Name":"Customer 1",
			"Start":{"Principal":"123456","Rate":"9","Tenure":"10","RiskScore":"40","CreditScore":"740","Interest":"100000"},
			"Current":{"Principal":"123456","Rate":"9","Tenure":"10","RiskScore":"65","CreditScore":"740","Interest":"80000"}},
		{"Id":2,"dba":"","Name":"Customer 2",
			"Start":{"Principal":"123456","Rate":"9","Tenure":"10","RiskScore":"40","CreditScore":"740","Interest":"100000"},	
			"Current":{	"Principal":"123456",	"Rate":"9",	"Tenure":"10",	"RiskScore":"50",	"CreditScore":"740","Interest":"60000"	}},
		{"Id":3,	"dba":"",	"Name":"Customer 3",	
			"Start":{	"Principal":"123456",	"Rate":"9",	"Tenure":"10",	"RiskScore":"40",	"CreditScore":"740","Interest":"100000"	},	
			"Current":{	"Principal":"123456",	"Rate":"9",	"Tenure":"10",	"RiskScore":"40",	"CreditScore":"740","Interest":"40000"	}},
		{"Id":4,	"dba":"",	"Name":"Customer 4",	
			"Start":{	"Principal":"123456",	"Rate":"9",	"Tenure":"10",	"RiskScore":"40",	"CreditScore":"740","Interest":"100000"	},	
			"Current":{	"Principal":"123456",	"Rate":"9",	"Tenure":"10",	"RiskScore":"42",	"CreditScore":"740","Interest":"33000"	}},
		{"Id":5,	"dba":"",	"Name":"Customer 5",	
			"Start":{	"Principal":"123456",	"Rate":"9",	"Tenure":"10",	"RiskScore":"40",	"CreditScore":"740","Interest":"100000"	},	
			"Current":{	"Principal":"123456",	"Rate":"9",	"Tenure":"10",	"RiskScore":"22",	"CreditScore":"740","Interest":"66000"	}},
		{"Id":6,	"dba":"",	"Name":"Customer 6",	
			"Start":{	"Principal":"123456",	"Rate":"9",	"Tenure":"10",	"RiskScore":"40",	"CreditScore":"740","Interest":"100000"	},	
			"Current":{	"Principal":"123456",	"Rate":"9",	"Tenure":"10",	"RiskScore":"56",	"CreditScore":"740","Interest":"23000"	}},
		{"Id":7,	"dba":"",	"Name":"Customer 7",	
			"Start":{	"Principal":"123456",	"Rate":"9",	"Tenure":"10",	"RiskScore":"40",	"CreditScore":"740","Interest":"100000"	},	
			"Current":{	"Principal":"123456",	"Rate":"9",	"Tenure":"10",	"RiskScore":"89",	"CreditScore":"740","Interest":"45000"	}},
		{"Id":8,	"dba":"",	"Name":"Customer 8",	
			"Start":{	"Principal":"123456",	"Rate":"9",	"Tenure":"10",	"RiskScore":"40",	"CreditScore":"740","Interest":"100000"	},	
			"Current":{	"Principal":"123456",	"Rate":"9",	"Tenure":"10",	"RiskScore":"76",	"CreditScore":"740","Interest":"90000"	}}					
			]};		

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.6,
  levels: 6,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
function drawCharts(){
RadarChart.draw("#chart", d, mycfg,computedScores);
QuadChart.draw("#chart1", customerData, mycfg,computedScores);
}
function resetCharts(){
angular.forEach(d,function(obj,i){
	if (i==1){
		angular.forEach(obj,function(obj1,i1){
		
		obj1.value=0;
		
		//console.log(obj1,i1);
		});
	}
});
computedScores.totalRiskScore = computedScores.totalRiskScoreOrig;

angular.forEach(computedScores.categories,function(obj,i){
		angular.forEach(obj,function(obj1,i1){
				obj.score=obj.orig;
			});
});

drawCharts();
}
drawCharts();
////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("What % of owners use a specific service in a week");
		
//Initiate Legend	
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;	
	  