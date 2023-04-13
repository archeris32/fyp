# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory to /app
WORKDIR /fyp-2

# Copy the current directory contents into the container at /app
COPY package*.json ./
COPY . .

# Install any needed dependencies
RUN npm install

# Expose port 7000
EXPOSE 7000

# Define environment variable
#ENV NODE_ENV=production

# Start the app
CMD ["npm", "start"]