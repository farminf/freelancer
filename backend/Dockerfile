FROM python:2.7
ADD . /back-end
WORKDIR /back-end
RUN pip --proxy http://192.168.201.3:3128 install -r requirements.txt
#RUN pip install -r requirements.txt