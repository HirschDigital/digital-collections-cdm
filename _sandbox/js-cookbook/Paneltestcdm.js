/*
 * Copyright (c) 2016-2017 OCLC, Inc. All Rights Reserved.
 *
 * OCLC proprietary information: the enclosed materials contain proprietary information of OCLC Online Computer
 * Library Center, Inc. and shall not be disclosed in whole or in any part to any third party or used by any person
 * for any purpose, without written consent of OCLC, Inc.  Duplication of any portion of these materials shall include
 * this notice.
 */
import React, {useState, useEffect, useRef, useCallback} from "react"
import {useIntl} from 'react-intl'
import FontAwesome from "react-fontawesome"
import {Panel as BootstrapPanel} from 'react-bootstrap'
import './Panel.scss'
import he from "he";

const Panel = (props) => {

    const [expanded, setExpanded] = useState(props.expanded)
    const [h2color, setH2color] = useState(null)
    const panelHeader = useRef(null)
    const intl = useIntl()

    useEffect(() => {
        if (!h2color) {
            setTimeout(() => {
                if (panelHeader.current) {
                    setH2color({ color: window.getComputedStyle(panelHeader.current).getPropertyValue('color') })
                }
            })
        }
    }, [h2color])

    const noop = useCallback(() => {/* no-op */},[])

    const getLabel = () => {
        let label = ''

        if (props.headerTitle) {
            label = expanded
                // Unfortunately this is the way it works today and the translation key needed does not yet exist.  sticking with this for the upgrade
                ? label = `close ${props.headerTitle} details`
                : label = `open ${props.headerTitle} details`
        }
        return label
    }

    const renderTitle = (title) => (
        <h2 title={title}>
            {props.isModal
                ? null
                : <FontAwesome fixedWidth aria-hidden
                     className={expanded
                         ? "Panel-fontAwesomeIconExpanded"
                         : "Panel-fontAwesomeIcon"}
                     name={`${expanded ? 'fas' : 'far'} fa-play-circle`}
                     rotate={expanded ? 90 : undefined}/>
            }
            {expanded || props.isModal
                ? <span className="Panel-panelTitleExpanded">{props.headerText}</span>
                : h2color
                    ? <span className="Panel-panelTitle"
                            style={{color: h2color.color}}>
                                                        {props.headerText}</span>
                    : <span className="Panel-panelTitle">{props.headerText}</span>
            }
        </h2>
    )

    const renderPanel = () => {

        let title = ''
        if (props.headerTitle) {
            title = expanded
                ? `${he.decode(intl.formatMessage({id: 'SITE_cdm_search_KEY_close_facet', defaultMessage: ' '}))} ${props.headerTitle}`
                : `${he.decode(intl.formatMessage({id: 'SITE_cdm_search_KEY_open_facet', defaultMessage: ' '}))} ${props.headerTitle}`
        }

        return (
            <BootstrapPanel expanded={expanded} label={getLabel()} onToggle={handleClickTitle}>
                { props.collapsible || props.isModal
                    ? <div className="panel-heading">
                            <div className="panel-title" onClick={props.isModal ? noop : handleClickTitle}>
                                {props.isModal
                                    ? renderTitle(title)
                                    : <button onClick={handleClickTitle} aria-expanded={expanded}
                                              aria-label={getLabel()} className={expanded ? null : 'collapsed'}>
                                        {renderTitle(title)}
                                    </button>
                                }
                            </div>
                        </div>
                    : []}
                <BootstrapPanel.Collapse id={props.id}>
                    <BootstrapPanel.Body>
                        {props.children}
                    </BootstrapPanel.Body>
                </BootstrapPanel.Collapse>

            </BootstrapPanel>
        )
    }

    const handleClickTitle = (e) => {
        e.preventDefault()
        setExpanded(!expanded)
    }

    const renderAccessibilityPanel = () => {
        const divStyle = expanded && h2color ? {style: {backgroundColor: h2color.color}} : {}
        const divClass = expanded ? "Panel-expandedPanel" : "Panel-panel"

        return (
            <div>
                <div className={divClass} {...divStyle}>
                    {renderPanel()}
                </div>
            </div>
        )
    }

    return (
        <div className="Panel-panelBorder" data-testid={`open-${expanded ? 'true' : 'false'}`}>
            {renderAccessibilityPanel()}
            <h2 className="hidden-panel-field" ref={panelHeader}>panel-header</h2>
        </div>
    )
}

export default Panel
