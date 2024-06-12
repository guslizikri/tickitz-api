FROM node:20.14.0-alpine AS build

# 
WORKDIR /nodeapp

# Menyalin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# download depedency
RUN npm install

# menyalin semua file
COPY . .

CMD ["npm", "start"]
EXPOSE 3001
# contoh build image
# docker build -t zikrigusli/tickitzapi:1 .

# -t adalah tag