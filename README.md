# trello-connect

The trello-connect library allows for simple connection in a browser to Trello and use of the 
Trello API. There were two reasons this library was created:

1. The standard Trello library required jQuery. I didn't want to load jQuery for just that one library.
2. Most of the other Trello connection libraries are designed to use for node.js, not in a browser. 

This library assumes a browser connection authorized by Trello. The authorization 
returns a token that is stored in localStorage to allow the connection to be
persistent until a disconnection is specifically requested.

An additional feature of this library is that it includes a disconnect function, unlike
the standard Trello client library, which keeps the key in local storage, but
has no way to remove it.

When connected, the Trello token is stored in local storage. Disconnect clears that token.

## Install

### CDN

``` html
<script src="https://unpkg.com/icons-cl/dist/trello-connect.js"></script>
<!-- or -->
<script src="https://unpkg.com/icons-cl/dist/trellow-connect.min.js"></script>
```

### Package managers

[npm](https://www.npmjs.com/package/trello-connect): `npm install trello-connect`

## Using the Library

To create the object:

```Javascript
	let trello = new TrelloConnect({
		// Generate your own API key at https://trello.com/app-key
		key: "api-key",
	});
```

This is a simple demostration of how to use in a browser:

```Javascript
<div id="trello"></div>
<div id="msg"></div>
<div id="boards"></div>

<script>
  let trello = new TrelloConnect({
    // Example API key.
    // Be sure to generate your own at https://trello.com/app-key
    key: "b85b7e772279099396653ddb564f426e",
  });

  let div = document.getElementById('trello');
  let msg = document.getElementById('msg');

  function demoButton(name, func) {
    let button = document.createElement('button');
    button.textContent = name;
    div.appendChild(button);

    button.addEventListener("click", function(event) {
      func(event);
    });
  }

  if(trello.state === TrelloConnect.DISCONNECTED) {
    // Disconnected, add a button to authorize
    demoButton('Authorize', function(event) {
      trello.authorize();
    });
  }

  if(trello.state === TrelloConnect.CONNECTED) {
    // Connected, add some demo buttons
    demoButton('Disconnect', function(event) {
      trello.disconnect();

      // I'll just reload the page
      window.location = window.location.origin + window.location.pathname;
    });

    demoButton('Get Boards', function(event) {
      trello.get("/member/me/boards?fields=all",
        function(data) {
          let boardsDiv = document.getElementById('boards');
          boardsDiv.innerHTML = '';

          for(var i=0; i<data.length;  i++) {
            let boardData = data[i];

            let p = document.createElement('p');
            p.textContent = boardData.name;
            boardsDiv.appendChild(p);
          }
        },
        function(data){
          failure("Unable to fetch Trello boards")
        },
        msg
      )
    });
  }

</script>
```


## Options

| option | Usage |
| -------- | ------
| key | Specifies the API key to use
| localPrefix | If provided, is prepended onto the localStorage name.

The localPrefix option is useful if a website has more than one page that 
connects to different Trello accounts. An example is multiple courses on the 
same web site, each talking to a course-specific Trello account.


## License

Copyright 2018 Michigan State University

The trello-connect library is released under the MIT license. 

* * *

Written and maintained by Charles B. Owen

