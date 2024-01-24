Solución prueba técnica:

Se usa base de datos MongoDB,

Se implementan dos pruebas unitarias con el framework Jest, para su ejecución se requiere del comando: npm test

Se hace el despliegue en Azure app service,

EndPoints de pruebas:

https://pruebas2024.azurewebsites.net 

https://pruebas2024.azurewebsites.net/validate-anomaly 

https://pruebas2024.azurewebsites.net/stats

Nota importante: PUEDE QUE DEMORE O ARROJE UN ERROR AL PRIMER INTENTO DE CONSULTAR LA API, YA QUE, CUENTA CON UN APP SERVICE GRATUITO F1 EL CUAL SIEMPRE ESTÁ APAGADO, HASTA SU PRIMER PETICIÓN, SE RECOMIENDA PRIMERO HACER UN GET A LA URL PRINCIPAL: https://pruebas2024.azurewebsites.net HASTA QUE SE VEA EN PANTALLA UN MENSAJE "Api Rest Online" :
![image](https://github.com/debeniteze/pruebaTecnica/assets/64437681/2dcce05f-ac7f-4654-81ad-7a283961c50a)
