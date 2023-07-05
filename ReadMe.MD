This is the repo [link](https://github.com/fetch-rewards/receipt-processor-challenge) to the take home project guide.

# Commands to Run the Project (having Docker installed)
## Build the docker image 
`docker build -t express-docker .`
The docker image uses a Node.js container, providing npm & node installations.

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
