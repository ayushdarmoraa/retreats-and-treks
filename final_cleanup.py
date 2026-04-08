#!/usr/bin/env python3
"""
Final comprehensive cleanup to remove all CSS from HomeClient.tsx
"""
import re

filepath = r'C:\Users\darmo\chakrata-retreats\app\HomeClient.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

original_len = len(content)

# Pattern 1: Remove  <style>{` ... `}</style> blocks (template literal style blocks)
# This uses a non-greedy match to handle multiple blocks
pattern1 = r'  <style>\{\`[\s\S]*?\`\}</style>'
content = re.sub(pattern1, '', content)

# Pattern 2: Remove orphaned CSS blocks that are just raw text
# These appear as lines starting with "    ." or "    @" without the <style> wrapper
# Match from the dot/at symbol through closing brace of CSS rules
pattern2 = r'    [\.\@][a-zA-Z\-:()0-9#\s,\{\};\-\.%\'"\=<>]+?(?=\n  (?:[<{]|$))'
content = re.sub(pattern2, '', content, flags=re.MULTILINE | re.DOTALL)

# Pattern 3: Remove any remaining orphaned CSS property lines (lines with ":" and ";")
# that look like CSS properties and are heavily indented
pattern3 = r'^    (?!<|{\/\*|return|const|function|import|export)[a-z\-]+:.*?;$'
content = re.sub(pattern3, '', content, flags=re.MULTILINE)

# Pattern 4: Remove accumulated blank lines (3+ newlines)
pattern4 = r'\n\n\n+'
content = re.sub(pattern4, '\n\n', content)

final_len = len(content)
removed_chars = original_len - final_len

# Write back
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print(f'Cleanup complete!')
print(f'Removed {removed_chars} characters')
print(f'Original: {original_len} chars, Final: {final_len} chars')

# Verify
with open(filepath, 'r') as f:
    content_check = f.read()
    style_count = len(re.findall(r'<style', content_check))
    print(f'Remaining <style> tags: {style_count}')
