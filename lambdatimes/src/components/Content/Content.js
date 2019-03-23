import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from './Tabs';
import Cards from './Cards';

// Importing our tab and card data. No need to change anything here.
import { tabData, cardData } from '../../data';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'all',
      tabs: [],
      cards: []
    };
  }

  componentDidMount() {
    this.setState({tabs : tabData, cards : cardData});
    // Once the component has mounted, get the data and reflect that data on the state.
  }

  changeSelected = tab => {
    this.setState({selected: tab});
    // this function should take in the tab and update the state with the new tab.
  };

  filterCards = () => {
   if (this.state.selected==="all") { return this.state.cards };
   if (this.state.selected!=="all") { 
    let newCards = this.state.cards.filter(card=> card.tab.includes(this.state.selected));
    return newCards;
   }
  };

  render() {
    return (
      <div className="content-container">
        {/*
          Add 2 props to the Tabs component, 
          `selectedTab` that includes the currently selected tab
          and `selectTabHandler` that includes the function to change the selected tab
        */}
        <Tabs selectedTab={this.state.selected} selectTabHandler={this.changeSelected} tabs={this.state.tabs} />
        <Cards cards={ this.filterCards() } />
      </div>
    );
  }
}

Content.proptypes = {
  selectedTab : PropTypes.string,
  selectTabHandler  : PropTypes.func,
  tabs : PropTypes.arrayOf(PropTypes.string),
  cards : PropTypes.arrayOf(PropTypes.shape({
    author : PropTypes.string,
    headline : PropTypes.string,
    img : PropTypes.string,
    tab : PropTypes.string,
  }))
}
