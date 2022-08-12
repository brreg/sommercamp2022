# sommercamp_2022
Dette kode-repositoriet innholder MVP'en til sommercampen 2022 hos Brønnøysundregistrene og Digitaliseringsdirektoratet. Prosjektet var et tverrfaglig samarbeid mellom 4 IT-studenter, 2 fra juss, 2 med design-bakgrunn og 2 på dataanalyse. Casen var bred og handlet om å utforske hvordan Digitaliseringsdirektoratet og Brønnøysundregisteret kan bidra til det grønne skiftet gjennom å samle og tilgjengeliggjøre allerede innrapporterte data som kan si noe om bærekraft. MVP'en ble en Bærekraftsportal som samler data fra blant annet Regnskapsregisteret og Barentswatch og viser data om virksomheter sett opp mot bransjens gjennomsnitt. 

Dette repositoriet inneholder en frontend og en backend-del av Bærekraftsportalen. Backend består av en postgresql database som administreres i PGAdmin og Docker, hvor vi bruker sqlalchemy til å gjøre spørringer til databasen, og flask for å eksponere informasjonen gjennom et REST API. Frontend benytter React og innhenter data dynamisk fra endepunktene.

Backend-mappen inneholder kode for å sette opp og fylle en database med bærekraftsdata i oppdrettsnæringen, samt å eksponere dataen i databasen gjennom et REST api. Å kjøre koden forutsetter flere ting:

1. At man har en bruker på barentswatch og setter brukernavnet og passordet ditt som environment variables slik at scriptet kan hente ut informasjon fra APIet deres. 
Dette gjøres ved å navigerere til Backend-mappen i terminalen, og skrive en slik kommando:
```
export api_user=ditt_brukernavn
export api_password=ditt_passord
```

2. At du har satt opp en bruker i Docker og PGadmin og eksporterer brukernavn og passord til dette.
```
export database_user=ditt_brukernavn
export database_password=ditt_passord
```

3. At du får et brukernavn og passord for tilgang til regnskapsregisteret og eksporterer dette også som environment variables.
```
export rapi_user=ditt_brukernavn
export rapi_password=ditt_passord
```

4. At du har kjørt kommandoen
```
export FLASK_APP=flask_test
```
slik at flask vet hvilken fil den skal kjøre når vi eksponerer databasen. 

5. Deretter må du kjøre main_app.py, som oppretter tabellene i databasen, og fyller databasen. Dette gjør den ved å hente data fra regnskapsregisteret og Barentswatch, ved å generere noe data, og ved å fylle inn noe fra csv-filer. To av csv-filene som du trenger ligger ikke offentlig på GitHub ettersom de er konstruerte data og vi ikke ønsket at noen skulle tro det var ekte data. Du kan sende en melding til enten Sanna, Jakob, Andrea eller Ingunn for å få disse filene.
```
python3 main_app.py
```

6. Nå kan du kjøre kommandoen
```
flask run
```
og så er endepunktene tilgjengelig for frontend. 

Frontend-mappen inneholder alt som lager nettsiden. Koden er skrevet i rammeverket React. Per i dag er det Jakob's IP-adresse som ligger inne i URL-en til alle axios-kallene i frontend. Disse må du endre til din egen IP-adresse i koden:-) 
For å kjøre frontend navigerer man fra Frontend>portal>src, og inne i src mappen skriver man følgende i terminalen:
```
npm start
```

Deretter vil du antakelig få beskjed om at du mangler å installere noe, så du må lese feilmeldingen og finne ut hva som skal installeres. 
Om du nå skriver npm start får du forhåpentlig kjørt nettsiden, som skal vise bærekraftsdata om oppdrettsnæringen dersom flask også kjører samtidig:-) 


