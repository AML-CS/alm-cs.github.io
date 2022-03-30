(async () => {
	function showApp() {
		const app = document.getElementById('wrf-baq-1km');
		app.classList.remove('hide');
	}

	async function fetchLastReport() {
		const data = await fetch('https://wrf-baq-1km.s3.amazonaws.com/last/report.json').then(res => res.json());
		return data;
	}

	function displayReportData(data) {
		const reportDataTable = document.getElementById('report-data');

		const format = {
			'createdAt': (value) => ['Updated', `${value} UTC`],
			'startDate': (value) => ['WRF Start Date', `${value}:00 UTC`],
			'endDate': (value) => ['WRF End Date', `${value}:00 UTC`],
			'ogimetUrl': (value) => ['OGIMET query', `<a href="${value}" target="_blank" rel="noopener noreferrer nofollow" >${value}</a>`],
			'gfsUrls': (value) => ['GFS observations', value.map((url) => `<a href="${url}" target="_blank" rel="noopener noreferrer nofollow" >${url}</a>`).join('<br>')],
			'baqStationCoordinates': (value) => ['BAQ OGIMET Station Coordinates', `<a href="https://www.google.com/maps/place/${value.join(',')}" target="_blank" rel="noopener noreferrer nofollow" >${value.join(',')}</a>`],
			'variablesInterpolated': (value) => ['Variables interpolated', value.join('<br>').replace(/:from [0-9]+/g, '')],
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

	function initVariablesSelect(data) {
		const variablesSelect = document.getElementById('variables-select');
		const variablesGifs = document.getElementById('variables-gifs');

		const ncVariablesToName = {
			'wind': 'Wind speed',
			'temp': 'Temperature',
			'uwind': 'U wind speed',
			'vwind': 'V wind speed',
			'press': 'Pressure',
		}

		data.ncVariables.forEach((variable, index) => {
			const option = document.createElement('option');
			option.value = variable;
			option.textContent = ncVariablesToName[variable];

			if (index === 0) {
				option.selected = true;
			}

			variablesSelect.appendChild(option);
		});

		variablesSelect.addEventListener('change', (e) => {
			const variable = e.target.value;
			const variableGif = document.createElement('img');

			variableGif.src = `https://wrf-baq-1km.s3.amazonaws.com/last/${variable}.gif`;
			variableGif.alt = `${variable} forecast`;

			variablesGifs.removeChild(variablesGifs.querySelector('img'));
			variablesGifs.appendChild(variableGif);
		});
	}

	const data = await fetchLastReport();

	if (Object.keys(data).length > 7) {
		initVariablesSelect(data);
		displayReportData(data);
		showApp();
	}
})()
