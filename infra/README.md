# Useful Kubernetes Commands

Show all the running pods

```
kubectl get pods
```

Execute the `[command]` in a running pod

```
kubectl exec -it [pod name] [command]
```

Prints logs from the given pod

```
kubectl logs [pod name]
```

Deletes the given pod

```
kubectl delete pod [pod name]
```

Tell kubernetes to process the config

```
kubectl apply -f [config file name]
```

Prints some information about the given pod

```
kubectl describe pod [pod name]
```

# For Deployments

Show all the running deployments

```
kubectl get deployments
```

Prints some information about the given deployment

```
kubectl describe deployment [deployment name]
```

Tell kubernetes to process the config

```
kubectl apply -f [deployment config file name]
```

Deletes the given deployment

```
kubectl delete deployment [deployment name]
```

Tells the deployment to use the latest version

```
kubectl rollout restart deployment [deployment name]
```

# Types of Services

## Cluster IP

For communications between pods in a cluster

## Node Port

Makes a pod accessible from outside a cluster, usually for dev purpouses.

## Load Balancer

Similar to Node Port but for production. This service will enable a load balancer in the cloud provider to get some traffic into a specific pod in the cluster.

## Ingress Controller

Has a set of routing rules to distribute traffic to our services so the client.

# Implementation

We will set up a Load Balancer to get the traffic from the client and then, it will pass the request to the Ingress Controller, who has the routing rules to reach out every service or pod into the cluster.
