import pandas as pd

class Deadlinessdata: 
    def __init__(self): 


    def generate_deadliness_data_for_all_locnrs(self, locnrmedas, dfas): 
        deadlighet = []
        for i in locnrmedas:

            enhet = dfas.loc[dfas['LOK_NR'] == i]['LOK_ENHET'].values[0]
            kapasitet = dfas.loc[dfas['LOK_NR'] == i]['LOK_KAP'].values[0]
            
            if enhet == 'STK':
                konvertert = int(int(dfas.loc[dfas['LOK_NR'] == i]['LOK_KAP'].values[0])/5)
                dfas['LOK_KAP'][dfas.loc[dfas['LOK_NR']==i].index[0]] = konvertert
                dfas['LOK_ENHET'][dfas.loc[dfas['LOK_NR']==i].index[0]] = 'TN'
            elif enhet == 'KG':
                konvertert = int(int(dfas.loc[dfas['LOK_NR'] == i]['LOK_KAP'].values[0])/1000)
                dfas['LOK_KAP'][dfas.loc[dfas['LOK_NR']==i].index[0]] = konvertert
                dfas['LOK_ENHET'][dfas.loc[dfas['LOK_NR']==i].index[0]] = 'TN'
            elif enhet == 'M3':
                konvertert = int(int(dfas.loc[dfas['LOK_NR'] == i]['LOK_KAP'].values[0])*0.005)
                dfas['LOK_KAP'][dfas.loc[dfas['LOK_NR']==i].index[0]] = konvertert
                dfas['LOK_ENHET'][dfas.loc[dfas['LOK_NR']==i].index[0]] = 'TN'
            
            
            deadlighet.append(int(float(dfas.loc[dfas['LOK_NR'] == i]['LOK_KAP'].values[0])*random.uniform(12.5, 17.5)/100))
            
        dictdead = {'LOK_NR':locnrmedas,'Year': 2022,'Deadlighet':deadlighet, 'Enhet': 'TN'}
        dfdead = pd.DataFrame(dictdead)
        return dfdead