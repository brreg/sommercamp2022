class Regndata:

    def __init__(self, org_nr, year, liquidity_ratio, return_on_assets, solidity):
        
        self.org_nr = org_nr
        self.year = year
        self.liquidity_ratio = liquidity_ratio
        self.return_on_assets = return_on_assets
        self.solidity = solidity

    def get_list(self):
        return [self.org_nr, self.year, self.liquidity_ratio, self.return_on_assets, self.solidity]
