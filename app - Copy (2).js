// Initialize Firebase
var firebaseConfig = {
	apiKey: "AIzaSyD7156apCcrJnRX9cP8KSazMbILNJgKEt0",
	authDomain: "lois-files.firebaseapp.com",
	projectId: "lois-files",
	databaseURL: "https://lois-files-default-rtdb.asia-southeast1.firebasedatabase.app/",
	storageBucket: "lois-files.appspot.com",
	messagingSenderId: "294529638144",
	appId: "1:294529638144:web:f2c2c504d1ed9a12641de5"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

window.onload = function () {
	postFrom.reset();
	authorInput.disabled = true;
	setTimeout(function () {
		window.scrollTo(0, 0);
	}, 0);
}

const user = "@admin";

const internetTime = Date.now();
var items = 10;
var database = firebase.database();
var urltext = "";
var posttext = "";
var selectedText = "";

const reactArr = [0, 0, 0, 0, 0, 0];

localStorage.setItem("data", internetTime);
sessionStorage.setItem("link", "?");
var upflag = false;

const headerImage = document.querySelector("#header-image");
const loading = document.querySelector("#loading-page");
loading.style.display = "block";
headerImage.src = imageHeader;
previewImage.src = imageURL;

var childNum = 0;

loadDatabase(items, "");

database.ref('quotes').once('value')
	.then((snapshot) => {
		childNum = snapshot.numChildren();
	})
	.catch((error) => {
		console.log("Error retrieving data:", error);
	});

let inputChanged = false;
let more_toggle = false;

function resetPage() {
	location.reload();
	window.location.href = "#top";

	postFrom.reset();
}


/*                                                                                                 
																								  
IIIIIIIIIINNNNNNNN        NNNNNNNNPPPPPPPPPPPPPPPPP   UUUUUUUU     UUUUUUUUTTTTTTTTTTTTTTTTTTTTTTT
I::::::::IN:::::::N       N::::::NP::::::::::::::::P  U::::::U     U::::::UT:::::::::::::::::::::T
I::::::::IN::::::::N      N::::::NP::::::PPPPPP:::::P U::::::U     U::::::UT:::::::::::::::::::::T
II::::::IIN:::::::::N     N::::::NPP:::::P     P:::::PUU:::::U     U:::::UUT:::::TT:::::::TT:::::T
  I::::I  N::::::::::N    N::::::N  P::::P     P:::::P U:::::U     U:::::U TTTTTT  T:::::T  TTTTTT
  I::::I  N:::::::::::N   N::::::N  P::::P     P:::::P U:::::D     D:::::U         T:::::T        
  I::::I  N:::::::N::::N  N::::::N  P::::PPPPPP:::::P  U:::::D     D:::::U         T:::::T        
  I::::I  N::::::N N::::N N::::::N  P:::::::::::::PP   U:::::D     D:::::U         T:::::T        
  I::::I  N::::::N  N::::N:::::::N  P::::PPPPPPPPP     U:::::D     D:::::U         T:::::T        
  I::::I  N::::::N   N:::::::::::N  P::::P             U:::::D     D:::::U         T:::::T        
  I::::I  N::::::N    N::::::::::N  P::::P             U:::::D     D:::::U         T:::::T        
  I::::I  N::::::N     N:::::::::N  P::::P             U::::::U   U::::::U         T:::::T        
II::::::IIN::::::N      N::::::::NPP::::::PP           U:::::::UUU:::::::U       TT:::::::TT      
I::::::::IN::::::N       N:::::::NP::::::::P            UU:::::::::::::UU        T:::::::::T      
I::::::::IN::::::N        N::::::NP::::::::P              UU:::::::::UU          T:::::::::T      
IIIIIIIIIINNNNNNNN         NNNNNNNPPPPPPPPPP                UUUUUUUUU            TTTTTTTTTTT
*/

showFormButton.addEventListener('click', function () {
	sessionStorage.setItem("link", "?");
	//sessionStorage.removeItem("tbn");
	var counter = false;

	upflag = false;
	var modal = document.createElement('div');


	let myAuthor = "<big><b style='color:#ed4c2b;'>" + "CREATE POST" + "</b></big>";


	let inputtf = "<div id='thumbnails'></div>";
	//let imgButton = "<input type='file' id='img-button'>";
	let imgButton = "<input type='file' id='img-button' multiple accept='image/*'>";
	let vButton = "<textarea id='caption' name='caption' maxlength='320' placeholder='Write something...' cols='15' rows='5'></textarea> <button class='view-button' id='v-button'>+ ADD PHOTOS</button><br>";
	let postButton = "<button class='view-button' id='post-button'>POST</button>";
	modal.innerHTML = "<center><div><p>" + myAuthor + "" + inputtf +
		"</div></div>" + imgButton + vButton + postButton + "<div class='close-button'></div>";

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

	var imButton = modal.querySelector('#img-button');


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

	let viewButton = modal.querySelector('#v-button');
	viewButton.style.marginTop = '5px';
	viewButton.style.marginBottom = '15px';

	viewButton.style.fontWeight = 'bold';
	viewButton.style.borderRadius = '15px';
	viewButton.style.width = '250px';
	viewButton.style.backgroundColor = '#75c73f';
	viewButton.style.height = '45px';

	let posButton = modal.querySelector('#post-button');
	posButton.style.marginTop = '5px';
	posButton.style.marginBottom = '15px';

	posButton.style.fontWeight = 'bold';
	posButton.style.borderRadius = '15px';
	posButton.style.width = '250px';

	posButton.disabled = 'true';






	viewButton.addEventListener('click', function () {
		selectFile();

	});

	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});






	// Add modal and overlay to the page
	document.body.appendChild(modal);
	document.body.appendChild(overlay);


	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON
	//POSTBUTTON	
	//POSTBUTTON


	posButton.addEventListener('click', function () {
		if (sessionStorage.getItem("link") === "?") {
			if (saveData("ehst", "?", "@username", "thumbnail", Textarea.value)) {
				modal.remove();
				overlay.remove();
			}
		} else {
			if (saveData("TOKEN EXPIRED", sessionStorage.getItem("link"), "@guest", "thumbnail", Textarea.value)) {
				modal.remove();
				overlay.remove();
			}

		}

	});


	var Textarea = document.querySelector('#caption');

	Textarea.addEventListener('input', function () {
		// Check if the textarea is not empty
		if (Textarea.value.trim() !== '') {
			// Enable the button
			posButton.disabled = false;
		} else {
			// Disable the button if the textarea is empty
			posButton.disabled = true;
		}
	});


});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


