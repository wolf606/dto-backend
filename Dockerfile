# Build stage
FROM node:22-bullseye-slim as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (better cache handling)
COPY package*.json ./

# Install dependencies (including dev dependencies)
RUN npm install

# Copy the rest of the app files
COPY . .

# Build TypeScript files (if applicable)
RUN npm run tsc

# Final stage (runner)
FROM node:22-bullseye-slim as runner

# Set environment variables
ENV NODE_ENV=production
ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}

# Set working directory
WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app /app

# Install only production dependencies
RUN npm install --production

# Expose the application port
EXPOSE 3000

# Start the Node.js application
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
