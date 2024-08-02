from pyrebase_config import auth
import json

def create_user_with_email_and_password(email, password):
    try:
        user = auth.create_user_with_email_and_password(email, password)
        return user, None
    except Exception as e:
        try:
            # Convert the exception string to a dictionary
            error_response = json.loads(e.args[1])
            # Extract the error message
            error_message = error_response['error']['message']
        except (IndexError, KeyError, json.JSONDecodeError):
            # Fallback error message in case of unexpected format
            error_message = "An unknown error occurred"
        return None, error_message
    

def sign_in_with_email_and_password(email, password):
    try:
        user = auth.sign_in_with_email_and_password(email, password)
        return user, None
    except Exception as e:
        try:
            # Convert the exception string to a dictionary
            error_response = json.loads(e.args[1])
            # Extract the error message
            error_message = error_response['error']['message']
        except (IndexError, KeyError, json.JSONDecodeError):
            # Fallback error message in case of unexpected format
            error_message = "An unknown error occurred"
        return None, error_message
    

def sign_in_with_google():
    url =  auth.create_authentication_uri('google.com')
    print("====================")
    print(url)
    return url

def google_sign_in_with_token(id_token):
    try:
        user_info = auth.get_account_info(id_token)
        user_id = user_info['users'][0]['localId']
        return user_id, None
    except Exception as e:
        return None, str(e)