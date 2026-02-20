# DEV_NEXTJS_TEMPLATE

Template for initialization projects with NextJS, Tailwindcss, sockets and more.

## Table of Contents

- [Getting Started](#getting-started)
    - [Commands](#commands)
- [Main Dependencies](#main-dependencies)
- [Helpers](#helpers)
    - [odbc](#odbc)
        - [Oracle](#oracle)
        - [MySQL](#mysql)
        - [MSSQL](#mssql)
- [Hooks](#hooks)
- [Constants](#constants)
    - [Routes](#routes-for-the-navbar)
    - [Query Keys](#query-keys-for-tanstack-query)
    - [App roles](#app-roles)

## Getting Started 

To get started with this template, follow these steps:

1. In the repo click on the `Use this template` button.
2. Specify a name for your project and click `Create repository from template`.
3. Clone your new repository to your local machine.
4. Open the project in your favorite code editor.
5. Copy and paste the `.env.example` file to `.env.local` and fill in the required values.
6. Start the development server with `npm run dev:next`

> ⚠️ If you need to use `oracle` or `mysql` you will need to manually install the packages for those databases.

### Commands

Here is the list of the mains commands for the project.

```bash
# Development environment
npm run dev:next

# Development environment with turbo enabled
npm run dev:turbo

# Development environment with the sockets enabled
npm run dev

# Build the project with
npm run build

# Deploy the project with pm2
npm run pm2:reload
```

## Main Dependencies

Main packages used in the project.

- [Axios](https://axios-http.com/docs/intro)
- [Tanstack Query](https://tanstack.com/query/latest)
- [Tanstack Table](https://tanstack.com/table/latest)
- [Zod](https://zod.dev/)

### UI Libraries and external components
- [Shadcn](https://ui.shadcn.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

### State managment
- [Zustand](https://zustand-demo.pmnd.rs/)

### Authentication related
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

### Sockets
- [Socket.io](https://socket.io/)

## Helpers

Important information about the `helpers` folder.

### ODBC

The template comes with three odbc integration files for `oracle`, `mysql` and `mssql`.

Here is a list of how to use them.

> ⚠️ Remember to install the packages for the database in case you need to use `mysql` or `oracle`

### Oracle

Set the environment variables for the database and the connection string, in your `.env.local` file.

```bash
ORA_USERNAME = ""
ORA_PASSWORD = ""
ORA_HOSTIPID = ""
ORA_CLIENT = ""
```

- Query without parameters

```js
const data = await oracle("SELECT * FROM users")
```

- Query with parameters

```js
const data = await oracle("SELECT * FROM users WHERE id = :id", {id: 1})
```

### MySQL

Set the environment variables for the database and the connection string, in your `.env.local` file.

```bash
DB_USERNAME=""
DB_PASSWORD=""
DB_SCHEMANM=""
DB_HOSTIPID=""
DB_PORT=""
```

- Query without parameters

```js
const data = await mysql("SELECT * FROM users")
```

- Query with parameters

```js
const data = await mysql("SELECT * FROM users WHERE user = ? and name = ?", [
			params1,
			param2,
		])
```

### MSSQL

Set the environment variables for the database and the connection string, in your `.env.local` file.

```bash
MSSQL_USER="YOUR_USER"
MSSQL_PWD="YOUR_PASSWORD"
MSSQL_DB_NAME="DB_NAME"
MSSQL_HOST="DB_HOST" # Example 127.0.0.1
MSSQL_PORT=PORT # Example 1111
```

### Usage example

- Query without parameters
```js
const data = await sqlserver(`SELECT * FROM users`)
```

- Query with parameters
```js
const data = await sqlserver(`SELECT * FROM users WHERE id = @id`, {id: 1})
```

- Return all, not only the recordSet

By default only the recordset is returned from the promise of `sqlserver` function.

```js
const data = await sqlserver(`SELECT * FROM users WHERE id = @id`, {id: 1}, false)
```

## Hooks

List of the most important hooks used in the project.

### `useCombobox`

Hook for dealing with the combobox component.

#### Usage example

```js

const combobox = useCombobox()

return (
    <Combobox
        comboboxSet={combobox}
    />
)
```

### `useDialog`

Hook for working with dialogs. Returns the next props

```js
{
    // React useState
    show,
    setShow,
    // Methods
    toggle,
    on,
    off
}
```

|Methods|Description|
|-------|-----------|
|toggle|Alter the state of the `show` prop|
|on|Set `show` on true|
|off|Set `show` on false|

#### Usage example

```js

const openSetUsingBasic = useDialog()

return (
    <DialogBasic
        openSet={openSetUsingBasic}
        onOpen={() => {
            alert('onOpen')
        }}
        onClose={() => {
            alert('onClose')
        }}
        actionText={'Action'}
        title={'TITLE'}
        showActions={true}
        showCancelButton={true}>
        <div>Content</div>
    </DialogBasic>
)
```

### `useSocketEvent`

Hook to work with the sockets.

> Remember to start the project with `npm run dev`

### Usage example

```js
// Use the hook
const {emit, isConnected, socket} = useSocketEvent('hello', (data) => {
    console.log('Hello', data)
})

// example of emit the event
const handleSend = () => {
    emit({name: user.name, msg: msgText})
}
```

## Constants

### Routes for the navbar

Use the `routes.js` file to define the routes for the navbar.

### Query Keys for tanstack query

Use the `queryKeys.js` file to define the query keys for the tanstack query.

### App roles

Use the `roles.js` file to define the roles for the application, to quick access the roles
from js.