searchBt.addEventListener('click', function () {
	var sk = document.getElementById("search-in").value;
	moreButton.innerHTML = "<b>END OF SEARCH RESULTS</b>";
	more_toggle = true;
	showFormButton.innerHTML = "<b>Search results for \"" + sk + "\"</b>";
	window.location.href = "#top";
	column1.style.backgroundColor = "#f2cbc1";


	loadDatabase(1000, sk);
	document.getElementById("search-in").value = "";
});

function openLink(url) {
	window.open(url);
}


window.addEventListener('beforeunload', function (e) {
	if (inputChanged) {
		e.preventDefault();
		e.returnValue = '';
	}
});


moreButton.addEventListener('click', function () {


	if (more_toggle) {
		window.location.href = "#top";
		location.reload();
	} else {
		items += 9;

		loadDatabase(items, "");
		if (childNum <= items) {
			//moreButton.innerHTML = "<b>&#x2713; LOAD MORE</b>"
		}

	}
});

function checkRegex() {
	let text = quoteTextarea.value;
	const urlRegex = /(https?:\/\/[^\s]+)/g;
	const urls = text.match(urlRegex);
	const validUrlRegex = /^https?:\/\/shp\.ee\/.*$/;

	if (urls && urls.length > 0) {
		for (const url of urls) {
			if (validUrlRegex.test(url)) {
				showImage.style.display = "block";
				toolBar.style.display = "none";
				urltext = url;
				posttext = quoteTextarea.value.replace(urlRegex, '<a>$1</a>');
			} else {
				if (window.getComputedStyle(toolbarUrl).display === "none") {
					showImage.style.display = "none";
					toolBar.style.display = "block";
				}
			}
		}
	} else {
		if (window.getComputedStyle(toolbarUrl).display === "none") {
			showImage.style.display = "none";
			toolBar.style.display = "block";
		}
	}
}

