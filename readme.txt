# For Linux

## To start backend
cd backend/
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py makemigrations joblisting
python3 manage.py migrate


## To start frontend
cd frontend/
npm install
npm run dev