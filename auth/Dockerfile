FROM node:alpine

# Create a working directory app
WORKDIR /app
COPY package.json .
RUN npm install
# Copy over everything else from our project directure into that app folder 
COPY . .

CMD ["npm", "start"]