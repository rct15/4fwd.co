# Demonstration
URL shortening system https://1way.eu.org/bodongshouqulveweifengci

Pastebin https://pastebin.icdyct.cloudns.asia/tieludasiliqiuweiyue

Image hosting https://imghost.crazypeace.workers.dev/imghostimghost

NetJournal supports Markdown https://journal.crazypeace.workers.dev/journaljournal

# Complete deployment tutorial
https://zelikk.blogspot.com/2022/07/url-shorten-worker-hide-tutorial.html

## If you don't want to be affected by the author's updates
- Fork your own Repo.

- In Cloudflare's worker.js, search for `"https://crazypeace.github.io/Url-Shorten-Worker/" + config.theme + "/index.html"`, change `crazypeace` to your own. Then Cloudflare's worker will pull your index.html.
  ![image](https://github.com/crazypeace/Url-Shorten-Worker/assets/665889/c98ca134-2809-4490-b9f7-ac27ba735e2e)

- In your own forked Repo, modify index.html, search for `"https://crazypeace.github.io/Url-Shorten-Worker/main.js"`, change `crazypeace` to your own. Then index.html will pull your main.js.
  ![image](https://github.com/crazypeace/Url-Shorten-Worker/assets/665889/5f283aa2-d57f-4679-a987-757f1590e8f9)

- Activate GitHub Pages function in your own Repo. (Please google for detailed steps.)

# Modifications based on the original version
Direct access to domain returns 404. Set an entry in KV, save the secret path, only when this path is accessed will the usage page be displayed.
https://zelikk.blogspot.com/2022/07/url-shorten-worker-hide-tutorial.html

Support custom short links
https://zelikk.blogspot.com/2022/07/url-shorten-worker-custom.html

API service not public
https://zelikk.blogspot.com/2022/07/url-shorten-worker-api-password.html

Page cache settings for past short links
https://zelikk.blogspot.com/2022/08/url-shorten-worker-localstorage.html

Pre-search localStorage in the long link text box
https://zelikk.blogspot.com/2022/08/url-shorten-worker-bootstrap-list-group-oninput.html

Add button to delete a certain short link
https://zelikk.blogspot.com/2022/08/url-shorten-worker-delete-kv-localstorage.html

Visit count feature, can query short links, becomes a feature-complete short link API system
https://zelikk.blogspot.com/2023/11/url-shorten-worker-visit-count-api-api.html

Snapchat mode, can make one-time QR codes
https://zelikk.blogspot.com/2023/11/url-shorten-worker-snapchat-mode.html

Add functionality to read all records from KV
https://zelikk.blogspot.com/2024/01/url-shorten-worker-load-cloudflare-kv.html

Transform into Pastebin
https://zelikk.blogspot.com/2024/01/url-shorten-worker-pastebin.html

Protect 'password' key
https://zelikk.blogspot.com/2024/01/url-shorten-worker-password-protect-keylist.html

Transform into image hosting (Base64)
https://zelikk.blogspot.com/2024/01/url-shorten-worker-image-hosting-base64.html

Transform into NetJournal supports Markdown
https://zelikk.blogspot.com/2024/02/url-shorten-worker-netjournal.html  
https://zelikk.blogspot.com/2024/02/url-shorten-worker-netjournal-markdown.html  
https://zelikk.blogspot.com/2024/04/url-shorten-worker-netjournal-markdown.html

# Use Github stars to tell me this repo is useful to you :)
[![Star History Chart](https://api.star-history.com/svg?repos=rct15/4fwd.co&type=Date)](https://star-history.com/#rct15/4fwd.co&Date)
Snapchat mode, can make one-time QR codes
https://zelikk.blogspot.com/2023/11/url-shorten-worker-snapchat-mode.html


Add functionality to read all records from KV
https://zelikk.blogspot.com/2024/01/url-shorten-worker-load-cloudflare-kv.html


Transform into Pastebin
https://zelikk.blogspot.com/2024/01/url-shorten-worker-pastebin.html


Protect 'password' key
https://zelikk.blogspot.com/2024/01/url-shorten-worker-password-protect-keylist.html


Transform into image hosting (Base64)
https://zelikk.blogspot.com/2024/01/url-shorten-worker-image-hosting-base64.html


Transform into NetJournal supports Markdown
https://zelikk.blogspot.com/2024/02/url-shorten-worker-netjournal.html  
https://zelikk.blogspot.com/2024/02/url-shorten-worker-netjournal-markdown.html  
https://zelikk.blogspot.com/2024/04/url-shorten-worker-netjournal-markdown.html

# Use Github stars to tell me this repo is useful to you :)
[![Star History Chart](https://api.star-history.com/svg?repos=rct15/4fwd.co&type=Date)](https://star-history.com/#rct15/4fwd.co&Date)
