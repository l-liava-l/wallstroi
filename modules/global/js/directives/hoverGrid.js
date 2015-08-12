(function(){
	'use strict';

	angular.module('global')
        .directive('hoverGrid', hoverGrid);

    hoverGrid.$inject = [];

    function hoverGrid() {
		var config = {
				restrict: 'A',
				link: link
		};

		return config;

		function link(scope, element, attrs){
			var xRectCount = element[0].offsetWidth / 80;
			var yRectCount = element[0].offsetHeight / 80;
			
			var gridWrapper = angular.element(`
				<div style="position: absolute; width: ${element[0].offsetWidth}px; height: ${element[0].offsetHeight}px"></div>`
			);


			var column, item, row, itemElement;

			for(column = 0; column < yRectCount; column++){
				row = document.createElement('div');
				
				for(item = 0; item < xRectCount; item++){
					itemElement = document.createElement('span');
					itemElement.className = 'tileElement';
					row.appendChild(itemElement);
				}

				gridWrapper[0].appendChild(row);
			}


			element.prepend(gridWrapper);
		}
      
    }
})();