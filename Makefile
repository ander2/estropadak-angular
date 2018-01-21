ANALITICS_PATH=/home/ander/lana/estropadak/google-analytics-estropadak.txt
REMOTE_PATH=/home/ander2/Work/estropadak-angular/

deploy: src/app/*
	npm run build --prod --env=prod --aot=false 
	sed -i  's/<\/script><\/body>/<\/script>\n<\/body>/' ./dist/index.html
	sed -i -e '/<\/script>/r $(ANALITICS_PATH)' ./dist/index.html
	scp -r ./dist ander2@estropadak.net:$(REMOTE_PATH)
