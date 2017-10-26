/*
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
 * FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.
 */

function authorize(xhr) {
    if (parent && parent.getAuthToken) {
        var base64 = parent.getAuthToken();
        xhr.setRequestHeader("Authorization", base64);
    }
}

function loadAppDropdown() {
	$.ajax({
		datatype: "json",
		url: "/api/extension/bulk-scheduler/getApps",
		crossDomain: true,
		beforeSend: authorize,
		success: function(data) {
			var appItems = [];
			$.each(data.entity, function(idx, val) {
							appItems.push("<option>" + val + "</option>")
			});
			appItems.sort();
			$("#apps").empty().append(appItems);
		}
	})
}

function loadDepAppDropdown() {
	$.ajax({
		datatype: "json",
		url: "/api/extension/bulk-scheduler/getDepApps",
		crossDomain: true,
		beforeSend: authorize,
		success: function(data) {
			var depappItems = [];
			$.each(data.entity, function(idx, val) {
							depappItems.push("<option>" + val + "</option>")
			});
			depappItems.sort();
			$("#depapps").empty().append(depappItems);
		}
	})
}

function loadEnvDropdown() {
	$.ajax({
		datatype: "json",
		url: "/api/extension/bulk-scheduler/getEnvs",
		crossDomain: true,
		beforeSend: authorize,
		success: function(data) {
			var envItems = [];
			$.each(data.entity, function(idx, val) {
							envItems.push("<option>" + val + "</option>")
			});
			envItems.sort();
			$("#envs").empty().append(envItems);
		}
	})
}

function showSelectedInitial() {
	$("#initialdeployments").append("<tr>"
		+ "<td class='app'>" + $('#apps').find(':selected').val() + "</td>"
		+ "<td class='select-version'><select id='versions'</td>"
		+ "<td class='env'>" + $('#envs').find(':selected').val() + "</td>" 
		+ "<td><input class='date' type='text' value='yyyy-mm-dd' maxlength='10' size='10'></td>" 
		+ "<td><input class='time' type='text' value='HH:MM:SS' maxlength='10' size='10'></td>"
		+ "<td class='task'></td></tr>");
	var $row = $("#initialdeployments").children("tbody").children("tr").last();
	$.ajax({
		datatype: "json",
		url: "/api/extension/bulk-scheduler/getVers?app=" + $row.find(".app").text(),
		crossDomain: true,
		beforeSend: authorize,
		success: function(data) {
			var verItems = [];
			$.each(data.entity, function(idx, val) {
							verItems.push("<option>" + val + "</option>")
			});
			$row.find("select").empty().append(verItems);
		}
	})
}

function showSelectedUpdate() {
	$("#updatedeployments").append("<tr>"
		+ "<td class='app'>" + $('#apps').find(':selected').val() + "</td>"
		+ "<td><select id='vers'</td>"
		// + "<td><input type='button' value='Get app version' class='get-version'></td>"
		+ "<td class='depapp'>" + $('#depapps').find(':selected').val() + "</td>"
		+ "<td><input class='date' type='text' value='yyyy-mm-dd' maxlength='10' size='10'></td>"
		+ "<td><input class='time' type='text' value='HH:MM:SS' maxlength='10' size='10'></td>"
		+ "<td class='task'></td></tr>");
	var $row = $("#updatedeployments").children("tbody").children("tr").last();
	$.ajax({
		datatype: "json",
		url: "/api/extension/bulk-scheduler/getVers?app=" + $row.find(".app").text(),
		crossDomain: true,
		beforeSend: authorize,
		success: function(data) {
			var verItems = [];
			$.each(data.entity, function(idx, val) {
							verItems.push("<option>" + val + "</option>")
			});
			$row.find("select").empty().append(verItems);
		}
	})
}

// REST API methods for deployments

// Global error variable

globalError = false;

function scheduleAllDeployments() {
	if (!globalError) {
		driverInitialDeployments();
	}
	if (!globalError) {
		driverUpdateDeployments();
	}
	globalError = false;
}

function driverInitialDeployments() {
	$("table#initialdeployments").children("tbody").children("tr").each(
		function() {
			environment = $(this).children("td.env").text();
			version = $(this).children("td.app").text() + "/" + $(this).find(":selected").val();
			deploymentSpec = prepareInitial(environment, version);
			if (!globalError) {
				deploymentSpec = prepareDeployeds(deploymentSpec);
			}
			if (!globalError) {
				deploymentSpec = validateDeployment(deploymentSpec);
			}
			if (!globalError) {
				taskId = deploy(deploymentSpec);
			}
			if (!globalError && taskId.length > 0) {
				scheduleTask(taskId, $(this).find("input.date").val(), $(this).find("input.time").val());
			}
			if (!globalError) {
				$(this).children("td.task").html(taskId);
			}
		});
}

