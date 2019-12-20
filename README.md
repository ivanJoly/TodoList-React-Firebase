# React-Firebase Auth

Aplicacion reutilizable para autenticacion de usuarios con react y fireabse como backend.

## Installation


```bash
npm install
```

## Usage

Luego de instarlo se debe crear un archivo de credenciales de firebase para tener una correcta conexion con el backend.

El archivo debe estar en la carpeta "/src/config/firebase.js"


```js

const config ={
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

export default config;
```

El archivo tiene que ser igual a este formato, pero con los datos de tus crendenciales de Firebase.

Luego ejecutar la accion de create-react-app y utilizarla como uno desee.

```bash
npm start
```

## License
[MIT](https://choosealicense.com/licenses/mit/)