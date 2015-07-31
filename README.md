# xld-bulk-scheduler-plugin v4.5.0

This plugin uses the XL Deploy UI extension mechanism to provide a panel that allows the user to schedule multiple deployments in a single action.

On the Bulk-Schedule panel, begin by refreshing the Applications, Environments, and Deployed Applications dropdowns.

Use the dropdowns to select an application and an environment for an initial deployment, or an application and a deployed application for an update deployment.

Press the corresponding button to add the deployment to the appropriate table.  Once the deployment is in the table, select the application version and enter the date and time (UTC) for scheduling the deployment.

Continue adding initial and update deployments to the table, then press the Schedule All Deployments button. Each deployment may require a few seconds of processing, after which a task id will appear in the table.  Once the task id appears, the task is scheduled within XL Deploy.

Errors will be indicated by JavaScript popups.  Processing will stop upon an error, leaving any as-yet unscheduled deployments to be resubmitted.

Once the deployment tasks execute, they must be "closed" in order for them to appear within XL Deploy's reporting tab.  Open the task on the Task Monitor and press the Close button.
