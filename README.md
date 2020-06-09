PoC outside of Tasy, it is not necessary to create it inside Tasy
There is no restriction about Framework, you can choose that you prefer
No necessity of backend actions

#Case 1 - Render a dynamic layout with drag and drop
##1 - Create a layout with the metadata information below:
```
{layout: [
	{key: "reportname", type: "label", x: 10, y: 10, width: 300},
	{key: "entityname", type: "label", x: 350, y: 10, width: 500},
	{key: "balance", type: "textbox", label: "Balance", mask: "currency", x: 10, y: 80},
	{key: "medications", type: "grid", columns: [
		{key: "medication", label: "Medication", order: 1, width: 400},
		{key: "balance", label: "Balance", order: 2, width: 100}
	]}
]}
```

##2 - Must be possible to change the width and height of the components through the interface (drag and drop).

##3 - Must be possible to save the changed structure, expected output is similar to the step 1.

#Case 2
##1 - With the structure of the case 1, load the data and keep possible to change/save the layout
```{layout: {
	reportname: "Report 1",
	entityname: "Philips Hospital",
	balance: 5000,
	medications: [
		{medication: "AAS", balance: 300},
		{medication: "Aspirine", balance: 100}
	]
}}
```

#To run:
```
npx http-server
```