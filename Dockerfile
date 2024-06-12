FROM node:20.14.0-alpine AS build

# 
WORKDIR /nodeapp

# copy semua file di lokasi saat ini(.) lalu paste ke workdir
COPY . .

# download depedency
RUN npm install

CMD ["npm", "start"]
EXPOSE 3001
# contoh build image
# docker build -t zikrigusli/tickitzapi:1 .

# -t adalah tag