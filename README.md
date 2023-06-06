# Contact-in API

This is the web api for the Contact-In app.

The application is structured as follows:

- A server made with Express.js
- MongoDB for data persistance

The API includes authorization, in order to access the protected routes you need to login with valid credentials and send your token on each request.

## API Reference

### Check if server is up

```text
  GET /
```

Response: 🏓 Pong

### Login

```text
  POST /user/login
```

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `username` | `string` | **Required**. Your username |
| `password` | `string` | **Required**. Your password |

Response: Wrong credentials or a Json Web Token

### Get all Contacts

```text
  GET /contacts
```

| Header          | Type     | Description                  |
| :-------------- | :------- | :--------------------------- |
| `Authorization` | `string` | **Required**. Your JWT token |

Response: A collection of contacts

### Delete contact

```text
  DELETE /contacts/${id}
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `string` | **Required**. Id of contact to delete |

Response: Error or Success message

### Create contact

```text
  POST /contacts
```

| Body      | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `contact` | `object` | **Required**. Contact data |

Response: Created contact or error response
