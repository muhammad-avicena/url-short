[![readme_header](https://github.com/muhammad-avicena/muhammad-avicena/raw/main/Avicena%20Banner.png)](https://avicena.dev/)

<h1 align="center">Fancy to see you here <img src="https://raw.githubusercontent.com/muhammad-avicena/profile/master/wave.gif" width="30px" height="30px" /> </h1>

hi, I'm Muhammad Avicena. In this project, I build The URL Shortner API where you can shortner your long URL into highly customize short link. I've implemented advanced security middleware such as rate-limiter, XSS protection, CSP, etc. Built using Node-Express-TypeScript, Redis, MySQL (Prisma ORM), Jest, Swagger UI Express, Helmet, Docker & AWS Lightsail deployment. This project is intended

I am committed to staying up-to-date with industry trends and using the latest tools to develop innovative solutions that surpass expectations.
Interested to have collaboration ? Find me on:

[![Linkedin Badge](https://img.shields.io/badge/-Muhammad_Avicena-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/muhammad-avicena/)
[![Youtube Badge](https://img.shields.io/badge/-Muhammad_Avicena-darkred?style=flat-square&logo=youtube&logoColor=white)](https://www.youtube.com/@MuhammadAvicena)
[![Instagram Badge](https://img.shields.io/badge/-ryuhideaki.dev-purple?style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/ryuhideaki.dev/)
[![Gmail Badge](https://img.shields.io/badge/-cenarahmant.dev@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white)](mailto:cenarahmant.dev@gmail.com)

## INGREDIENTS I USE 📜

- Node.js
- Express.js
- TypeScript
- Prisma ORM (MySQL Database)
- Helmet for security headers
- Redis for Caching heavy query
- Jest for Unit testing
- Swagger UI for documentation
- Docker
- AWS Lightsail (Private Server Linux) for deployment

## KEY FEATURES 🌟

- url-shorten
  - Create a customize URL Shortner link (maximum 16 characters alias)
  - Update URL Shortner link
  - Get list of All URL Shortner link
  - Get data of URL Shortner link by customAlias
  - Delete URL Shortner link
- Redirect URL Service
  - Get redirection of the original link by custom alias

**Example of URL Short** :

```json
{
  // Create a URL Short
  // Maximum custom alias are 16 characters
  "originalLink": "https://github.com/muhammad-avicena",
  "customAlias": "avicii"
}

{
   // Create a URL Short with null custom alias
  "originalLink": "https://github.com/muhammad-avicena",
  "customAlias": "null",

  // return generated custom alias with maximum 6 characters
  "customAlias": "U3rsiL"
}
```

```bash
  # Redirect Servive

  GET {{base_url}}/r/aviciii
  GET {{base_url}}/r/U3rsiL


  302 -> https://github.com/muhammad-avicena (original link)

  # It will redirect to original link based on data custom alias that have been created

```

## AVAILABLE API 📰

For the demonstration of the API, you can refer to "/api-docs".

**Back-end endpoint:** [https://api-url-shortner.avicena.dev](https://api-url-shortner.avicena.dev).

| Name                                | HTTP Method | Endpoint                                                                  | Requirements                                                                           |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **API Docs**                        | `GET`       | [/api-docs](https://api-url-shortner.avicena.dev/api-docs)                |                                                                                        |
| **Create URL Shortner**             | `POST`      | [/api/v1/url-shortner](https://api-url-shortner.avicena.dev)              | Request Body: `originalUrl: string, customAlias: string`                               |
| **Update URL Shortner by ID**       | `PUT`       | [/api/v1/url-shortner/:ID](https://api-url-shortner.avicena.dev)          | Request Params: `ID: string`, Request Body: `originalUrl: string, customAlias: string` |
| **Get URL Shortner by customAlias** | `GET`       | [/api/v1/url-shortner/:customAlias](https://api-url-shortner.avicena.dev) | Request Params: `customAlias: string`                                                  |
| **List of All URL Shortner**        | `GET`       | [/api/v1/url-shortner](https://api-url-shortner.avicena.dev)              |                                                                                        |
| **Delete Transfer by ID**           | `DELETE`    | [/api/v1/url-shortner/:ID](https://api-url-shortner.avicena.dev)          | Request Params: `ID: string`                                                           |
| **Redirect Service URL Shortner**   | `GET`       | [/r/:customAlias](https://api-url-shortner.avicena.dev/r/aviciii)         | Request Params: `customAlias: string`                                                  |

## How to Run 📑

### Prerequisites:

1. Node.js & pnpm installed on your machine.
2. Git installed on your machine.
3. MySQL installed on your machine.

### Steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/muhammad-avicena/url-short.git
   ```
2. **Navigate to the project:**
   ```bash
   cd url-short
   ```
3. **Install Depedencies:**

   ```bash
   # in this project I use pnpm
   pnpm install
   ```

4. **Modify the .env file, use .env.example for the template**
5. **Create a database based on your .env (if you use migrate, just skip this)**
6. **Generate the database from Prisma (if you use migrate, just skip this)**

   ```bash
   # it will generate database for you
   npx prisma generate
   ```

7. **Sync the @Prisma/client with your MySQL running on your machine (if you use migrate, just skip this)**

   ```bash
   # it will sync and make sure the database are same
   npx prisma db push
   ```

8. **You can modify the database with Prisma Studio, if you don't have GUI to modify your database**

   ```bash
   # it will create a studio where you can play around with it
   npx prisma studio
   ```

## DEPLOYMENT ⚙️

### Docker HUB

### AWS Deployment

The project has been successfully deployed using AWS Lightsail (Private Server Linux). You can access the production version of the API by following this link: [https://api-url-shortner.avicena.dev](https://api-url-shortner.avicena.dev).

Feel free to explore the API and try out the different features. I appreciate any feedback and suggestions to further improve.
