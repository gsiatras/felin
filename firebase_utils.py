import firebase_admin
from firebase_admin import credentials, auth


# Initialize Firebase Admin SDK
def initialize_firebase():
    if not firebase_admin._apps:  # Check if Firebase has already been initialized
        cred = credentials.Certificate('felin-76b01-firebase-adminsdk-mmw2u-ed70379752.json')
        firebase_admin.initialize_app(cred)

# Verify Firebase ID Token
def verify_firebase_id_token(id_token):
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        raise ValueError(f'Error verifying ID token: {str(e)}')

