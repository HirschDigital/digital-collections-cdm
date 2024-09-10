/**EVENT TYPES
 * helper object for extend event types
 */
export const EVENT_TYPES = Object.freeze({
    /**
     * helper method to create app ready event name
     *
     * @returns 'cdm-app:ready'
     */
    appReady() {
        return EVENT_TYPES.ready('cdm-app');
    },

    /**
     * helper method to create eventName with ':enter'
     *
     * @param {String} eventName
     * @returns [eventName]:enter
     */
    enter(eventName = '') {
        return `${eventName}:enter`;
    },

    /**
     * helper method to create eventName with ':ready'
     *
     * @param {String} eventName
     * @returns [eventName]:ready
     */
    ready(eventName = '') {
        return `${eventName}:ready`;
    },

    /**
     * helper method to create eventName with ':update'
     *
     * @param {String} eventName
     * @returns [eventName]:update
     */
    update(eventName = '') {
        return `${eventName}:update`;
    },

    /**
     * helper method to create eventName with ':leave'
     *
     * @param {String} eventName
     * @returns [eventName]:leave
     */
    leave(eventName = '') {
        return `${eventName}:leave`;
    }
});

/**useCDMEnterandreadyeventparams
 * Hook that encompasses/enforces the standard CDM :enter and :ready event parameters while forcing itemId to a string.
 * This is not technically a standard react hook in that it returns a plain javascript object with predefined fields.
 *
 * The object produced by this hook managed by the {useCdmEvents} hook that is imported from events/CdmEvents
 *
 * @param {string} collectionId Collection identifier
 * @param {string|Number} itemId Item identifier
 * @param {string} filename the name of the html file without the extension of the custom page
 * @returns {{itemId, collectionId, filename}}
 */
export const useCdmEnterAndReadyEventParams = (collectionId = null, itemId = null, filename = null) => {
    const normalizedItemId = itemId ? itemId.toString() : null
    return {
        collectionId,
        itemId: normalizedItemId,
        filename
    }
}

/*****useCdmEventLifecycle */

import {useEffect, useRef, useState} from 'react'
import {EVENT_TYPES} from 'events/EventTypes'

const PARAMETERS = ['collectionId', 'itemId', 'filename']

const eventFactory = (eventName, data) => {
    const cancelable = true
    const bubbles = true
    if (typeof (CustomEvent) === 'function') {
        return new CustomEvent(eventName, { detail: data, cancelable, bubbles })
    }
    // for IE https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
    const event = document.createEvent('CustomEvent')
    event.initCustomEvent(eventName, bubbles, cancelable, data)
    return event
}

const getParameters = (parameterObj) => {
    const params = parameterObj || {}
    const newParams = PARAMETERS.reduce((obj, key) => {
        if (params.hasOwnProperty(key)) {
            obj[key] = params[key]
        }
        return obj
    }, {})
    return newParams
}

export const emit = (eventName, data) => {
    if (!eventName) {
        return
    }
    const event = eventFactory(eventName, data)
    document.dispatchEvent(event)
}

/**
 * Custom React hook for using CDM events
 *
 * @param {string} eventName The name of the contentdm event.  See utils/CdmClasses.js
 * @param {object} enterAndReadyParams An object of parameters that are intended to only be used with the :enter, :ready, and
 * :leave events
 * @param {object} updateParams An object of parameters that are intended to only be used with the :update event
 * @param {boolean} isComponentReady Set this to true when the component has finished loading its dependencies
 * @example
 * eventName: 'cdm-home-page',
 * enterAndReadyParams: {
 *   collectionId: 'oclcsample',
 *   itemId: '1',
 *   isLoading: false
 * },
 * updateParams: {
 *   collectionId: '10krecords',
 *   itemId: '1',
 *   isLoading: false
 * },
 * isComponentReady: true
 */
