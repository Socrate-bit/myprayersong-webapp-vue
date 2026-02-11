import re
import random
from datetime import datetime, timedelta

def random_date(start_date, end_date):
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + timedelta(days=random_number_of_days)
    return random_date

start_date = datetime(2025, 9, 1)
end_date = datetime(2026, 2, 4)

with open('/Users/_macwindu/Dev/singer copy/src/views/ReviewsPage/testimony.ts', 'r') as file:
    content = file.read()

# Make sure review interface includes the date field
if "date?: string" not in content:
    content = content.replace("  mediaUrl?: string", "  mediaUrl?: string\n  date?: string")

def replace_review_block(match):
    block = match.group(0)
    # Check if date already exists
    if "date:" in block:
        return block
    
    # Generate random date
    r_date = random_date(start_date, end_date)
    # Format: "dd/mm/yyyy"
    date_str = r_date.strftime("%d/%m/%Y")
    
    # Insert date after id
    return re.sub(r'(id: \d+,)', f'\1\n    date: "{date_str}",', block)

# Regex to find review objects inside the array
# This assumes a somewhat standard format as seen in the file
# Looking for { ... } blocks inside the array
new_content = re.sub(r'\{(?:[^{}]*)\}', replace_review_block, content)

with open('/Users/_macwindu/Dev/singer copy/src/views/ReviewsPage/testimony.ts', 'w') as file:
    file.write(new_content)
