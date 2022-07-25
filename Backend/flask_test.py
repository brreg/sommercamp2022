from flask import Flask, render_template, request, url_for, redirect, jsonify
from soupsieve import escape
from traitlets import default
from database import Database
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
import os
from sqlalchemy import create_engine
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['JSON_SORT_KEYS'] = False

Base = automap_base()

class Regnskap(Base):
    __tablename__='key_financial_figures'

class Licedata(Base):
    __tablename__='salmonoid_lice'
    
class Location(Base):
    __tablename__='location'
    
class Escape(Base):
    __tablename__='escapes'
    
class Deadliness(Base):
    __tablename__='salmon_death'
    
class Smb(Base):
    __tablename__='smb'

engine = create_engine('postgresql://'+os.environ["database_user"]+':'+os.environ["database_password"]+'@localhost:5432/postgres')
Base.prepare(autoload_with=engine)
session = Session(engine)

@app.route('/accounts/')
def get_all_bedrifter():
    return jsonify ([{
        'id': regnskap.id, 'org_nr': regnskap.org_nr, 'year':regnskap.year, 'liquidity_ratio':regnskap.liquidity_ratio,
        'return_on_assets':regnskap.return_on_assets, 'solidity':regnskap.solidity} for regnskap in session.query(Regnskap).all()
    ])       

@app.route('/accounts/<orgnr>/')
def get_bedrift(orgnr):
    return jsonify ([{
        'id': regnskap.id, 'org_nr': regnskap.org_nr, 'year':regnskap.year, 'liquidity_ratio':regnskap.liquidity_ratio,
        'return_on_assets':regnskap.return_on_assets, 'solidity':regnskap.solidity} for regnskap in session.query(Regnskap).filter(Regnskap.org_nr == orgnr)
    ])

@app.route('/locations/')
def get_all_locations():
    return jsonify([{
        'loc_nr':loc.loc_nr, 'org_nr':loc.org_nr, 'loc_name':loc.loc_name, 'loc_capacity':loc.loc_capacity} for loc in session.query(Location).all()
    ])


@app.route('/locations/<locnr>/')
def get_location(locnr):
    return jsonify([{
        'loc_nr':loc.loc_nr, 'org_nr':loc.org_nr, 'loc_name':loc.loc_name, 'loc_capacity':loc.loc_capacity} for loc in session.query(Location).filter(Location.loc_nr == locnr)
    ])

@app.route('/locations/licedata/')
def get_all_licedata():
    return jsonify([{
        'id':loc.id, 'loc_nr':loc.loc_nr, 'lice':loc.lice, 'lice_nr':loc.lice_nr, 'lice_week':loc.lice_week, 'lice_year':loc.lice_year} for loc in session.query(Licedata).all()
    ])

@app.route('/locations/<locnr>/licedata/')
def get_one_licedata(locnr):
    return jsonify([{
        'id':loc.id, 'loc_nr':loc.loc_nr, 'lice':loc.lice, 'lice_nr':loc.lice_nr, 'lice_week':loc.lice_week, 'lice_year':loc.lice_year} for loc in session.query(Licedata).filter(Licedata.loc_nr==locnr)
    ])

@app.route('/locations/escapedata/')
def get_all_escapedata():
    return jsonify([{
        'id':loc.id, 'loc_nr':loc.loc_nr, 'escape_year':loc.escape_year, 'escape_week':loc.escape_week, 'escape_count':loc.escape_count, 
        'escape_captures':loc.escape_captured, 'escape_capturestart':loc.escape_capturestart, 'escape_desctription':loc.escape_description} for loc in session.query(Escape).all()
    ])
    
@app.route('/locations/<locnr>/escapedata/')
def get_one_escapedata(locnr):
    return jsonify([{
        'id':loc.id, 'loc_nr':loc.loc_nr, 'escape_year':loc.escape_year, 'escape_week':loc.escape_week, 'escape_count':loc.escape_count, 
        'escape_captures':loc.escape_captured, 'escape_capturestart':loc.escape_capturestart, 'escape_desctription':loc.escape_description} for loc in session.query(Escape).filter(Escape.loc_nr==locnr)
    ])
    
@app.route('/locations/deadliness/')
def get_all_deadlinessdata():
    return jsonify([{
        'id':loc.id, 'loc_nr':loc.loc_nr, 'death_nr':loc.death_nr, 'death_year': loc.death_year} for loc in session.query(Deadliness).all()
    ])
    

@app.route('/locations/<locnr>/deadliness/')
def get_one_deadlinessdata(locnr):
    return jsonify([{
        'id':loc.id, 'loc_nr':loc.loc_nr, 'death_nr':loc.death_nr, 'death_year': loc.death_year} for loc in session.query(Deadliness).filter(Deadliness.loc_nr==locnr)
    ])

@app.route('/orgs/')
def get_all_orgdata():
    return jsonify([{
        'org_nr':org.org_nr, 'org_name': org.org_name, 'org_address_id':org.org_address_id} for org in session.query(Smb).all()
    ])

@app.route('/orgs/<orgnr>/')
def get_one_orgdata(orgnr):
    return jsonify([{
        'org_nr':org.org_nr, 'org_name': org.org_name, 'org_address_id':org.org_address_id} for org in session.query(Smb).filter(Smb.org_nr==orgnr)
    ])
    
'''
@app.route('/bedrifter/1', methods=['GET'])
def get_bedrift():
    org = session.query(Regnskap).filter(Regnskap.org_nr == '855869942')
    return {
        'id': org.id, 'org_nr': org.org_nr, 'year':org.year, 'liquidity_ratio':org.liquidity_ratio,
        'return_on_assets':org.return_on_assets, 'solidity':org.solidity
    }

'''
''' 
locnr = 45017

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
'''