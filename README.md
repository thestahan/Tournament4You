## Running the API

### Docker

We use PostgreSQL as a database provider. In order to use it on your local machine we recommend using docker. Below are steps to make it up and running:
1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. Run Docker Desktop.
3. In root folder of repo run command `docker-compose up --detach`
4. The DB should be up and visible in Docker Desktop.

### API

Steps to run API:
1. Make sure you have .NET 6.0 installed.
2. Run the following commands on repo root level:
   - `dotnet restore`
   - `dotnet build`
   - `dotnet run --project API`
3. Swagger doc is available at `localhost_address/swagger`


## Project details

### Workflow

There is a yaml file which describes the workflow for the API solution. The solution is built, tests are run, and the sonarcloud runs the quality gate check too.
[The sonarcloud project is here.](https://sonarcloud.io/project/overview?id=thestahan_Tournament4You)
