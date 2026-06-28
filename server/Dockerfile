# Use official Node runtime as a parent image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

# Copy package.json and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built code from the builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 5001

# Command to run the application
CMD ["npm", "start"]
