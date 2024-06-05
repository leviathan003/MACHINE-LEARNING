from flask import Flask, render_template, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

with open('best_model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = [
        data['age'],
        data['education'],
        data['socioeconomic'],
        data['mmse'],
        data['cdr'],
        data['etiv'],
        data['nwbv'],
        data['asf'],
        data['gender']
    ]

    features = pd.DataFrame({'Age': features[0],'EDUC': features[1],'SES': features[2],'MMSE': features[3],'CDR': features[4],'eTIV': features[5],'nWBV': features[6],'ASF': features[7],'M/F': features[8]},index=[1])

    print(features)
 
    prediction = model.predict(features)

    if prediction == 1:
        result = '"Oh dear!,.... Judging by the data, I predict that the patient has a HIGH chance of having Alzheimer’s disease"'  
    elif prediction == 2: 
        result = '"Hmmm.... Judging by the data, I predict that the patient has a LOW chance of having Alzheimer’s disease"'
    else:
        result = '"I see.... Judging by the data, I predict that the patient has a HIGH chance of Converting to having Alzheimer’s disease"'

    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=True)