/*                                                                                                                          
UUUUUUUU     UUUUUUUUPPPPPPPPPPPPPPPPP   LLLLLLLLLLL                  OOOOOOOOO                 AAA               DDDDDDDDDDDDD        
U::::::U     U::::::UP::::::::::::::::P  L:::::::::L                OO:::::::::OO              A:::A              D::::::::::::DDD     
U::::::U     U::::::UP::::::PPPPPP:::::P L:::::::::L              OO:::::::::::::OO           A:::::A             D:::::::::::::::DD   
UU:::::U     U:::::UUPP:::::P     P:::::PLL:::::::LL             O:::::::OOO:::::::O         A:::::::A            DDD:::::DDDDD:::::D  
 U:::::U     U:::::U   P::::P     P:::::P  L:::::L               O::::::O   O::::::O        A:::::::::A             D:::::D    D:::::D 
 U:::::D     D:::::U   P::::P     P:::::P  L:::::L               O:::::O     O:::::O       A:::::A:::::A            D:::::D     D:::::D
 U:::::D     D:::::U   P::::PPPPPP:::::P   L:::::L               O:::::O     O:::::O      A:::::A A:::::A           D:::::D     D:::::D
 U:::::D     D:::::U   P:::::::::::::PP    L:::::L               O:::::O     O:::::O     A:::::A   A:::::A          D:::::D     D:::::D
 U:::::D     D:::::U   P::::PPPPPPPPP      L:::::L               O:::::O     O:::::O    A:::::A     A:::::A         D:::::D     D:::::D
 U:::::D     D:::::U   P::::P              L:::::L               O:::::O     O:::::O   A:::::AAAAAAAAA:::::A        D:::::D     D:::::D
 U:::::D     D:::::U   P::::P              L:::::L               O:::::O     O:::::O  A:::::::::::::::::::::A       D:::::D     D:::::D
 U::::::U   U::::::U   P::::P              L:::::L         LLLLLLO::::::O   O::::::O A:::::AAAAAAAAAAAAA:::::A      D:::::D    D:::::D 
 U:::::::UUU:::::::U PP::::::PP          LL:::::::LLLLLLLLL:::::LO:::::::OOO:::::::OA:::::A             A:::::A   DDD:::::DDDDD:::::D  
  UU:::::::::::::UU  P::::::::P          L::::::::::::::::::::::L OO:::::::::::::OOA:::::A               A:::::A  D:::::::::::::::DD   
	UU:::::::::UU    P::::::::P          L::::::::::::::::::::::L   OO:::::::::OO A:::::A                 A:::::A D::::::::::::DDD     
	  UUUUUUUUU      PPPPPPPPPP          LLLLLLLLLLLLLLLLLLLLLLLL     OOOOOOOOO  AAAAAAA                   AAAAAAADDDDDDDDDDDDD        
*/


function uploadImages() {

	const imageInput = document.getElementById('img-button');
	const files = imageInput.files;
	const thumbnailsDiv = document.getElementById('thumbnails');
	const vInput = document.getElementById('v-button');
	const posButton = document.getElementById('post-button');

	vInput.style.display = 'none';
	//const uploadDiv = document.getElementById('updiv');

	//uploadDiv.style.display = 'none';

	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		const storageRef = storage.ref('images/' + file.name);
		const task = storageRef.put(file);

		// Create a container for each image
		const imageContainer = document.createElement('div');
		thumbnailsDiv.appendChild(imageContainer);

		task.on(
			'state_changed',
			snapshot => {
				// Calculate the upload percentage
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

				// Update the container with the upload percentage
				imageContainer.innerHTML = '<strong>Uploading: ' + Math.round(progress) + '%</strong>';
			},
			error => {
				console.error('Upload failed:', error);
			},
			() => {
				// Upload is complete, now add the image to the thumbnails
				storageRef.getDownloadURL().then(downloadURL => {
					// Create thumbnail image element
					const thumbnail = document.createElement('img');
					thumbnail.src = downloadURL;
					thumbnail.style.maxHeight = 200;
					thumbnail.style.maxWidth = 200;
					thumbnail.style.margin = '1px';

					// Create link for download
					const downloadLink = document.createElement('a');
					downloadLink.href = downloadURL;
					downloadLink.download = file.name;
					downloadLink.appendChild(thumbnail);

					// Clear the container and append the thumbnail
					imageContainer.innerHTML = '';
					imageContainer.appendChild(thumbnail);
					posButton.disabled = false;
					sessionStorage.setItem("link", downloadURL);
					console.log(sessionStorage.getItem("link"));
				}).catch(error => {
					console.error('Failed to get download URL:', error);
				});
			}
		);
	}
}

