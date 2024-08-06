from flask import Flask, request, render_template, redirect, url_for, flash
import re
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from firebase_utils import initialize_firebase, verify_firebase_id_token
from models import User

app = Flask(__name__)
app.secret_key = 'your_secret_key'
initialize_firebase()

# Flask-Login setup
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'signin'  # Redirect to sign-in if not logged in


@login_manager.user_loader
def load_user(user_id):
    # Assuming Firebase user ID is used as user_id
    return User(user_id)

@app.route("/")
def home():
    return render_template('home.html', title='Home')

@app.route("/dashboard")
@login_required
def dashboard():
    return render_template('index.html', title='Dashboard')


@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        # Check for Google sign-in success
        google_signin_success = request.args.get('google_signin_success')

        if google_signin_success:
            print("ASdfasdas")
            id_token = request.form.get('idToken')  # Get Firebase ID token from form

            if id_token:
                print("1")
                try:
                    # Verify the ID token
                    decoded_token = verify_firebase_id_token(id_token)
                    uid = decoded_token['uid']

                    # Create or retrieve user object
                    user = User(uid)  # Use UID as the identifier

                    # Log in the user using Flask-Login
                    login_user(user)
                    print("2")
                    # Redirect to the dashboard
                    return redirect(url_for('dashboard'))

                except Exception as e:
                    flash(f'Error signing in: {str(e)}', 'error')
                    return redirect(url_for('signin'))

    # Check for query parameters
    signup_success = request.args.get('signup_success')

    if signup_success:
        flash('Sign up successful! Please log in.', 'success')
    print("false")
    return render_template('signin.html', title='Sign In')


@app.route("/signup", methods=("GET", "POST"))
def signup():
    return render_template('signup.html', title='SignUp')

@app.route("/logout", methods=['POST', 'GET'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('signin'))



if __name__ == '__main__':
    app.run(debug=True,port=5050)