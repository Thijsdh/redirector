# Redirector

This node.js application redirects domains to the configured urls.

## Configuring
First, set the port used for the application in an `.env` file in the root of
the project. An example file can be found in `.env.example`.

To configure the redirects, create a new file with the domain name to redirect
in the `redirects` folder. An example configuration file can be found in
`redirects/example.com.csv`. The configuration format is as follows:
```
path,redirect url,HTTP status (optional)
```