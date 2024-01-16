function loadDatabase(itemCount, searchkey) {

	database.ref('quotes').orderByChild('timestamp').limitToLast(itemCount).on('value', function (snapshot) {
		// Clear existing table rows
		quoteTableBody.innerHTML = '';
		// Generate new table rows in reverse order
		var quotes = [];
		snapshot.forEach(function (childSnapshot) {
			var childData = childSnapshot.val();
			childData.key = childSnapshot.key;

			if (((childData.hasOwnProperty('author') && childData.author.indexOf(searchkey) !== -1) || (childData.hasOwnProperty('quote') && childData.quote.indexOf(searchkey) !== -1) || (childData.hasOwnProperty('title') && childData.title.indexOf(searchkey) !== -1))) {
				quotes.push(childData);
			}
		});

		quotes.reverse(); // Reverse the order of the quotes
		quotes.forEach(function (childData) {

			var rrow = document.createElement('tr')

			//////////////////////////////////////////////////////////


			let divStyle = "";


			if (childData.views == 0) {
				divStyle = "<td style='padding-top: 8px;padding-bottom: 8px;'><div id = 'rdiv' style='background-color: cornsilk; padding:0px; border: solid 1px orangered;'>";
			} else {
				divStyle = "<td style='padding-top: 8px;padding-bottom: 8px;'><div id = 'rdiv' style='background-color: white; padding:0px; border: solid 1px #ccc;'>";
			}


			let myAuthor = "";
			//NEW//

			if ((getTimeString(childData.timestamp)) === "Just now") {
				myAuthor = "<b>" + childData.author + " </b><span class='new-label'><small><small>NEW</small></small></span>";
			} else {
				myAuthor = "<b>" + childData.author + "</b>";
			}

			let myViews = childData.views + " View" + (eval(childData.views) == 1 ? "" : "s");

			let modAuthor = childData.author;
			let myTitle = childData.title;
			let myQuote = "";

			if (childData.quote === "") {
				myQuote = "<img src='" + imageURL + "' alt='Cannot load image 😓' id='load-image' style='width: 100%;'>";
			} else {
				myQuote = "<center><img src='" + childData.quote + "' alt='Cannot load image 😓' id='load-image'  style='max-width: 100%;max-height:400px'  style='display: none;' onload='imageLoaded()'><div class='loading-text' style='display:none'>Loadfddfdffddfdfding...</div></center>";
			}

			let timestamps = (childData.timestamp);

			let myTime = getTimeString(childData.timestamp);

			/////////////////////////////////////////////////////////

			var tableHTML = "<table style = 'margin:7px'>" +
				"<tr>" +
				"<td rowspan='2' style='text-align:center;'><img src='avatar.jpg' alt='Profile Image' width='32' style='border-radius: 50%;'></td>" +
				"<td><span style='color:#ed4c2b;font-size: 18px'>" + myAuthor + "</span></td>" +
				//"<td><span style='color:#ed4c2b;font-size: 18px'>" + myAuthor + "</span></td>" +
				"</tr>" +
				"<tr>" +
				"<td><em style='color:#2c94fb;word-wrap: break-word;font-size: 12px'>" + childData.subtitle + "</em></td>" +
				"</tr>" +
				"</table>";

			//"<td><em style='color:#2c94fb;word-wrap: break-word;font-size: 12px'>" + myTitle + "</em></td>" +


			rrow.innerHTML =
				divStyle + tableHTML + myQuote +
				"<span style='color:#808080; font-size: 14px;'><hr>&nbsp;&nbsp;" + myTime +
				"</span><br><span style='color:#008ba3; font-size: 14px;'>&nbsp;&nbsp;" + myViews + "</span><br><div style='height:10'></div></td>";

			/////////////////////////////////////////////////////////

			quoteTableBody.appendChild(rrow);

			// Add event listener to delete quote on row click
			// Add event listener to delete quote on row click
			rrow.addEventListener("click", function () {
				// Create modal with delete button and close button

				selectedText = "";

				var counter = false;
				var modal = document.createElement('div');


				let myAuthor = "<b style='color:#ed4c2b;'>" + childData.author + "</b>";
				let myTitle = "<em style='color:green;word-wrap: break-word;'>" + childData.title + "</em>";
				let tinyMargin = "<small><small><br><br></small></small>";
				let myViews = "<span style='color:#808080'>" + childData.views + " visits | " + childData.views + " views</span>";

				let dButton = "<br><a class='delete-button'>Delete</a>";
				let vButton = "<button class='view-button'>COPY TEXT</button>";

				modal.innerHTML = "<center><div><p>" + myAuthor + "<br>" + "<span style='color: #2c94fb;'><b>IMAGE TO TEXT:</b></span>" + tinyMargin +
					"<section id='selectabletext' ontouchend='getSelectedText()' onmouseup='getSelectedText()'>" + myTitle + "</section></div></div><br><br>" + vButton + dButton + "<div class='close-button'></div>";

				modal.style.position = 'fixed';
				modal.style.top = '36%';
				modal.style.left = '50%';
				modal.style.width = '300px';
				modal.style.height = 'auto';
				modal.style.transform = 'translate(-50%, -50%)';

				modal.style.backgroundColor = 'white';

				modal.style.padding = '20px';
				modal.style.border = '1px #aaa';
				modal.style.borderRadius = '10px';
				modal.style.zIndex = '9999';

				// Style close button
				var closeButton = modal.querySelector('.close-button');
				closeButton.style.position = 'absolute';
				closeButton.style.top = '108%';
				closeButton.style.left = '44%';
				closeButton.style.fontSize = '35px';

				closeButton.style.cursor = 'pointer';

				closeButton.style.background = 'transparent'; // remove the background image property
				closeButton.innerHTML = '<div class="circle"><span><big><big>&times;</span></div>'; // wrap the X icon inside a div element with a class name for the circle
				closeButton.style.fontSize = '35px';
				closeButton.style.cursor = 'pointer';



				// Add overlay with grey background
				var overlay = document.createElement('div');
				overlay.style.position = 'fixed';
				overlay.style.top = '0';
				overlay.style.left = '0';
				overlay.style.width = '100%';
				overlay.style.height = '100%';
				overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
				overlay.style.zIndex = '9998';

				// Add event listener to close button
				closeButton.addEventListener('click', function () {
					modal.remove();
					overlay.remove();
				});


				var viewButton = modal.querySelector('.view-button');
				viewButton.style.marginTop = '5px';
				viewButton.style.marginBottom = '15px';

				viewButton.style.fontWeight = 'bold';
				viewButton.style.borderRadius = '15px';
				viewButton.style.width = '200px';

				var deleteButton = modal.querySelector('.delete-button');

				deleteButton.style.color = '#ccc';
				deleteButton.style.cursor = 'pointer';

				viewButton.addEventListener('click', function () {
					//openLink(childData.title);

					database.ref('quotes/' + childData.key).update({
						views: eval(childData.views) + eval(1)
					});
					navigator.clipboard.writeText(childData.title).then(function () {
						console.log('Text successfully copied to clipboard');
						alert("All text is copied");
					}).catch(function (err) {
						console.error('Unable to copy text to clipboard', err);
					});
					modal.remove();
					overlay.remove();


				});

				closeButton.addEventListener('click', function () {
					modal.remove();
					overlay.remove();
				});

				// Delete quote from database when delete button is clicked
				deleteButton.addEventListener('click', function () {

					if (!counter) {
						deleteButton.innerHTML = "&#x2713; Confirm";
						counter = true;
					} else {

						database.ref('quotes/' + childData.key).remove()
							.then(() => {
								console.log("Data successfully deleted");
							})
							.catch((error) => {
								console.log("Error deleting data:", error);
							});
						modal.remove();
						overlay.remove();
						notif.style.display = "none";

					}

				});

				// Add modal and overlay to the page
				document.body.appendChild(modal);
				document.body.appendChild(overlay);
			});

			loading.style.display = 'none';

		});

	}, function (error) {
		console.error("Failed to retrieve quotes:", error);
		if (error.code === "PERMISSION_DENIED") {
			//alert("You don't have permission to save quotes.");
			notif.innerHTML = "Database is locked";
		} else if (error.code === "NETWORK_ERROR") {
			//alert("No internet connection. Please check your network settings and try again.");
			notif.innerHTML = "No internet connection.";
		} else {
			//alert("Failed to save quote. Please try again later.");
			notif.innerHTML = "Failed to save link.";
		}
	});


}
