FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Expose the port the app runs on
EXPOSE 41101

# Run the application
CMD ["node", "server.js"]
