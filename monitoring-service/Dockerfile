FROM node
RUN apt-get -y update
RUN apt-get install -y git

RUN git clone https://github.com/Dirkadin/SEM-Project3.git 

WORKDIR SEM-Project3/monitoring-service

RUN npm install

CMD ["npm", "start"]

