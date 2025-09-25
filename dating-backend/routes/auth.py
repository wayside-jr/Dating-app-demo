from flask import Blueprint, request, jsonify
from models import db, User
from flask_jwt_extended import create_access_token
from datetime import timedelta

auth_bp = Blueprint("auth_bp", __name__)

# ---------------- Signup ----------------
@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({"error": "User already exists"}), 400

    user = User(
        username=username,
        email=email
    )
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

# ---------------- Login ----------------
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))
    return jsonify({"access_token": access_token, "user": {"id": user.id, "username": user.username, "email": user.email}})
