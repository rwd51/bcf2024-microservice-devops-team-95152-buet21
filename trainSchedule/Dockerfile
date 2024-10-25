# Use the official Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema
COPY prisma ./prisma

# Copy the rest of the application code
COPY . .

# Copy .env file
COPY .env ./

# Generate Prisma client
RUN npx prisma generate

# Expose the application port (3000 for internal use)
EXPOSE 3001

# Command to run the application
#npm start
CMD ["npm", "start"]
