import React from 'react'
import { connect } from 'react-redux'
import Web3 from "web3"
import Web3Modal from "web3modal"
import logo from '../../img/logo.svg'
import ellipseAddress from '../../utils/ellipseAddress'
import { setAlert } from '../../actions/alert'

const Dashboard = ({ setAlert }) => {

  const providerOptions = {
    /* See Provider Options Section */
  }

  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
  })

  const [provider, setProvider] = React.useState(null)
  const [web3, setWeb3] = React.useState(null)
  const [walletAddress, setWalletAddress] = React.useState(null)

  const [mintValue, setMintValue] = React.useState(2)
  const mintMaxValue = 50

  const mintValueIncrement = () => {
    if (mintValue + 1 > mintMaxValue) {
      setAlert('Maximum Value Overflow', 'warning')
      return
    }
    setMintValue(mintValue + 1)
  }

  const mintValueDecrement = () => {
    if (mintValue - 1 < 1) {
      setAlert('It can not be set as 0', 'warning')
      return
    }
    setMintValue(mintValue - 1)
  }

  const connectWallet = async () => {
    let _provider = null
    let _web3 = null
    let _accounts = null

    _provider = await web3Modal.connect()
    _web3 = new Web3(_provider)
    _accounts = await _web3.eth.getAccounts()

    setProvider(_provider)
    setWeb3(_web3)
    setWalletAddress(_accounts[0].toLowerCase())
  }

  const disconnectWallet = async () => {
    setWalletAddress(null)
    setProvider(null)
    setWeb3(null)
  }

  return (
    <div className='customer-dashboard bg-dark text-white'>
      <div className='left-image'></div>
      <div className='right-image'></div>
      <div className='container-fluid'>
        <div className='row bg-dark header-box-shadow'>
          <div className='col-md-4 p-4'>
            <img src={logo} alt='SETIMAGE' />
          </div>
          <div className='col-md-4 text-center text-primary h3 p-4'>
            <i className='fa fa-university'></i>
            <span className='ml-2'>Staking</span>
          </div>
          <div className='col-md-4 text-right p-4'>
            {walletAddress
              ?
              <>
                <span className='mr-3'>{ellipseAddress(walletAddress)}</span>
                <button
                  className='btn btn-primary rounded-pill'
                  onClick={() => disconnectWallet()}
                >
                  Disconnect
                </button>
              </>
              :
              <button
                className='btn btn-primary rounded-pill'
                onClick={() => connectWallet()}
              >
                Connect Wallet
              </button>
            }
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row pt-5'>
          <div className='col-md-6'>
            <div className='box-shadow rounded-lg p-3 m-3' style={{ minHeight: '280px' }}>
              <div className='h2 text-center'>Mint Your Node NFT</div>
              <div className='text-center text-primary'>Current Node Generation: 1</div>
              <div className='text-center'>
                <i onClick={() => mintValueDecrement()} className="fa fa-minus h3 mr-3 font-weight-lighter cursor-pointer"></i>
                <span>
                  <span className='h1 font-weight-bolder'>{mintValue}/</span>
                  <span className='h3'>{mintMaxValue}</span>
                </span>
                <i onClick={() => mintValueIncrement()} className="fa fa-plus h3 ml-3 font-weight-lighter cursor-pointer"></i>
              </div>
              <div className='text-center'>
                <span className='text-primary'>Price: </span>
                <span className='text-white'>400</span>
                <span className='text-primary'> STACK</span>
              </div>
              <div className='row mb-3'>
                <div className='col-md-6 text-center mt-3'>
                  <button className='btn btn-primary rounded-pill'>Mint with STACK</button>
                  <div className='mt-2 small'>
                    <span className='text-primary'>Wallet Balance: </span>
                    <span className='text-white'>2000 STACK</span>
                  </div>
                </div>
                <div className='col-md-6 text-center mt-3'>
                  <button className='btn btn-primary rounded-pill'>Mint with staked STACK</button>
                  <div className='mt-2 small'>
                    <span className='text-primary'>Staked for lottery: </span>
                    <span className='text-white'>2000 STACK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='box-shadow rounded-lg p-3 m-3' style={{ minHeight: '280px' }}>
              <div className='h2 text-center'>Node NFT Lottery</div>
              <div className='text-center text-primary'>Stake your STACK to get more lottery tickets</div>
              <div className='text-center mt-3'>
                <span className='h1 font-weight-bolder border-bottom'>2000</span>
                <span className='h3'> stack</span>
              </div>
              <div className='text-center mt-4 pt-1'>
                <button className='btn btn-primary rounded-pill'>Stake STACK</button>
              </div>
            </div>
          </div>
        </div>
        <div className='row py-5'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <div className='box-shadow rounded-lg p-3 m-3'>
              <div className='h2 text-center'>Auction</div>
              <div className='text-primary text-center mb-3'>Top 20 Bids</div>
              {[1, 2, 3, 4, 5, 6].map((item, index) =>
                <div key={index} className='d-flex justify-content-between py-2 border-bottom border-secondary'>
                  <div className='text-primary'>
                    <span className='mr-3'>{index + 1}</span>
                    <span className='badge rounded-pill bg-primary text-primary font-18 mr-2'>8</span>
                    <span>0x8be3...37e</span>
                  </div>
                  <div className='mr-4'>2000 STACK</div>
                </div>
              )}
              <div className='text-center mt-4'>
                <span className='text-primary'>Place your bid: </span>
                <span className='h3 border-bottom mx-2'>3000</span>
                <span>STACK</span>
              </div>
              <div className='text-center mt-2 pt-1'>
                <button className='btn btn-primary rounded-pill px-4'>Submit</button>
              </div>
              <div className='text-center my-3 px-5'>
                The auction will end at a random time on a random day before DATE
              </div>
            </div>
          </div>
          <div className='col-md-3'></div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { setAlert })(Dashboard)