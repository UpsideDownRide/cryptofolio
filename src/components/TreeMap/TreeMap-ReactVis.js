import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Treemap } from 'react-vis';

const myData = {
    "title": "Hmmm",
    "color": "#333333",
    "children": [
            
                { "title": "AgglomerativeCluster", color: 3, "size": 3938 },
                { "title": "CommunityStructure", color: 2, "size": 3812 },
                { "title": "HierarchicalCluster", "size": 6714 },
                { "title": "MergeEdge", "size": 743 },
    ]
}

const treemap = () => {
    return (
        <Treemap
            title='My New Treemap'
            width={600}
            height={600}
            data={myData}
            mode={'squarify'}
            colorType='category'
            colorDomain={[0, 1, 2, 3]}
            colorRange={['white', 'cadetblue', 'red', 'blue']}
        />
    )
}

export default treemap