# Dating App Backend

## Features
- Modern user profiles: bio, age, location, interests, profile picture
- Secure authentication (JWT, password hashing)
- Profile editing and deletion
- API endpoints for user management

## Database Migration
If you have an existing database, you need to migrate it to add new fields (bio, age, location, interests, profile_picture) to the User table. For development, you can delete `dating.db` and let Flask-SQLAlchemy recreate it, or use a migration tool like Flask-Migrate for production.

Example (development):
```bash
rm dating.db
python app.py  # This will recreate the database with new fields
```

## Setup
1. Install dependencies:
   ```bash
   pip install flask flask_sqlalchemy flask_bcrypt flask_jwt_extended flask_cors nltk
   ```
2. Run the app:
   ```bash
   python app.py
   ```
