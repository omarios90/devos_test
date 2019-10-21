# Ejercicio 1

Crear una función en python que dada una lista de números indique para cada número si es un número perfecto, abundante o defectivo.   
- Un número perfecto es aquel que es igual a la suma de sus divisores propios positivos, excluyéndose a sí mismo. Por ejemplo 6 = 1+2+3.   
- Un número abundante es aquel que la suma de los divisores propios es mayor que el número.   
- Un número defectivo es aquel que la suma de los divisores propios es menor que el número.

## Resolución

### Planteamiento 1

#### 1. Crear una función para conseguir los divisores.

Optimización 1:   
- Dado un número entero positivo N, pensar como evitar recorrer un bucle de N iteraciones.   
Casos de prueba pequeños: 15, 32, 36, 77.   

Conclusión:   
- Dada la siguiente división *N/n=x* siendo *n=[1,N-1]*, mientras *x>=n* y *x* sea entero, habremos encontrado divisores únicos de *N*.

#### 2. Mejorar la función de divisores.

Optimización 2:   
- El break se puede ahorrar si se frena el bucle hasta la raiz cuadrada del número N.

#### 3. Crear la función que identifique el tipo de un número (perfecto, abundante, defectivo)

- Crear un enumerado con los tipos de números.
- Tipar las funciones para leerlas más rápido.

#### 4. Crear la función que reciba un listado de números e identifique su tipo

### Planteamiento 2 (Nice to have)

#### 1. Crear una función que te devuelva números primos

Se tiene que hacer menos iteraciones si se busca los divisores con los números primos.
Otras mejoras:   
- Persistir el cálculo de los números primos para evitar tener que hacerlo todas las veces.   
Corrección:
- Es mejor tener obtener los divisores primos sin calcular un listado de números primos a priori.   
Conclusión:   
- Esta solución no es óptima porque se tiene que múltiplicar las diferentes subconjuntos de combinaciones de divisores primos.   


# Ejercicio 2

Serie 1:
original: http://s3.amazonaws.com/logtrust-static/test/test/data1.json
mock ui: https://next.json-generator.com/NyIFlgmFD
mock api: https://next.json-generator.com/api/templates/NyIFlgmFD (data.generatedJSON)
```
{"d":1435708800000,"cat":"Cat 1","value":832.803815816826}
```

Serie 2:
original: http://s3.amazonaws.com/logtrust-static/test/test/data2.json
mock ui: https://next.json-generator.com/VkfFWxQtP
mock api: https://next.json-generator.com/api/templates/VkfFWxQtP (data.generatedJSON)
```
{"myDate":"2015-06-02","categ":"CAT 1","val":46.300059172697175} 
```

Serie 3:
original: http://s3.amazonaws.com/logtrust-static/test/test/data3.json
mock ui: https://next.json-generator.com/4ystfemFw
mock api: https://next.json-generator.com/api/templates/4ystfemFw (data.generatedJSON)
```
{"raw":"9OHbc9 O1 WHTxiBPa auwZIVD6 j8jMWWVH UdB6hy 2015-06-18 XF
5xhcx15DD sbYFRPn dyoH1OOIF 6meHw pANknwa2h T imhs24gR5 #cat
1#","val":39.38690127513058}
```

## Resolución

### Planteamiento 1

#### 1. Normalizar los datos
```
Opción 1:
Tratar los datos en el servidor - crear un servidor simple para aprovechar la potencia de cálculo y buscar la probabilidad de cachear datos. (NICE TO HAVE)
Opción 2:
Tratar los datos en el cliente. (HECHO)

Inconveniente:
No tengo permisos a la fuente de datos. Voy a crear un backend que sirva los 3 json guiándome de la estructura explicada en el pdf con el fin de emular un servicio parecido. (PREPARADO PERO NO SE HA PODIDO PROBAR)
```
#### 2. Crear el html para pintar los datos
En la carpeta public/.  

### Solución final
1. Existe un backend en la carpeta "nodejs/" que tiene una api. Los datos que provee la api pueden ser: locales (nodejs/mocks/*.json), de next.json-generator o de aws (los que se han provisto en el enunciado). Si se quiere cambiar a uno de los 3 se necesita cambiar el código - esto se podría haber hecho por cambios de configuración en el package.json pero no era la finalidad de la prueba hacer un backend perfecto. Se hizo este backend para poder trabajar con datos falsos porque las urls de aws devolvían 403.  
Para ejecutarlo seguir estas indicaciones:
```
Dentro de la carpeta "ejercicio 2/nodejs" abrir un terminal:
- "yarn install" o "npm install" (si es la primera vez)
- "yarn start" o "npm start" (para ejecutar el servidor)
```
2. Existe un frontend en la carpeta "public/" que se puede ejecutar de 2 maneras: abriendo /public/index.html en un navegador o ejecutando el backend. En el frontend se intentó hacer código reutilizable y fácil de modificar. Se aplicaron principios SOLID para mejor mantenibilidad y reutilización de código. Se usaron algunas variaciones de patrones de diseño como strategy y factory para aumentar la cohesión y reducir el acomplamiento, aunque ahora mismo, las estrategias están acopladas a la estructura de los datos que se indicaron en el enunciado.   
Hice el código con el objetivo de hacer un framework que gestione las peticiones y tratamiento de datos - posiblemente aplicar patrones para este ejercicio es overkill, pero podéis mirar la versión simple en el git.