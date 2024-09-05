import React, {useContext, useEffect, useRef, useState} from 'react'
import {useIntl} from 'react-intl'
import {Button} from 'react-bootstrap'
import {loadMoreFacets} from 'service/FacetService'
import {SearchRequestContext} from 'contexts/SearchRequestContext'
import he from "he";

const ShowMoreLess = (props) => {

    const intl = useIntl()

    const [showMoreButton, setShowMoreButton] = useState(true)
    const [searchRequest] = useContext(SearchRequestContext)

    let container = useRef(null)

    const {entities, actions, showMoreMessageKey, render, buttonClass, facetField} = props
    const {initialShowCount} = props
    const [entitiesState, setEntitiesState] = useState({
        [facetField]: entities,
        additionalFacetsLoaded: false
    })

    let shownEntities = entitiesState[facetField]
    const showMoreLessButtons = shownEntities.length > initialShowCount

    if (showMoreButton) {
        shownEntities = entities.slice(0, initialShowCount)
    }

    useEffect(() => {
        const loadFacets = async () => {
            if(showMoreButton === false && !entitiesState.additionalFacetsLoaded && facetField !== 'collection_filter'){
                let newFacets = await loadMoreFacets(facetField, searchRequest)
                setEntitiesState({
                    [facetField]: newFacets.facets[facetField],
                    additionalFacetsLoaded: true
                })
            }
        }
        loadFacets()
    },[showMoreButton, entitiesState.additionalFacetsLoaded, facetField, searchRequest])

    const tryToFocusOnFirstItem = () => {
        const firstChild = container.children[0]
        const input = firstChild.querySelector('input')
        if (input) {
            input.focus()
        }
    }

    const toggleButtons = async() => {
        setShowMoreButton(!showMoreButton)
        tryToFocusOnFirstItem()
    }

    const handleShowMoreClick = () => {
        toggleButtons()
    }

    const handleShowLessClick = () => {
        toggleButtons()
    }

    const renderShowMoreLessButtons = () => {

        const button = showMoreButton
            ? {
                text: he.decode(intl.formatMessage({id: showMoreMessageKey ? showMoreMessageKey : 'SITE_cdm_search_KEY_show_more', defaultMessage: ' '})),
                onClickHandler: handleShowMoreClick
            }
            : {
                text: he.decode(intl.formatMessage({id: 'SITE_cdm_search_KEY_show_less', defaultMessage: ' '})),
                onClickHandler: handleShowLessClick
            };

        return (
            <div className={buttonClass}>
                <Button
                    className="cdm-btn btn-see-more-less"
                    block
                    onClick={button.onClickHandler}>

                    {button.text}
                </Button>
            </div>
        );
    }

    return (
        <>
            <div className="ShowMoreLess-container" ref={node => container = node}>
                <div>
                    {shownEntities.map((it, i) => {
                        return render(i, it, actions)
                    })}
                </div>
                {showMoreLessButtons
                    ? renderShowMoreLessButtons()
                    : null
                }
            </div>
        </>
    )
}

export default ShowMoreLess


import React, {useContext, useState} from 'react'
import {useIntl} from 'react-intl'
import ShowMoreLess from 'components/ShowMoreLess'
import {Button} from 'react-bootstrap'
import {useMobileModalClose} from 'hooks/useMobileModalClose'
import {SearchRequestContext} from 'contexts/SearchRequestContext'
import {SearchCollectionFilterAction} from 'constants/SearchCollectionFilterAction'
import './SearchCollectionFilter.scss'
import he from 'he'

