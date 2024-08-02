from flask import Flask, request, render_template, redirect, url_for, flash
import re
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from firebase_utils import create_user_with_email_and_password, sign_in_with_email_and_password, sign_in_with_google, google_sign_in_with_token
from models import User

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Flask-Login setup
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'signin'  # Redirect to sign-in if not logged in


@login_manager.user_loader
def load_user(user_id):
    # Assuming Firebase user ID is used as user_id
    return User(user_id)


@app.route("/")
@login_required
def home():
    return render_template('index.html', title='Server Management')


@app.route("/signin", methods=("GET", "POST"))
def signin():
    if request.method == 'POST':
        email = request.form.get('emailSignIn')
        password = request.form.get('loginPassword')
        user, error_message = sign_in_with_email_and_password(email, password)
        if user:
            user_obj = User(user['localId'])  # user['localId'] is Firebase user ID
            login_user(user_obj)
            return redirect(url_for('home'))
        else:
            flash(f"Sign in failed: {error_message}", "error")
            return redirect(url_for('signin'))
    return render_template('signin.html', title='SignIn')


@app.route("/signup", methods=("GET", "POST"))
def signup():
    if request.method == 'POST':
        email = request.form.get('emailSignIn')
        password = request.form.get('password')
        confirm_password = request.form.get('confirmPassword')

        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            flash("Invalid email address", "error")
            return redirect(url_for('signup'))

        if password != confirm_password:
            flash("Passwords do not match", "error")
            return redirect(url_for('signup'))

        user, error_message = create_user_with_email_and_password(email, password)
        if user:
            flash('Sign up successful! Please log in.', 'success')
            return redirect(url_for('signin'))
        else:
            flash(f"Sign up failed: {error_message}", "error")
            return redirect(url_for('signup'))

    return render_template('signup.html', title='SignUp')

@app.route("/logout", methods=['POST', 'GET'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('signin'))


@app.route("/signin/google", methods=['POST', 'GET'])
def google_signin():
    return redirect(sign_in_with_google())

@app.route("/signin/google/callback", methods=['POST', 'GET'])
def google_auth_callback():
    id_token = request.args.get('id_token')
    user_id, error = google_sign_in_with_token(id_token)
    if user_id:
        user_obj = User(user_id)
        login_user(user_obj)
        return redirect(url_for('home'))
    else:
        flash(f"Google sign in failed: {error}", "error")
        return redirect(url_for('signin'))


if __name__ == '__main__':
    app.run(debug=True,port=5050)