This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Pasos:

1. Primero se debe crear una base de datos de PostgreSQL local. Además, se deben actualizar los settings.py con los datos de la BDD:
   ```bash
     CREATE DATABASE genoma_tiara;
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