export const useCdmEventLifecycle = (eventName, enterAndReadyParams, updateParams, isComponentReady) => {

    const hasMounted = useRef(false)
    const hasEntered = useRef(false)
    const previousUpdateParams = useRef(updateParams)
    const readyFired = useRef(false)
    const componentWillUnmount = useRef(false)
    const [cdmEventName] = useState(eventName)
    const [cdmEnterAndReadyParams] = useState(enterAndReadyParams)

    useEffect(() => {
        if (!hasEntered.current) {
            emit(EVENT_TYPES.enter(cdmEventName), getParameters(cdmEnterAndReadyParams))
            hasEntered.current = true
        }
    })

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true
        }
    })

    /*
      ComponentDidUpdate
     */
    useEffect(() => {
        if (hasMounted) {
            if (isComponentReady && !readyFired.current) {
                emit(EVENT_TYPES.ready(cdmEventName), getParameters(cdmEnterAndReadyParams))
                readyFired.current = true
            } else if (isComponentReady && readyFired.current ) {
                    const foundUpdate = Object.keys(updateParams).find(field => {
                        return updateParams[field] !== previousUpdateParams.current[field]
                    })
                    if (foundUpdate) {
                        emit(EVENT_TYPES.update(cdmEventName), getParameters(updateParams))
                    }
                    previousUpdateParams.current = updateParams
            }
        }
    }, [cdmEventName, updateParams, cdmEnterAndReadyParams, isComponentReady])

    /*
      componentWillUnmount

      The clean-up (return) function runs before the component is removed from the UI to prevent memory
      leaks. Additionally, if a component renders multiple times (as they typically do), the previous effect is cleaned
      up before executing the next effect.

      The first useEffect does not have dependencies and the clean-up function is guaranteed to run when the component
      actually unmounts. When this happens we set the componentWillUnmount flag to true

      The second useEffect has 2 dependencies that when changed will fire the clean-up function to clean the previous
      effect. We only want the :leave event firing when the component is actually unmounted hence the
      check on componentWillUnmount.current.  Without this check the :leave event would fire every time the previous
      effect is cleaned up and that would be bad mmmkay
     */
    useEffect(() => {
        return () => {
            componentWillUnmount.current = true
        }
    }, [])
    useEffect(() => {
        return () => {
            if (componentWillUnmount.current) {
                emit(EVENT_TYPES.leave(cdmEventName), getParameters(updateParams))
            }
        }
    }, [cdmEventName, updateParams])
}


/******************* useCdmEvents*/
import {useCdmEnterAndReadyEventParams} from 'events/useCdmEnterAndReadyEventParams'
import {useCdmUpdateEventParams} from 'events/useCdmUpdateEventParams'
import {useCdmEventLifecycle} from 'events/useCdmEventLifecycle'

/**
 * Hook that weaves the standard CDM events (:enter, :ready, :update, and :leave) without any parameters
 *
 * @param {string} cdmPage The UI page/class name as defined in utils/CdmClasses
 * @param {boolean} isComponentReady (optional) When this flag is true the default isComponentReady logic is
 * overridden and determined by the calling component
 */
export const useCdmEvents = (cdmPage, isComponentReady = undefined) => {

    useCdmEventLifecycle(
        cdmPage,
        useCdmEnterAndReadyEventParams(),
        useCdmUpdateEventParams(),
        isComponentReady !== undefined ? isComponentReady : true
    )
}


/***************** useCdmEventsForCollection*/
import {useParams} from 'react-router-dom'
import {useCdmEnterAndReadyEventParams} from 'events/useCdmEnterAndReadyEventParams'
import {useCdmEventLifecycle} from 'events/useCdmEventLifecycle'
import {useCdmUpdateEventParams} from 'events/useCdmUpdateEventParams'
import { useNormalizedCdmEventFields } from 'events/useNormalizedCdmEventFields'

/**
 * Hook that weaves the standard CDM events (:enter, :ready, :update, and :leave) for any page that needs
 * to support these events for the given collection alias.
 *
 * @param {string} cdmPage The UI page/class name as defined in utils/CdmClasses
 * @param {object} updateParams An object representing the collection or any properties that wish to be monitored for updates
 *  @property {string} collectionAlias|collectionId|alias The collection identifier
 *  @property {boolean} isLoading The loading indicator that determines if the component is fetching data. This
 *  is used to determine when to fire the :udpate event. The :update event will fire when the updateParams have change
 *  and isLoading has changed from true to false
 *  @property {*} Any other properties whose changes need to be tracked for :updates
 * @param {boolean} isComponentReady (optional) When this flag is true the default isComponentReady logic is
 * overridden and determined by the calling component
 */
export const useCdmEventsForCollection = (cdmPage, updateParams, isReadyOverride = undefined) => {

    // Use the collection alias from the url
    const enterAndReadyEventPayload = useParams()
    const [enterAndReadyCollectionIdField] = useNormalizedCdmEventFields(enterAndReadyEventPayload)
    const cdmEnterAndReadyEventParams = useCdmEnterAndReadyEventParams(enterAndReadyEventPayload[enterAndReadyCollectionIdField])

    const [updateCollectionIdField] = useNormalizedCdmEventFields(updateParams)
    const cdmUpdateEventParams = useCdmUpdateEventParams(updateParams, updateCollectionIdField)

    const isReady = isReadyOverride === undefined ? !!updateParams[updateCollectionIdField] : isReadyOverride

    useCdmEventLifecycle(
        cdmPage,
        cdmEnterAndReadyEventParams,
        cdmUpdateEventParams,
        isReady
    )
}

/*******useCdmEventsforItem */
import {useParams} from 'react-router-dom'
import {useCdmEnterAndReadyEventParams} from 'events/useCdmEnterAndReadyEventParams'
import {useCdmEventLifecycle} from 'events/useCdmEventLifecycle'
import {useCdmUpdateEventParams} from 'events/useCdmUpdateEventParams'
import {useNormalizedCdmEventFields} from 'events/useNormalizedCdmEventFields'

