from flask import Flask, jsonify
from traitlets import default
from database import Database
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['JSON_SORT_KEYS'] = False

locnr = 15196#45017
orgnr = 12345

#lice_data = {'locnr':45017, 'lice':'True', 'lice_nr':'1.8', 'lice_week':'22', 'lice_year':'2022'}

escape_data = [
    #Mock data for testing:
    {'locnr':str(locnr), 'escape_nr':'3', 'escape_year':'2022', 'escape_week':'5'}
]

death_data = [
    #Mock data for testing:
    {'locnr':str(locnr), 'death_nr':'4', 'death_year':'2020'}
]

smb = [
    #Mock data for testing:
    {'orgnr':str(12345), 'org_name':'Aqua', 'org_address':'Brønnveien 4'}
]
db1 = Database()
lice_data = db1.select_lice_data('loc_nr = ' +str(locnr))

#Endpoint for SMB info:
@app.route('/smb/'+str(orgnr), methods=['GET'])
def smb_data():
    return jsonify(smb)

#Endpoint for a locations data on all of escapes, licedata and death
@app.route('/location/'+str(locnr), methods=['GET'])
def all_location_data():
    return jsonify(lice_data, escape_data, death_data)

#Endpoint for a locations licedata
@app.route('/location/'+str(locnr)+'/licedata/', methods=['GET'])
def get_lice_data():
    db2 = Database()
    lice_data2 = db2.select_lice_data('loc_nr = ' +str(locnr))
    return jsonify(lice_data2)

#Endpoint for a locations escape data
@app.route('/location/'+str(locnr)+'/escapedata/', methods=['GET'])
def get_escape_data():
    return jsonify(escape_data)

#Endpoint for a locations deaths
@app.route('/location/'+str(locnr)+'/deaths/', methods=['GET'])
def get_death_data():
    return jsonify(death_data)