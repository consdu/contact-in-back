# Contact-in API

This is the web api for the Contact-In app.

The application is structured as follows:

- A server made with Express.js
- MongoDB for data persistance

The API includes authorization, in order to access the protected routes you need to login with valid credentials and send your token on each request.

## API Reference

### Check if server is up

```http
  GET /
```

Response: 🏓 Pong

### Login

```http
  POST /user/login
```

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `username` | `string` | **Required**. Your username |
| `password` | `string` | **Required**. Your password |

Response: Wrong credentials or a Json Web Token

### Get all Contacts

```http
  GET /contacts
```

| Header          | Type     | Description                  |
| :-------------- | :------- | :--------------------------- |
| `Authorization` | `string` | **Required**. Your JWT token |

Response: A collection of contacts

### Delete contact

```http
  DELETE /contacts/${id}
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `string` | **Required**. Id of contact to delete |

Response: Error or Success message
