import requests
from bs4 import BeautifulSoup

html = requests.get("http://www.community-music.info/groups.html").content
soup = BeautifulSoup(html, 'html.parser')

BAND_INFO_TABLE = 3
FIRST_ROW = 1 

# Get every <table> element
def getTables():
	return soup.find_all('table')
	
# Get every <tr> in the given <table> element
def getRows(tables):
	rows = tables[BAND_INFO_TABLE].find_all('tr')

# Get the band name cell from the passed in row
def getBandName(row):
	return None

# Get the city cell from the passed in row
def getCity(row):
	return None

# Get the contact cell from the passed in row
def getContact(row):
	return None

# Get the state and country cell from the passed in contact cell
def getStateAndCountry(cell):
	return None

# Get homepage cell from the passed in contact cell
def getHomePage(cell):
	return None

# Columns/individual cells
# cells = []
# for row in range(FIRST_ROW, len(rows)):
# 	cells.append(rows[row].find_all('td', limit=1))

tables = getTables()
rows = getRows(tables)
print rows[1]
