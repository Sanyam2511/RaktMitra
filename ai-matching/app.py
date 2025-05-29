from flask import Flask, request, jsonify

app = Flask(__name__)

# Dummy donor data for matching (in a real scenario, this might come from a database)
donors = [
    {"id": 1, "name": "Alice", "bloodGroup": "O+", "location": "New York"},
    {"id": 2, "name": "Bob", "bloodGroup": "A-", "location": "Los Angeles"},
    {"id": 3, "name": "Charlie", "bloodGroup": "B+", "location": "Chicago"},
    {"id": 4, "name": "Diana", "bloodGroup": "O+", "location": "New York"}
]

# Basic matching: Match donors with the same blood type.
def match_donors(request_blood_type):
    matches = [donor for donor in donors if donor["bloodGroup"] == request_blood_type]
    return matches

# ✅ Fix: Add a homepage route to avoid 404 error
@app.route("/")
def home():
    return jsonify({"message": "Flask AI Matching API is running!"})

@app.route("/match-donors", methods=["POST"])
def match_donors_route():
    data = request.get_json()
    bloodGroup = data.get("bloodGroup")
    if not bloodGroup:
        return jsonify({"msg": "bloodGroup is required"}), 400
    matches = match_donors(bloodGroup)
    return jsonify({"matches": matches})

if __name__ == "__main__":
    app.run(port=5002)
