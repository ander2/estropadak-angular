REMOTE_PATH=/home/ander2/Work/estropadak-nginx/dist

deploy: src/app/*
	ng build --prod
	scp -r ./dist ander2@estropadak.net:$(REMOTE_PATH)
