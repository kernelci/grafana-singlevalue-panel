# Link singlestat Grafana plugin

This plugin is similar to the `singlestat` plugin, with two
differences:

* The value shown is a link, not just plain text.
* Otherwise, this plugin has fewer features and is simpler than `singlestat`.

![Example usage (the plugin below is singlestat)](screenshots/link-singlestat-usage.png)
![Configuration panel](screenshots/link-singlestat-config.png)


## Making a release

If you want a ZIP file for the current release, type `grunt zip`. That
will leave a file called `grafana-plugin-link-singlestat-VERSION.zip`
in the current directory, where `VERSION` is the version number in
`plugin.json`.
