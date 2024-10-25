# Use the official Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code, including the src directory
COPY . .

# Copy .env file if needed (optional)
COPY .env ./

# Generate Prisma client (if applicable)
RUN npx prisma generate

# Expose the application port (3000 for service1)
EXPOSE 3000

# Command to run the application using the npm start script
CMD ["npm", "start"]
