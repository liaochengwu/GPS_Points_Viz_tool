function distance_menu(){
	if($('#distance_measure').is(':checked')){
		map.doubleClickZoom.disable();
		
		
	}else{
		$('#distance').hide();
		
		map.getCanvas().style.cursor = '';
		
		distanceContainer.innerHTML = '';
		geojson = {
			'type': 'FeatureCollection',
			'features': []
		};

		// Used to draw a line between points
		linestring = {
			'type': 'Feature',
			'geometry': {
				'type': 'LineString',
				'coordinates': []
			}
		};
		map.getSource('geojson').setData(geojson);
		map.setLayoutProperty('measure-points', 'visibility', 'none');
		map.setLayoutProperty('measure-lines', 'visibility', 'none');
	}
}
function getGeojson(zoom_num){
//GPS点数据转化成geojson
		var geojson_head = "{\"type\": \"FeatureCollection\",\"features\": [";
		var geojson_tail = "]}";
		var points_text = $("#input_points").val(); 
		while (isNaN(parseFloat(points_text.substring(points_text.length-1,points_text.length)))){
			points_text = points_text.substring(0,points_text.length-1);
		}

		points_text = points_text.split("\n");
		
		var geojson_body = "";
		var point_lnglat = null;
		for(var i = 0 ; i < points_text.length ; i ++){
		    point_lnglat = points_text[i].split(",");
			geojson_body = geojson_body + "{ \"type\": \"Feature\", \"geometry\": { \"type\": \"Point\", \"coordinates\": [ " + point_lnglat[0] + "," + point_lnglat[1] + "] } },"
		}
		map.flyTo({
			center: [parseFloat(point_lnglat[0]), parseFloat(point_lnglat[1])],
			zoom: zoom_num
		});
		var points_geojson_str = geojson_head + geojson_body.substr(0, geojson_body.length - 1) + geojson_tail;
		return points_geojson_str

}

