🐳 Starta backend med Docker

Projektet använder en MySQL-databas som körs i en Docker-container.

📦 Steg 1: Installera Docker

Se till att Docker Desktop är installerat:👉 https://www.docker.com/products/docker-desktop/

▶️ Steg 2: Starta MySQL

I projektmappen, kör:

För att starta: docker compose up -d
För att avsluta: docker compose down

Detta startar/avslutar en MySQL-container med följande inställningar:

Databasnamn: tornedalen
Användare: root
Lösenord: secret
Port (lokal): 3307
MySQL-version: 8.0
Init-fil: Init.sql

🧱 Automatisk databasinitiering

När containern startas för första gången körs filen init.sql. Den skapar tabellerna:
contact
discussion

Inget behöver göras manuellt.

🔌 Koppla Spring Boot till databasen

Din application.properties måste matcha följande:

spring.datasource.url=jdbc:mysql://localhost:3307/tornedalen
spring.datasource.username=root
spring.datasource.password=secret
spring.jpa.hibernate.ddl-auto=none

✅ Notera: ddl-auto=none eftersom strukturen skapas av init.sql.

🧪 Verifiera databasen (valfritt)

Du kan inspektera datan med valfritt verktyg, t.ex. DBeaver eller TablePlus:

Host: localhost
Port: 3307
User: root
Password: secret
Database: tornedalen

