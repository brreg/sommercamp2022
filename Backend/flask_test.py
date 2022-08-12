import json
from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.sql import func
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

class Co2Emissions(Base):
    __tablename__='greenhouse_gas_emissions'

class Averages(Base):
    __tablename__='aquaculture_industry_averages'

class Social(Base):
    __tablename__='social_figures'

class Address(Base):
    __tablename__='address'

engine = create_engine('postgresql+psycopg2://'+os.environ["database_user"]+':'+os.environ["database_password"]+'@localhost:5432/postgres')
Base.prepare(autoload_with=engine)
session = Session(engine)


def bad_request(orgnr):
    return orgnr.isdigit() == False

#Formats an organisations name 
def org_name_format(orgname):
    tolist = str(orgname).split()
    res = ''
    for i in tolist:
        if i == 'ASA' or i == 'AS':
            res += i
        else:
            res += i.capitalize() + ' '
    return res

#Formatting long integers
def number_format(number):
    res = ''
    stn = str(number)
    if len(stn) == 5:
        res += (stn[0:2] + ' ' + stn[2:5])
        return (res)
    elif len(stn) == 4:
        res += (stn[0] + ' ' + stn[1:4])
        return (res)
    elif len(stn) == 6:
        res += (stn[0:3] + ' ' + stn[3:6])
        return (res)
    elif len(stn) == 7:
        res += (stn[0] + ' ' + stn[1:4] + ' ' + stn[4:7])
        return res
    else:
        return number
    