function selectFile() {
	const fileInput = document.getElementById('img-button');

	fileInput.addEventListener('change', function handleFileChange() {
		// Remove the event listener to prevent further changes
		fileInput.removeEventListener('change', handleFileChange);

		// The user selected a file
		if (upflag === false) {

			uploadImages();
			upflag = true;
		} else {
			console.log(upflag);
		}
	});

	fileInput.click();
}

function imageLoaded() {
	const image = document.getElementById("load-image");
	const loadingText = document.querySelector(".loading-text");

	image.onload = function () {
		// When the image is loaded, display it and hide the loading text
		image.style.display = "block";
		loadingText.style.display = "none";
	};
}


function getSelectedText() {
	// Get the selected text and store it in the variable
	selectedText = window.getSelection().toString();
}

function copySelectedText() {
	if (selectedText.trim() !== "") {
		// Create a textarea element to temporarily hold the text
		var textarea = document.createElement("textarea");
		textarea.value = selectedText;
		document.body.appendChild(textarea);

		// Select the text in the textarea
		textarea.select();
		textarea.setSelectionRange(0, 99999); // For mobile devices

		// Copy the text to the clipboard
		document.execCommand("copy");

		// Remove the textarea
		document.body.removeChild(textarea);

		// Provide feedback to the user
		alert("Selection is copied!");
		return true;
	} else {
		//alert("Please select some text before copying.");
		alert("All text is copied");
		return false;
	}
}

function limitCharacters(inputString, maxLength) {
	let trimmedString = inputString.trim();

	if (trimmedString.length > maxLength) {
		return trimmedString.substring(0, maxLength);
	} else {
		return trimmedString;
	}
}


/*                                                                                                        
LLLLLLLLLLL                  OOOOOOOOO                    AAA               DDDDDDDDDDDDD        DDDDDDDDDDDDD        BBBBBBBBBBBBBBBBB   
L:::::::::L                OO:::::::::OO                 A:::A              D::::::::::::DDD     D::::::::::::DDD     B::::::::::::::::B  
L:::::::::L              OO:::::::::::::OO              A:::::A             D:::::::::::::::DD   D:::::::::::::::DD   B::::::BBBBBB:::::B 
LL:::::::LL             O:::::::OOO:::::::O            A:::::::A            DDD:::::DDDDD:::::D  DDD:::::DDDDD:::::D  BB:::::B     B:::::B
  L:::::L               O::::::O   O::::::O           A:::::::::A             D:::::D    D:::::D   D:::::D    D:::::D   B::::B     B:::::B
  L:::::L               O:::::O     O:::::O          A:::::A:::::A            D:::::D     D:::::D  D:::::D     D:::::D  B::::B     B:::::B
  L:::::L               O:::::O     O:::::O         A:::::A A:::::A           D:::::D     D:::::D  D:::::D     D:::::D  B::::BBBBBB:::::B 
  L:::::L               O:::::O     O:::::O        A:::::A   A:::::A          D:::::D     D:::::D  D:::::D     D:::::D  B:::::::::::::BB  
  L:::::L               O:::::O     O:::::O       A:::::A     A:::::A         D:::::D     D:::::D  D:::::D     D:::::D  B::::BBBBBB:::::B 
  L:::::L               O:::::O     O:::::O      A:::::AAAAAAAAA:::::A        D:::::D     D:::::D  D:::::D     D:::::D  B::::B     B:::::B
  L:::::L               O:::::O     O:::::O     A:::::::::::::::::::::A       D:::::D     D:::::D  D:::::D     D:::::D  B::::B     B:::::B
  L:::::L         LLLLLLO::::::O   O::::::O    A:::::AAAAAAAAAAAAA:::::A      D:::::D    D:::::D   D:::::D    D:::::D   B::::B     B:::::B
LL:::::::LLLLLLLLL:::::LO:::::::OOO:::::::O   A:::::A             A:::::A   DDD:::::DDDDD:::::D  DDD:::::DDDDD:::::D  BB:::::BBBBBB::::::B
L::::::::::::::::::::::L OO:::::::::::::OO   A:::::A               A:::::A  D:::::::::::::::DD   D:::::::::::::::DD   B:::::::::::::::::B 
L::::::::::::::::::::::L   OO:::::::::OO    A:::::A                 A:::::A D::::::::::::DDD     D::::::::::::DDD     B::::::::::::::::B  
LLLLLLLLLLLLLLLLLLLLLLLL     OOOOOOOOO     AAAAAAA                   AAAAAAADDDDDDDDDDDDD        DDDDDDDDDDDDD        BBBBBBBBBBBBBBBBB   
*/


