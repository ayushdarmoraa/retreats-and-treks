import re
f = r'C:\Users\darmo\chakrata-retreats\app\HomeClient.tsx'
with open(f, 'r', encoding='utf-8') as fp:
    content = fp.read()

before = len(re.findall(r'<style', content))
cleaned = re.sub(r'  <style>\{\`[\s\S]*?\`\}</style>', '', content)
after = len(re.findall(r'<style', cleaned))

with open(f, 'w', encoding='utf-8') as fp:
    fp.write(cleaned)
    
print(f'Removed {before - after} style blocks')
