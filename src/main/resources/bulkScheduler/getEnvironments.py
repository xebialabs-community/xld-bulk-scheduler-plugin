import datetime
def writeLog(text):
	logfile = open("/Users/droberts/temp/logfile-" + str(datetime.datetime.date(datetime.datetime.now())) + ".txt","a")
	logfile.write(text + "\n")
	logfile.close()

writeLog("Executing bulkScheduler/getEnvironments.py at " + str(datetime.datetime.now()) + "\n")

result = []
envs = repositoryService.query(Type.valueOf("udm.Environment"),None,None,None,None,None,1,-1)
for env in envs:
	result.append(env.id)

response.entity = result
