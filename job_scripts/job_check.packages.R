# check.packages function: install and load multiple R packages.
# Check to see if packages are installed. Install them if they are not, then load them into the R session.
check.packages <- function(pkg){
    new.pkg <- pkg[!(pkg %in% installed.packages()[, "Package"])]
    if (length(new.pkg)) 
        install.packages(new.pkg, dependencies = TRUE, repos='http://cran.us.r-project.org')
    sapply(pkg, require, character.only = TRUE)
}

# Usage example
packages<-c('devtools', 'dplyr','spacetime','xts','maps','rgdal','leaflet','rbokeh','plotly','sp')
check.packages(packages)