function loadDatabase(itemCount, searchkey) {

	database.ref('quotes').orderByChild('pinned').limitToLast(itemCount).on('value', function (snapshot) {
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
			if (childData.pinned) {
				divStyle = "<td style='padding-top: 8px;padding-bottom: 8px;'><div id = 'rdiv' style='background-color: cornsilk; padding:0px; border: solid 1px orangered;'>";
			} else {
				if (childData.views === '0') {
					divStyle = "<td style='padding-top: 8px;padding-bottom: 8px;'><div id = 'rdiv' style='background-color: cornsilk; padding:0px; border: solid 1px #ccc;'>";
				} else {
					divStyle = "<td style='padding-top: 8px;padding-bottom: 8px;'><div id = 'rdiv' style='background-color: white; padding:0px; border: solid 1px #ccc;'>";
				}
			}




			let myAuthor = "";
			//NEW//

			if (childData.pinned) {
				myAuthor = "<b>" + childData.author + " </b><span class='pin-label'><small><small>📌PINNED POST</small></small></span>";
			} else {
				if (getTimeDiff(childData.timestamp) <= 0.5) {
					myAuthor = "<b>" + childData.author + " </b><span class='new-label'><small><small>NEW</small></small></span>";
				} else {
					myAuthor = "<b>" + childData.author + "</b>";
				}
			}



			let myViews = childData.views + " View" + (eval(childData.views) == 1 ? "" : "s");

			let modAuthor = childData.author;
			let myTitle = childData.title;
			let myQuote = "";
			let myCaption = "";

			if (childData.quote === "?") {
				if (childData.hasOwnProperty('caption')) {
					myCaption = "<p style='white-space: pre-line;text-align:center; font-weight: bold;font-size:20px; word-wrap:break-word;padding:10px'>" + childData.caption + "</p>";
				}
				//myQuote = "<img src='" + imageURL + "' alt='Cannot load image 😓' id='load-image' style='width: 100%;'>";
			} else {
				myQuote = "<center><img src='" + childData.quote + "' alt='Cannot load image 😓' id='load-image'  style='max-width: 100%;max-height:400px'  style='display: none;' onload='imageLoaded()'><div class='loading-text' style='display:none'>Loadfddfdffddfdfding...</div></center>";
				if (childData.hasOwnProperty('caption')) {
					if (childData.caption === "") {
						myCaption = "";
					} else {
						myCaption = "<section style='white-space: pre-line;text-align:center; font-size:16px; word-wrap:break-word;padding:0px'>" + childData.caption + "</section>";
					}
				}

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
				divStyle + tableHTML + myQuote + myCaption +
				"<span style='color:#808080; font-size: 14px;'><hr>&nbsp;&nbsp;" + myTime +
				"</span><br><span style='color:#008ba3; font-size: 14px;'>&nbsp;&nbsp;" + myViews + "</span><br><div style='height:10'></div></td>";

			/////////////////////////////////////////////////////////

			quoteTableBody.appendChild(rrow);



			/*
			RRRRRRRRRRRRRRRRR   RRRRRRRRRRRRRRRRR        OOOOOOOOO     WWWWWWWW                           WWWWWWWW
			R::::::::::::::::R  R::::::::::::::::R     OO:::::::::OO   W::::::W                           W::::::W			
			R::::::RRRRRR:::::R R::::::RRRRRR:::::R  OO:::::::::::::OO W::::::W                           W::::::W
			RR:::::R     R:::::RRR:::::R     R:::::RO:::::::OOO:::::::OW::::::W                           W::::::W
			  R::::R     R:::::R  R::::R     R:::::RO::::::O   O::::::O W:::::W           WWWWW           W:::::W 
			  R::::R     R:::::R  R::::R     R:::::RO:::::O     O:::::O  W:::::W         W:::::W         W:::::W  
			  R::::RRRRRR:::::R   R::::RRRRRR:::::R O:::::O     O:::::O   W:::::W       W:::::::W       W:::::W   
			  R:::::::::::::RR    R:::::::::::::RR  O:::::O     O:::::O    W:::::W     W:::::::::W     W:::::W    
			  R::::RRRRRR:::::R   R::::RRRRRR:::::R O:::::O     O:::::O     W:::::W   W:::::W:::::W   W:::::W     
			  R::::R     R:::::R  R::::R     R:::::RO:::::O     O:::::O      W:::::W W:::::W W:::::W W:::::W      
			  R::::R     R:::::R  R::::R     R:::::RO:::::O     O:::::O       W:::::W:::::W   W:::::W:::::W       
			  R::::R     R:::::R  R::::R     R:::::RO::::::O   O::::::O        W:::::::::W     W:::::::::W        
			RR:::::R     R:::::RRR:::::R     R:::::RO:::::::OOO:::::::O         W:::::::W       W:::::::W         
			R::::::R     R:::::RR::::::R     R:::::R OO:::::::::::::OO           W:::::W         W:::::W          
			R::::::R     R:::::RR::::::R     R:::::R   OO:::::::::OO              W:::W           W:::W           
			RRRRRRRR     RRRRRRRRRRRRRRR     RRRRRRR     OOOOOOOOO                 WWW             WWW            			*/



			rrow.addEventListener("click", function () {
				database.ref('quotes/' + childData.key).update({
					views: eval(childData.views) + eval(1)
				});

				// Create modal with delete button and close button

				selectedText = "";

				var counter = false;
				var modal = document.createElement('div');


				let myAuthor = "<b style='color:#ed4c2b;'>" + childData.author + "</b>";
				let myTitle = "<em style='color:green;word-wrap: break-word;'>" + childData.title + "</em>";
				let tinyMargin = "<small><small><br><br></small></small>";
				let myViews = "<span style='color:#808080'>" + childData.views + " visits | " + childData.views + " views</span>";

				let dButton = "<a class='delete-button'>&nbsp; Delete  &nbsp;</a>";
				let pButton = "<a class='pin-button'>&nbsp; Pin Post &nbsp;</a>";




				let rButton = "<table border='0' id = 'reactTable'>" +
					"<tr><td><span onclick='toggleLike(\"loves\", \"" + childData.key + "\",\"" + user + "\")'>❤️</span><br><span id='loves' style='font-size: 10px; color: red;'></span></td>" +
					"<td><span onclick='toggleLike(\"likes\", \"" + childData.key + "\",\"" + user + "\")'>👍</span><br><span id='likes' style='font-size: 10px; color: red;'></span></td>" +
					"<td><span onclick='toggleLike(\"wows\", \"" + childData.key + "\",\"" + user + "\")'>🤩</span><br><span id='wows' style='font-size: 10px; color: red;'></span></td>" +
					"<td><span onclick='toggleLike(\"hahas\", \"" + childData.key + "\",\"" + user + "\")'>😂</span><br><span id='hahas' style='font-size: 10px; color: red;'></span></td>" +
					"<td><span onclick='toggleLike(\"frowns\", \"" + childData.key + "\",\"" + user + "\")'>😥</span><br><span id='frowns' style='font-size: 10px; color: red;'></span></td>" +
					"<td><span onclick='toggleLike(\"dislikes\", \"" + childData.key + "\",\"" + user + "\")'>👎</span><br><span id='dislikes' style='font-size: 10px; color: red;'></span></td></tr></table>";

				let vButton = "<button class='view-button'>VIEW IMAGE</button>";
				let scaption = "<p style='white-space: pre-line;text-align:center; font-size:12px; word-wrap:break-word;padding:0px'>" + childData.caption + "</p>"

				if (childData.pinned === false) {
					if (childData.quote === "?") {
						modal.innerHTML = "<center><div><p>" + myAuthor + "<br>" +
							"<section id='selectabletext' ontouchend='getSelectedText()' onmouseup='getSelectedText()'>" + scaption + "</section></div></div>" + "<button class='view-button' style='display:none;'>VIEW IMAGE</button>" + rButton + "<br>" + pButton + dButton + "<div class='close-button'></div>";
					} else {
						modal.innerHTML = "<center><div><p>" + myAuthor + "<br>" +
							"<section id='selectabletext' ontouchend='getSelectedText()' onmouseup='getSelectedText()'>" + scaption + "</section></div></div>" + vButton + rButton + "<br>" + pButton + dButton + "<div class='close-button'></div>";

					}
				} else {
					if (childData.quote === "?") {
						modal.innerHTML = "<center><div><p>" + myAuthor + "<br>" +
							"<section id='selectabletext' ontouchend='getSelectedText()' onmouseup='getSelectedText()'>" + scaption + "</section></div></div>" + "<button class='view-button' style='display:none;'>VIEW IMAGE</button>" + rButton + "<br><a class='pin-button'>Unpin Post</a><a class='delete-button' style='display:none'>Delete</a>" + "<div class='close-button'></div>";
					} else {
						modal.innerHTML = "<center><div><p>" + myAuthor + "<br>" +
							"<section id='selectabletext' ontouchend='getSelectedText()' onmouseup='getSelectedText()'>" + scaption + "</section></div></div>" + vButton + rButton + "<br><a class='pin-button'>Unpin Post</a><a class='delete-button' style='display:none'>Delete</a>" + "<div class='close-button'></div>";

					}
				}
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

				var pinButton = modal.querySelector('.pin-button');

				pinButton.style.color = '#ccc';
				pinButton.style.cursor = 'pointer';

				var cells = document.querySelectorAll('#myTable td');
				cells.forEach(function (cell) {
					cell.addEventListener('click', function () {
						alert('Cell clicked: ' + cell.textContent);
						console.log("ddsgsdgdsg");
						// You can replace the alert with your desired action or code
					});
				});

				viewButton.addEventListener('click', function () {
					openLink(childData.quote);
					//react


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
						pinButton.innerHTML = "";
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

				pinButton.addEventListener('click', function () {

					if (!counter) {
						pinButton.innerHTML = "&#x2713; Confirm";
						deleteButton.innerHTML = "";
						counter = true;
					} else {
						togglePin(childData.key);
						modal.remove();
						overlay.remove();

					}

				});

				// Add modal and overlay to the page
				document.body.appendChild(modal);
				document.body.appendChild(overlay);

				updatelike("loves", childData.key);
				updatelike("likes", childData.key);
				updatelike("wows", childData.key);
				updatelike("hahas", childData.key);
				updatelike("frowns", childData.key);
				updatelike("dislikes", childData.key);
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

/*                                                                                                                                                       
																							dddddddd                                                           
																							d::::::d                           tttt                            
																							d::::::d                        ttt:::t                            
																							d::::::d                        t:::::t                            
																							d:::::d                         t:::::t                            
	ssssssssss     aaaaaaaaaaaaa   vvvvvvv           vvvvvvv    eeeeeeeeeeee        ddddddddd:::::d   aaaaaaaaaaaaa   ttttttt:::::ttttttt      aaaaaaaaaaaaa   
  ss::::::::::s    a::::::::::::a   v:::::v         v:::::v   ee::::::::::::ee    dd::::::::::::::d   a::::::::::::a  t:::::::::::::::::t      a::::::::::::a  
ss:::::::::::::s   aaaaaaaaa:::::a   v:::::v       v:::::v   e::::::eeeee:::::ee d::::::::::::::::d   aaaaaaaaa:::::a t:::::::::::::::::t      aaaaaaaaa:::::a 
s::::::ssss:::::s           a::::a    v:::::v     v:::::v   e::::::e     e:::::ed:::::::ddddd:::::d            a::::a tttttt:::::::tttttt               a::::a 
 s:::::s  ssssss     aaaaaaa:::::a     v:::::v   v:::::v    e:::::::eeeee::::::ed::::::d    d:::::d     aaaaaaa:::::a       t:::::t              aaaaaaa:::::a 
   s::::::s        aa::::::::::::a      v:::::v v:::::v     e:::::::::::::::::e d:::::d     d:::::d   aa::::::::::::a       t:::::t            aa::::::::::::a 
	  s::::::s    a::::aaaa::::::a       v:::::v:::::v      e::::::eeeeeeeeeee  d:::::d     d:::::d  a::::aaaa::::::a       t:::::t           a::::aaaa::::::a 
ssssss   s:::::s a::::a    a:::::a        v:::::::::v       e:::::::e           d:::::d     d:::::d a::::a    a:::::a       t:::::t    tttttta::::a    a:::::a 
s:::::ssss::::::sa::::a    a:::::a         v:::::::v        e::::::::e          d::::::ddddd::::::dda::::a    a:::::a       t::::::tttt:::::ta::::a    a:::::a 
s::::::::::::::s a:::::aaaa::::::a          v:::::v          e::::::::eeeeeeee   d:::::::::::::::::da:::::aaaa::::::a       tt::::::::::::::ta:::::aaaa::::::a 
 s:::::::::::ss   a::::::::::aa:::a          v:::v            ee:::::::::::::e    d:::::::::ddd::::d a::::::::::aa:::a        tt:::::::::::tt a::::::::::aa:::a
  sssssssssss      aaaaaaaaaa  aaaa           vvv               eeeeeeeeeeeeee     ddddddddd   ddddd  aaaaaaaaaa  aaaa          ttttttttttt    aaaaaaaaaa  aaaa

*/

function saveData(title, quote, author, tbn, caption) {
	inputChanged = false;
	saveButton.disabled = true;

	if (title === '' || author === '') {
		return false;
	} else {
		var lineBreakCount = (caption.match(/\n/g) || []).length;
		if (lineBreakCount > 5) {
			return false;
		} else {
			if (title.length > 2000) {
				title = title.substring(0, 2000);
			}

			if (author.length > 50) {
				author = author.substring(0, 50);
			}

			// Save form data to Firebase Realtime Database
			if (navigator.onLine) {

				var quoteRef = database.ref('quotes').push();

				quoteRef.set({
					title: title,
					quote: limitCharacters(quote, 200),
					author: author,
					thumbnail: tbn,
					sessionkey: internetTime,
					pinned: false,
					show: "true",
					views: "0",
					visits: "0",
					caption: caption,
					subtitle: "Guest",
					timestamp: firebase.database.ServerValue.TIMESTAMP
				}, function (error) {
					if (error) {
						console.error("Failed to save quote:", error);
						notif.style.display = "block";
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
					} else {
						myForm.style.display = 'none';
						postFrom.reset();
						showFormButton.style.display = 'block';
						myContent.style.display = 'block';
						notif.style.display = "block";
						notif.innerHTML = "Link saved!";
						saveButton.disabled = false;
					}

				});

			} else {
				notif.style.display = "block";
				notif.innerHTML = "No Connection";
			}
			return true;

		}

	}
}

function toggleLike(type, quoteId, username) {
	// Toggle the like status for the user on this quote
	database.ref(`quotes/${quoteId}/${type}/${username}`).transaction(currentLike => !currentLike);
	updatelike(type, quoteId);
}

function getTrueLikesCount(type, entryId, callback) {
	const entryRef = firebase.database().ref(`quotes/${entryId}/${type}`);

	entryRef.once('value', (snapshot) => {
		const likes = snapshot.val() || {};
		const trueLikesCount = Object.values(likes).filter(like => like === true).length;
		callback(trueLikesCount);
	});
}

function updatelike(type, entryId) {
	getTrueLikesCount(type, entryId, (trueLikesCount) => {
		// Update the content of the span with the true likes count
		if (trueLikesCount === 0) {
			document.getElementById(`${type}`).innerText = ` `;
		} else {
			document.getElementById(`${type}`).innerText = `${trueLikesCount}`;
		}

	});
}

function togglePin(quoteId) {
	// Toggle the like status for the user on this quote
	database.ref(`quotes/${quoteId}/pinned`).transaction(currentLike => !currentLike);
}





