from flask import Flask,render_template,request,jsonify
import pickle
import pandas as pd

with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

app = Flask(__name__)

@app.route('/')
def homePage():
    return render_template('homepage.html')

@app.route('/dataset')
def datasetPage():
    return render_template('datasetpage.html')

@app.route('/eda')
def edaPage():
    return render_template('edapage.html')

@app.route('/model')
def modelPage():
    return render_template('modelpage.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = pd.DataFrame(data,index=[1])
    prediction = model.predict(features)
    return jsonify({'prediction': str(prediction[0])})

if __name__ == '__main__':
    app.run()
