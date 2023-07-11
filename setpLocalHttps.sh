#!/bin/bash

# Generate a self-signed SSL certificate
openssl req -newkey rsa:2048 -nodes -keyout localhost.key -x509 -days 365 -out localhost.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Move the generated files to the appropriate location
mkdir ssl
mv localhost.key ssl/
mv localhost.crt ssl/
