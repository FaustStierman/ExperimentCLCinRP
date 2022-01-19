"""zet in zelfde folder als .edr resultaat bestanden en run"""
import os

def parseFile(data, fileName):
    
    """
    .edr file To:
        id,geslacht,item,reactietijd,input
        
        Index en voor verschillede data zijn anders voor de drie sets,
        indexen:
            set 1 = data[9 tm 16]
                item = 81
                rt set1 = 68 
                input = 70
            set 2 = data[17 tm 24]
                item = 100
                rt = 87
                input = 89
            set 3 = data[25 tm 32]
                item = 119
                rt = 106
                input = 108
                
            """
    genderMap = {'1': 'M', '2' : 'F', '3': 'NULL', '4':'NULL'}
    inputMap = {'{RIGHT}': 'R','a':'R','{LEFT}':'L', 'd':'L'}
    
    file = open(fileName)
    
    temp = []
    
    for line in file:
        temp.append(line.split(','))

    ID = temp[1][0]
    gender = genderMap[temp[3][20]]
    
    set1 = [[ID, gender, x[81],x[68],inputMap[x[70]]] for x in temp[9:17:]] #ID, gender, item naam, Reactie tijd, Links of recht op toetsen bord 
    set2 = [[ID, gender, x[100],x[87],inputMap[x[89]]] for x in temp[17:25:]]
    set3 = [[ID, gender, x[119],x[106],inputMap[x[108]]] for x in temp[25:33:]]
    
    data = data + set1 + set2 + set3
    
    return data
    
files = os.listdir()
data = []

for f in files:
    if f[-4::] == ".edr":
        data = parseFile(data,f)
        
newFile = open("data1.txt", 'w')
newFile.write('id,gender,item,rt,input\n')
for line in data:

    newFile.write(','.join(line) + '\n')

newFile.close()

