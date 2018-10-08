import requests, json, re
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
	for a in row.find_all('a', href=True):
		return a['href']


# Gets the next HTML element.
# No other function that takes in a row should
# be called in a function that calls this function.
def nextElement(row):
	return row.next.next

# Returns a JSON object that contains the
# band name, city, state, country, and contact name
def getTRData(row):
	# This is the object that will be returned
	data = {} 

	bandName = nextElement(row)
	row = nextElement(row)
	data['bandName'] = bandName

	city = nextElement(row)
	row = nextElement(row)
	data['city'] = city

	stateAndCountry = nextElement(row)
	row = nextElement(row)
	arr = stateAndCountry.split(" ")

	state = ""
	if(len(arr) == 1):
		country = arr[0]
	else:
		# Special case for the ordering with USA
		if(arr[1] == "USA"):
			state = arr[0]
			country = arr[1]
		else:
			state = arr[1]
			country = arr[0]
	data['state'] = state
	data['country'] = country

	contactName = nextElement(row)
	row = nextElement(row)

	# If there is no contact name, we are already on the 
	# email, in which case this should be skipped
	if(contactName.find("script") != -1):
		data['contactName'] = ''
	else:
		data['contactName'] = contactName


	# If there is an address (of arbritary number of lines),
	# Search for the email
	while(row != None):
		emailScript = str(nextElement(row))

		if(row != None):
			row = nextElement(row)

		if(emailScript.find("script") != -1):
			break
	#print emailScript

	email = ""
	if(emailScript.find("script") != -1):
		regexName = re.compile(r'var n ="(.+?)"')
		nameResult = regexName.findall(emailScript)[0]
		if nameResult:
			email += nameResult

		email += "@"

		regexDomain = re.compile(r'var d = "(.+?)"')
		domainResult = regexDomain.findall(emailScript)[0]
		if domainResult:
			email += domainResult
	
	print email
	

	return data

def getAllData(row):
	data = getTRData(row)
	data['homepage'] = getHomePage(row)
	# data['email'] = getEmail()
	return data

def generateObjArr(rows):
	data = []
	for i in range(FIRST_ROW, len(rows)):
		data.append(getAllData(rows[i]))
	return data

tables = getTables()
rows = getRows(tables[BAND_INFO_TABLE])
obj = generateObjArr(rows)

