# Importing necessary libraries
import uvicorn
import pickle
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initializing the fast API server
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Loading up the trained model
model = pickle.load(open('../predictive/hireable.pkl', 'rb'))
# Defining the model input types
class Candidate(BaseModel):
    gender: int
    bachelors: float
    workex: int
    test: float
    masters: float

# Setting up the home route
@app.get("/")
def read_root():
    return {"data": "This is a machine learning employee hireability prediction model"}

# Setting up the prediction route
@app.post("/prediction/")
async def get_predict(data: Candidate):
    sample = [[
        data.gender,
        data.bachelors,
        data.workex,
        data.test,
        data.masters
    ]]

    hired = model.predict(sample).tolist()[0]

    return {
        "data": {
            'prediction': hired,
            'interpretation': 'Candidate will be hired.' if hired == 1 else 'Candidate will not be hired.'
        }
    }

# Configuring the server host and port
if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='0.0.0.0')