# Called via endpoint on bulk-scheduler page load, this script just logs a timestamp to prove that it executed

import datetime
def writeLog(text):
	logfile = open("/Users/droberts/temp/logfile-" + str(datetime.datetime.date(datetime.datetime.now())) + ".txt","a")
	logfile.write(text + "\n")
	logfile.close()

writeLog( "Executing bulkScheduler/test.py at " + str(datetime.datetime.now()) + "\n")

response.entity = ["Hi Dave!"]
