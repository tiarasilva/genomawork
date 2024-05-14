0. Tener corriendo el entorno
   source env/bin/activate

1. Solo si se realizo un cambio en los modelos se debe correr:
   python3 manage.py makemigrations

2. Correr las migraciones
   python3 manage.py migrate

3. Correr el servidor
   python3 manage.py runserver
