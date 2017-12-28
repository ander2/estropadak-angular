ANALITICS_PATH=/home/ander/lana/estropadak/google-analytics-estropadak.txt

deploy: src/app/*
	npm run build
	sed -i  's/<\/script><\/body>/<\/script>\n<\/body>/' ./dist/index.html
	sed -i -e '/<\/script>/r $(ANALITICS_PATH)' ./dist/index.html
	scp -r ./dist ander2@estropadak.net:/home/ander2/Work/estropadak-angular/
