from flask import Flask
from flask_cors import CORS
import pymysql
import config 
import json

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

if __name__ == '__main__':
    conn = getConnection()
    print(conn)
    app.run(debug=True)