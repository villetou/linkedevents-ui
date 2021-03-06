// Group of checkboxes that output an array on change

import React from 'react'
import { FormattedMessage } from 'react-intl'

import Input from 'react-bootstrap/lib/Input'

import {connect} from 'react-redux'
import {setData} from 'src/actions/editor.js'

import _ from 'lodash'

class HelLanguageSelect extends React.Component {

    constructor(props) {
        super(props)
    }

    onChange() {
        let checked = _.filter(this.refs, (ref) => (ref.getChecked()))
        let checkedNames = _.map(checked, (checkbox) => (checkbox.props.name) )

        let obj = {}
        obj[this.props.name] = checkedNames

        this.props.dispatch(setData(obj))

        if(typeof this.props.onChange === 'function') {
            this.props.onChange(checkedNames)
        }
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        let checkboxes = this.props.options.map((item, index) => {
            let checked = this.props.defaultSelected && (this.props.defaultSelected.indexOf(item.value) > -1)
            return (<Input
                type="checkbox"
                style={{width: 'auto'}}
                groupClassName="hel-checkbox inline"
                ref={index}
                key={index}
                name={item.value}
                defaultChecked={checked}
                label={<FormattedMessage id={item.label} />}
                onChange={e => this.onChange(e)}
            />)
        })

        return (
            <div className="language-selection spread-evenly">
                {checkboxes}
            </div>
        )
    }
}

export default connect()(HelLanguageSelect)
