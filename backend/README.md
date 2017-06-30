# Empatica Dummy Backend

### Requirement
- MongoDB
- Python 3
- virtualenv
- flask
- pymongo

### How to Run

- After Cloning this project, inside the *backend* folder, run:

    ``` bash
    virtualenv -p python3 env
    source env/bin/activate
    (env)$ pip install Flask-PyMongo flask_cors requests
    ```

### API Architecture

- ``` GET /api/projects```
    - returns all of the projects
- ``` POST /api/projects```
    - adds project to db
- ``` GET /api/items```
    - returns all of the items
- ``` POST /api/items```
    - adds items to db
- ``` GET /api/item?from_ts={xxx}&to_ts={xxx}```
    - returns all the items in period of time
- ``` GET /api/item/{project}```
    - returns all the items for specific project
- ``` DELETE /api/projects/{project}```
    - for deleting one project
- ``` DELETE /api/projects/{item}```
    - for deleting one item

#### example of response to projects
```json
{
    "result": [
        {"name":"reviso"},{"name":"teamSystem"}
    ]
}
```

#### example of response to items
```json
{
    "result": [
        {"project": "reviso", "start": "1498726173", "end":"1498751373"},
        {"project": "teamSystem", "start": "1498812300", "end":"1498841100"}
    ]
}
```

