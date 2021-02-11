# create-pytorch-app

Clone this repo to spin up an ML web app using React, Flask and Torchserve. 

## Get Started
Edit the `.env` file to include your AWS credentials, the `${AWS_MODEL_STORE}` S3 bucket and the `${MODEL_NAME}`. 

### model server
The Dockerfile downloads the state dict from `s3://${AWS_MODEL_STORE}/${MODEL_NAME}_state.pt`. Read more about configuring torchserve at https://github.com/pytorch/serve


### flask
Spins up an API server that receives inputs from the frontend, and returns predictions from the model server.


### frontend
Serves an nginx proxy that interfaces with the flask API server. JS files are in `frontend/src` and was populated using `create-react-app`.


### launch
run `docker-compose up`
