from PIL import Image, ImageDraw, ImageFilter, ImageColor

def createItem(naam,bmp,targetkleur,ntargetkleur):
    
    out = Image.new("RGB", (600, 600), (0, 0, 0))
    drawOut = ImageDraw.Draw(out)
    
    drawOut.rectangle([100,400,200,500], fill = ImageColor.getrgb(targetkleur))
    drawOut.rectangle([400,400,500,500], fill = ImageColor.getrgb(ntargetkleur))
    
    if naam[0] != 'c':
        out = out.filter(ImageFilter.GaussianBlur(radius = 20))
    
    ref = Image.open(bmp)
    out.paste(ref, (200, 50))
    
    out.save(naam + '.bmp')

file = open('itemoverzicht.csv')

items = []

for line in file:
    items.append(line.strip('\n').split(','))

for item in items[1::]:
    createItem(item[0], item[1] + '.bmp', item[2] ,item[3])

createItem("voorbeeld1", "vierkant.bmp",'#ff9900', '#00ffff')
createItem("voorbeeld2", "voorbeeldicoon.bmp",'#ff9900', '#00ffff')
createItem("voorbeeld3", "voorbeeldabstract.bmp",'#ff9900', '#00ffff')

