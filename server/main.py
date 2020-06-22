from flask import Flask
from flask_cors import CORS
import pymysql
import config 
import json
import pandas as pd
import keras
import pickle
import time

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
    # start = time.time()
    pepper_price = [61000, 59800, 60600, 57400, 56800, 55400, 53000]
    garlic_price = [30800, 31200, 31200, 31200, 31200, 31200, 31200]
    onion_price = [14600, 14400, 14800, 13800, 14000, 13600, 13200]

    product = ['pepper','garlic','onion']

    models = ["XGBoost", "GradientBoosting", "LightGBM", "Lasso"]

    product_price_day1 = []
    for p in product:
        if p == 'pepper':
            price = pepper_price
        elif p == 'garlic':
            price = garlic_price
        elif p == 'onion':
            price = onion_price

        input_dict = {"f0":[2020], "f1":[6], "f2": [20]}
        for i in range(len(price)):
            input_dict["f{}".format(i+3)] = [price[i]]

        input = pd.DataFrame(input_dict)

        # 10 models per each method(10 seed data)
        total_list = []
        for i in range(10):
            each_iter = []
            for m in models:
                ml_model = pickle.load(open("./models/{}/pima_{}_{}.pickle.dat".format(p, i, m), "rb"))
                prediction = int(ml_model.predict(input))
                each_list = price[1:]
                each_list.append(prediction)
                each_iter.append(each_list)

            keras_list = price[1:]
                
            k_model = keras.models.load_model('./models/{}/keras_{}.hdf5'.format(p,i))
            prediction = int(k_model.predict(input))
            
            keras_list.append(prediction)
            each_iter.append(each_list)
            
            total_list.append(each_iter)
        product_price_day1.append(total_list)

    print('day1 done')

    product_price_day2 = []
    for p in range(len(product_price_day1)):
        total_list = []
        for i in range(10):
            each_iter = []
            for m in range(len(models)):
                input_dict = {"f0":[2020], "f1":[6], "f2": [20]}
                for j in range(len(product_price_day1[p][i][m])):
                    input_dict["f{}".format(j+3)] = [product_price_day1[p][i][m][j]]
                
                input = pd.DataFrame(input_dict)

                ml_model = pickle.load(open("./models/{}/pima_{}_{}.pickle.dat".format(product[p], i, models[m]), "rb"))
                prediction = int(ml_model.predict(input))
                each_list = product_price_day1[p][i][m][1:]
                each_list.append(prediction)
                each_iter.append(each_list)
            input_dict = {"f0":[2020], "f1":[6], "f2": [20]}
            for j in range(len(product_price_day1[p][i][4])):
                input_dict["f{}".format(j+3)] = [product_price_day1[p][i][4][j]]

            input = pd.DataFrame(input_dict)

            keras_list = product_price_day1[p][i][4][1:]
                
            k_model = keras.models.load_model('./models/{}/keras_{}.hdf5'.format(product[p],i))
            prediction = int(k_model.predict(input))
            
            keras_list.append(prediction)
            each_iter.append(each_list)
            
            total_list.append(each_iter)
        product_price_day2.append(total_list)

    print('day2 done')
    # print(product_price_day2)

    product_price_day3 = []
    for p in range(len(product_price_day2)):
        total_list = []
        for i in range(10):
            each_iter = []
            for m in range(len(models)):
                input_dict = {"f0":[2020], "f1":[6], "f2": [20]}
                for j in range(len(product_price_day2[p][i][m])):
                    input_dict["f{}".format(j+3)] = [product_price_day2[p][i][m][j]]
                
                input = pd.DataFrame(input_dict)

                ml_model = pickle.load(open("./models/{}/pima_{}_{}.pickle.dat".format(product[p], i, models[m]), "rb"))
                prediction = int(ml_model.predict(input))
                each_list = product_price_day2[p][i][m][1:]
                each_list.append(prediction)
                each_iter.append(each_list)

            input_dict = {"f0":[2020], "f1":[6], "f2": [20]}
            for j in range(len(product_price_day2[p][i][4])):
                input_dict["f{}".format(j+3)] = [product_price_day2[p][i][4][j]]

            input = pd.DataFrame(input_dict)

            keras_list = product_price_day2[p][i][4][1:]
                
            k_model = keras.models.load_model('./models/{}/keras_{}.hdf5'.format(product[p],i))
            prediction = int(k_model.predict(input))
            
            keras_list.append(prediction)
            each_iter.append(each_list)
            
            total_list.append(each_iter)
        product_price_day3.append(total_list)

    print('day3 done')
    # print(product_price_day3)
    # print('time: ', time.time() - start)

    pepper_dict = {}
    onion_dict = {}
    garlic_dict = {}


    for p in range(len(product_price_day3)):
        xgboost_dict = {}
        gboost_dict = {}
        lightgbm_dict = {}
        lasso_dict = {}
        keras_dict = {}

        for i in range(10):
            for m in range(len(models)):
                # print(p,i,m,product_price_day1[p][i][m])
                if m == 0:
                    xgboost_dict[str(i)] = product_price_day3[p][i][m] 
                if m == 1:
                    gboost_dict[str(i)] = product_price_day3[p][i][m]
                if m == 2:
                    lightgbm_dict[str(i)] = product_price_day3[p][i][m]
                if m == 3:
                    lasso_dict[str(i)] = product_price_day3[p][i][m]
            keras_dict[str(i)] = product_price_day3[p][i][4]
        if p == 0:
            pepper_dict['gboost'] = gboost_dict
            pepper_dict['xgboost'] = xgboost_dict
            pepper_dict['lasso'] = lasso_dict
            pepper_dict['lightgbm'] = lightgbm_dict
            pepper_dict['keras'] = keras_dict
        elif p == 1:
            garlic_dict['gboost'] = gboost_dict
            garlic_dict['xgboost'] = xgboost_dict
            garlic_dict['lasso'] = lasso_dict
            garlic_dict['lightgbm'] = lightgbm_dict
            garlic_dict['keras'] = keras_dict
        elif p == 2:
            onion_dict['gboost'] = gboost_dict
            onion_dict['xgboost'] = xgboost_dict
            onion_dict['lasso'] = lasso_dict
            onion_dict['lightgbm'] = lightgbm_dict
            onion_dict['keras'] = keras_dict

    data = {}
    data["pepper"] = pepper_dict
    data["onion"] = onion_dict
    data["garlic"] = garlic_dict

    with open('test.json', 'w', encoding="utf-8") as make_file:
        json.dump(data, make_file, ensure_ascii=False, indent="\t")

    return '0'

if __name__ == '__main__':
    conn = getConnection()
    print(conn)
    app.run(debug=True)