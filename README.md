# TodoApp

_An application for keeping track and managing your daily tasks._

## Development Setup

-   Clone app with git clone

`git clone https://github.com/titopotito/TodoApp`

-   Create virtual environment inside the folder and activate it

`cd TodoApp`

`python -m venv env`

`source env/bin/activate`
or
`source env/Scripts/activate`

-   Install the following packages: django, psycopg2, python-decouple

`pip install django`

`pip install psycopg2`

`pip install python-decouple`

-   Rename .env.example to .env

-   Edit the SECRET_KEY, DEBUG, and DB_PASSWORD variables inside the .env file

`SECRET_KEY=INSERT_YOUR_OWN_SECRET_KEY`

`DEBUG=True` or `DEBUG=False`

`DB_PASSWORD=INSERT_YOUR_OWN_DATABASE_PASSWORD`

-   Run server

`python manage.py runserver`
