var configurator = require('../')
configurator.properties_extractor("/opt/spark/conf", "spark", "http://configserver.myhost.com:8889", "spark-env.sh", "export")
