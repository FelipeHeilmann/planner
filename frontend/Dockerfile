# Use a Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install project dependencies using Yarn
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application 
RUN yarn build

# Expose the port that the Next.js application will run on
EXPOSE 3000

# Start the Next.js application 
CMD ["yarn", "start"]

