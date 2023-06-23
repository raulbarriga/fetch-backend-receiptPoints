# Fetching the minified node image on apline linux
FROM node:slim

# Create app directory
WORKDIR /express-docker

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copying all the files in our project
COPY . .

# Starting our application
CMD [ "node", "server.js" ]

# Exposing server port
EXPOSE 5000
