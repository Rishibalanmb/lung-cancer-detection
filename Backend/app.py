from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the saved model and scaler
model = joblib.load('lung_cancer_model.pkl')
scaler = joblib.load('scaler.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input data from the request
        input_data = request.get_json()

        # Ensure all features are present
        input_data_list = [
            input_data.get('GENDER', 0), 
            input_data.get('AGE', 0), 
            input_data.get('SMOKING_STATUS', 0), 
            input_data.get('YELLOW_FINGERS', 0), 
            input_data.get('ANXIETY', 0), 
            input_data.get('PEER_PRESSURE', 0), 
            input_data.get('CHRONIC_DISEASE', 0), 
            input_data.get('FATIGUE', 0), 
            input_data.get('ALLERGY', 0), 
            input_data.get('WHEEZING', 0), 
            input_data.get('ALCOHOL_CONSUMING',0), 
            input_data.get('COUGHING',0), 
            input_data.get('SHORTNESS_OF_BREATH',0),
            2,  # Placeholder for the 14th feature
            2   # Placeholder for the 15th feature
        ]
        
        # Scale the input data
        input_data_scaled = scaler.transform([input_data_list])
        
        # Make a prediction
        prediction = model.predict(input_data_scaled)
        result = 'YES' if prediction[0] == 1 else 'NO'
        
        # Return the result as JSON
        return jsonify({'prediction': result})

    except Exception as e:
        # Handle any errors
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    # Get the port from the environment variable or default to 5000
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
