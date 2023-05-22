###### Install dependencies only when needed ######
FROM node:19.7.0-alpine3.16 AS builder
ARG CONFIGURATION='dev'

# Make /app as working directory
WORKDIR /app

# Copy package.json file
COPY package.json .

# Install dependencies
# RUN npm install --legacy-peer-deps
RUN yarn install
RUN yarn g add @angular/cli

# Expose
EXPOSE 4200

# Copy the source code to the /app directory
COPY . .

# Build the application
# RUN npm run build --  --output-path=dist --configuration=$CONFIGURATION --output-hashing=all
RUN yarn run build --  --output-path=dist --configuration=$CONFIGURATION --output-hashing=all

######  Use NgInx alpine image  ###### 
FROM nginx:stable-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy nginx config file
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Copy dist folder fro build stage to nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Start NgInx service
CMD ["nginx", "-g", "daemon off;"]

