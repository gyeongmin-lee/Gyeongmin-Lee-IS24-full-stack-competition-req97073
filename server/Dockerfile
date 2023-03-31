# Set the base image to use for this container
FROM node:18

# Set the working directory inside the container
WORKDIR /app/server

# Copy the package.json file to the working directory
COPY package.json .

# Copy the package-lock.json file to the working directory
COPY package-lock.json .

# Install production dependencies using npm ci command
RUN npm ci --production

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 for the container
EXPOSE 3000

# Run TypeScript compiler to build the application
RUN npm run tsc

# Set the default command to start the application using npm run start command
CMD ["npm", "run", "start"]
