const client = require('cloud-config-client');
const fs = require('fs');
const minimist = require('minimist');
const mkdirp = require('mkdirp');
const Handlebars = require('handlebars');
const bunyan = require('bunyan');
module.exports = { function_caller, properties_extractor };

function function_caller () {
  const argv = minimist(process.argv.slice(2));
  console.dir(argv);
  properties_extractor(argv.folder, argv.application_name, argv.config_server_ip, argv.properties_file, argv.template); 
}

function properties_extractor(folder, application_name, config_server_ip, properties_file, file_template) {
  client.load({
    application: application_name, endpoint: config_server_ip
  }).then((config) => {
    const source = getSource(file_template);
    const template = Handlebars.compile(source);
    var log = bunyan.createLogger({name: 'application-configurator'});
    log.debug("Creating folder: " + folder); 
    mkdirp(folder);
    var stream = fs.createWriteStream(folder + "/" + properties_file);
    log.debug("Writing properties to " + folder + "/" + properties_file + " using template: " + file_template); 
    config.forEach((key, value) => {
      var propertyVal = template({key: key, value: value});
      log.debug(propertyVal);
      stream.write(propertyVal);
    });
    stream.end();
  });
}

function getSource(template){
  if(template === "export")
  {
    source = 'export {{key}}=\'{{value}}\' \n';
  } else {
    source = '{{key}} \t {{value}} \n';
  }
  return source;
}
