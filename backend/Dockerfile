FROM python:2.7
ADD . /back-end
WORKDIR /back-end
RUN pip --proxy 192.168.201.3:3128 install -r requirements.txt