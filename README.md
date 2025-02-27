# TangoCast

make sure not to commit backend data

when developing a feature pls create branch

## Setup

Make sure you have python, nodejs, and postgres install in your computer.

Create a virtual environment via `python -m venv env` and activate.
Install python requirements via `pip install -r requirements.txt`.
Install npm requirements by navigating to frontend folder and running `npm i`.

Create a .env file by copying .env.example
Create a secret key by running `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'`