#Endpoint to get all accounts in database
@app.route('/accounts/')
def get_all_bedrifter():
    return jsonify({'data':[{
        'id': regnskap.id, 'org_nr': regnskap.org_nr, 'year':regnskap.year, 'liquidity_ratio':regnskap.liquidity_ratio,
        'return_on_assets':regnskap.return_on_assets, 'solidity':regnskap.solidity} for regnskap in session.query(Regnskap).all()
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

    if orgnr.isdigit() == False:
        return 'Bad request'
    else:
        res = ({'data':[{
            'org_nr':org.org_nr, 'org_name': org_name_format(org.org_name), 'org_address_id':org_name_format(org.org_address_id)} for org in session.query(Smb).filter(Smb.org_nr==int(orgnr))
        ]})
        return res

@app.route('/orgs/<orgnr>/address/')
def get_address_for_orgnr(orgnr):

    if bad_request(orgnr):
        return 'Bad request'
    
    else:
        result = session.query(
            Smb.org_nr,
            Address.org_address,
            Address.org_city,
            Address.id,
            Smb.org_address_id
        ).select_from(
            Address
        ).join(
            Smb, Address.id == Smb.org_address_id
        ).filter(
            Smb.org_nr == orgnr
        ).all()
        
        ret_list = []
        for tup in result:

            ret_list.append({'org_nr': tup[0], 'address': org_name_format(tup[1]), 'city':org_name_format(tup[2])})

        return jsonify({'data': ret_list})

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

#Endpoint to get all social data
@app.route('/orgs/social/')
def get_socialdata():
    return jsonify({'data':[{
        'org_nr':org.org_nr, 'year': org.year, 'female_percent':org.female_percent, 'male_percent':org.male_percent} for org in session.query(Social).all()
    ]})
    
#Endpoint to get specific social data
@app.route('/orgs/<orgnr>/social/')
def get_one_socialdata(orgnr):
    return jsonify({'data':[{
        'org_nr':org.org_nr, 'year': org.year, 'female_percent':round(org.female_percent), 'male_percent':round(org.male_percent)} for org in session.query(Social).filter(Social.org_nr==orgnr)
    ]})
    

#Endpoint to get co2 emission from feed on orgnr
@app.route('/orgs/<orgnr>/co2feed/')
def get__co2emissions_feed(orgnr):
    result=session.query(
        Co2Emissions.year,
        func.sum(Co2Emissions.co2e_feed),
        func.sum(Location.loc_capacity)
    ).select_from(
        Co2Emissions
    ).join(
        Location, Co2Emissions.loc_nr == Location.loc_nr
    ).filter(
        Location.org_nr==orgnr
    ).group_by(
        Co2Emissions.year
    ).order_by(
        Co2Emissions.year
    ).all()
    ret_list=[]
    for tup in result:
        ret_list.append({'year': tup[0], 'thiscomp': tup[1]/tup[2]})
    return jsonify({'data': ret_list})
    
#Endpoint to get co2 emission from transport on orgnr
@app.route('/orgs/<orgnr>/co2production/')
def get__co2emissions_production(orgnr):
    result=session.query(
        Co2Emissions.year,
        func.sum(Co2Emissions.co2e_production),
        func.sum(Location.loc_capacity)
    ).select_from(
        Co2Emissions
    ).join(
        Location, Co2Emissions.loc_nr == Location.loc_nr
    ).filter(
        Location.org_nr==orgnr
    ).group_by(
        Co2Emissions.year
    ).order_by(
        Co2Emissions.year
    ).all()
    ret_list=[]
    for tup in result:
        ret_list.append({'year': tup[0], 'thiscomp': (tup[1]/tup[2])})
    return jsonify({'data': ret_list})

#Endpoint to get deadliness data on orgnr level
@app.route('/orgs/<orgnr>/deadliness/')
def get_all_deadlinesspercent_for_orgnr(orgnr):
    result = session.query(
        Deadliness.death_year,
        (func.sum(Deadliness.death_nr)/func.sum(Location.loc_capacity)*100)
    ).select_from(
        Deadliness
    ).join(
        Location, Deadliness.loc_nr == Location.loc_nr
    ).filter(
        Location.org_nr == orgnr
    ).group_by(
        Deadliness.death_year
    ).order_by(
        Deadliness.death_year
    ).all() #
    ret_list = []
    for tup in result:
        ret_list.append({'year': tup[0], 'thiscomp': round(tup[1], 2)}) 

    return jsonify({'data': ret_list})


#Endpoint to get deadliness data on orgnr level
@app.route('/orgs/<orgnr>/deadlines/')
def get_all_deadlinesspercent_for_orgnr2(orgnr):
    result = session.query(
        Deadliness.death_year,
        (func.sum(Deadliness.death_nr)/func.sum(Location.loc_capacity)*100)
    ).select_from(
        Deadliness
    ).join(
        Location, Deadliness.loc_nr == Location.loc_nr
    ).filter(
        Location.org_nr == orgnr
    ).group_by(
        Deadliness.death_year
    ).order_by(
        Deadliness.death_year
    ).all() #
    ret_list = []
    for tup in result:
        ret_list.append({'year': tup[0], 'death_percentage': round(tup[1], 2)}) 

    return jsonify({'data': ret_list})

#Endpoint to get an organisations licedata
@app.route('/orgs/<orgnr>/licedata/')
def get_all_licedata_for_orgnr(orgnr):
    
    if orgnr.isdigit() == False:
        return 'Bad request'
    
    else:
        result = session.query(
            func.avg(Licedata.lice_average),
            Licedata.lice_year
        ).select_from(
            Licedata
        ).join(
            Location, Licedata.loc_nr == Location.loc_nr
        ).filter(
            Location.org_nr == orgnr
        ).group_by(
            Licedata.lice_year
        ).order_by(
            Licedata.lice_year
        ).all()
        ret_list = []
        for tup in result:
            ret_list.append({'year': tup[1], 'thiscomp': round(tup[0], 2)})
        return jsonify({'data': ret_list})
    
#Endpoint to get escape data on orgnr level
@app.route('/orgs/<orgnr>/escapes/')
def get_all_escapedata_for_orgnr(orgnr):
    
    if bad_request(orgnr):
        return('Bad request')
    
    else:
        result = session.query(
            func.sum(Escape.escape_count_sum),
            Escape.escape_year
        ).select_from(
            Escape
        ).join(
            Location, Escape.loc_nr == Location.loc_nr
        ).filter(
            Location.org_nr == orgnr
        ).group_by(
            Escape.escape_year
        ).order_by(
            Escape.escape_year
        ).all()
        ret_list = []
        for tup in result:
            ret_list.append({'year': tup[1], 'thiscomp': tup[0]})
        return jsonify({'data': ret_list})


#Endpoint to get averages from the aquaculture industry
@app.route('/orgs/<orgnr>/areal/')
def get_nokkeltall_areal(orgnr):
    ret_list = []

    result = session.query(
        func.sum(Areal.areal_use),
        func.sum(Areal.areal_use)/7140,
        func.sum(Location.loc_capacity),
        func.sum(Deadliness.death_nr)
    ).select_from(
        Areal
    ).join(
        Location, Areal.loc_nr == Location.loc_nr
    ).join(
        Deadliness, Areal.loc_nr == Deadliness.loc_nr
    ).filter(
        Location.org_nr == orgnr
    ).all()
    
    for tup in result:
        ret_list.append({'this_org_areal': round(tup[0])})
        ret_list.append({'this_org_areal_football': round(tup[1])})
        ret_list.append({'this_org_areal_string': number_format(round(tup[0]/((tup[2]-tup[3])*(2/3))))})

    result = session.query(
        func.sum(Areal.areal_use),
        func.avg(Areal.areal_use)/7140,
        func.sum(Location.loc_capacity),
        func.sum(Deadliness.death_nr)
    ).select_from(
        Areal
    ).join(
        Deadliness, Areal.loc_nr == Deadliness.loc_nr
    ).join(
        Location, Areal.loc_nr == Location.loc_nr
    ).all()

    for tup in result:
        ret_list.append({'all_org_areal': round(tup[0])})
        ret_list.append({'all_org_areal_football': round(tup[1])})
        ret_list.append({'all_org_areal_string': number_format(round(tup[0]/((tup[2]-tup[3])*(2/3))))})
        ret_list.append({'tup0':tup[0], 'tup1':tup[1], 'tup2':tup[2], 'tup3':tup[3]})

    return jsonify({'data': ret_list})

#Endpoint to get specific account from orgnr
@app.route('/accounts/<orgnr>/')
def get_bedrift(orgnr):
    return jsonify({'data':[{
        'id': regnskap.id, 'org_nr': regnskap.org_nr, 'year':regnskap.year, 'liquidity_ratio':regnskap.liquidity_ratio,
        'return_on_assets':regnskap.return_on_assets, 'solidity':regnskap.solidity} for regnskap in session.query(Regnskap).filter(Regnskap.org_nr == orgnr)
    ]})


#Endpoint to get averages from the aquaculture industry
@app.route('/averages/deadliness/')
def get_all_averages_deadliness():
    result = session.query(
        Deadliness.death_year,
        (func.sum(Deadliness.death_nr)/func.sum(Location.loc_capacity))*100
    ).select_from(
        Deadliness
    ).join(
        Location, Deadliness.loc_nr == Location.loc_nr
    ).group_by(
        Deadliness.death_year
    ).all() #
    ret_list = []
    for tup in result:
        ret_list.append({'year': tup[0], 'average_all': round(tup[1],2)}) 
    return jsonify({'data': ret_list})

#Endpoint to get averages from the aquaculture industry

@app.route('/averages/licedata/')
def get_all_averages_licedata():
    result = session.query(
        func.avg(Licedata.lice_average),
        Licedata.lice_year
    ).select_from(
        Licedata
    ).join(
        Location, Licedata.loc_nr == Location.loc_nr
    ).group_by(
        Licedata.lice_year
    ).all()
    ret_list = []
    for tup in result:
        ret_list.append({'year': tup[1], 'average_all': round(tup[0], 2)})
    return jsonify({'data': ret_list})

#Endpoint to get averages from the aquaculture industry
@app.route('/averages/escapes/')
def get_all_averages_escapes():
    count = 0
    count_orgs = session.query(
        func.count(Smb.org_nr)
    ).select_from(
        Smb
    ).all()
    for res in count_orgs:
        count = res[0]
        break
    
    result = session.query(
        func.avg(Escape.escape_count_sum),
        Escape.escape_year
    ).select_from(
        Escape
    ).join(
        Location, Escape.loc_nr == Location.loc_nr
    ).group_by(
        Escape.escape_year
    ).all()
    ret_list = []
    for tup in result:
        ret_list.append({'year': int(tup[1]), 'average_all': round(tup[0]/count)})
    
    return jsonify({'data': ret_list})

#Endpoint to get averages from the aquaculture industry
@app.route('/averages/co2feed/')
def get_all_averages_co2feed():
    result=session.query(
        Co2Emissions.year,
        func.avg(Co2Emissions.co2e_feed),
        (func.avg(Co2Emissions.co2e_feed))/0.046,
        func.avg(Location.loc_capacity)
    ).select_from(
        Co2Emissions
    ).join(
        Location, Co2Emissions.loc_nr == Location.loc_nr
    ).group_by(
        Co2Emissions.year
    ).all()
    ret_list=[]
    for tup in result:
        ret_list.append({'year': tup[0], 'average_all': round(tup[1]/tup[3]), 'average_all_string': number_format(round(tup[1]/tup[3])), 'average_all_feed_flights':round(tup[2]/tup[3])})
    return jsonify({'data': ret_list})

#Endpoint to get averages from the aquaculture industry
@app.route('/averages/co2production/')
def get_all_averages_co2production():
    result=session.query(
        Co2Emissions.year,
        func.avg(Co2Emissions.co2e_production),
        (func.avg(Co2Emissions.co2e_production))/0.046,
        func.avg(Location.loc_capacity)
    ).select_from(
        Co2Emissions
    ).join(
        Location, Co2Emissions.loc_nr == Location.loc_nr
    ).join(
        Smb, Location.org_nr == Smb.org_nr
    ).group_by(
        Co2Emissions.year,
        #Location.org_nr
    ).order_by(
        Co2Emissions.year
    ).all()
    ret_list=[]
    for tup in result:
        ret_list.append({'year': tup[0], 'average_all': int(tup[1])/tup[3],'average_all_string': (round(tup[1]/tup[3], 2)), 'average_all_production_flights': round(tup[2]/tup[3])})
    return jsonify({'data': ret_list})

#Endpoint to get average part time use
@app.route('/averages/ufrivilligdeltid/')
def get_average_udeltid():
    ret_list=[]

    result=session.query(
        func.avg(PartTime.part_time_percentage)*100,
        PartTime.year
    ).select_from(
        PartTime
    ).group_by(
        PartTime.year
    ).all()
    
    for tup in result:
        ret_list.append({'year': tup[1], 'average_all':round(tup[0], 2)})

    return jsonify({'data': ret_list})

#Endpoint to get social data
@app.route('/nokkeltall/<orgnr>/kjonn/')
def get_nokkeltall_kjonn(orgnr):
    ret_list=[]

    result=session.query(
        Social.female_percent,
        Social.male_percent
    ).select_from(
        Social
    ).filter(
        Social.org_nr == orgnr,
        Social.year == '2021'
    ).all()
    
    for tup in result:
        ret_list.append({'female_percent':round(tup[0], 0)})
        ret_list.append({'male_percent':round(tup[1], 0)})

    result=session.query(
        func.avg(Social.female_percent),
        func.avg(Social.male_percent)
    ).select_from(
        Social
    ).filter(
        Social.year == '2021'
    ).all()

    for tup in result:
        ret_list.append({'female_percent_avg':round(tup[0], 0)})
        ret_list.append({'male_percent_avg':round(tup[1], 0)})
    return jsonify({'data': ret_list})

#Get part time data for a specific organisation
@app.route('/orgs/<orgnr>/ufrivilligdeltid/')
def get_all_ufrivilligdeltid_for_orgnr(orgnr):
    ret_list = []
    result=session.query(
    PartTime.part_time_percentage*100,
    PartTime.year
    ).select_from(
      PartTime
    ).filter(
      PartTime.org_nr == orgnr
    ).order_by(
      PartTime.year
    ).all()
    
    for tup in result:
        ret_list.append({'year': tup[1], 'thiscomp': round(tup[0],2)})

    return jsonify({'data': ret_list})



#Endpoint for Co2
@app.route('/orgs/<orgnr>/flights/')
def get_flight_sum(orgnr):
    ret_list=[]

    result=session.query(
        Co2Emissions.year,
        func.sum(Co2Emissions.co2e_feed),
        func.sum(Co2Emissions.co2e_production),
        (func.sum(Co2Emissions.co2e_feed)/0.046),
        (func.sum(Co2Emissions.co2e_production)/0.046),
        (func.sum(Location.loc_capacity))
        ).select_from(
        Co2Emissions
    ).join(
        Location, Co2Emissions.loc_nr == Location.loc_nr
        ).filter(
        Location.org_nr == orgnr,
        Co2Emissions.year == '2021'
    ).group_by(
        Co2Emissions.year).all()
        
        
    for tup in result:
        ret_list.append({'prod_co2': (tup[2]/tup[5]), 'feed_co2_string': (round(tup[1]/tup[5], 2)), 'prod_feed': (round(tup[1]/tup[5])), 'prod_co2_string': (round(tup[2]/tup[5],2)), 'flights_feed':round(tup[3]/tup[5]), 'flights_production': round(tup[4]/tup[5])})
        

    return jsonify({'data': ret_list})



if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=105)
    app.run()



