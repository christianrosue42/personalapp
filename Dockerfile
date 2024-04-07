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

# Build the application
RUN npm run build

# Start from the official Nginx image
FROM nginx:1.21

# Copy the build output to replace the default Nginx contents.
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]