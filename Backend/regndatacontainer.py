import pandas as pd

class RegndataContainer:

    def __init__(self):
        self.regndatalist = []

    def add_regndata(self, regndata):
        self.regndatalist.append(regndata)

    def add_regndata_list(self, regndatalist):
        for regndata in regndatalist:
            self.add_regndata(regndata)

    def get_dataframe(self):
        regn_dict = {}
        org_nr = []
        year = []
        liquidity_ratio = []
        return_on_assets = []
        solidity = []

        for regndata in self.regndatalist:
            rglist = regndata.get_list()
            org_nr.append(rglist[0])
            year.append(rglist[1])
            liquidity_ratio.append(rglist[2])
            return_on_assets.append(rglist[3])
            solidity.append(rglist[4])

        regn_dict['org_nr'] = org_nr
        regn_dict['year'] = year
        regn_dict['liquidity_ratio'] = liquidity_ratio
        regn_dict['return_on_assets'] = return_on_assets
        regn_dict['solidity'] = solidity

        return pd.DataFrame(regn_dict)