# show docker containers currently running
docker ps -a

# show your docker images
docker images

# build the docker image 
docker build -t express-docker .
# docker build -f Dockerfile.dev -t express-docker .

# run the image
# docker run --name api -p 5000:5000/tcp -d express-docker
docker run  -p 5000:5000 -d express-docker

# show console output inside of docker container
docker logs -f api

# to shut down container (while still keeping it)
docker kill api

# to remove the container completely
docker rm api