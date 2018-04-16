document.addEventListener('DOMContentLoaded', function() {

	const MIN_MAP_SIZE = 4;
	const HEX_WIDTH = 120;
	const HEX_HEIGHT = 100;

	let elMap = document.getElementById('map');
	let elJson = document.getElementById('json');
	let elSize = document.getElementById('size');

	let map = [];

	// ---------------------------------------------------------------
	class Hex {

		// ---------------------------------------------------------------
		constructor(el, x, y) {

			this.elHex = el;
			this.elArrow = null;

			this.x = x;
			this.y = y;
			this.dir = -1;

			el.addEventListener('click', this.onHexClick.bind(this));

		}

		// ---------------------------------------------------------------
		getData() {

			let obj = {};
			obj.posX = this.x;
			obj.posY = this.y;

			if (this.dir >= 0) {
				obj.dirIn = (this.dir + 3) % 6;
				obj.dirOut = this.dir;
			}

			return obj;

		}

		// ---------------------------------------------------------------
		onHexClick() {

			if (this.elArrow == null) {
				this.elArrow = document.createElement('div');
				this.elArrow.className = 'arrow';
				this.elHex.appendChild(this.elArrow);
			}

			this.dir = (this.dir + 1) % 6;
			this.elArrow.style.transform = 'rotate(' + (-105 + this.dir * 60) + 'deg)';

			showJson();

		}

	}

	// ---------------------------------------------------------------
	function onSizeChange(ev) {

		let size = parseInt(ev.target.options[ev.target.selectedIndex].value);
		initMap(size);

	}

	// ---------------------------------------------------------------
	function showJson() {

		let json = [];

		for (let i = 0; i < map.length; i++) {
			json.push(map[i].getData());
		}

		elJson.innerText = JSON.stringify(json);

	}

	// ---------------------------------------------------------------
	function initPage() {

		for (let i = MIN_MAP_SIZE; i < 10; i++) {
			let el = document.createElement('option');
			el.value = i;
			el.innerText = i.toString() + ' x ' + i.toString();
			elSize.appendChild(el);
		}

		elSize.addEventListener('change', onSizeChange);

	}

	// ---------------------------------------------------------------
	function initMap(size) {

		elMap.innerHTML = '';
		elJson.innerHTML = '';

		map = [];

		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {

				let el = document.createElement('div');
				let shift = (y & 1 ? HEX_WIDTH / 2 : 0);
				el.className = 'hexagon';
				el.style.left = (x * HEX_WIDTH + shift) + 'px';
				el.style.top = (y * HEX_HEIGHT) + 'px';
				elMap.appendChild(el);

				let hex = new Hex(el, x, y);
				map.push(hex);

			}
		}

		console.table(map);
	}

	// ---------------------------------------------------------------
	initPage();
	initMap(MIN_MAP_SIZE);

});
