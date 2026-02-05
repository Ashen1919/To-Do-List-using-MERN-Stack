# define base image 
FROM node:24.13-alpine

# Define working directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json files
COPY package*.json ./

# install all dependencies
RUN npm ci --omit=dev

# copy all files to the container
COPY . .

# Expose the port 
EXPOSE 5000

# command to run the application
CMD [ "node", "index.js" ]