/*
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
 * FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.
 */

function loadAppDropdown() {
	$.ajax({
		datatype: "json",
		url: "/api/extension/bulk-scheduler/getApps",
		crossDomain: true,
		beforeSend: function(xhr) {
			var base64 = parent.getAuthToken();
			xhr.setRequestHeader("Authorization", base64);
		},
		success: function(data) {
			var appItems = [];
			$.each(data.entity, function(idx, val) {
							appItems.push("<option>" + val + "</option>")
			});
			$("#apps").empty().append(appItems);
		}
	})
}

function loadDepAppDropdown() {
	$.ajax({
		datatype: "json",
		url: "/api/extension/bulk-scheduler/getDepApps",
		crossDomain: true,
		beforeSend: function(xhr) {
			var base64 = parent.getAuthToken();
			xhr.setRequestHeader("Authorization", base64);
		},
		success: function(data) {
			var depappItems = [];
			$.each(data.entity, function(idx, val) {
							depappItems.push("<option>" + val + "</option>")
			});
			$("#depapps").empty().append(depappItems);
		}
	})
}

function loadEnvDropdown() {
	$.ajax({
		datatype: "json",
		url: "/api/extension/bulk-scheduler/getEnvs",
		crossDomain: true,
		beforeSend: function(xhr) {
			var base64 = parent.getAuthToken();
			xhr.setRequestHeader("Authorization", base64);
		},
		success: function(data) {
			var envItems = [];
			$.each(data.entity, function(idx, val) {
							envItems.push("<option>" + val + "</option>")
			});
			$("#envs").empty().append(envItems);
		}
	})
}

function showSelectedInitial() {
	$("#initialdeployments").append("<tr>"
		+ "<td class='app'>" + $('#apps').find(':selected').val() + "</td>"
		+ "<td class='select-version'><select id='versions'</td>"
		+ "<td>" + $('#envs').find(':selected').val() + "</td>" 
		+ "<td><input type='text' value='yyyy-mm-dd' maxlength='10' size='10'></td>" 
		+ "<td><input type='text' value='HH:MM:SS' maxlength='10' size='10'></td></tr>")
	var $row = $("#initialdeployments").children("tbody").children("tr").last();
	$.ajax({
		datatype: "json",
		url: "/api/extension/bulk-scheduler/getVers?app=" + $row.find(".app").text(),
		crossDomain: true,
		beforeSend: function(xhr) {
			var base64 = parent.getAuthToken();
			xhr.setRequestHeader("Authorization", base64);
		},
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
		+ "<td>" + $('#depapps').find(':selected').val() + "</td>"
		+ "<td><input type='text' value='yyyy-mm-dd' maxlength='10' size='10'></td>"
		+ "<td><input type='text' value='HH:MM:SS' maxlength='10' size='10'></td></tr>");
	var $row = $("#updatedeployments").children("tbody").children("tr").last();
	$.ajax({
		datatype: "json",
		url: "/api/extension/bulk-scheduler/getVers?app=" + $row.find(".app").text(),
		crossDomain: true,
		beforeSend: function(xhr) {
			var base64 = parent.getAuthToken();
			xhr.setRequestHeader("Authorization", base64);
		},
		success: function(data) {
			var verItems = [];
			$.each(data.entity, function(idx, val) {
							verItems.push("<option>" + val + "</option>")
			});
			$row.find("select").empty().append(verItems);
		}
	})
}

function scheduleAllDeployments() {
	alert("All deployments have been scheduled");
}

function clearBulkScheduler() {
	$("#initialdeployments").children("tbody").empty();
	$("#updatedeployments").children("tbody").empty();
}
