say_hello:
	echo "Hello World"
start: 
	deployctl run --libs=ns,fetchevent website.ts
develop:
	deployctl run --libs=ns,fetchevent --watch website.ts
