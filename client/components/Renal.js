import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  getCardioBlocks,
  getRenalBlocks,
  getEfastBlocks,
  getRuqBlocks
} from '../store/blocks'
import { getTakes } from '../store/takes'
/**
 * COMPONENT
 */
class Renal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renalTakes: []
    }

  }

  async componentDidMount() {
    await this.props.getCardioBlocks();
    await this.props.getRenalBlocks();
    await this.props.getEfastBlocks();
    await this.props.getRuqBlocks();
    await this.props.getTakes();

    const allTakes = this.props.takes.filter(take => take.userId === this.props.userid)
    this.setState({ takes: allTakes })
    this.setState({ cardioTakes: allTakes.filter(take => take.cardioblockId !== null) })
    this.setState({ renalTakes: allTakes.filter(take => take.renalblockId !== null) })
    this.setState({ efastTakes: allTakes.filter(take => take.efastblockId !== null) })
    this.setState({ ruqTakes: allTakes.filter(take => take.ruqblockId !== null) })
  }



  render() {
    console.log('PROPS, STATE', this.props, this.state)
    return (
      <div className="content-box" id="home">
        <div className="content-headline">
          <h1>Renal</h1>
          <p className="smallnote"><br />A cardiothoracic surgeon is a specialist who operates on the heart, lungs and other thoracic (chest) organs. As well as performing surgery, they also diagnose and treat diseases of these organs.</p>
        </div>

        <div className="toggle-content-wrapper">
          <div>
            {this.props.renal.map((block, idx) =>
              <div key={idx}>
                <Link to={`/renal/${idx}`}>Block {idx + 1}</Link>
                {this.state.renalTakes.filter(take => take.renalblockId === block.id).length > 0 ?
                  <p className="smallnote">
                    You took this {this.state.renalTakes.filter(take => take.renalblockId === block.id).length} times<br />
                  Your best score is {
                      this.state.renalTakes.filter(take => take.renalblockId === block.id)
                        .map(take => take.score).sort((a, b) => b - a)[0]
                    }%
                </p>
                  :
                  <p className="smallnote">
                    You haven't took this block
                    No best score yet
                </p>
                }
                <br /><br />
                <Link to={`/renal/${idx}`} className="button">Take test</Link>
                <br /><br />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}


/**
 * CONTAINER
 */
const mapState = state => {
  // console.log('MAPSTATE', state)
  return {
    userid: state.auth.id,
    username: state.auth.username,
    name: state.auth.name,
    cardiothoracic: state.cardiothoracic,
    renal: state.renal,
    efast: state.efast,
    ruq: state.ruq,
    takes: state.takes
  }
}

const mapDispatchToProps = {
  getCardioBlocks,
  getRenalBlocks,
  getEfastBlocks,
  getRuqBlocks,
  getTakes
}


export default connect(mapState, mapDispatchToProps)(Renal)
