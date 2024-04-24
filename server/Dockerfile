# Start from the official Node.js image
FROM node:20

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Exposure port 3000
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]