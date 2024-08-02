import pyrebase
import json

# Load Firebase config from a file
with open('config.json', 'r') as f:
    config = json.load(f)

firebase = pyrebase.initialize_app(config)

auth = firebase.auth()