function driverUpdateDeployments() {

	$("table#updatedeployments").children("tbody").children("tr").each(
		function() {
			deployedApplication = $(this).children("td.depapp").text();
			version = $(this).children("td.app").text() + "/" + $(this).find(":selected").val();
			deploymentSpec = prepareUpdate(version, deployedApplication);
			if (!globalError) {
				deploymentSpec = prepareDeployeds(deploymentSpec);
			}
			if (!globalError) {
				deploymentSpec = validateDeployment(deploymentSpec);
			}
			if (!globalError) {
				taskId = deploy(deploymentSpec);
			}
			if (!globalError && taskId.length > 0) {
				scheduleTask(taskId, $(this).find("input.date").val(), $(this).find("input.time").val());
			}
			if (!globalError) {
				$(this).children("td.task").html(taskId);
			}
		});
}

function clearBulkScheduler() {
	$("#initialdeployments").children("tbody").empty();
	$("#updatedeployments").children("tbody").empty();
	globalError = false;
}

function commonError(xhr, status, error) {
	globalError = true;
 	alert("commonError(): " + xhr.responseText);
}

function prepareInitial(env, ver) {
	// console.log("Starting prepareInitial()");
	ds = null;
	$.ajax({
		async: false,
		beforeSend: authorize,
		crossDomain: true,
		data: {
			environment: env,
			version: ver
		},
		dataType: "xml",
		url: "/deployit/deployment/prepare/initial",
		success: function(data) {
			ds = data;
		},
		error: commonError
	});
	// console.log((new XMLSerializer()).serializeToString(ds));
	// console.log("Exiting prepareInitial()");
	return ds;
}

function prepareUpdate(ver, depApp) {
	// console.log("Starting prepareUpdate()");
	ds = null;
	$.ajax({
		async: false,
		beforeSend: authorize,
		crossDomain: true,
		data: {
			version: ver,
			deployedApplication: depApp
		},
		dataType: "xml",
		url: "/deployit/deployment/prepare/update",
		success: function(data) {
			ds = data;	
		},
		error: commonError
	});
	// console.log((new XMLSerializer()).serializeToString(ds));
	// console.log("Exiting prepareUpdate()");
	return ds;
}

function prepareDeployeds(ds) {
	// console.log("Starting prepareDeployeds()");
	$.ajax({
		async: false,
		beforeSend: authorize,
		crossDomain: true,
		data: ds,
		dataType: "xml",
		headers: {"Content-Type": "application/xml"},
		method: "POST",
		processData: false,
		url: "/deployit/deployment/prepare/deployeds",
		success: function(data) {
			ds = data;	
		},
		error: commonError
	});
	// console.log((new XMLSerializer()).serializeToString(ds));
	// console.log("Exiting prepareDeployeds()");
	return ds;
}

function validateDeployment(ds) {
	// console.log("Starting validateDeployment()");
	$.ajax({
		async: false,
		beforeSend: authorize,
		crossDomain: true,
		data: ds,
		dataType: "xml",
		headers: {"Content-Type": "application/xml"},
		method: "POST",
		processData: false,
		url: "/deployit/deployment/validate",
		success: function(data) {
			ds = data;	
		},
		error: commonError
	});
	// console.log((new XMLSerializer()).serializeToString(ds));
	// console.log("Exiting validateDeployment()");
	return ds;
}

function deploy(ds) {
	// console.log("Starting deploy()");
	$.ajax({
		async: false,
		beforeSend: authorize,
		crossDomain: true,
		data: ds,
		dataType: "text",
		headers: {"Content-Type": "application/xml"},
		method: "POST",
		processData: false,
		url: "/deployit/deployment",
		success: function(data) {
			id = data;	
		},
		error: commonError
	});
	// console.log("Task id is " + id);
	// console.log("Exiting deploy()");
	return id;
}

function scheduleTask(id, date, time) {
	// console.log("Startng scheduleTask() " + id);
	datetime = date + "T" + time + ".000-0000";
	$.ajax({
		async: false,
		beforeSend: authorize,
		crossDomain: true,
		headers: {"Content-Type": "application/xml"},
		method: "POST",
		url: "/deployit/task/" + id + "/schedule?time=" + datetime,
		success: function(data) {},
		error: commonError
	});
	// console.log("Exiting scheduleTask() " + taskId);
}

