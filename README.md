Application configurator reading [Spring Cloud Config Server](https://cloud.spring.io/spring-cloud-config) for NodeJS


Install
-------

    npm install application-configurator --save

Usage
----

```js
const client = require("application-configurator");
client.properties_extractor("/opt/spark/conf", "spark", "http://configserver.myhost.com:8889", "spark-env.sh", "export")

```

Example
-------

Configuring an application in general requires setting up initial shell scripts or properties which we will refer to via the --properties_file flag. 

Writing to a properties file generally requires a tabular format where as initializing variables in a shell script will usually be written in an "export var1=value1" format which we can set via the --template flag. By default, it will assume tabular format. Otherwise specify "export".

That file will also be placed in a folder specific to the application, i.e. /opt/spark/conf, which we will set via the --folder flag.

We need the address of the spring cloud config server we will connect to via the --config_server_ip flag. 

We need to know the application for which want to set its properties via the --application_name as the spring cloud config server can serve different properties for different applications.

The configurator can be called on the command line:

```sh
node examples/configure_command_line.js --folder "/opt/spark/conf" --config_server_ip "http://configserver.myhost.com:8889" --properties_file "spark-env.sh" --application_name "spark" --template export
```

It could also be ran via a function call:

```js
const configurator = require("application-configurator");
configurator.properties_extractor("/opt/spark/conf", "spark", "http://configserver.myhost.com:8889", "spark-env.sh", "export")
```

License
-------

MIT

