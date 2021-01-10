run-client: 
	cd client && yarn start

run-server:
	cd server && yarn start

run: run-server run-client