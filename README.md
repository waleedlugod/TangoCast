# TangoCast

make sure not to commit backend data

when developing a feature pls create branch

## Setup

1. Make sure you have python, nodejs, and postgres install in your computer.
2. Create a virtual environment via `python -m venv env` and activate.
3. Install python requirements via `pip install -r requirements.txt`.
4. Install npm requirements by navigating to frontend folder and running `npm i`.
5. Create a .env file by copying .env.example
6. Create a secret key by running `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'`

**NOTE:** Try not to change the port from 5432, errors may occur if it is otherwise for some reason. But feel free to change if it works.
**NOTE:** When creating a local user for your database, follow [this workflow](https://stackoverflow.com/a/75876944).
