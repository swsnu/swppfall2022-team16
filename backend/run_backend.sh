#!/bin/bash

# backend/run_backend.sh
#!/bin/bash
# TODO: Write automation script for launching BE app
python manage.py makemigrations 
python manage.py migrate
mkdir -p /log # for `uwsgi` logging uwsgi --ini uwsgi/uwsgi.ini
uwsgi --ini uwsgi/uwsgi.ini 
# TODO: Write automation script for launching BE app
