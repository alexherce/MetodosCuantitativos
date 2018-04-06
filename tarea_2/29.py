# Librerías utilizadas: random, math, statistics

import random
import numpy
import math
import statistics

trayectoria = []
trayectorias = []
alta = False
entradasARayosX = 0
dobleEntradaARayosX = 0

def emergencias():
    prob = random.uniform(0, 1)
    depto = "A"
    if prob < 0.7:
        depto = "V"
        if prob < 0.6:
            depto = "O"
            if prob < 0.45:
                depto = "X"
    trayectoria.append(depto)
    return

def rayosX():
    global entradasARayosX
    entradasARayosX += 1
    prob = random.uniform(0, 1)
    depto = "A" # Alta
    if prob < 0.7:
        depto = "V"
        if prob < 0.35:
            depto = "P"
            if prob < 0.1:
                depto = "O"
    trayectoria.append(depto)
    return

def operacion():
    prob = random.uniform(0, 1)
    depto = "A"
    if prob < 0.95:
        depto = "V"
        if prob < 0.25:
            depto = "P"
    trayectoria.append(depto)
    return

def postoperatoria():
    prob = random.uniform(0, 1)
    depto = "A"
    if prob < 0.6:
        depto = "X"
        if prob < 0.55:
            depto = "V"
    trayectoria.append(depto)
    return

def observacion():
    prob = random.uniform(0, 1)
    depto = "A"
    if prob < 0.3:
        depto = "X"
        if prob < 0.15:
            depto = "O"
    trayectoria.append(depto)
    return

for paciente in range(10):

    trayectoria = ["E"]
    alta = False
    entradasARayosX = 0

    while alta == False:

        temp = trayectoria.copy()
        latest = temp.pop()

        if latest == "E":
            emergencias()
        elif latest == "X":
            rayosX()
        elif latest == "O":
            operacion()
        elif latest == "P":
            postoperatoria()
        elif latest == "V":
            observacion()
        elif latest == "A":
            alta = True

    trayectorias.append(trayectoria)
    if entradasARayosX == 2:
        dobleEntradaARayosX += 1

print("Las trayectorias seguidas por los pacientes fueron las siguientes:")
print("E - Emergencias | X - Rayos X | O - Operación | P - Postoperatoria | V - observación | A - Alta")
print("---------------------------")
for paciente in range(10):
    print("p", paciente, ": ", end="", sep="")
    print(*trayectorias[paciente], sep='->')

print("---------------------------")
print("En total,", dobleEntradaARayosX, "paciente(s) entraron a la sala de rayos X exactamente dos veces")
print("Ergo, la probabilidad que un paciente entre dos veces a la sala de rayos X es de", (dobleEntradaARayosX/10)*100, "%")
