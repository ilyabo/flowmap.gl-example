cd flowmap.gl-example/
npm install

import React, {Component} from 'react'
import {StaticMap} from 'react-map-gl'
import { DeckGL } from 'deck.gl';
import FlowMapLayer from '@flowmap.gl/core'
import geoViewport from '@mapbox/geo-viewport'

import './App.css'

const MAPBOX_TOKEN = process.env.REACT_APP_MapboxAccessToken

npm start

const getInitialViewState = () => {
  const bbox = [5.956453645364537, 45.818, 10.492, 47.808]
  const { center: [longitude, latitude], zoom } =
    geoViewport.viewport(
      bbox,
      [window.innerWidth, window.innerHeight],
      undefined, undefined, 512
    )
  return {
    longitude,
    latitude,
    zoom,
    bearing: 0,
    pitch: 0,
  }
}

const colors = {
  flows: {
    scheme: [
      // Teal scheme from https://carto.com/carto-colors/
      '#d1eeea','#a8dbd9','#85c4c9','#68abb8','#4f90a6','#3b738f','#2a5674'
    ],
  },
  locationAreas: {
    outline: 'rgba(92,112,128,0.5)',
    normal: 'rgba(187,187,187,0.5)',
    selected: 'rgba(217,130,43,0.5)',
  },
}



export default class App extends Component {
  state = {
    locations: null,
    flows: null,
  }

  componentDidMount() {
    fetch(`${process.env.PUBLIC_URL}/data/locations.json`)
      .then(response => response.json())
      .then(json => this.setState({ locations: json }))

    fetch(`${process.env.PUBLIC_URL}/data/flows.json`)
      .then(response => response.json())
      .then(json => this.setState({ flows: json }))
  }

  render() {
    const { locations, flows } = this.state
    const layers = []
    if (locations && flows) {
      layers.push(
        new FlowMapLayer({
          colors,
          locations,
          flows,
          getLocationId: l => l.properties.abbr,
          getLocationCentroid: l => l.properties.centroid,
          getFlowOriginId: f => f.origin,
          getFlowDestId: f => f.dest,
          getFlowMagnitude: f => f.count,
        })
      )
    }

    return (
      <DeckGL
        initialViewState={getInitialViewState()}
        controller={true}
        layers={layers}
      >
        <StaticMap mapboxApiAccessToken={MAPBOX_TOKEN} />
      </DeckGL>
    )
  }
}
