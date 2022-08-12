# sommercamp_2022
Dette repositoriet inneholder en frontend og en backend-del av Bærekraftsportal, et prosjekt av sommercamperne 2022. 

Backend-mappen inneholder kode for å sette opp og fylle en database med bærekraftsdata i oppdrettsnæringen, samt å eksponere dataen i databasen gjennom et REST api. Å kjøre koden forutsetter at man har en bruker på barentswatch og setter brukernavnet og passordet ditt som environment variables slik at scriptet kan hente ut informasjon fra APIet deres. Det forutsetter også at du har satt opp en bruker i Docker og PGadmin og eksporterer brukernavn og passord til dette. 
Man må også skrive 
export FLASK_APP=flask_test
slik at flask vet hvilken fil den skal kjøre når vi eksponerer databasen. 
For å kjøre backend trenger man først å kjøre main_app.py, som oppretter og fyller databasen. Deretter kan man kjøre kommandoen
flask run
og så er endepunktene tilgjengelig for frontend. 

Frontend-mappen inneholder alt som lager nettsiden. Koden er skrevet i rammeverket React. For å kjøre frontend navigerer man fra Frontend>portal>src, og inne i src mappen skriver man
npm start
i terminalen. 
Deretter vil du antakelig få beskjed om at du mangler å installere noe, så du må lese feilmeldingen og finne ut hva som skal installeres. 
Om du nå skriver npm start får du forhåpentlig kjørt nettsiden, som skal vise bærekraftsdata om oppdrettsnæringen dersom flask også kjører samtidig:-) 

