from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route("/")
def splash():
    return render_template("splash.html")

@app.route("/menu")
def menu():
    return render_template("index.html")

@app.route("/tutorial/huruf")
def tutorial_huruf():
    return render_template("tutorial_huruf.html")

@app.route("/tutorial/angka")
def tutorial_angka():
    return render_template("tutorial_angka.html")

@app.route("/tutorial/tanda")
def tutorial_tanda():
    return render_template("tutorial_tanda.html")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')  # Agar bisa dibuka lewat HP dalam satu jaringan
