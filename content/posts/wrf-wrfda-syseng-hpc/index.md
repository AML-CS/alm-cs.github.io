---
title: "WRF + WRFDA Uninorte HPC"
date: 2021-06-02T19:45:02.789Z
draft: false
---

The following guide show how to install, configure and run the Weather Research and Forecasting Model (WRF) and it's most popular module WRFDA in CentOS 8.2 - OpenHPC.
<!--more-->

## WRF
WRF 4.2, WPS 4.0, ARWpost, WRFDA 4.0, obsproc, NetCDF, NetCDF-Fortran, GFortran, C++, GrADS, UniData, MPI, jasper, libpng and others many dependencies are needed to run WRF, WRFDA and view the processed data, in this guide all these dependencies will be installed.
### Download, compile and configure WRF
For the execution of WRF it is necessary to download, compile and configure WPS and WRF, in this case all these process are synthesized by the installations scripts `setup-WRF.sh` and `setup-WRFDA.sh`

### Loading Module
Once the previous scripts have been executed, we proceed to load the WRF / 4.2.0 module, this by executing the following command:
```shell
module load wrf
```
### Create a workspace folder
```shell
mkdir workspace
cd workspace
```
### Download Initial Conditions
To download the initial conditions used by the model, it is required to be previously registered on the [NCAR](https://rda.ucar.edu/index.html?hash=data_user&action=register) website. Once registered, execute the following command and enter your email and password when required.

```shell
download-grib [INITIAL DATE] [FINAL DATE]
```
`[INITIAL DATE]` and `[FINAL DATE]` in the format `YYYY-MM-DD`

**Example**
```shell
download-grib 2020-01-01 2020-01-02
```
```=shell
Email: $EMAIL
Password: 
Downloading fnl_20200101_00_00.grib2
100.000 % CompletedDownloading fnl_20200101_06_00.grib2
100.000 % CompletedDownloading fnl_20200101_12_00.grib2
100.000 % CompletedDownloading fnl_20200101_18_00.grib2
100.000 % CompletedDownloading fnl_20200102_00_00.grib2
100.000 % CompletedDownloading fnl_20200102_06_00.grib2
100.000 % CompletedDownloading fnl_20200102_12_00.grib2
100.000 % CompletedDownloading fnl_20200102_18_00.grib2
100.000 % CompletedObservations saved in ./real-data!
```

### Running WPS
The WRF Pre-Processing System (WPS) is a collection of Fortran and C programs that provides data used as input to the real.exe and real_nmm.exe programs. There are three main programs and a number of auxiliary programs that are part of WPS.  Both the ARW and NMM  dynamical cores in WRF are supported by WPS. 

To run WPS it is necessary to have downloaded the geographic data, modify the namelist.wps file with the parameters, domain and dimensions of the mesh, to know a little more about these parameters enter [here](https://www2.mmm.ucar.edu/wrf/users/namelist_best_prac_wps.html) this file is located at `${WPS_DIR}` directory. Then run the following command specifying the start date and the end date.
```shell
run-wps -f [INITIAL DATE] -t [FINAL DATE] -i [NUMBER OF HOURS] [INITIAL CONDITIONS]
```
`[INITIAL DATE]` and `[FINAL DATE]` in the format `"YYYY-MM-DD HH"`
`[INITIAL CONDITIONS]` Directory that contains inital conditions Ex: `./real-data`
`[NUMBER OF HOURS]` here you put the numbers of hours between the observations.

**Example**
```shell
run-wps -f "2020-01-01 00" -t "2020-01-02 18" -i 6 ./real-data 
```
```=shell
Start date: 2020-01-01_00:00:00
End date: 2020-01-02_18:00:00
Inverval seconds: 21600
Running geogrid...
Successful completion

Running ungrib
Using data in /home/syseng/omejiaa/workspace/real-data
Successful completion

Running metgrid...
Successful completion
```

### Running WRF
Weather Research and Forecasting Model (WRF) is a mesoscale numerical weather prediction system. To execute WRF it is necessary to modify the namelist.input file with the desired parameters, to know a little more about these parameters enter [here](https://esrl.noaa.gov/gsd/wrfportal/namelist_input_options.html) this file is located at `${WRF_DIR}` directory. Then execute the following command specifying the start date, the end date, the number of hours that the interval comprises and the output directory.

```shell
run-wrf -f [INITIAL DATE] -t [FINAL DATE] -h [NUMBERS OF HOURS TO RUN] -i [NUMBER OF HOURS] -o [OUTPUT FILENAME] 
```
`[INITIAL DATE]` and `[FINAL DATE]` in the format `"YYYY-MM-DD HH"`
`[NUMBER OF HOURS]` here you put the numbers of hours between the observations.

**Example**
```shell
 run-wrf -f "2020-01-01 00" -t "2020-01-02 18" -i 6 -h 42 -o wrf_output
```
```=shell
Run hours: 42
Inverval seconds: 21600
Start date: 2020-01-01 00
End date: 2020-01-02 18
Running real.exe with 5 processors

real    0m3.758s
user    0m16.766s
sys     0m1.725s

Running wrf.exe with 32 processors

real    2m51.416s
user    88m15.220s
sys     2m52.299s
Successful WRF run
```
### ARW-Post
This module generate GrADS and/or Vis5D input files from WRF ARW output files that allow to visualize the data in GrADS or Python. For this is necessary to modify the namelist.ARWpost file with the desired parameters, this file is located at `${ARW_DIR}` directory. Then execute the following command.
```shell
run-arwpost -f [INITIAL DATE] -t [FINAL DATE] [INPUT NAMEFILE] [OUTPUT FILENAME]
```

**Example**
```shell
run-arwpost -f "2020-01-01 00" -t "2020-01-02 18" wrf_output data
```
```=shell
Configure namelist.ARWpost...

!!!!!!!!!!!!!!!!
  ARWpost v3.1
!!!!!!!!!!!!!!!!

FOUND the following input files:
 /home/syseng/omejiaa/workspace/wrf_output

START PROCESSING DATA

 Processing  time --- 2020-01-01_00:00:00
   Found the right date - continue
   
   ...
   
 Processing  time --- 2020-01-02_18:00:00
   Found the right date - continue

DONE Processing Data

CREATING .ctl file

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!  Successful completion of ARWpost  !
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

```
Once executed, download the `OUTPUT FILENAME.ctl` and `OUTPUT FILENAME.dat` files, with which you can view the results of the model in the GrADS tool or in Python.
## WRFDA
To generate an ensemble with Weather Research and Forecasting Model Data Assimilation (WRFDA) perform the following steps. 

### Download, compile and configure WRF
For the execution of WRFDA it is necessary to download, compile and configure WRFDA, in this case all this process is synthesized by the following scripts.

### Loading Module
Once the previous scripts have been executed, we proceed to load the WRF / 4.2.0 module, this by executing the following command:
```shell
module load wrfda
```
### Configuring data
To execute WRFDA you need 3 data sets, a set of initial conditions generated by WRF, a pre-processed data set and a Background Error.

#### Initial conditions generated by WRF
For this data set it is necessary to execute WRF, to generate a set of initial conditions. It is not necessary to run it again since at the time you run WRFDA it will do it previously. REMEMBER RUN WPS.

#### Download pre-processed data set
To download the pre-processed data set used by the model, it is required to be previously registered on the [NCAR](https://rda.ucar.edu/index.html?hash=data_user&action=register) website. Once registered, execute the following command and enter your email and password when required.

```shell
download-prep [DATA SET INITIAL DATE] [DATA SET FINAL DATE]
```
```shell
download-prep 2020-01-01 2020-01-02
```
**Example**
```=shell
Email: $EMAIL
Password: 
Downloading https://rda.ucar.edu/data/ds337.0/tarfiles/2020/prepbufr.20200101.nr.tar.gz
100.000 % Completedprepbufr.20200101.nr.tar.gz unziped and saved in ./prep-data!
Downloading https://rda.ucar.edu/data/ds337.0/tarfiles/2020/prepbufr.20200102.nr.tar.gz
100.000 % Completedprepbufr.20200102.nr.tar.gz unziped and saved in ./prep-data!
Symbolic links created successfully!
```

`[DATA SET INITIAL DATE]` and `[DATA SET FINAL DATE]` in the format `YYYY-MM-DD`
#### Background Error
for the background error, there are two options, use a generated ensemble or use a default one that WRFDA brings, in this case it is generated with the default ensemble. If you want to modify it, you can do it from the  directory `${WRFDA_DIR}`, for more information enter [here](https://www2.mmm.ucar.edu/wrf/users/docs/user_guide_v4/v4.3/users_guide_chap6.html#_Running_WRFDA_1).
### Generate an ensemble
To execute WRFDA it is necessary to modify the namelist.input file with the desired parameters, to know a little more about these parameters enter [here](https://www2.mmm.ucar.edu/wrf/users/docs/user_guide_v4/v4.3/users_guide_chap6.html#_Running_WRFDA_1) this file is located at `${WRFDA_DIR}` directory. Then execute the following command specifying the start date, the end date, the number of hours that the interval comprises and the output directory.

```shell
generate-ensemble -f [INITIAL DATE] -t [FINAL DATE]  -h [NUMBERS OF HOURS TO RUN] -i [NUMBER OF HOURS] -d [OUTPUT DIRECTORY] [NUMBER OF ENSEMBLE]
```

`[INITIAL DATE]` and `[FINAL DATE]` in the format `"YYYY-MM-DD HH"`
`[NUMBER OF HOURS]` here you put the numbers of hours between the observations.

**Expected Output**
```shell
generate-ensemble -f "2020-01-01 00" -t "2020-01-02 18" -i 6 -h 42 -d . 1
```
```=shell
Running simulation...
Run hours: 42
Inverval seconds: 21600
Start date: 2020-01-01 00
End date: 2020-01-02 18
Running real.exe with 5 processors

real    0m3.761s
user    0m16.795s
sys     0m1.757s

Running wrf.exe with 32 processors

real    2m51.692s
user    88m22.164s
sys     2m54.171s
Successful WRF run

Member 1
Generating first initial condition...
Running real.exe with 5 processors

real    0m3.778s
user    0m16.739s
sys     0m1.846s

Perturbing initial condition...
Running wrfda with 32 processors

real    0m50.579s
user    25m40.811s
sys     1m5.448s

Updating boundary conditions...
Running simulation with new initial conditions...

Running wrf.exe with 32 processors

real    2m41.524s
user    83m1.490s
sys     2m50.085s
Successful WRF run

Ensemble member 1 created succesfully

Finished!
```

### ARW-Post for ensembles
This module generate GrADS and/or Vis5D input files from WRF ARW output files that allow to visualize the data in GrADS or Python. For this is necessary to modify the namelist.ARWpost file with the desired parameters, this file is located at `${ARW_DIR}` directory. Then execute the following command.
```shell
run-arw-ensemble -f [INITIAL DATE] -t [FINAL DATE] -d [FILES DIRECTORY]
```
`[INITIAL DATE]` and `[FINAL DATE]` in the format `"YYYY-MM-DD HH"`

**Example**
```shell
run-arwpost-ensemble -f "2020-01-01 00" -t "2020-01-02 18" -d wrfda_2021-06-03-22.10.29
```
```=shell
Configure namelist.ARWpost...

!!!!!!!!!!!!!!!!
  ARWpost v3.1
!!!!!!!!!!!!!!!!

FOUND the following input files:
 /home/syseng/sjdonado/workspace/wrfda_2021-06-03-22.10.29/m1

START PROCESSING DATA

 Processing  time --- 2020-01-01_00:00:00
   Found the right date - continue

 Processing  time --- 2020-01-01_01:00:00
   Found the right date - continue

 Processing  time --- 2020-01-01_02:00:00
   Found the right date - continue

 Processing  time --- 2020-01-01_03:00:00
   Found the right date - continue

 ...


 Processing  time --- 2020-01-02_18:00:00
   Found the right date - continue

DONE Processing Data

CREATING .ctl file

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!  Successful completion of ARWpost  !
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
```

Once executed, download the `ensemble-m1.ctl` and `ensemble-m1.dat` files, with which you can view the results of the model in the GrADS tool or in Python.
## GrADS
The Grid Analysis and Display System (GrADS) is an interactive desktop tool that is used for easy access, manipulation, and visualization of earth science data. GrADS has two data models for handling gridded and station data. GrADS supports many data file formats, including binary (stream or sequential), GRIB (version 1 and 2), NetCDF, HDF (version 4 and 5), and BUFR (for station data). GrADS has been implemented worldwide on a variety of commonly used operating systems and is freely distributed over the Internet.

This guide shows a quick way to visualize an ensemble in GrADS, for this we download the `.ctl` and `.dat` files, then we open GrADS and go to the directory where the files were saved. 
``` shell
cd [DIRECTORY]
```
Once in the directory we open the file by executing the following command.
`open [filename]`
To visualize the behaviour of the `u` and `v` components of the wing and the value of this follow the next commands
``` 
set gxout stream
set t 1 43
set lopping on
d u;v;mag(u,v)
```
