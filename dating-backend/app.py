from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db, bcrypt
from routes.auth import auth_bp
from routes.users import users_bp
import os
import random
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# ---------------- Flask app setup ----------------
app = Flask(__name__)
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(BASE_DIR, 'dating.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'supersecretkey'

CORS(app)
db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)

# ---------------- Blueprints ----------------
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(users_bp, url_prefix='/api')

# ---------------- Corpus chatbot setup ----------------
nltk.download("punkt", quiet=True)
nltk.download("stopwords", quiet=True)

def load_corpus(file_path="corpus.txt"):
    """Load Q/A pairs from corpus.txt"""
    pairs = {}
    current_q = None
    if not os.path.exists(file_path):
        return pairs
    with open(file_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            if line.lower().startswith("q:"):
                current_q = line[2:].strip().lower()
                pairs[current_q] = []
            elif line.lower().startswith("a:") and current_q:
                pairs[current_q].append(line[2:].strip())
    return pairs

pairs = load_corpus(os.path.join(BASE_DIR, "corpus.txt"))

def preprocess(text):
    """Lowercase + remove stopwords + tokenize"""
    tokens = word_tokenize(text.lower())
    return [w for w in tokens if w.isalnum() and w not in stopwords.words("english")]

def get_response(user_message):
    msg_tokens = preprocess(user_message)

    # exact match first
    if user_message.lower() in pairs:
        return random.choice(pairs[user_message.lower()])

    # best keyword overlap
    best_match = None
    max_overlap = 0
    for q in pairs:
        q_tokens = preprocess(q)
        overlap = len(set(msg_tokens) & set(q_tokens))
        if overlap > max_overlap:
            max_overlap = overlap
            best_match = q

    if best_match:
        return random.choice(pairs[best_match])

    return "Sorry, I didn’t quite get that. Can you ask differently?"

# ---------------- In-memory conversation store ----------------
user_conversations = {}  # key=username, value=list of messages

# ---------------- Chat route ----------------
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    username = data.get("username", "guest")
    message = data.get("message", "")

    if not message:
        return jsonify({"reply": "No message provided."}), 400

    # Initialize conversation
    if username not in user_conversations:
        user_conversations[username] = []

    user_conversations[username].append({"role": "user", "content": message})

    # Get reply from corpus
    bot_reply = get_response(message)

    user_conversations[username].append({"role": "assistant", "content": bot_reply})

    return jsonify({"reply": bot_reply})

# ---------------- Default route ----------------
@app.route('/')
def index():
    return jsonify({"message": "Corpus chatbot backend is working!"})

# ---------------- Run app ----------------
if __name__ == '__main__':
    import sys
    port = 5000
    # Allow custom port via command line: python app.py 5001
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except Exception:
            pass
    with app.app_context():
        db.create_all()
        print(f"✅ Database initialized at: {os.path.join(BASE_DIR, 'dating.db')}")
    app.run(debug=True, port=port)
