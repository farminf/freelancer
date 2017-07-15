FROM node:6.10

ADD . /frontend
WORKDIR /frontend

#proxy
RUN npm config set proxy http://192.168.201.3:3128
RUN npm config set https-proxy http://192.168.201.3:3128

RUN npm install

EXPOSE 3000
