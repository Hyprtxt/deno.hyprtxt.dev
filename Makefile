welcome:
	cat Makefile
start: 
	deployctl run --libs=ns,fetchevent website.tsx
develop:
	deployctl run --libs=ns,fetchevent --watch website.tsx
