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
Tratar los datos en el servidor - crear un servidor simple para aprovechar la potencia de cálculo y buscar la probabilidad de cachear datos.
Opción 2:
Tratar los datos en el cliente. (HECHO)

Inconveniente:
No tengo permisos a la fuente de datos. Voy a crear un backend que sirva los 3 json guiándome de la estructura explicada en el pdf con el fin de emular un servicio parecido. (PREPARADO PERO NO SE HA PODIDO PROBAR)
```
#### 2. Crear el html para pintar los datos

### Demo
```
Dentro de la carpeta "ejercicio 2" abrir un terminal:
- "yarn install" o "npm install"
- "yarn start" o "npm start"
```