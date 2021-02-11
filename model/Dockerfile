FROM pytorch/torchserve:0.3.0-cpu

RUN pip3 install --upgrade pip && \
    pip3 --no-cache-dir install --upgrade awscli 
ARG AWS_DEFAULT_REGION
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_MODEL_STORE
ARG MODEL_NAME
ENV modelname=$MODEL_NAME

COPY . /home/model-server/
WORKDIR /home/model-server/

RUN aws s3 cp s3://${AWS_MODEL_STORE}/${MODEL_NAME}_state.pt ./

RUN torch-model-archiver \
--model-name ${MODEL_NAME} \
--version 1 \
--serialized-file ${MODEL_NAME}_state.pt \
--export-path ./model-store \
--handler object_detector \
--model-file model.py \
--extra-files index_to_name.json \
-r requirements.txt 

CMD ["torchserve", \
"--start", \
"--ncs", \
"--ts-config config.properties", \
"--model-store model-store", \
"--models ${modelname}.mar"]
