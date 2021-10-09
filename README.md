# Redirector

This node.js application redirects domains to the configured urls.

## Configuring
Start by configuring the server in the `.env` file in the root of the project.
An example file can be found in `.env.example`.
The optional [Plausible](https://plausible.io/) endpoint can be used to track
the traffic to the different urls.

To configure the redirects, create a new file with the domain name to redirect
in the `redirects` folder. An example configuration file can be found in
`redirects/example.com.csv`. The configuration format is as follows:
```
path,redirect url,HTTP status (optional),tracked path name (optional)
```

The paths provided may contain RegEx expressions.