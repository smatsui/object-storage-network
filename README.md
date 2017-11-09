# Object Storage Network

> This is the Object Storage Network of Hyperledger Composer. You can create containers and store as many objects as you want to the containers.

This business network defines:

**Participant**
`Account`

**Asset**
`Container`
`Object`

**Transaction**
`CreateAccount`
`CreateContainer`
`CreateObject`
`DeleteContainer`
`DeleteObject`

Containers and Objects are owned by a Account, and they can be created and deleted submitting transactions.

To test this Object Storage Network Definition in the **Test** tab:

Create a `Account` participant by submitting a `CreateAccount` transaction:

```
{
  "$class": "org.acme.objectstore.CreateAccount",
  "accountId": "testuser",
  "password": "Passw0rd"
}
```

Create a `Container` asset by submitting a `CreateContainer` transaction:

```
{
  "$class": "org.acme.objectstore.CreateContainer",
  "account": "resource:org.acme.objectstore.Account#testuser",
  "containerId": "container0"
}
```

Create a `Object` asset in the `Container` asset by submitting a `CreateObject` transaction:

```
{
  "$class": "org.acme.objectstore.CreateObject",
  "container": "resource:org.acme.objectstore.Container#testuser/container0",
  "objectId": "object0",
  "value": "Hello World"
}
```

After submitting these transactions, you should now see the `Object` asset in the `Container` asset owned by `accountId:testuser`.

Congratulations!
