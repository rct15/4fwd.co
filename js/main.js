let res

let apiSrv = window.location.pathname
let password_value = document.querySelector("#passwordText").value
//let apiSrv = "https://rct15.github.io/4fwd.co/"
// let password_value = "journaljournal"

// This is the default behavior, which can be set to different behaviors in different index.html files.
let buildValueItemFunc = buildValueTxt

function shorturl() {
  if (document.querySelector("#longURL").value == null) {
    alert("Url cannot be empty!")
    return
  }
  
  // key can't have space in it
  document.getElementById('keyPhrase').value = document.getElementById('keyPhrase').value.replace(/\s/g, "-");

  document.getElementById("addBtn").disabled = true;
  document.getElementById("addBtn").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Please wait...';
  fetch(apiSrv, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cmd: "add", url: document.querySelector("#longURL").value, key: document.querySelector("#keyPhrase").value, password: password_value })
  }).then(function (response) {
    return response.json();
  }).then(function (myJson) {
    res = myJson;
    document.getElementById("addBtn").disabled = false;
    document.getElementById("addBtn").innerHTML = 'Shorten it';

    // Successfully generated short link
    if (res.status == "200") {
      let keyPhrase = res.key;
      let valueLongURL = document.querySelector("#longURL").value;
      // save to localStorage
      localStorage.setItem(keyPhrase, valueLongURL);
      // add to urlList on the page
      addUrlToList(keyPhrase, valueLongURL)

      document.getElementById("result").innerHTML = window.location.protocol + "//" + window.location.host + "/" + res.key;
    } else {
      document.getElementById("result").innerHTML = res.error;
    }

    // Popup the result
    alert(res.message);
    var modal = new bootstrap.Modal(document.getElementById('resultModal'));
    modal.show();

  }).catch(function (err) {
    alert("Unknow error. Please retry!");
    console.log(err);
    document.getElementById("addBtn").disabled = false;
    document.getElementById("addBtn").innerHTML = 'Shorten it';
  })
}

function copyurl(id, attr) {
  let target = null;

  if (attr) {
    target = document.createElement('div');
    target.id = 'tempTarget';
    target.style.opacity = '0';
    if (id) {
      let curNode = document.querySelector('#' + id);
      target.innerText = curNode[attr];
    } else {
      target.innerText = attr;
    }
    document.body.appendChild(target);
  } else {
    target = document.querySelector('#' + id);
  }

  try {
    let range = document.createRange();
    range.selectNode(target);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    // console.log('Copy success')
  } catch (e) {
    console.log('Copy error')
  }

  if (attr) {
    // remove temp target
    target.parentElement.removeChild(target);
  }
}

function loadUrlList() {
  // Clear the list
  let urlList = document.querySelector("#urlList")
  while (urlList.firstChild) {
    urlList.removeChild(urlList.firstChild)
  }

  // The long URL in the text box
  let longUrl = document.querySelector("#longURL").value
  // console.log(longUrl)

  // Iterate through localStorage
  let len = localStorage.length
  // console.log(+len)
  for (; len > 0; len--) {
    let keyShortURL = localStorage.key(len - 1)
    let valueLongURL = localStorage.getItem(keyShortURL)

    // If the long url textbox is empty, load all in localStorage
    // If the long url textbox is not empty, only load matched item in localStorage
    if (longUrl == "" || (longUrl == valueLongURL)) {
      addUrlToList(keyShortURL, valueLongURL)
    }
  }
}

function addUrlToList(shortUrl, longUrl) {
  let urlList = document.querySelector("#urlList")

  let child = document.createElement('div')
  child.classList.add("mb-3", "list-group-item")

  let keyItem = document.createElement('div')
  keyItem.classList.add("input-group")

  // Remove item button
  let delBtn = document.createElement('button')
  delBtn.setAttribute('type', 'button')  
  delBtn.classList.add("btn", "btn-danger", "rounded-bottom-0")
  delBtn.setAttribute('onclick', 'deleteShortUrl(\"' + shortUrl + '\")')
  delBtn.setAttribute('id', 'delBtn-' + shortUrl)
  delBtn.innerText = "X"
  keyItem.appendChild(delBtn)

  // Query visit times button
  let qryCntBtn = document.createElement('button')
  qryCntBtn.setAttribute('type', 'button')
  qryCntBtn.classList.add("btn", "btn-info")
  qryCntBtn.setAttribute('onclick', 'queryVisitCount(\"' + shortUrl + '\")')
  qryCntBtn.setAttribute('id', 'qryCntBtn-' + shortUrl)
  qryCntBtn.innerText = "?"
  keyItem.appendChild(qryCntBtn)

  // Short URL information
  let keyTxt = document.createElement('span')
  keyTxt.classList.add("form-control", "rounded-bottom-0")
  keyTxt.innerText = window.location.protocol + "//" + window.location.host + "/" + shortUrl
  keyItem.appendChild(keyTxt)

  // Show QR code button
  let qrcodeBtn = document.createElement('button')  
  qrcodeBtn.setAttribute('type', 'button')
  qrcodeBtn.classList.add("btn", "btn-info")
  qrcodeBtn.setAttribute('onclick', 'buildQrcode(\"' + shortUrl + '\")')
  qrcodeBtn.setAttribute('id', 'qrcodeBtn-' + shortUrl)
  qrcodeBtn.innerText = "QR"
  keyItem.appendChild(qrcodeBtn)
  
  child.appendChild(keyItem)

  // Insert a second-level code placeholder
  let qrcodeItem = document.createElement('div');
  qrcodeItem.setAttribute('id', 'qrcode-' + shortUrl)
  child.appendChild(qrcodeItem)

  // Long URL information
  child.appendChild(buildValueItemFunc(longUrl))

  urlList.append(child)
}

