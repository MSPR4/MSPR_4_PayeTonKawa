# Use Node.js image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install jsonwebtoken express-jwt
RUN npm install @types/jsonwebtoken @types/express-jwt --save-dev
RUN npm install -g typescript
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]