with open('words.txt','r') as f:
    text = f.read()
    arr = text.splitlines()
    js = open('data.json', 'w')
    w = "{\n"
    for word in arr:
        w += f'"{word}": true,\n'
    w+= "}\n"
    js.write(w)
    f.close()