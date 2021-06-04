---
title: "Run python scripts using conda in Uninorte HPC"
date: 2021-06-04T21:57:30.095Z
draft: false
---

Running python scripts inside virtual environments using conda, also included is an example for running jupyterlab with an SSH tunnel.
<!--more-->

## Setup miniconda
- Open a new SSH session and run
```console
module load miniconda
conda init bash
```
- After restart terminal, you can see:
```console
(base) [user@granado ~]$
```
The default conda env is called `(base)`, to list all available envs run: `conda env list`

## Create a new environment and install dependencies
- Load `miniconda` and run:
```console
 conda create --name my_env
```
This new env will be only available for your account
- Install dependencies inside the env:
```console
conda install -n my_env numpy 
```

## Run jupyterlab
- Open a new SSH session as follows:
```console
ssh -L 8082:127.0.0.1:8082 user@201.150.98.56
``` 
- Load miniconda
```console
module load miniconda
```
- Activate `wrfda` env
```console
conda activate wrfda
```
- Start jupyterlab server
```console
jupyter-lab --port 8882
```