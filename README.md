# Ejercicio 2

http://s3.amazonaws.com/logtrust-static/test/test/data1.json
Serie 1:
{"d":1435708800000,"cat":"Cat 1","value":832.803815816826}

http://s3.amazonaws.com/logtrust-static/test/test/data2.json
Serie 2:
{"myDate":"2015-06-02","categ":"CAT 1","val":46.300059172697175} 

http://s3.amazonaws.com/logtrust-static/test/test/data3.json
Serie 3:
{"raw":"9OHbc9 O1 WHTxiBPa auwZIVD6 j8jMWWVH UdB6hy 2015-06-18 XF
5xhcx15DD sbYFRPn dyoH1OOIF 6meHw pANknwa2h T imhs24gR5 #cat
1#","val":39.38690127513058}

## Resolución

### Planteamiento 1

#### 1. Normalizar los datos
```
Opción 1:
Tratar los datos en el servidor - crear un servidor simple para aprovechar la potencia de cálculo y buscar la probabilidad de cachear datos.
Opción 2:
Tratar los datos en el cliente.

Inconveniente:
No tengo permisos a la fuente de datos. Voy a crear un backend que sirva los 3 json guiándome de la estructura explicada en el pdf con el fin de emular un servicio parecido.
```
#### 2. Crear el html para pintar los datos