from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

@app.route("/process-data", methods=["POST"])
def process_data():

    file = request.files["file"]

    df = pd.read_csv(file)

    total_events = len(df)

    total_revenue = df["amount"].sum()

    active_users = df["user_id"].nunique()

    top_product = df["product"].value_counts().idxmax()

    result = {
        "total_events": int(total_events),
        "total_revenue": float(total_revenue),
        "active_users": int(active_users),
        "top_product": top_product
    }

    return jsonify(result)


if __name__ == "__main__":
    app.run(port=6000)