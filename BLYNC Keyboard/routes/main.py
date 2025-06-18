from flask import Blueprint, render_template, request, jsonify, current_app
from utils.file_ops import save_text_to_file

main_routes = Blueprint("main", __name__)

@main_routes.route("/")
def index():
    return render_template("index.html")

@main_routes.route("/save", methods=["POST"])
def save_text():
    data = request.json
    text = data.get("text", "")
    success = save_text_to_file(text, current_app.config["UPLOAD_FOLDER"])
    if success:
        return jsonify({"message": "Teks berhasil disimpan!"})
    else:
        return jsonify({"message": "Gagal menyimpan teks"}), 500
