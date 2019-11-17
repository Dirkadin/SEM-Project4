FROM node
RUN apt-get -y update
RUN apt-get install -y git

RUN git clone https://github.com/Dirkadin/monitoring-service.git

WORKDIR /monitoring-service

RUN npm install

CMD ["npm", "start"]

