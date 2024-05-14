# genomawork

Pasos:

1. Primero se debe crear una base de datos de PostgreSQL local:

   ```bash
     CREATE DATABASE genoma_tiara;
   ```

   Además, se deben actualizar los `genomawork-backend/genomawork/settings.py` con los datos de la BDD:

   ```bash
   DATABASES = {
    "default": {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'genoma_tiara',
        'USER': '',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '5432',
    }
   }
   ```

2. Se debe iniciar el entorno:
   ```bash
   source env/bin/activate
   ```
3. Luego se deben correr las migraciones con:

   ```bash
   python3 manage.py migrate
   ```

4. Se debe inicial el backend con

   ```bash
    python3 manage.py runserver
   ```

5. Finalmente, se debe correr el frontend:
   ```bash
      yarn dev
   ```
