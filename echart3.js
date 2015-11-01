var QuadChart={
draw: function(id,cd,options,cs){
console.log("id:",id,cd);
triskscore = cs.totalRiskScore;
var qcfg = {
	w:600,
	h:600,
	TranslateX: 0,
	 TranslateY: 0,
	color: d3.scale.category10()
	};

	if ('undefined' !== typeof options){
		for (var i in options){
			if ('undefined' !== typeof options[i]){
				qcfg[i] = options[i];
			}
		}
	}
d3.select(id).select("svg").remove();
	var vis = d3.select(id)
				.append("svg")
				.attr("width",qcfg.w + 20)
				.attr("height",qcfg.h + 20)
				.append("g")
				.attr("transform","translate(" + qcfg.TranslateX + "," + qcfg.TranslateY + ")");
				
				WIDTH=500,
				HEIGHT=500,
				MARGINS = {
					top: 5,
					right: 5,
					bottom: 5,
					left: 30
					};
					
					
			 // setup x 
var xValue = function(d) { v=d.Current.RiskScore * triskscore; v = +v.toFixed(2);return v;}, // data -> value
    xScale = d3.scale.linear().range([MARGINS.left + 20,WIDTH ]), // value -> display 0, WIDTH
    xMap = function(d) { cx = xScale(xValue(d)); return cx;}; // data -> display
    //xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { v=d.Current["Interest"]/1000; return v;}, // data -> value
    yScale = d3.scale.linear().range([HEIGHT, 0]), // value -> display
    yMap = function(d) { cy=yScale(yValue(d)); return cy;}; // data -> display
    //yAxis = d3.svg.axis().scale(yScale).orient("left");
    		
	//			xScale = d3.scale.linear().range([MARGINS.left - 5,WIDTH +5]).domain([0,100]);
	//			yScale = d3.scale.linear().range([HEIGHT ,MARGINS.bottom]).domain([0,100]);	
			
			xMaxValue = 100; //d3.max(cd.Customers, xValue);
			yMaxValue = Math.round(d3.max(cd.Customers, yValue) * 1.1);				
			console.log("max",xMaxValue,yMaxValue); 
			  xScale.domain([0, xMaxValue]);
			  yScale.domain([0, yMaxValue]);


				
				xAxis = d3.svg.axis().scale(xScale);
				
				yAxis = d3.svg.axis().scale(yScale).orient("left");
			
			// add the tooltip area to the webpage
			var tooltip = d3.select("body").append("div")
    			.attr("class", "tooltip")
   				 .style("opacity", 0);	
				
				vis.append("svg:g")
					.attr("class","x axis")
					.style("stroke-width", "0.3px")
					.attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
					.call(xAxis)
					.append("text")
      				.attr("class", "label")
      				.attr("x", WIDTH)
      				.attr("y", -6)
      				.style("text-anchor", "end")
      				.text("Risk Score");
      
				vis.append("svg:g")
					.attr("class","y axis")
					.style("stroke-width", "0.3px")
					.attr("transform", "translate(" + (MARGINS.left) + ",0)")
					.call(yAxis)
					.append("text")
      				.attr("class", "label")
      				.attr("transform", "rotate(-90)")
      				.attr("y", 6)
      				.attr("dy", ".71em")
      				.style("text-anchor", "end")
      				.text("Interest (k)");
				
		/*		var lineGen = d3.svg.line()
						.x(function(d){
							return xScale(d.year);	
						})
						.y(function(d){
							return yScale(d.sale);	
						})
						.interpolate("basis");*/
						
				var quadColors = {
				Q1: "#008000", //Green
				Q2: "#A52A2A", //Brown
				Q3: "#0000FF", //Blue
				Q4: "#FF0000" //Red
				};
				
			//Quad1
				vis.append("rect")
					.attr("x", MARGINS.left )
					.attr("width", WIDTH/2)
					.attr("height", HEIGHT/2)
					.style("fill", quadColors.Q1)
					.style("fill-opacity",0.5);

			//Quad2
				vis.append("rect")
					.attr("x", MARGINS.left + (WIDTH/2))
					.attr("width", WIDTH/2)
					.attr("height", HEIGHT/2)
					.style("fill", quadColors.Q2)
					.style("fill-opacity",0.5);						
				//};	
				
			//Quad3
				vis.append("rect")
					.attr("x", MARGINS.left )
					.attr("y", HEIGHT/2)
					.attr("width", WIDTH/2)
					.attr("height", HEIGHT/2)
					.style("fill", quadColors.Q3)
					.style("fill-opacity",0.5);	
			//Quad4
				vis.append("rect")
					.attr("x", MARGINS.left + (WIDTH/2))
					.attr("y", HEIGHT/2)
					.attr("width", WIDTH/2)
					.attr("height", HEIGHT/2)
					.style("fill", quadColors.Q4)
					.style("fill-opacity",0.5);						
				//};					
				 // draw dots
				 
				



    console.log("dot process");
  vis.selectAll("circle")
   .data(cd.Customers)
   .enter()
   .append("circle")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(d["Name"] + "<br/> (Risk: " + xValue(d) 
	        + "\n Orig: " + d.Current.RiskScore + ", Interest: " + yValue(d) + "k)")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
      
				console.log("Quadchart Complete");
}
}