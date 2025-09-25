from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User

users_bp = Blueprint("users_bp", __name__)

# GET all users (already protected)
@users_bp.route("/users", methods=["GET"])
@jwt_required()
def get_users():
    current_user = get_jwt_identity()
    print("JWT Identity:", current_user)
    users = User.query.all()
    users_data = [u.to_dict() for u in users]
    return jsonify(users_data), 200


# EDIT your own user profile
@users_bp.route("/users/<string:username>", methods=["PUT"])
@jwt_required()
def edit_user(username):
    current_user = get_jwt_identity()
    if current_user != username:
        return jsonify({"error": "Unauthorized"}), 401
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    data = request.get_json()
    user.bio = data.get("bio", user.bio)
    user.age = data.get("age", user.age)
    user.location = data.get("location", user.location)
    user.interests = data.get("interests", user.interests)
    user.profile_picture = data.get("profile_picture", user.profile_picture)
    db.session.commit()
    return jsonify({"message": "Profile updated successfully", "user": user.to_dict()}), 200

# DELETE your own user profile
@users_bp.route("/users/<string:username>", methods=["DELETE"])
@jwt_required()
def delete_user(username):
    current_user = get_jwt_identity()
    # Only allow deleting your own profile
    if current_user != username:
        return jsonify({"error": "Unauthorized"}), 401
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "Profile deleted successfully"}), 200
