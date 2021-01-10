run-client: 
	cd client && yarn start

run-server:
	cd server && yarn start

install-server: 
	cd server && yarn -s

install-client: 
	cd client && yarn -s

install: install-server install-client