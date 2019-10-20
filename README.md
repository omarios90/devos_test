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
