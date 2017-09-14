#!/bin/bash

yes | sudo apt-get update -y
yes | sudo apt-get upgrade -y
yes | sudo apt-get dist-upgrade

yes | sudo apt-get -y install libgdal1-dev libproj-dev
yes | sudo apt-get -y build-dep libcurl4-gnutls-dev libxml2-dev libssl-dev
yes | sudo apt-get -y install libcurl4-gnutls-dev libxml2-dev libssl-dev
yes | sudo apt-get install libudunits2-dev
#if ! command -v R >/dev/null 2>&1; then

   yes | sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
   yes | sudo add-apt-repository 'deb [arch=amd64,i386] https://cran.rstudio.com/bin/linux/ubuntu xenial/'
   yes | sudo apt-get update
   yes | sudo apt-get install r-base
#fi

sudo -i R < ~/job_scripts/job_check.packages.R --save

git clone -b dev https://github.com/PranaGeo/geoSpectral.git

sudo -i R -e "library('devtools');install('"`pwd`"/geoSpectral', depedencies = TRUE, type = 'source');library('geoSpectral');"
