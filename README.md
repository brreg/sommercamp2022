# sommercamp_2022
Dette repositoriet inneholder en frontend og en backend-del av Bærekraftsportal, et prosjekt av sommercamperne 2022. 

Backend-mappen inneholder kode for å sette opp og fylle en database med bærekraftsdata i oppdrettsnæringen, samt å eksponere dataen i databasen gjennom et REST api. Å kjøre koden forutsetter flere ting:

1. At man har en bruker på barentswatch og setter brukernavnet og passordet ditt som environment variables slik at scriptet kan hente ut informasjon fra APIet deres. 
Dette gjøres ved å navigerere til Backend-mappen i terminalen, og skrive en slik kommando: \n
export api_user=ditt_brukernavn
export api_password=ditt_passord

2. At du har satt opp en bruker i Docker og PGadmin og eksporterer brukernavn og passord til dette. \n
export database_user=ditt_brukernavn
export database_password=ditt_passord

3. At du får et brukernavn og passord for tilgang til regnskapsregisteret og eksporterer dette også som environment variables.\n
export rapi_user=ditt_brukernavn
export rapi_password=ditt_passord

4. At du har kjørt kommandoen\n
export FLASK_APP=flask_test
slik at flask vet hvilken fil den skal kjøre når vi eksponerer databasen. 

5. Deretter må du kjøre main_app.py, som oppretter tabellene i databasen, og fyller databasen. Dette gjør den ved å hente data fra regnskapsregisteret og Barentswatch, ved å generere noe data, og ved å fylle inn noe fra csv-filer. To av csv-filene som du trenger ligger ikke offentlig på GitHub ettersom de er konstruerte data og vi ikke ønsket at noen skulle tro det var ekte data. Du kan sende en melding til enten Sanna, Jakob, Andrea eller Ingunn for å få disse filene.

6. Nå kan du kjøre kommandoen
flask run
og så er endepunktene tilgjengelig for frontend. 

Frontend-mappen inneholder alt som lager nettsiden. Koden er skrevet i rammeverket React. Per i dag er det Jakob's IP-adresse som ligger inne i URL-en til alle axios-kallene i frontend. Disse må du endre til din egen IP-adresse i koden:-) 
For å kjøre frontend navigerer man fra Frontend>portal>src, og inne i src mappen skriver man
npm start
i terminalen. 
Deretter vil du antakelig få beskjed om at du mangler å installere noe, så du må lese feilmeldingen og finne ut hva som skal installeres. 
Om du nå skriver npm start får du forhåpentlig kjørt nettsiden, som skal vise bærekraftsdata om oppdrettsnæringen dersom flask også kjører samtidig:-) 


