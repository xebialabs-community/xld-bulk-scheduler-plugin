#
# THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
# FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.
#

result = []
vers = repositoryService.query(Type.valueOf("udm.DeploymentPackage"),request.query['app'],None,None,None,None,1,-1)
for ver in vers:
	result.append(ver.id.split('/')[-1])

response.entity = result
