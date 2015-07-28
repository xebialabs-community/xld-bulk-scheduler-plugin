import datetime
def writeLog(text):
	logfile = open("/Users/droberts/temp/logfile-" + str(datetime.datetime.date(datetime.datetime.now())) + ".txt","a")
	logfile.write(text + "\n")
	logfile.close()

writeLog("Executing bulkScheduler/getDeployedApplications.py at " + str(datetime.datetime.now()) + "\n")

result = []
depapps = repositoryService.query(Type.valueOf("udm.DeployedApplication"),None,None,None,None,None,1,-1)
for depapp in depapps:
	result.append(depapp.id)

response.entity = result
