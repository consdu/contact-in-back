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

### Search contacts

```text
  GET /contacts/search/?name=*
```

| Query param | Type     | Description                    |
| :---------- | :------- | :----------------------------- |
| `name`      | `string` | **Required**. Minimum a letter |

Response: Collection of contacts matching where name or surname matches includes the pattern

### Get one contact

```text
  GET /contact/id/:contactId
```

| Param       | Type     | Description                            |
| :---------- | :------- | :------------------------------------- |
| `contactId` | `string` | **Required**. Contact's id to retrieve |

Response: A contact whose id matches the param or an error with message 'no contact found'

### Update a contact

```text
  PUT /contact/
```

| Body      | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `contact` | `object` | **Required**. Contact data |

Response: A message confirming the contact was updated
