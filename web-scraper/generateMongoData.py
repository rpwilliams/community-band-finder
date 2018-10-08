# Scrape and return the data (done in scraper.py) 
from scraper import obj
from pymongo import MongoClient
# Make output look pretty
from pprint import pprint

# Establish mongodb connection
client = MongoClient('mongodb://pythonuser:mamallama77@ds123003.mlab.com:23003/community-band-finder')
db = client['community-band-finder']
db.authenticate('pythonuser', 'mamallama77')

# Clear previous collection
db.posts.drop()

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