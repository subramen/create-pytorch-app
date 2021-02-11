from flask import Flask, request
import requests
from flask_cors import CORS, cross_origin
import os, json

app = Flask(__name__)
cors = CORS(app)
MODEL_URL = "http://model:8080/"
PRED_ENDPOINT = "predictions/" + os.getenv("MODEL_NAME")


# check if torchserve is up
def torchserve_healthy():
    status = json.loads(requests.get(MODEL_URL+'ping').text)['status']
    return (status == "Healthy")


def run_inference(data):
    pred_url = MODEL_URL + PRED_ENDPOINT
    if not torchserve_healthy():
        raise RuntimeError("Model server not healthy!")
    response = json.loads(requests.put(pred_url, data=data).content)
    return response
    

@app.route("/predict")
@cross_origin()
def main():
    url = request.args.get('url')    
    data = requests.get(url).content
    prediction = run_inference(data)
    return {'response': prediction, 'status': 200}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
