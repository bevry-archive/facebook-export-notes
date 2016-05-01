# Facebook Export Notes

Export your Facebook Notes as Facebook's takeout service doesn't do it for you


## Usage


### As a Consumer

Install [node](https://nodejs.org)

Then install this:

```
npm install --global facebook-export-notes
```

Then run it, following the prompts:

```
facebook-export-notes
```

Notes should go inside `./notes` and `./cleaned`



### As a Developer

Clone the repository:

``` shell
git clone https://github.com/balupton/facebook-export-notes.git
cd facebook-export-notes
```

Install dependencies - requires [node](https://nodejs.org)

``` shell
npm install
```

Prepare structure:

```
mkdir cleaned
mkdir notes
echo '{"index":0}' > index.json
```

Run this command and login to facebook, close the command once done:

```
node --harmony lib/login.js
```

Download the URLs of all your notes:

```
node --harmony lib/urls.js
```

Use those URLs to download the notes to `./notes`:

```
node --harmony lib/downloader.js
```

Clean the output of the downloaded notes to `./cleaned`:

```
node --harmony lib/clean.js
```

All done.

## License

MIT, Copyright 2016+ Benjamin Lupton
