import json

with open('lighthouse-report.json', 'r') as f:
    data = json.load(f)

cats = data['categories']
print(f"Performance: {int(cats['performance']['score']*100)}")
print(f"Accessibility: {int(cats['accessibility']['score']*100)}")
print(f"SEO: {int(cats['seo']['score']*100)}")
print(f"Best Practices: {int(cats['best-practices']['score']*100)}")

# Get performance metrics
audits = data['audits']
print(f"\nMain-thread work: {audits['main-thread-work-breakdown']['numericValue']/1000:.2f}s")
print(f"Largest Contentful Paint: {audits['largest-contentful-paint']['numericValue']/1000:.2f}s")
print(f"Total Blocking Time: {audits['total-blocking-time']['numericValue']:.0f}ms")