function clearLocalStorage() {
  localStorage.clear()
}

function deleteShortUrl(delKeyPhrase) {
  // Button Status
  document.getElementById("delBtn-" + delKeyPhrase).disabled = true;
  document.getElementById("delBtn-" + delKeyPhrase).innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span>';

  // Remove item from KV
  fetch(apiSrv, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cmd: "del", key: delKeyPhrase, password: password_value })
  }).then(function (response) {
    return response.json();
  }).then(function (myJson) {
    res = myJson;

    // Successfully deleted
    if (res.status == "200") {
      // Remove from localStorage
      localStorage.removeItem(delKeyPhrase)

      // Load localStorage
      loadUrlList()

      document.getElementById("result").innerHTML = "Delete Successful"
    } else {
      document.getElementById("result").innerHTML = res.error;
    }

    // Popup the result
    var modal = new bootstrap.Modal(document.getElementById('resultModal'));
    modal.show();

  }).catch(function (err) {
    alert("Unknow error. Please retry!");
    console.log(err);
  })
}

function queryVisitCount(qryKeyPhrase) {
  // Button Status
  document.getElementById("qryCntBtn-" + qryKeyPhrase).disabled = true;
  document.getElementById("qryCntBtn-" + qryKeyPhrase).innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span>';

  // Query from KV
  fetch(apiSrv, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cmd: "qry", key: qryKeyPhrase + "-count", password: password_value })
  }).then(function (response) {
    return response.json();
  }).then(function (myJson) {
    res = myJson;

    // Succeed
    if (res.status == "200") {
      document.getElementById("qryCntBtn-" + qryKeyPhrase).innerHTML = res.url;
    } else {
      document.getElementById("result").innerHTML = res.error;
      // Popup the result
      var modal = new bootstrap.Modal(document.getElementById('resultModal'));
      modal.show();
    }

  }).catch(function (err) {
    alert("Unknow error. Please retry!");
    console.log(err);
  })
}

function query1KV() {
  let qryKeyPhrase = document.getElementById("keyForQuery").value;
  if (qryKeyPhrase == "") {
    return
  }

  // Query from KV
  fetch(apiSrv, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cmd: "qry", key: qryKeyPhrase, password: password_value })
  }).then(function (response) {
    return response.json();
  }).then(function (myJson) {
    res = myJson;

    // Successful query
    if (res.status == "200") {
      document.getElementById("longURL").value = res.url;
      document.getElementById("keyPhrase").value = qryKeyPhrase;
      // Trigger input event
      document.getElementById("longURL").dispatchEvent(new Event('input', {
        bubbles: true,
        cancelable: true,
      }))
    } else {
      document.getElementById("result").innerHTML = res.error;
      // Popup the result
      var modal = new bootstrap.Modal(document.getElementById('resultModal'));
      modal.show();
    }

  }).catch(function (err) {
    alert("Unknow error. Please retry!");
    console.log(err);
  })
}

function loadKV() {
  // Clear local storage
  clearLocalStorage(); 

  // Query from KV, cmd is "qryall", query all
  fetch(apiSrv, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cmd: "qryall", password: password_value })
  }).then(function (response) {    
    return response.json();
  }).then(function (myJson) {
    res = myJson;
    // Successful query
    if (res.status == "200") {

      // Iterate over kvlist
      res.kvlist.forEach(item => {      
        keyPhrase = item.key;
        valueLongURL = item.value;
        // save to localStorage
        localStorage.setItem(keyPhrase, valueLongURL);  
      });

    } else {
      document.getElementById("result").innerHTML = res.error;
      // Popup the result
      var modal = new bootstrap.Modal(document.getElementById('resultModal'));
      modal.show();
    }
  }).catch(function (err) {
    alert("Unknow error. Please retry!");
    console.log(err);
  })
}

// Generate QR code
function buildQrcode(shortUrl) {
  // Thank you to the project https://github.com/lrsjng/jquery-qrcode
  var options = {
    // render method: 'canvas', 'image' or 'div'
    render: 'canvas',

    // version range somewhere in 1 .. 40
    minVersion: 1,
    maxVersion: 40,

    // error correction level: 'L', 'M', 'Q' or 'H'
    ecLevel: 'Q',

    // offset in pixel if drawn onto existing canvas
    left: 0,
    top: 0,

    // size in pixel
    size: 256,

    // code color or image element
    fill: '#000',

    // background color or image element, null for transparent background
    background: null,

    // content: text to convert
    text: window.location.protocol + "//" + window.location.host + "/" + shortUrl,

    // corner radius relative to module width: 0.0 .. 0.5
    radius: 0,

    // quiet zone in modules
    quiet: 0,

    // modes
    // 0: normal
    // 1: label strip
    // 2: label box
    // 3: image strip
    // 4: image box
    mode: 0,

    mSize: 0.1,
    mPosX: 0.5,
    mPosY: 0.5,

    label: 'no label',
    fontname: 'sans',
    fontcolor: '#000',

    image: null
  };
  $("#qrcode-" + shortUrl.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1").replace(/(:|\#|\[|\]|,|=|@)/g, "\\$1") ).empty().qrcode(options);
}

function buildValueTxt(longUrl) {
  let valueTxt = document.createElement('div')
  valueTxt.classList.add("form-control", "rounded-top-0")
  valueTxt.innerText = longUrl
  return valueTxt
}

addEventListener('DOMContentLoaded', function() {
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
  });

  loadUrlList();
});
