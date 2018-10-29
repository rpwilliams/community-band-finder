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

# Of the rows remaining, find one with a <script> tag.
def findJavaScriptString(row):
	while(row != None):
		emailScript = str(nextElement(row))
		if(row != None):
			row = nextElement(row)

		# If we have found the script tag, stop searching
		if(emailScript.find("script") != -1):
			return emailScript
	return "" # Not found

# Use regular expression to find an email from a script tag
# Format is (example): <script>var n = "rpwilliams96" 
# var d = "gmail.com"</script>
def getEmailFromJavascriptString(emailScript):
	email = ""
	if(emailScript):
		# Get the first half of the email (e.g. rpwilliams)
		regexName = re.compile(r'var n ="(.+?)"')
		nameResult = regexName.findall(emailScript)
		if nameResult:
			nameResult[0] = fixEmailNameTypos(nameResult[0])
			email += nameResult[0]
		# If nameResult was empty, the whole email will be empty
		else:
			return email

		email += "@"

		# Get the email domain (e.g. gmail.com)
		regexDomain = re.compile(r'var d = "(.+?)"')
		domainResult = regexDomain.findall(emailScript)
		if domainResult:
			email += domainResult[0]
	
	return email

# Fix the emails that were entered with a : at the beginning
# @param name: the blank in ____@email.com
def fixEmailNameTypos(name):
	if(name[0] == ':'):
		return name.replace(":", "")
	else:
		return name # The name had no typos

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

	# Ignore the address, and
	# and find the script tag that contains the email
	emailScript = findJavaScriptString(row)
	# Get an email from the javascript string we found
	email = getEmailFromJavascriptString(emailScript)
	
	data['email'] = email

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
