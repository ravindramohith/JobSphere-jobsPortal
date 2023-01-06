# This is a Full Stack Application by using Next.Js and Django with PostgreSQL.

## Getting Started:
Server:
```bash 
cd backend/
python manage.py run server
```
Client:
```bash
cd frontend/
```
- First, Install all the required packages:
```bash
npm install
# or
yarn add
```

- Then, run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Overview:
- **Jobbie** is a Jobs portal where users can search their jobs, able to filter based on salary, domain, type of the Job and Qualifications.
- To apply a Job, A user should upload their resume. They can even update their resume over time.
- User can also be able to create a Job which can be view by all other users. He can also view how many candidates applied for the job and their details also, and also he can update or delete Job. He is called ***admin*** of that particular job.
- There is a map under each job which is the location of where the comapany is present.

## Back End(Django):
- Used **PostgreSQL** for storing data.
- Created two applications - Job and Account for managing job and the user respectively.
- Created models such as ***Job, Application, and User.***
- Used **PostGIS** for storing the locations of the jobs.
- Used the **model serializers** for serializing the data of the particular model.
- Used *Function based Views* along with few permissions for specific routes.
- Used **FilterSet** for filtering.
- Used **Simple JWT** for Authentication.
- Integrated with **AWS** for using **S3 bucket** to store the resume pdf files.
- Used some *middlewares* such as error handlers.
###### You can view the postman's documentation of API [here](https://documenter.getpostman.com/view/21503860/2s8Z73yAyV).

## Front End(Next.Js):
- Created all client side **routes/urls** in `pages/` folder.
- Constructed the Basic Layout under `components/layout/` folder.
- Contructed all other components under `components/` folder.
- Used `Next Link` for switching between pages.
- Used **ContextAPI** for ***connecting with backend*** and **Global State Management** of jobs and user authentication.
- Implemented pagination for viewing all the Jobs in a systematic manner.
- Implemented Filters on side bar to filter accordingly.
- Used **leaflet** to view all the maps.
