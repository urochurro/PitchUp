from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from argon2 import PasswordHasher
from uuid import uuid4
import pandas as pd
from neo4j import GraphDatabase, basic_auth
from fastapi.middleware.cors import CORSMiddleware
import certifi

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "10.0.0.4"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize MongoDB client
client = MongoClient(
    "mongodb+srv://bagsivago:EvfXglJppuQ8nBJV@cluster0.jrx9ztk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    tlsCAFile=certifi.where(),
)
db = client.get_database("login_data")  # Replace "your_database_name" with your database name
collection = db["users"]  # Replace "your_collection_name" with your collection name

# Initialize PasswordHasher
ph = PasswordHasher()

@app.post("/register/")
async def register_user(fullname: str, email: str, password: str, recruiter: bool):
    try:
        # Generate UUID for the user
        uuid = str(uuid4())

        # Encrypt the password
        hashed_password = encrypt_password(password)

        # Create the user document
        user_data = {
            "uuid": uuid,
            "fullname": fullname,
            "email": email,
            "password": hashed_password,
            "recruiter": recruiter
        }

        # Insert user data into the collection
        collection.insert_one(user_data)

        return {"message": "User created successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# @app.post("/login/")
# async def login_user(email: str, password: str):
#     try:
#         # Retrieve user document from the collection based on the email
#         user_data = collection.find_one({"email": email})

#         if user_data:
#             # Verify the password
#             if check_password(user_data["password"], password):
#                 return {"message": "Login successful"}
#             else:
#                 raise HTTPException(status_code=401, detail="Incorrect password")
#         else:
#             raise HTTPException(status_code=404, detail="User not found")

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

@app.post("/login/")
async def login_user(userInfo: dict):
    try:
        # Retrieve user document from the collection based on the email
        user_data = collection.find_one({"email": userInfo['email']})
        # print(user_data)

        if user_data:
            # Verify the password
            if check_password(user_data["password"], userInfo['password']):
                return {"user_id": user_data['uuid'], "recruiter": user_data['recruiter']}
            else:
                raise HTTPException(status_code=401, detail="Incorrect password")
        else:
            raise HTTPException(status_code=404, detail="User not found")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def encrypt_password(password: str) -> str:
    # Hash a password using PasswordHasher
    return ph.hash(password)

def check_password(hashed_password: str, password: str) -> bool:
    # Check hashed password using PasswordHasher
    return ph.verify(hashed_password, password)


# Connect to Neo4j AuraDB
uri = "neo4j+ssc://296844b7.databases.neo4j.io"
username = "neo4j"
password = "O9TMMWdMRQtsC4F4hVCpAQkKlsFwcoGOOqf3BXIEtuU"
driver = GraphDatabase.driver(
    uri, auth=basic_auth("neo4j", "O9TMMWdMRQtsC4F4hVCpAQkKlsFwcoGOOqf3BXIEtuU")
)

# GET /jobs to retrieve a list of all jobs.
@app.get("/allJobs/{user_id}")
def get_all_jobs(user_id: str):
    query = (
        """
        MATCH (recruiter:Recruiter {userId: $user_id})-[:RECRUITING_FOR]->(job:Job)
RETURN job.jobTitle AS jobTitle, job.jobId AS jobId, job.companyName AS companyName
"""
    )


    with driver.session() as session:
        result = session.run(query, user_id=user_id)
    # print('----------------------------------------------------------------------------')
    # print(result.data())
        
        jobs = [{"jobId": record["jobId"], "jobTitle": record["jobTitle"], "companyName": record["companyName"]} for record in result]


    return {"jobs":jobs}


# GET /jobInfo/{job_id} to retrieve a specific job and all information.
@app.get("/jobInfo/{job_id}")
def get_all_jobs(job_id: str):
    job_id = str(job_id)

    query = (
            "MATCH (job:Job {jobId: $job_id})"
            "RETURN job, [(job)-[r]->(related) | [type(r), related]] AS relations"
        )


    with driver.session() as session:
        result = session.run(query, job_id=job_id)
        record = result.single()

    job_node = record['job']
    relations = record['relations']
    job_dict = {}
    # Extract properties of the job node
    for key, value in job_node.items():
        job_dict[key] = value

    for rel_type, related_node in relations:
        rel_type = rel_type.capitalize() # Capitalize the first letter of the relationship type
        if rel_type not in job_dict:
            job_dict[rel_type] = []
        job_dict[rel_type].append(dict(related_node.items()))

    for key1,value1 in job_dict.items():
        if  type(value1)==list and len(value1) == 1:
            job_dict[key1] = value1[0]
        elif type(value1)==list and len(value1) > 1:
            list1 = []
            for item in job_dict[key1]:
                list1.append(item['name'])
                job_dict[key1] = list1


    return job_dict

# DELETE /jobs/{job_id} to delete a job.
@app.delete("/deleteJob/{job_id}")
def delete_job(job_id: str):
    query = (
        "MATCH (job:Job {jobId: $job_id}) "
        "OPTIONAL MATCH (job)-[r]-() "
        "DELETE job, r "
        "WITH DISTINCT job "
        "OPTIONAL MATCH (related)-[r]-() "
        "WHERE NOT EXISTS((related)--()) "
        "DELETE related, r"
    )

    with driver.session() as session:
        session.run(query, job_id=job_id)

    return {"message": "Job deleted successfully"}

# POST /jobs to add a new job.
@app.post("/addJob/")
def create_job(job_dict: dict):
    queries = []
    job_dict['Job Id'] = str(uuid4())
    print( job_dict['Job Id'])
    job_dict = {k: v if v != "" else None for k, v in job_dict.items()}
    # Iterate through each job_dict

    # Create User node if it does not exist
    user_query = f"""
    MERGE (recruiter:Recruiter {{userId: '{job_dict['User Id']}'}})
    """
    queries.append(user_query)

    # Create Job node with given information
    job_query = f"""
    CREATE (job:Job {{
        jobId: '{job_dict['Job Id']}',
        companyName: '{job_dict['Company Name'].replace("'", "")}',
        companySize: '{job_dict['Company Size']}',
        companyWebsite: '{job_dict['Company Website']}',
        jobTitle: '{job_dict['Job Title']}',
        jobDescription: '{job_dict['Job Description']}',
        lowerSalaryRange: {job_dict['Lower Salary Range']},
        upperSalaryRange: {job_dict['Upper Salary Range']},
        responsibilities: '{job_dict['Responsibilities']}',
        mode: '{job_dict['Mode']}'
    }})
    """
    queries.append(job_query)

    # Create relationship between User and Job
    recruiting_for_query = f"""
    MATCH (recruiter:Recruiter {{userId: '{job_dict['User Id']}'}})
    MATCH (job:Job {{jobId: '{job_dict['Job Id']}'}})
    MERGE (recruiter)-[:RECRUITING_FOR]->(job)
    """
    queries.append(recruiting_for_query)

    # Create City node and relationship
    if pd.notna(job_dict['City']) and job_dict['Mode'] != 'Online':
    # city_query = f"""
    #     MERGE (city:City {{name: '{job_dict['City']}', country: '{job_dict['Country']}'}})
    #     """
        job_city_query = f"""
            MERGE (city:City {{name: '{job_dict['City']}', country: '{job_dict['Country']}'}})
            WITH city
            MATCH (job:Job {{jobId: '{job_dict['Job Id']}'}})
            MERGE (job)-[:LOCATED_IN_CITY]->(city)
            """
        queries.append(job_city_query)

    relationName = ['Offers Job Role', 'Requires Experience', 'Requires Qualification', 'Requires Job Type']
    count = 0
    # Create nodes for City, Job role, Experience, Highest Qualification, Job Type, Skills
    for column in ['Job Role', 'Experience', 'Highest Qualification', 'Job Type']:
        if pd.notna(job_dict[column]):
            # node_query = f"""
            #     MERGE (n:{column.replace(' ', '')} {{name: '{job_dict[column]}'}})
            #     """
            job_node_query = f"""
                MERGE (n:{column.replace(' ', '')} {{name: '{job_dict[column]}'}})
                WITH n
                MATCH (job:Job {{jobId: '{job_dict['Job Id']}'}})
                MERGE (job)-[:{relationName[count].replace(' ', '_').upper()}]->(n)
                """
        
            queries.append(job_node_query)
        count = count + 1

    if (job_dict['Skills'].values > 0).any():
        skills = job_dict['Skills']
        # skills = [skill.strip() for skill in job_dict['Skills'].split(',')]
        for skill in skills:
            # skill_query = f"""
            #     MERGE (skill:Skill {{name: '{skill}'}})
            #     """
            job_skill_query = f"""
                MERGE (skill:Skill {{name: '{skill}'}})
                WITH skill
                MATCH (job:Job {{jobId: '{job_dict['Job Id']}'}})
                MERGE (job)-[:REQUIRES_SKILL]->(skill)
                """
            queries.append(job_skill_query)

    # Execute Cypher queries
    with driver.session() as session:
        for query in queries:
            session.run(query)
    return {"message": "Job created successfully"}

@app.put("/editJob/{job_id}")
def edit_job(job_id: str, job_dict: dict):
    queries = []

    # Update Job node with given information
    job_query = f"""
    MATCH (job:Job {{jobId: '{job_id}'}})
    SET job += {{
        companyName: '{job_dict['Company Name'].replace("'", "")}',
        companySize: '{job_dict['Company Size']}',
        companyWebsite: '{job_dict['Company Website']}',
        jobTitle: '{job_dict['Job Title']}',
        jobDescription: '{job_dict['Job Description']}',
        lowerSalaryRange: {job_dict['Lower Salary Range']},
        upperSalaryRange: {job_dict['Upper Salary Range']},
        responsibilities: '{job_dict['Responsibilities']}'
    }}
    """
    queries.append(job_query)

    # Execute Cypher queries
    with driver.session() as session:
        for query in queries:
            session.run(query)

    return {"message": "Job updated successfully"}

@app.post("/addSkill/{job_id}")
def add_skill_to_job(job_id: str, skills: list):

    for skill in skills:
        # Create a new skill node if it doesn't exist already
        create_skill_query = f"""
        MERGE (skill:Skill {{name: '{skill}'}})
        """

        # Establish relationship between job node and skill node
        add_skill_to_job_query = f"""
        MATCH (job:Job {{jobId: '{job_id}'}})
        MERGE (skill:Skill {{name: '{skill}'}})
        MERGE (job)-[:REQUIRES_SKILL]->(skill)
        """

        # Execute Cypher queries
        with driver.session() as session:
            session.run(create_skill_query)
            session.run(add_skill_to_job_query)

    return {"message": f"Skill '{skill}' added to job '{job_id}' successfully"}


@app.get("/getCandidatesByJobRole/{job_id}")
def getCandidatesByJobRole(job_id: str):
    query = """
            MATCH (job:Job {jobId: $job_id})-[:OFFERS_JOB_ROLE]->(:JobRole)<-[:PREFERS_JOB_ROLE]-(candidate:Candidate) RETURN candidate
            """
    with driver.session() as session:
        result = session.run(query, job_id=job_id)
        candidates = [dict(record["candidate"]) for record in result]

    # Ensure that each candidate dictionary contains only the desired properties
    cleaned_candidates = []
    properties_to_include = [
        "birthday",
        "country",
        "lastName",
        "projects",
        "highestQualification",
        "workMode",
        "city",
        "about",
        "workExperience",
        "upperSalaryRange",
        "educationHistory",
        "skills",
        "yearsOfExperience",
        "jobRole",
        "jobType",
        "headline",
        "website",
        "languages",
        "volunteerExperience",
        "certifications",
        "userId",
        "firstName",
        "honorsAwards",
        "lowerSalaryRange",
        "publications",
    ]

    for candidate in candidates:
        cleaned_candidate = {}
        for prop in properties_to_include:
            if isinstance(candidate.get(prop), float) and pd.isna(candidate.get(prop)):
                cleaned_candidate[prop] = None
            else:
                cleaned_candidate[prop] = candidate[prop]
        cleaned_candidates.append(cleaned_candidate)

    if cleaned_candidates:
        return cleaned_candidates
    else:
        raise HTTPException(
            status_code=404, detail="Candidates not found for the specified job role"
        )
