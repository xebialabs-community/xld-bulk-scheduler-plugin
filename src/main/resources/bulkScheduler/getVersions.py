import datetime
def writeLog(text):
	logfile = open("/Users/droberts/temp/logfile-" + str(datetime.datetime.date(datetime.datetime.now())) + ".txt","a")
	logfile.write(text + "\n")
	logfile.close()

writeLog("Executing bulkScheduler/getVersions.py at " + str(datetime.datetime.now()) + "\n")
writeLog(request.query['app'])

result = []
vers = repositoryService.query(Type.valueOf("udm.DeploymentPackage"),request.query['app'],None,None,None,None,1,-1)
for ver in vers:
	result.append(ver.id.split('/')[-1])

response.entity = result
