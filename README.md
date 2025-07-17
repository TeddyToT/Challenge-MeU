
# Challenge-MeU

## 1. For Docker installation
Ensure you have installed:

- [Docker desktop](https://www.docker.com/products/docker-desktop//) for Windows
- [Linux or Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

### Build and run the app container
```bash
docker-compose up --build
```
### Wait a bit then go to API DOCUMENTATION link
[API DOCUMENTAION](http://localhost:8000/api-docs/): http://localhost:8000/api-docs/

### Close the app container
```bash
docker-compose down
```



## 2. For developer installation
Ensure you have installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- A running database in PostgreSQL server, use the product.sql in ./src/database

---

### Install Dependencies

```bash
npm install
```

---

### Environment Configuration
Create a `.env` file in the root of your directory with the following variables:

```env
PG_HOST=                    # "db" for docker - "localhost" for dev environment
PG_PORT=
PG_USER=
PG_PASSWORD=
PG_DATABASE=

ACCESS_TOKEN_SECRET=        # JWT access token
REFRESH_TOKEN_SECRET=

NODE_EMAIL=                 # nodemailer email
NODE_EMAIL_PASS=            # password for nodemailer email

```
### Running the Server
- npm start: Run the server.




