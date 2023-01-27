let randomfact = "https://rest.blackhistoryapi.io/fact/random";
let templatepeoples = "https://rest.blackhistoryapi.io/template/people";
let templatetags = "https://rest.blackhistoryapi.io/template/people";

async function request(url) {
	try {
		var response = await fetch(url, {
			method: "GET",
			headers: {
				"x-api-key": "YXJzaGF0aG00U3VuIEphbiAwMSAyMD",
				"Content-Type": "application/json",
			},
		});

		var res = await response.json();
		return res;
		// console.log(res);
	} catch (error) {
		console.log("Error : " + error);
	}
}

async function randomSearch() {
	let dataEntry = document.querySelector(".response-data");
	if (dataEntry.innerHTML) {
		dataEntry.innerHTML = "";
	}
	for (let i = 0; i < 10; i++) {
		let res = await request(randomfact);
		res.Results.map(results => {
			let onloadOrderedlist = document.createElement("ul");
			onloadOrderedlist.setAttribute("class", "Data-list");
			let tagsData = [];
			results.tags.map(e => {
				tagsData.push(e);
			});
			onloadOrderedlist.innerHTML = `
		<li>
		Name : <span class='data-list'> ${results.people[0]} </span><br>
		Link : <span class='data-list'><a href='${results.source}' target='_blank'> ${results.source}</a> </span><br>
		Tags : <span class='data-list'>${tagsData}</span><br>
		Details : <span class='data-list'>${results.text}</span><br>
		</li> 
		`;
			dataEntry.append(onloadOrderedlist);
		});
	}
}

async function search() {
	let tag = "";
	let peopleName = "";

	let getElement = document.querySelector(".input-search-box").value;
	console.log(getElement);
	peopleName = getElement;
	console.log(peopleName);
	let searchUniqueData = `https://rest.blackhistoryapi.io/fact?tags=${tag}&people=${peopleName}`;
	if (getElement != "") {
		res = await request(searchUniqueData);

		if (res.TotalResults != 0) {
			document.querySelector(".response-data").innerHTML = "";
			res.Results.map(results => {
				let dataEntry = document.querySelector(".response-data");
				let onloadOrderedlist = document.createElement("ul");
				onloadOrderedlist.setAttribute("class", "Data-list");
				let tagsData = [];
				results.tags.map(e => {
					tagsData.push(e);
				});
				onloadOrderedlist.innerHTML = `
			<li>
			Name : <span class='data-list'> ${results.people[0]} </span><br>
			Link : <span class='data-list'><a href='${results.source}' target='_blank'> ${results.source}</a> </span><br>
			Tags : <span class='data-list'>${tagsData}</span><br>
			Details : <span class='data-list'>${results.text}</span><br>
			</li> 
			`;
				dataEntry.append(onloadOrderedlist);
			});
		} else alert("Not Found");
	} else {
		alert("Enter data");
	}
}
