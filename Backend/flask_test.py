import json
from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import os

app = Flask(__name__)
CORS(app)
app.config['JSON_SORT_KEYS'] = False

#Copies and mirrors tables from database:

Base = automap_base()

#Tablenames must match those in database
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
    
class Areal(Base):
    __tablename__='areal_figures'
    
class PartTime(Base):
    __tablename__='part_time'

engine = create_engine('postgresql://'+os.environ["database_user"]+':'+os.environ["database_password"]+'@localhost:5432/postgres')
Base.prepare(autoload_with=engine)
session = Session(engine)


#Endpoint to get all accounts in database
@app.route('/accounts/')
def get_all_bedrifter():
    return jsonify({'data':[{
        'id': regnskap.id, 'org_nr': regnskap.org_nr, 'year':regnskap.year, 'liquidity_ratio':regnskap.liquidity_ratio,
        'return_on_assets':regnskap.return_on_assets, 'solidity':regnskap.solidity} for regnskap in session.query(Regnskap).all()
    ]})       

#Endpoint to get specific account from orgnr
@app.route('/accounts/<orgnr>/')
def get_bedrift(orgnr):
    return jsonify({'data':[{
        'id': regnskap.id, 'org_nr': regnskap.org_nr, 'year':regnskap.year, 'liquidity_ratio':regnskap.liquidity_ratio,
        'return_on_assets':regnskap.return_on_assets, 'solidity':regnskap.solidity} for regnskap in session.query(Regnskap).filter(Regnskap.org_nr == orgnr)
    ]})

#Endpoint to get all location data
@app.route('/locations/')
def get_all_locations():
    return jsonify({'data':[{
        'loc_nr':loc.loc_nr, 'org_nr':loc.org_nr, 'loc_name':loc.loc_name, 'loc_capacity':loc.loc_capacity} for loc in session.query(Location).all()
    ]})

#Endpoint to get data for specific endpoint
@app.route('/locations/<locnr>/')
def get_location(locnr):
    return jsonify({'data':[{
        'loc_nr':loc.loc_nr, 'org_nr':loc.org_nr, 'loc_name':loc.loc_name, 'loc_capacity':loc.loc_capacity} for loc in session.query(Location).filter(Location.loc_nr == locnr)
    ]})

#Endpoint to get all lice data
@app.route('/locations/licedata/')
def get_all_licedata():
    return jsonify({'data':[{
        'id':loc.id, 'loc_nr':loc.loc_nr, 'lice':loc.lice, 'lice_nr':loc.lice_nr, 'lice_week':loc.lice_week, 'lice_year':loc.lice_year} for loc in session.query(Licedata).all()
    ]})

#Endpoint to get specific licedata from locnr
@app.route('/locations/<locnr>/licedata/')
def get_one_licedata(locnr):
    return jsonify({'data':[{
        'id':loc.id, 'loc_nr':loc.loc_nr, 'lice':loc.lice, 'lice_nr':loc.lice_nr, 'lice_week':loc.lice_week, 'lice_year':loc.lice_year} for loc in session.query(Licedata).filter(Licedata.loc_nr==locnr)
    ]})

#Endpoint to get all escapedata
@app.route('/locations/escapedata/')
def get_all_escapedata():
    return jsonify({'data':[{
        'id':loc.id, 'loc_nr':loc.loc_nr, 'escape_year':loc.escape_year, 'escape_week':loc.escape_week, 'escape_count':loc.escape_count, 
        'escape_captures':loc.escape_captured, 'escape_capturestart':loc.escape_capturestart, 'escape_desctription':loc.escape_description} for loc in session.query(Escape).all()
    ]})

#Endpoint to get specific escapedata from locnr
@app.route('/locations/<locnr>/escapedata/')
def get_one_escapedata(locnr):
    return jsonify({'data':[{
        'id':loc.id, 'loc_nr':loc.loc_nr, 'escape_year':loc.escape_year, 'escape_week':loc.escape_week, 'escape_count':loc.escape_count, 
        'escape_captures':loc.escape_captured, 'escape_capturestart':loc.escape_capturestart, 'escape_desctription':loc.escape_description} for loc in session.query(Escape).filter(Escape.loc_nr==locnr)
    ]})

#Endpoint to get all deadliness data
@app.route('/locations/deadliness/')
def get_all_deadlinessdata():
    return jsonify({'data':[{
        'id':loc.id, 'loc_nr':loc.loc_nr, 'death_nr':loc.death_nr, 'death_year': loc.death_year} for loc in session.query(Deadliness).all()
    ]})
    

#Endpoint to get specific deadliness data
@app.route('/locations/<locnr>/deadliness/')
def get_one_deadlinessdata(locnr):
    return jsonify({'data':[{
        'id':loc.id, 'loc_nr':loc.loc_nr, 'death_nr':loc.death_nr, 'death_year': loc.death_year} for loc in session.query(Deadliness).filter(Deadliness.loc_nr==locnr)
    ]})

#Endpoint to get data about orgs (name, address etc.)
@app.route('/orgs/')
def get_all_orgdata():
    return jsonify({'data':[{
        'org_nr':org.org_nr, 'org_name': org.org_name, 'org_address_id':org.org_address_id} for org in session.query(Smb).all()
    ]})

#Endpoint to get specific org data from orgnr
@app.route('/orgs/<orgnr>/')
def get_one_orgdata(orgnr):
    return jsonify({'data':[{
        'org_nr':org.org_nr, 'org_name': org.org_name, 'org_address_id':org.org_address_id} for org in session.query(Smb).filter(Smb.org_nr==orgnr)
    ]})

#Endpoint to get all areal data
@app.route('/locations/areal/')
def get_all_areals():
    return jsonify({'data':[{
        'id:': loc.id, 'loc_nr': loc.loc_nr, 'areal_use': loc.areal_use} for loc in session.query(Areal).all()
    ]})
    
#Endpoint to get specific areal data from locnr
@app.route('/locations/<locnr>/areal/')
def get_one_areals(locnr):
    return jsonify({'data':[{
        'id:': loc.id, 'loc_nr': loc.loc_nr, 'areal_use': loc.areal_use} for loc in session.query(Areal).filter(Areal.loc_nr == locnr)
    ]})

#Endpoint to get all part time data
@app.route('/locations/parttime/')
def get_all_parttime():
    return jsonify({'data':[{
        'id': loc.id, 'loc_nr': loc.loc_nr, 'part_time_percentage':loc.part_time_percentage} for loc in session.query(PartTime).all()
    ]})

#Endpoint to get specific part time data
@app.route('/locations/<locnr>/parttime/')
def get__parttime(locnr):
    return jsonify({'data':[{
        'id': loc.id, 'loc_nr': loc.loc_nr, 'part_time_percentage':loc.part_time_percentage} for loc in session.query(PartTime).filter(PartTime.loc_nr==locnr)
    ]})

