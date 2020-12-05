REMOTE_PATH=/home/ander2/Work/estropadak-nginx/dist

build: src/app/*
	ng build --prod --source-map=false

clean: dist/*
	rm -rf dist/*

deploy: dist/*
	scp -r ./dist/* ander2@estropadak.eus:$(REMOTE_PATH)

all: clean build deploy
