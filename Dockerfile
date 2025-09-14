# Use an official node.js runtime as a parent Image(snapshot of the env)
FROM node:22-alpine

# Set the Working Directory in the Container
WORKDIR /app

# Copy the package.json and package-lock.json Files to the Container
COPY package*.json .

# Install the Dependencies
RUN npm install

# Copy the rest of the Application Code
COPY . .

# Expose the Port that the App runs on
EXPOSE 5003

# Define the command to run the application
CMD ["node", "./src/server.js"]

