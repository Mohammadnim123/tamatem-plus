# tamatem-plus
# How To Run

### Backend
** You should have python on your system**
1. open _tamatem-plus-backend_ directory in separate terminal.
1. in your terminal run this command `python3 -m venv venv && source ./venv/bin/activate` to run and activate python virtual environment.
1. `cp .env.example .env`
1. in your terminal run this command `pip install -r requirements.txt` to install all required packages.
1. `python manage.py makemigrations` then `python manage.py migrate`. to create DB tables.
1. `python manage.py seeding_data` to get the initial data with super user which is {email:admin@example.com, password:Mohammad.123}.
1. `python manage.py runserver` to run the server.

### Frontend
** You should have nodejs on your system**

1. open _tamatem-plus-frontend_ directory in separate terminal.
1. `cp .env.example .env` please check the PORT.
1. `npm i` to install all required packages.
1. `npm start` to run the server.

# Why SQLite

1. default DB with django.
1. simple project.
1. without any installation so you can start directly.

# Why Django REST Framework

1. I am familiar with it.
1. built on top of django so big functionality and tools exists.
1. provide greats ORM.
1. prepared user model with superuser feature.
1. provide prepared dashboard to add admins to our website and manipulate all models.