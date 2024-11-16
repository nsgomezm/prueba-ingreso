
# Prueba de ingreso | Linktic

Desarrollar el frontend que gestione productos y pedidos, enfocándose en la funcionalidad de la interfaz de usuario, el manejo de datos simulados, y la reutilización de componentes. No habrá interacción con un backend real, pero se espera que simules los datos. 

## 1. Manejo de información

Como plus, la información será guardada en [firebase](https://firebase.google.com/) para tener una base de datos no relacional. Se eligió esta opción por agilidad al proceso de desarrollar el proyecto. 

## 2. Manejo de estado y consumo de datos 

El manejo de estados esta desarrollado en [Pinia](https://pinia.vuejs.org/). El consumo de datos sera tipo API con axios ya que se está usando firebase
 
## 3. Reutilización de componentes

Se usaron diferentes librerias para el UI además de generar diferentes componentes que se usan n veces en todo el proyecto

## 4. Estilo y diseño 

- Se obtó por desarrollar con [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) en su versión SASS para mayor personalización. 

- Se obtó por usar [SweetAlert](https://sweetalert.js.org/) para la personalización de las alertas

- Se obtó por usar  [simplebar](https://grsmto.github.io/simplebar/) para la personalización y animación del scrollbar

- Se obtó por usar [Formkit](https://formkit.com/) en su versión gratuita para la validación y animación de los formularios y formato de fechas y precios. 

## 5. Despligue de la aplicación 

El despligue se realizo en [vercel](https://vercel.com/) con [Hithub Actions](https://docs.github.com/es/actions) para el autodeploy. 

## 6. Contenerización con docker

El desarrollo local se realizo y construlló con docker

## Autenticación 

Al usar Firebase se usó la autenticación (correo, contraseña) de Firebase.

## Entregas continuas CI/CD

Al momento de configurar Vercel con Github Actions quedo implementado la funcionalidad del autodeploy. Lo que garantiza que al momento de realziar un commit o PR a master se ejecuten los comandos o configuraciones necesarias para llevar los cambios a producción.


## Tecnologias usadas

- Se usó [Vue.js](https://vuejs.org/) para realizar todo el frontend
- Se usó [firebase](https://firebase.google.com/) para el manejo de la BD

Como plus se realizaron las configuraciones para el proyecto fuera SPA y PWA. Brindando la mejor experiencia proxible

---



## Gama de colores

Se usaron los colores base de bootstrap agregando el color principal de [Linktic](https://linktic.com/)



| Variable SASS  | Variable CSS / HTML | Hex| 
| ----------------- | -------- |--- | 
| $primary | var(--bs-primary)  | #006aff | 


## Link del proyecto

https://linktic-prueba-ingreso.vercel.app/


## Features

- Responsive
- SPA
- PWA
- Autenticación funcional con firebase


