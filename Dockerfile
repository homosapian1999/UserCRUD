# Use Node.js as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Copy the .env file (if needed for the build process)
COPY .env /app/.env

# Build the TypeScript application
RUN npm run build

# Expose the port your API is running on
EXPOSE 8080

# Start the compiled JavaScript file
CMD ["node","dist/server.js"]
