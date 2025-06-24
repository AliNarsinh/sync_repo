# build stage
FROM node:18-alpine3.18 as build-stage

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json package-lock.json ./

# Copy binnah sdk 
COPY binah-web-sdk-v4.15.2-1.tgz ./

# Copy Biosensesignal-web-sdk
COPY biosensesignal-web-sdk-v5.9.2-1.tgz ./

# Install Python for node-gyp
RUN apk add g++ make py3-pip

# Clean node cache
RUN npm cache clean --force

# Install dependencies
RUN npm install

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy the rest of the application code
COPY . .


# Create Build
RUN npm run build

EXPOSE 3000

# Production
FROM build-stage as prod-build-stage

ENV PORT=3000

CMD ["node", "server.js"]
