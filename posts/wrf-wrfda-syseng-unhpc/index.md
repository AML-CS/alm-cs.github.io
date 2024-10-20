---
title: "WRF + WRFDA Uninorte HPC"
date: 2021-06-02T19:45:02.789Z
draft: false
---

The following guide show how to install, configure and run the Weather Research and Forecasting Model (WRF) and it's most popular module WRFDA in CentOS 7 - OpenHPC.
<!--more-->

## Setup

The `setup-WRF.sh`, `setup-WRFDA-3DVAR.sh` and `setup-WRFDA-4DVAR.sh` scripts will download and install all the dependencies needed to run WRF and WRFDA. Make sure to select the following options during the build process:

- WRF: 34, 1 for gfortran and distributed memory
- WPS: 3
- WRFDA-3DVAR: 34 distributed memory

When the script are done, the new modules can be loaded:

```bash
module load wrf/4.3 wrfda/4.3-3dvar
```

On loading the modules, the following scripts will be available for use:

- download-geog-data
- download-grib
- download-obs
- download-prep
- generate-wrfda-be
- run-wps
- run-wrf
- run-wrfda
- run-obsproc
- run-arwpost
- run-arwpost-ensemble

All of them are self-descriptive, you can find out how to use them by typing `--help`:

```bash
run-wrf --help
usage: run_wrf.py [-h] [-i interval] [-g grid_size] [-o output] [-n ntasks]
                  [--only-wrf] [--only-real] [--srun] [-d]
                  start_date end_date

Run WRF real.exe or wrf.exe

positional arguments:
  start_date            First perturbation valid date (YYYY-mm-dd H)
  end_date              Last perturbation valid date (YYYY-mm-dd H)

optional arguments:
  -h, --help            show this help message and exit
  -i interval, --interval interval
                        Hours interval, default: 6
  -g grid_size, --grid-size grid_size
                        Grid size (meters), default: None
  -o output, --output output
                        Output directory
  -n ntasks, --ntasks ntasks
                        MPI processors or SLURM tasks
  --only-wrf            Run only wrf.exe
  --only-real           Run only real.exe
  --srun                Run with srun (inside sbatch or salloc)
  -d, --debug           Debug mode
```

## Run WRF step by step

1. First create a new SLRUM job allocation
```bash
salloc --job-name "wrf-test" --ntasks=72 -t 24:00:00 -A syseng -p syseng
```

2. Load modules
```bash
module load wrf/4.3
```

3. Move to your workspace (or create a new one)
```bash
cd /work/syseng/users/$USERNAME/workspace/wrf-test
```

4. (if not exists) Download observations
```bash
download-grib "2022-01-01" "2022-01-31"
```

5. Run geogrid + ungrid + metgrid (--help or --debug for more info)
```bash
run-wps "2022-01-01 00" "2022-01-31 18" -i 6 -g 1000 --data-dir ./grib-obs
```

6. Run real.exe (--help or --debug for more info)
```bash
run-wrf "2022-01-06 00" "2022-01-07 00" -i 6 -n 8 -g 1000 --srun --only-real
```

7. Run wrf.exe (--help or --debug for more info)
```bash
run-wrf "2022-01-06 00" "2022-01-07 00" -i 6 -n 64 -g 1000 --srun --only-wrf --output /work/syseng/users/$USERNAME/workspace/wrf-test/wrf_output
```

8. (optional) watch real-time logs
```bash
tail -f $WRF_DIR/run/rsl.error.*
```

9. (optional) cancel jobs by user
```bash
scancel --user=$USERNAME
```

## Run WRFDA step by step

1. First create a new SLRUM job allocation
```bash
salloc --job-name "wrfda-test" --ntasks=72 -t 24:00:00 -A syseng -p syseng
```

2. Load modules
```bash
module load wrf/4.3 wrfda/4.3
```

3. Move to your workspace (or create a new one)
```bash
cd /work/syseng/users/$USERNAME/workspace/wrfda-test
```

4. (if not exists) Download observations
```bash
download-grib "2022-01-01" "2022-01-31"
```

5. Run geogrid + ungrid + metgrid (--help or --debug for more info)
```bash
run-wps "2022-01-01 00" "2022-01-31 18" -i 6 -g 1000 --data-dir ./grib-obs
```

6. Generate first guest wrf.exe (--help or --debug for more info)
```bash
run-wrf "2022-01-06 18" "2022-01-07 00" -i 6 -n 64 -g 1000 --srun --only-wrf --output /work/syseng/users/$USERNAME/workspace/wrfda-test/wrf_output
```

7. Generate background error (--help or --debug for more info)
```bash
generate-wrfda-be "2022-01-06 12" "2022-01-10 12" -i 6 -n 64 -g 1000 --data-dir ./ --srun
```

8. Download prepbufr observations (ucar.edu)
```bash
download-prep "2022-01-01" "2022-01-31"
```

9. Generate ensemble (--help or --debug for more info)
```bash
run-wrfda "2022-01-06 18" "2022-01-07 00" -i 6 -n 64 -g 1000 -o ./wrfda-test --srun --generate-ensemble 1
```

10. (optional) watch real-time logs
```bash
tail -f $WRF_DIR/run/rsl.error.*
```

## ARW-Post

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

## ARW-Post for ensembles

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

## Related documentation
- https://www2.mmm.ucar.edu/wrf/users/namelist_best_prac_wps.html
- https://www2.mmm.ucar.edu/wrf/users/wrfda/faq.html#running_GENBE
- https://www2.mmm.ucar.edu/wrf/users/wrfda/OnlineTutorial/Help/gen_be_forecasts.html
- https://www2.mmm.ucar.edu/wrf/users/docs/user_guide_v4/v4.3/
- https://www2.mmm.ucar.edu/wrf/users/docs/user_guide_v4/v4.3/users_guide_chap6.html
- https://www2.mmm.ucar.edu/wrf/users/wrfda/Tutorials/2016_Aug/docs/WRFDA_Observations.pdf
- https://docplayer.net/61091026-Observation-pre-processor-for-wrfda-ncar-mmm.html
- https://slideplayer.com/slide/7011895/
