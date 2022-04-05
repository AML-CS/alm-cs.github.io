---
title: "WRF BAQ 0.5km Forecast"
page: true
---

The BAQ 0.5km Forecast system is running in real time on the HPC cluster at the Universidad del Norte.

Fetches data from NOAA (GFS) and OGIMET (METAR).
Surface level observations are interpolated into the GRIB files.

- **Forecast:** +3h.
- **Grid points distance:** 0.5km.
- **GFS:** 0.25 degree resolution, global longitude-latitude grid.
- **GFS cycle:** 00 UTC.
- **Altitude:** 150m.
- **Isobaric level:** 1000hPa.
- **Interactive map grid size:** 26x15.
- **Interactive map points distance:** 2km.

<div id="wrf-baq-app" class="hide">
	<span id="loading">Loading...</span>
	<div>
		<div class="select-container">
			<label for="variables-select">Choose a variable:</label>
			<select id="variables-select" name="variables"></select>
		</div>
		<div class="maps-container">
			<div id="maps-gif" class="img-loader"></div>
			<div id="maps-folium"></div>
		</div>
	</div>
	<div>
		<h2>Report info</h2>
		<table id="report-data"></table>
	</div>
</div>

---

#### WRF domain (WRFV4.3)
```
 &domains
 time_step                           = 2,
 time_step_fract_num                 = 0,
 time_step_fract_den                 = 1,
 max_dom                             = 1,
 e_we                                = 91,
 e_sn                                = 82,
 e_vert                              = 35,
 p_top_requested                     = 5000,
 num_metgrid_levels                  = 34,
 num_metgrid_soil_levels             = 4,
 dx                                  = 356.324,
 dy                                  = 356.324,
 grid_id                             = 1,
 parent_id                           = 1,
 i_parent_start                      = 1,
 j_parent_start                      = 1,
 parent_grid_ratio                   = 1,
 parent_time_step_ratio              = 1,
 feedback                            = 1,
 smooth_option                       = 0
 /
```

#### WPS geogrid (WPSV4.3)
```
&geogrid
 parent_id                           = 1,
 parent_grid_ratio                   = 1,
 i_parent_start                      = 1,
 j_parent_start                      = 1,
 e_we                                = 91,
 e_sn                                = 82,
 geog_data_res                       = 'default',
 dx                                  = 0.003205,
 dy                                  = 0.003205,
 map_proj                            = 'lat-lon',
 ref_lat                             = 10.981,
 ref_lon                             = -74.822,
 truelat1                            = 10.981,
 truelat2                            = 10.981,
 stand_lon                           = -74.822,
 ref_x                               = 45.5,
 ref_y                               = 41.0,
/
```

<script>window.initWRFBaqApp();</script>
