welcome:
	cat Makefile
start: 
	deployctl run --unstable --libs=ns,fetchevent website.tsx
develop:
	deployctl run --unstable --libs=ns,fetchevent --watch website.tsx
