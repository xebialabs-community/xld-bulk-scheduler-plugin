import datetime
def writeLog(text):
	logfile = open("/Users/droberts/temp/logfile-" + str(datetime.datetime.date(datetime.datetime.now())) + ".txt","a")
	logfile.write(text + "\n")
	logfile.close()

writeLog("Executing bulkScheduler/getApplications.py at " + str(datetime.datetime.now()) + "\n")

result = []
apps = repositoryService.query(Type.valueOf("udm.Application"),None,None,None,None,None,1,-1)
for app in apps:
	result.append(app.id)

response.entity = result
