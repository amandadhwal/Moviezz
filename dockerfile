FROM node:22 AS netflix-app

WORKDIR /netflix

COPY netflix/build ./build 

WORKDIR /app

# Copy backend code
COPY backend/ ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
