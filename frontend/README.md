# Front-end 

> *in NextJS, TS and TailwindCSS*

## Dependencies

> 
> - Install `git`
> - Install `node`
> - Install `yarn`
>

## Start Project


Run:
```
  npx create-next-app@latest --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-yarn
```

## Docker

To build and run docker daemon  
(this operation might take a while):

```
  docker build -t planner-next . &&
  docker run -dp 3000:3000 planner-next &&
  docker ps 
```

## To run app

- In development:  `yarn run dev`
- As docker container:
```
  # To apply changes (Must build and run again)
    docker build -t planner-next . &&
    docker run -dp 3000:3000 planner-next &&
    docker ps

  # To start
    docker start <Container ID>
  
  # To stop
    docker stop <Container ID>
```
