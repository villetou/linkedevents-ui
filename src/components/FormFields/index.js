import React from 'react'

import { FormattedMessage } from 'react-intl'

import TextField from 'node_modules/material-ui-with-sass/src/js/text-field.jsx'
import Checkbox from 'node_modules/material-ui-with-sass/src/js/checkbox.jsx'

import ImageUpload from 'src/components/ImageUpload'

let HelTextField = (props) => {
    let { required, floatingLabelText } = props

    if(required) {
        if(typeof floatingLabelText === 'string') {
            floatingLabelText += ' *'
        }
        if(typeof floatingLabelText === 'object') {
            floatingLabelText = (<span>{floatingLabelText} *</span>)
        }
    }

    return (<TextField {...props} floatingLabelText={floatingLabelText} />)
}

let FormHeader = (props) => (
    <div className="row">
        <legend className="col-xs-12">{ props.children }</legend>
    </div>
)

let SideField = (props) => (
    <div className="side-field col-xs-5 col-sm-push-1">
        { props.children }
    </div>
)

let FormFields = (props) => (
    <div>
        <div className="col-xs-12 highlighted-block">
            <div className="col-xs-6">
                <label>
                    <FormattedMessage id="event-presented-in-languages"/>
                </label>
            </div>
            <div className="col-xs-6">
                <div className="spread-evenly">
                    <Checkbox name="lang-fi" value="true" label={<FormattedMessage id="in-fi"/>} />
                    <Checkbox name="lang-sv" value="true" label={<FormattedMessage id="in-sv"/>} />
                    <Checkbox name="lang-en" value="true" label={<FormattedMessage id="in-en"/>} />
                </div>
            </div>
        </div>

        <FormHeader>
            <FormattedMessage id="event-description-fields-header"/>
        </FormHeader>

        <div className="row">
            <div className="col-xs-6">
                <HelTextField required={true} floatingLabelText={<FormattedMessage id="event-name"/>} />
                <HelTextField required={true} floatingLabelText={<FormattedMessage id="event-short-description"/>} />
                <HelTextField required={true} floatingLabelText={<FormattedMessage id="event-description"/>} />
                <HelTextField floatingLabelText={<FormattedMessage id="event-home-page"/>} />
            </div>
            <SideField>
                <label><FormattedMessage id="event-picture"/></label>
                <ImageUpload />
            </SideField>
        </div>

        <FormHeader>
            <FormattedMessage id="event-datetime-fields-header" />
        </FormHeader>
        <div className="row">
            <div className="col-xs-6">
                <HelTextField required={true} floatingLabelText={<FormattedMessage id="event-starting-date"/>} />
                <HelTextField floatingLabelText={<FormattedMessage id="event-starting-time"/>} />
                <HelTextField floatingLabelText={<FormattedMessage id="event-ending-date"/>} />
                <HelTextField floatingLabelText={<FormattedMessage id="event-ending-time"/>} />
            </div>
        </div>

        <FormHeader>
            <FormattedMessage id="event-location-fields-header" />
        </FormHeader>
        <div className="row">
            <div className="col-xs-6">
                <HelTextField required={true} floatingLabelText={<FormattedMessage id="event-location"/>} />
                <HelTextField floatingLabelText={<FormattedMessage id="event-location-id"/>} />
                <HelTextField floatingLabelText={<FormattedMessage id="event-location-additional-info"/>} />
            </div>
        </div>

        <FormHeader>
            <FormattedMessage id="event-price-fields-header" />
        </FormHeader>
        <div className="row">
            <div className="col-xs-6">
                <Checkbox name="is-free" value="true" label={<FormattedMessage id="is-free"/>} />
                <HelTextField required={true} floatingLabelText={<FormattedMessage id="event-price"/>} />
                <HelTextField floatingLabelText={<FormattedMessage id="event-price-info"/>} />
                <HelTextField floatingLabelText={<FormattedMessage id="event-purchase-link"/>} />
            </div>
            <SideField>
                <p>Valitse onko tapahtumaan vapaa pääsy tai lisää tapahtuman hinta tekstimuodossa (esim. 5€/7€).</p>
                <p>Voit lisätä lisätietoja tapahtuman lipunmyynnistä, paikkavarauksista jne.</p>
                <p>Lisää myös mahdollinen linkki lipunmyyntiin.</p>
            </SideField>
        </div>

        <FormHeader>
            <FormattedMessage id="event-social-media-fields-header" />
        </FormHeader>
        <div className="row">
            <div className="col-xs-6">
                <HelTextField floatingLabelText={<FormattedMessage id="facebook-url"/>} />
                <HelTextField floatingLabelText={<FormattedMessage id="twitter-url"/>} />
                <HelTextField floatingLabelText={<FormattedMessage id="instagram-url"/>} />
            </div>
        </div>
    </div>
)

export default FormFields