const SearchCollectionFilter = (props) => {

    const { getSelectedCollections, updateButtonText, afterSave } = props

    const intl = useIntl()
    const [searchRequest, dispatch] = useContext(SearchRequestContext)
    const closeModal = useMobileModalClose()
    const [disableCancel, setDisableCancel] = useState(true)
    const [disableUpdate, setDisableUpdate] = useState(true)

    let initiallySelectedCollections = getSelectedCollections()

    const noCollectionsSelected = initiallySelectedCollections?.every(filter => !filter.selected)

    const [selectionChanges, setSelectionChanges] = useState(initiallySelectedCollections)

    const manageButtonState = (changes) => {

        const matchesOriginalState = changes.every(filterChange => {
            const found = initiallySelectedCollections.find(initialFilter => (
                initialFilter.alias === filterChange.alias &&
                initialFilter.selected === filterChange.selected
            ))
            return found ? true : false
        })
        dispatch({ type: SearchCollectionFilterAction.SET_HAS_FILTER_CHANGES, payload: !matchesOriginalState })
        setDisableUpdate(matchesOriginalState || changes.every(filter => filter.selected === false))
        setDisableCancel(matchesOriginalState)
    }

    const onSelectAllChange = (e) => {
        let changes = selectionChanges.map(filter => {
            return {
                ...filter,
                selected: e.target.checked
            }
        })
        setSelectionChanges(changes)
        determineShowAlert(changes)
        manageButtonState(changes)
    }

    const handleToggleCollection = (e) => {
        const selected = e.target.checked
        const alias = e.target.name

        const changes = selectionChanges.map(filter => {
            return {
                ...filter,
                selected: alias === filter.alias ? selected : filter.selected
            }
        })

        setSelectionChanges(changes)
        determineShowAlert(changes)
        manageButtonState(changes)
    }

    const determineShowAlert = (changes) => {
        if (allCollectionsDeselected(changes)) {
            dispatch({
                type: SearchCollectionFilterAction.SET_NUMBER_OF_COLLECTIONS_SELECTED,
                payload: 0
            })
        } else {
            dispatch({
                type: SearchCollectionFilterAction.SET_NUMBER_OF_COLLECTIONS_SELECTED,
                payload: selectionChanges.map(filter => filter.alias).length
            })
        }
    }

    const cancel = () => {
        setSelectionChanges(initiallySelectedCollections)
        dispatch({ type: SearchCollectionFilterAction.UPDATE_FILTER_CHANGES, payload: initiallySelectedCollections })
        dispatch({ type: SearchCollectionFilterAction.SET_NUMBER_OF_COLLECTIONS_SELECTED, payload: initiallySelectedCollections.filter(filter => filter.selected).length })
        dispatch({ type: SearchCollectionFilterAction.SET_HAS_FILTER_CHANGES, payload: false })
        setDisableCancel(true)
        setDisableUpdate(true)
    }

    const save = () => {
        searchRequest.collection = selectionChanges.filter(filter => filter.selected ? filter.alias : '').map(filter => filter.alias).join('!')
        // Reset
        searchRequest.page = ''

        if (allCollectionsSelected()) {
            searchRequest.collection = ''
        }

        closeModal()

        dispatch({ type: SearchCollectionFilterAction.UPDATE_FILTER_CHANGES, payload: selectionChanges })
        dispatch({ type: SearchCollectionFilterAction.SAVE_COLLECTION_FILTER_STRING, payload: searchRequest.collection })
        dispatch({ type: SearchCollectionFilterAction.SET_HAS_FILTER_CHANGES, payload: false })
        setDisableUpdate(true)

        if (afterSave) {
            afterSave(searchRequest)
        }
    }

    const allCollectionsDeselected = (changes) => {
        return changes.every(filter => !filter.selected)
    }

    const allCollectionsSelected = () => {
        return selectionChanges.every(filter => filter.selected)
    }

    const isSelected = (filter) => {
        const selectedFilter = selectionChanges.find(selectionFilter => selectionFilter.alias === filter.alias)
        return selectedFilter && selectedFilter.selected
    }

    const renderCancelButton = () => {
        return <Button bsstyle="link" disabled={disableCancel} className="cdm-btn" block onClick={cancel} name="cancelBtn">
            {he.decode(intl.formatMessage({defaultMessage: ' ', id: 'SITE_KEY_cancel'}))}
        </Button>
    }

    const renderUpdateButton = (updateButtonText) => {
        return <Button bsstyle="primary" disabled={disableUpdate || noCollectionsSelected} className="cdm-btn"
                       data-id="updateBtn" block onClick={save} name="updateBtn">
            { updateButtonText || he.decode(intl.formatMessage({defaultMessage: ' ', id: 'SITE_cdm_search_KEY_update'})) }
        </Button>
    }

    return (
        <div className="SearchCollectionFilter-container">
            <div className="checkbox SearchCollectionFilter-allCollectionsCheckbox">
                <label>
                    <input
                        type="checkbox"
                        name="selectAll"
                        checked={allCollectionsSelected()}
                        onChange={onSelectAllChange}/>
                    {he.decode(intl.formatMessage({defaultMessage: ' ', id: 'SITE_KEY_selectallcollections'}))}
                </label>
            </div>

            <ShowMoreLess
                initialShowCount={5}
                showMoreCount={initiallySelectedCollections?.length}
                entities={selectionChanges}
                showMoreMessageKey="SITE_cdm_search_KEY_show_all"
                facetField="collection_filter"
                actions={{
                    handleOnClick: handleToggleCollection
                }}
                render={(i, entity, actions) => (
                    <div className="checkbox" key={i}>
                        <label>
                            <input
                                type="checkbox"
                                name={entity.alias}
                                checked={isSelected(entity)}
                                onChange={actions.handleOnClick}
                            />
                            {entity.name}
                        </label>
                    </div>
                )}
            />

            <div className="SearchCollectionFilter-btnContainer">
                <div className="col-xs-6 SearchCollectionFilter-btnWrapper">
                    {renderCancelButton()}
                </div>
                <div className="col-xs-6 SearchCollectionFilter-btnWrapper">
                    {renderUpdateButton(updateButtonText)}
                </div>
            </div>

        </div>
    )
}

export default SearchCollectionFilter