/**
 * Hook that weaves the standard CDM events (:enter, :ready, :update, and :leave) for any page that needs
 * to support these events for the given item.
 *
 * @param {string} cdmPage The UI page/class name as defined in utils/CdmClasses
 * @param {object} updateParams An object representing the item or any properties that wish to be monitored for updates
 *  @property {string} collectionAlias|collectionId|alias The collection identifier
 *  @property {string|Number} id|itemId The item identifier
 *  @property {boolean} isLoading The loading indicator that determines if the component is fetching data. This
 *  is used to determine when to fire the :udpate event. The :update event will fire when the updateParams have change
 *  and isLoading has changed from true to false
 *  @property {*} (optional) Any other properties whose changes need to be tracked for :updates
 * @param {boolean} isComponentReady (optional) When this flag is true the default isComponentReady logic is
 * overridden and determined by the calling component
 */
export const useCdmEventsForItem = (cdmPage, updateParams, isReadyOverride = undefined) => {

    // Use the collection alias and item id parameters from the url for the :enter and :ready events
    const enterAndReadyEventPayload = useParams()
    const [enterAndReadyCollectionIdField, enterAndReadyItemIdField] = useNormalizedCdmEventFields(enterAndReadyEventPayload)
    const cdmEnterAndReadyEventParams = useCdmEnterAndReadyEventParams(enterAndReadyEventPayload[enterAndReadyCollectionIdField], enterAndReadyEventPayload[enterAndReadyItemIdField])

    // Use the collection alias and item id from the item object retrieved from the server (e.g. user clicks an item in the compound object viewer)
    const [updateCollectionIdField, updateItemIdField] = useNormalizedCdmEventFields(updateParams)
    const cdmUpdateEventParams = useCdmUpdateEventParams(updateParams, updateCollectionIdField, updateItemIdField)

    // Item events are ready when the item's collectionAlias and id are not null
    const isReady = isReadyOverride === undefined
        ? !!updateParams[updateCollectionIdField] && !!updateParams[updateItemIdField]
        : isReadyOverride

    useCdmEventLifecycle(
        cdmPage,
        cdmEnterAndReadyEventParams,
        cdmUpdateEventParams,
        isReady
    )
}
/****useCdmUpdateEventParams */

import {useEffect, useRef, useState} from 'react'

/**
 * This hook accepts an updateParams object and monitors it's properties for changes between renders
 *
 * @param {object} updateParams An object representing anything that could be updated
 *  @property {string} collectionAlias|collectionId|alias The collection identifier
 *  @property {string|Number} id|itemId The item identifier
 * @param {string} collectionIdField The name of the collectionId field that the component may use (e.g. alias,
 * colectionAlias, collectionId)
 * @param {string} itemIdField The name of the itemId field that the component may use (e.g. id or itemId)
 * @returns {{itemId, collectionId}}
 */
export const useCdmUpdateEventParams = (updateParams = null, collectionIdField = null, itemIdField = null) => {

    const previousUpdateParams = useRef(updateParams)

    const collectionId = updateParams ? updateParams[collectionIdField] : null
    const itemId = updateParams ? updateParams[itemIdField] : null

    let normalizedItemId = null
    if (itemId) {
        normalizedItemId = itemId.toString()
    }

    const [cdmUpdateEventPayload, setCdmUpdateEventPayload] = useState({
        collectionId,
        itemId: normalizedItemId ? normalizedItemId : undefined,
        filename: updateParams ? updateParams.filename : undefined
    })

    useEffect(() => {

        const changes = updateParams && Object.keys(updateParams).find(updateParamField => {
            return updateParams[updateParamField] !== previousUpdateParams.current[updateParamField]
        })

        if (changes) {
            setCdmUpdateEventPayload({
                ...updateParams,
                collectionId,
                itemId: normalizedItemId ? normalizedItemId : undefined
            })
        }

        previousUpdateParams.current = updateParams
    }, [updateParams, collectionId, collectionIdField, normalizedItemId])

    return cdmUpdateEventPayload
}

/****useNormalizedCdmEventFields */
/**
 * Determines which fields of the eventParams should be used for the collectionId and itemId fields in the event
 * payload.
 *
 * @param {object} eventParams An object representing event payload
 *  @property {string} collectionAlias|collectionId|alias The collection identifier
 *  @property {string|Number} id|itemId The item identifier
 * @returns {[(string), (string)]}
 */
export const useNormalizedCdmEventFields = (eventParams) => {
    const supportedCollectionIdNames = ['collectionId', 'collectionAlias', 'alias']
    const supportedItemIdNames = ['itemId', 'id' ]

    const collectionIdField = supportedCollectionIdNames.find(collectionIdField => eventParams.hasOwnProperty(collectionIdField))
    const itemIdField = supportedItemIdNames.find(itemIdField => eventParams.hasOwnProperty(itemIdField))
    return [collectionIdField, itemIdField]
}

