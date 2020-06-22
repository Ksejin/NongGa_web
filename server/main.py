from flask import Flask
from flask_cors import CORS
import pymysql
import config 
import json
import pandas as pd
import lightgbm as lgb
import xgboost as xgb
from sklearn.linear_model import Lasso
from sklearn.ensemble import GradientBoostingRegressor
import keras
import pickle

app = Flask(__name__)
conf = config.dbconfig

CORS(app)

def getConnection():
    print('connecting')
    return pymysql.connect(host=conf['host'], user=conf['user'], password=conf['password'], db=conf['database'], charset='utf8')    

@app.route('/')
def index():
    curs = conn.cursor(pymysql.cursors.DictCursor)
    sql = "select * from danger"
    curs.execute(sql)
    rows = curs.fetchall()
    print(rows)
    return json.dumps(rows)

@app.route('/predict')
def predict():
    pepper_price = [10300, 10700, 10900, 11300, 11500, 11000, 10700]
    garlic_price = [3300, 3700, 4200, 4500, 4500, 4500, 4500]
    onion_price = [7700, 7300, 7100, 7000, 7200, 77000, 8300]

    product = ['pepper','garlic','onion']

    models = ["XGBoost", "GradientBoosting", "LightGBM", "Lasso"]

    for p in product:
        result = {}
        if p == 'pepper':
            price = pepper_price
        elif p == 'garlic':
            price = garlic_price
        elif p == 'onion':
            price = onion_price

        input_dict = {"f0":[2000], "f1":[6], "f2": [20]}
        for i in range(len(price)):
            input_dict["f{}".format(i+3)] = [price[i]]

        input = pd.DataFrame(input_dict)
        print(input)
        # 10 models per each method(10 seed data)
        for i in range(10):
            for m in models:
                ml_model = pickle.load(open("./models/{}/pima_{}_{}.pickle.dat".format(p, i, m), "rb"))
                result['{}_{}_{}'.format(p,m,i)] = ml_model.predict(input)

        print(result)  
    return '0'

if __name__ == '__main__':
    conn = getConnection()
    print(conn)
    app.run(debug=True)