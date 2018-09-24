import requests, json
from bs4 import BeautifulSoup

# Set up
html = requests.get("http://www.community-music.info/groups.html").content
soup = BeautifulSoup(html, 'html.parser')

# Constants
BAND_INFO_TABLE = 3
FIRST_ROW = 1 

# Get every <table> element
def getTables():
	return soup.find_all('table')
	
# Get every <tr> in the given <table> element
def getRows(table):
	return table.find_all('tr')

# Returns the first href found in a row
def getHomePage(row):
	for a in rows[FIRST_ROW].find_all('a', href=True):
		return a['href']

# Gets the next HTML element.
# No other function that takes in a row should
# be called in a function that calls this function.
def nextElement(row):
	return row.next.next

def getData(row):
	bandName = nextElement(row)
	row = nextElement(row)
	print bandName

	city = nextElement(row)
	row = nextElement(row)
	print city

	stateAndCountry = nextElement(row)
	row = nextElement(row)
	arr = stateAndCountry.split(" ")

	state = ""
	if(len(arr) == 1):
		country = arr[0]
	else:
		state = arr[0]
		country = arr[1]

	print state
	print country


	contactName = nextElement(row)
	row = nextElement(row)
	print contactName


	# email = nextElement(row)
	# row = nextElement(row)
	# print email





tables = getTables()
rows = getRows(tables[BAND_INFO_TABLE])


getData(rows[13])
print getHomePage(rows[FIRST_ROW])
# print getBandName(rows[FIRST_ROW])

