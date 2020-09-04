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



