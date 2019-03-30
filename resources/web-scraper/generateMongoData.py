# Scrape and return the data (done in scraper.py) 
from scraper import obj
from pymongo import MongoClient
# Make output look pretty
from pprint import pprint
import os # for env variables

# Establish mongodb connection
url = 'mongodb://' + os.environ['DATABASE_USER'] + ':' + os.environ['DATABASE_PASSWORD']+ '@ds123003.mlab.com:23003/' + os.environ['DATABASE_NAME']
client = MongoClient(url)
db = client[os.environ['DATABASE_NAME']]
collection = db['bands']
db.authenticate(os.environ['DATABASE_USER'], os.environ['DATABASE_PASSWORD'])

# Clear previous collection
collection.drop()

# Update with new collection
length = len(obj)
for x in range(0, length):
	bands = db.bands

	# If the object is valid, insert it. Otherwise, skip it.
	try:
		result = bands.insert_one(obj[x])
	except:
		print("ERROR ADDING COLLECTION {0}".format(x))
		continue
	print('Created {0} of {1} as {2}'.format(x, length, result.inserted_id))

print('Finished creating {0} collections of community bands'.format(length))
#serverStatusResult = db.command('serverStatus')
#pprint(serverStatusResult)