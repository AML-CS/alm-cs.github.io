---
title: "3rd International Workshop on Data Assimilation"
page: true
---

This event is part of the project Modelos de exposición humana a la contaminación atmosférica en áreas urbanas como herramienta de toma de decisiones (Exposure to Pollutants Regional Research ExPoR2) SIGP: 68747 funded by MinCiencas, Colombia.
<!--more-->

## Organized By

<div class="image-flex-wrapper">
	<ul>
		<li>
			<img src="images/uninorte-logo.jpeg" alt="Logo Universidad del Norte"/>
		</li>
		<li>
			<img src="../../images/logo.jpg" alt="Logo AML-CS"/>
		</li>
		<li>
			<img src="images/eafit-logo.png" alt="Logo Universidad EAFIT"/>
		</li>
	</ul>
</div>

## Presentation

Data Assimilation is the process by which an imperfect numerical forecast is adjusted according to real-noisy observations. Two well-known families of methods are generally employed under operational DA scenarios: sequential and variational formulations. In sequential DA methods, observations are assimilated one at a time, while variational methods typically seek the initial condition that best fits a given assimilation window. The ensemble Kalman filter (EnKF) is a well-established and -recognized filter into the sequential DA context. The EnKF is usually exploited for parameter and state estimation in highly non-linear numerical models; its popularity obeys its simple formulation and relatively easy implementation. In the EnKF, an ensemble of model realizations is employed to estimate moments of background error distributions and, through observations, to obtain samples of posterior (analysis) distributions. Stochastic and deterministic formulations of such filters are widely found in the current literature. Regardless of his nature, ensemble sizes are bounded by the hundreds while model resolutions are in the order of the millions.

Consequently, sampling errors can impact the quality of posterior samples, leading to poor estimates of error dynamics. Localization methods are commonly employed to counteract the effects of sampling noise. For instance, some of them are covariance matrix localization (B-localization), observation localization (R-localization), and local domain decomposition. Despite these methods being tested under operational DA settings, their practical implementations are an active field in the DA community wherein, for instance, scientific efforts are typically centered on proposing matrix-free EnKF implementations. In the variational context, Four-Dimensional Variational (4D-Var) methods are commonly utilized to estimate initial conditions in numerical models for a given set of temporally-spaced observations. These methods rely on adjoint models, which are labor-intensive to develop and computationally expensive to run. Yet another family of approaches is the hybrid ones which have proven to work under operational settings adequately. In these methods, an ensemble of model realizations is employed to build surrogate models of the 4D-Var cost function onto ensemble sub-spaces wherein analysis innovations are estimated, and via their projections onto model spaces, initial analysis ensembles can be assessed.

### The workshop aims to address well-known issues in the DA community:

- Efficient and practical implementations of background error covariance matrix estimators.
- Matrix-free ensemble Kalman filter implementations for parameter and state estimation in highly non-linear models.
- Adjoint-free 4D-Var methods for (non) linear data assimilation methods.
- Sampling methods for non-Gaussian Data Assimilation.


## Program (all times are COT)

Time                    | Title                 | Details
----------------------- | --------------------- | ----------------
08:00 am - 08:10 am   | Welcome and program presentation |
08:10 am - 08:25 am   | Data Assimilation Context | Elias David Niño Ruiz, Universidad del Norte, Colombia
08:30 am - 09:00 am   | Localized Stochastic Shrinkage Rejuvenation in the Ensemble Transport Particle FIlter | Andrey Popov, Virginia Tech, USA
09:10 am - 09:30 am   | Data-Driven Methods for Weather Forecast | Felipe Acevedo, Universidad del Norte, Colombia
09:30 am - 09:50 am   | On the robustness of Ensemble Based Data Assimilation | Santiago Lopez, Universidad EAFIT
09:50 am - 10:00 am   | Coffee Break |
10:00 am - 10:30 am   | Assimilating infrasound measurements to constrain stratospheric variables | Javier Amezcua - University of Reading, England
10:40 am - 11:00 am   | Data Assimilation using the Ensemble Kalman Filter with a Modified Cholesky decomposition | Randy Consuegra, Universidad del Norte, Colombia
11:00 am - 11:20 am   | Ensemble Kalman Smoother via Modified Cholesky Decomposition | Andres Yarce Botero Ph​D candidate TUDelft, The Netherlands
11:20 am - 11:40 pm   | Variance localization schemes via precision matrix in numerical weather forecast | Valentina Movil Sandoval,​​​ Universidad EAFIT, Colombia
11:40 am - 12:00 pm   | Airborne atmospheric ​measurement and data assimilation platform | Simple-Space EAFIT y Semillero de Investigación en Asimilación de Datos
12:00 am - 1:00 pm    | Ground Photo and Closing Remarks |

## More information

[Registration](https://docs.google.com/forms/d/e/1FAIpQLSee6loqQvCbqVY1FWcMY1FAp1QS_8ZhRpgGdVfkMsTCCnvGGQ/viewform)