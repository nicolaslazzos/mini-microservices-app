# Monolithic Architecture

Contains all the routing, middleware, business logic and database access necessary to implement all the features that our app needs.

# Microservices Architecture

In this case, a single microservice contains all the routing, middleware, business logic and database access necessary to implement one feature of our app. And every service runs independent from others.

# Big Challenge of Microservices

- Data management between microservices, because each service (if it needs one) has its own database (pattern called database-per-service). Also one service cannot access other service's database.

# Communication Strategies Between Microservices

- Sync, services communicate with each other using direct requests.

  - Pros:
    - Easy to understand.
    - The service wont need a database.
  - Cons:
    - Introduces a dependency between services.
    - In any request fail, the overall request fail.
    - The entire request is only as fast as the slowest request.
    - Can easily introduces webs of requests or dependencies.

- Async, services communicate with each other using events. Two ways of implementing that:
  - With an event bus, where services can emit and receive events. Not so great, similar to the sync approach but with more cons.
  - With the database-per-service approach. Storing the necessary data for the feature. When a change is made in any other service, that service will emit an event (if any relevant change was made) with the new data, and the dependent service will receive the event and store the data.
    - Pros:
      - The service has not dependencies on other services.
      - The service will be extremely fast because it already has the necessary data stored.
    - Cons:
      - Data duplication and extra database.
      - Harder to understand.
