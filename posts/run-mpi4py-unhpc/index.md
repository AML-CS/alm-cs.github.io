---
title: "Setup mpi4py in Uninorte HPC"
date: 2021-04-10T22:16:02.505Z
draft: false
---

How to setup mpi4py using miniconda in Centos 7 - OpenHPC. Including examples for run an Interactive session and SBATCH.
<!--more-->

## Setup conda env

- Load nested modules

```bash
module purge
module load miniconda gnu8/8.3.0 openmpi3/3.1.4
```

- Create conda env

```bash
conda create --name mpi4py python=3.7 -y
eval "$(conda shell.bash hook)"
conda activate mpi4py
```

- Install python libs

```bash
export MPICC=$(which mpicc)
pip install numpy matplotlib seaborn scipy netCDF4 pandas mpi4py
```

## Run interactive session

```bash
salloc --job-name "mpi4py-test" --nodes 1 --ntasks 4 --cpus-per-task=1 -t 24:00:00 -A syseng -p syseng

module purge
module load miniconda gnu8/8.3.0 openmpi3/3.1.4

eval "$(conda shell.bash hook)"
conda activate mpi4py

mpiexec -n 4 python test_CPU.py 2> err.log
```

## Run SBATCH

```bash
#!/bin/bash
#SBATCH --job-name=mpi4py-test   # create a name for your job
#SBATCH --nodes=1                # node count
#SBATCH --ntasks=4               # total number of tasks
#SBATCH --cpus-per-task=1        # cpu-cores per task
#SBATCH --time=24:00:00          # total run time limit (HH:MM:SS)
#SBATCH --account=syseng
#SBATCH --partition=syseng

module purge
module load miniconda gnu8/8.3.0 openmpi3/3.1.4

eval "$(conda shell.bash hook)"
conda activate mpi4py

mpiexec -n 4 python test_CPU.py
```

## More info

- https://researchcomputing.princeton.edu/support/knowledge-base/mpi4py
- https://batchdocs.web.cern.ch/linuxhpc/introduction.html
- https://docs.conda.io/projects/conda/en/4.6.1/user-guide/tasks/manage-environments.html
- https://pdc-support.github.io/introduction-to-mpi/setup.html
