window.initWRFBaqApp = async function init() {

	const ncVariablesToName = {
		'pwater': 'Precipitable Water',
		'wind': 'Wind speed',
		'temp': 'Temperature',
		'uwind': 'U wind speed',
		'vwind': 'V wind speed',
		'press': 'Pressure',
	};

	function showApp() {
		const app = document.getElementById('wrf-baq-app');
		app.classList.remove('hide');
	}

	async function fetchLastReport() {
		const data = await fetch('output/report.json').then(res => res.json());
		return data;
	}

	function displayReportData(data) {
		const reportDataTable = document.getElementById('report-data');

		const format = {
			'createdAt': (value) => ['Updated', `${value} UTC`],
			'startDate': (value) => ['WRF Start Date', `${value}:00 UTC`],
			'endDate': (value) => ['WRF End Date', `${value}:00 UTC`],
			'gfsUrls': (value) => ['GFS data', value.map((url) => `<a href="${url}" target="_blank" rel="noopener noreferrer nofollow" >${url}</a>`).join('<br>')],
			'ogimetUrl': (value) => ['OGIMET query', `<a href="${value}" target="_blank" rel="noopener noreferrer nofollow" >${value}</a>`],
			'ogimetStationCoordinates': (value) => ['SKBQ station', `<a href="https://www.google.com/maps/place/${value.join(',')}" target="_blank" rel="noopener noreferrer nofollow" >${value.join(',')}</a>`],
			'interpolatedVariables': (value) => ['Interpolated variables', value.join('<br>').replace(/:fcst(.*?):from [0-9]+/g, '')],
		}

		Object.entries(data).forEach(([key, value]) => {
			const tr = document.createElement('tr');
			const keyTd = document.createElement('td');
			const valueTd = document.createElement('td');

			if (key in format) {
				const [title, valueParsed] = format[key](value);

				keyTd.innerHTML = title;
				valueTd.innerHTML = valueParsed;

				tr.appendChild(keyTd);
				tr.appendChild(valueTd);

				reportDataTable.appendChild(tr);
			}
		});
	}

	function createElementIntoContainer(containerId, tag, variables) {
		const parent = document.getElementById(containerId);
		const child = document.createElement(tag);

		Object.entries(variables).forEach(([key, value]) => {
			child[key] = value;
		});

		if (parent.querySelector(tag)) {
			parent.removeChild(parent.querySelector(tag));
		}
		parent.appendChild(child);
	}

	function loadFolium(variable, createdAt) {
		createElementIntoContainer('maps-folium', 'iframe', {
			src: `output/${variable}_${createdAt}:00.html`,
			title: ncVariablesToName[variable],
		});
	}

	function loadGif(variable, createdAt) {
		createElementIntoContainer('maps-gif', 'img', {
			src: `output/${variable}_${createdAt}:00.gif`,
			alt: ncVariablesToName[variable],
		});
	}

	function initVariablesSelect(data) {
		const variablesSelect = document.getElementById('variables-select');

		data.ncVariables.forEach((variable, index) => {
			const option = document.createElement('option');
			option.value = variable;
			option.textContent = ncVariablesToName[variable];

			if (index === 0) {
				option.selected = true;
				loadGif(variable, data.createdAt);
				loadFolium(variable, data.createdAt);
			}

			variablesSelect.appendChild(option);
		});

		variablesSelect.addEventListener('change', (e) => {
			const variable = e.target.value;

			loadGif(variable, data.createdAt);
			loadFolium(variable, data.createdAt);
		});
	}

	const data = await fetchLastReport();

	if (Object.keys(data).length === 8) {
		initVariablesSelect(data);
		displayReportData(data);
		showApp();
	}
}
