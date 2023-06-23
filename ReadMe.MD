# Commands to Run the Project (having Docker installed)
## Build the docker image 
`docker build -t express-docker .`

# run the image
`docker run  -p 5000:5000 -d express-docker`


# Helpful Commands
## show docker containers currently running
`docker ps -a`

## show your docker images
`docker images`

## show console output inside of docker container
`docker logs -f api`

## to shut down container (while still keeping it)
`docker kill api`

## to remove the container completely
`docker rm api`