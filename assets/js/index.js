// get input to get them values
var siteName = document.getElementById('siteName')
var siteUrl = document.getElementById('siteUrl')
var siteList = []

// get old stored value when the page start loading
if (localStorage.getItem('data') !== null) {
    siteList = JSON.parse(localStorage.getItem('data'))
    index()
}

// add function 
function addSite() {

    //declear object hold the input value

    var sites = {
        'siteName': siteName.value,
        'siteUrl': siteUrl.value
    }

    siteList.push(sites)
    localStorage.setItem('data', JSON.stringify(siteList))

    // after we stored an element in local storage we need to call the function that show stored elements
    index()
    //we need to reset input after storing
    resetInputs()
}

// call addSite Function when we click on add button
document.getElementById("addBtn").addEventListener('click', addSite)

// now we need to display the storage values
function index() {

    var temp = ``
    for (var i = 0; i < siteList.length; i++) {
        // get first element in array site name and add edit and delete buttons
        temp += `<tr><td>${siteList[i].siteName}</td>
                     <td><a title="Visit" target="_blank" href="http://www.${siteList[i].siteUrl}.com" class="btn btn-outline-success btn-sm fas fa-eye" id="btnVisit"></a></td>
                     <td><button title="Edit" onclick="edit(${i})" class="btn btn-outline-warning btn-sm fas fa-pen-to-square" fdprocessedid="7d2j4g"></button></td>
                     <td><button onclick="deleteSite(${i})" title="Delete" class="btn btn-outline-danger btn-sm fas fa-trash-can" id="btnDelete" fdprocessedid="mk6gkm"></button></td></tr>`

    }

    // push data to the table
    document.getElementById('tablebody').innerHTML = temp
}

// function to clear the date
function resetInputs() {
    siteName.value = ''
    siteUrl.value = ''

}

// function edit
function edit(elemIndex) {
    // make input value with selected values

    var selectedValue = siteList.at(elemIndex)
    siteName.value = selectedValue.siteName
    siteUrl.value = selectedValue.siteUrl
    //hide add button and display update
    document.getElementById("addBtn").style.display = "none"
    updateButton = document.getElementById("btnUpdateNew")
    updateButton.style.display = "block"
    updateButton.setAttribute('site-index',elemIndex)
 
    
    //localStorage.setItem('data' ,JSON.stringify(siteList))
   
}

// update values 

function update() {
    // make input value with selected values

    var selectedValue = document.getElementById("btnUpdateNew").getAttribute('site-index')

     siteList[selectedValue].siteName = siteName.value
     siteList[selectedValue].siteUrl= siteUrl.value
      // set date on local storage after update
    localStorage.setItem('data' ,JSON.stringify(siteList))
     //clear inputs
     resetInputs()
    //hide update button and display add
    document.getElementById("addBtn").style.display = "block"
    document.getElementById("btnUpdateNew").style.display = "none"
    
    
    //call index function after update date
    index()
   
}

//call update function 
document.getElementById("btnUpdateNew").addEventListener('click', update)

// delete function

function deleteSite(elemIndex){
    // remove that element
    siteList.splice(elemIndex,1)
    localStorage.setItem('data' ,JSON.stringify(siteList))
     //call index function after delete date
     index()
   
}

