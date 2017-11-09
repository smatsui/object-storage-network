/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

NS = 'org.acme.objectstore';

/**
 * Create Account
 * @param {org.acme.objectstore.CreateAccount} tx The create account transaction instance.
 * @transaction
 */
function createAccount(tx) {
    var factory = getFactory();

    var account = factory.newResource(NS, 'Account', tx.accountId);

    return getParticipantRegistry(NS + '.Account')
           .then(function (participantRegistry){
             return participantRegistry.add(account);
           });
}

/**
 * Create Container
 * @param {org.acme.objectstore.CreateContainer} tx The create container transaction instance.
 * @transaction
 */
function createContainer(tx) {
    var accountContainerId = tx.account.accountId + "/" + tx.containerId;
    var factory = getFactory();

    var container = factory.newResource(NS, 'Container', accountContainerId);
    container.containerId = tx.containerId;
    container.account = tx.account;

    return getAssetRegistry(NS + '.Container')
           .then(function(assetRegistry){
             return assetRegistry.add(container);
           });
}

/**
 * Create Object
 * @param {org.acme.objectstore.CreateObject} tx The create object transaction instance.
 * @transaction
 */
function createObject(tx) {
    var accountContainerObjectId = tx.container.accountContainerId + "/" + tx.objectId;
    var factory = getFactory();

    var object = factory.newResource(NS, 'Object', accountContainerObjectId);
    object.objectId = tx.objectId;
    object.value = tx.value;
    object.container = tx.container;

    return getAssetRegistry(NS + '.Object')
           .then(function (assetRegistry){
             return assetRegistry.add(object);
           });
}

/**
 * Delete Container
 * @param {org.acme.objectstore.DeleteContainer} tx The delete container transaction instance.
 * @transaction
 */
function deleteContainer(tx) {
    var accountContainerId = tx.accountContainerId;
    var factory = getFactory();

    var container = factory.newResource(NS, 'Container', accountContainerId);

    return getAssetRegistry(NS + '.Container')
           .then(function (assetRegistry){
             return assetRegistry.remove(container);
           });
}

/**
 * Delete Object
 * @param {org.acme.objectstore.DeleteObject} tx The delete object transaction instance.
 * @transaction
 */
function deleteObject(tx) {
    var accountContainerObjectId = tx.accountContainerObjectId;
    var factory = getFactory();

    var object = factory.newResource(NS, 'Object', accountContainerObjectId);

    return getAssetRegistry(NS + '.Object')
           .then(function (assetRegistry){
             return assetRegistry.remove(object);
           });
}