import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'

const Alert = ({ alerts }) => {
  React.useEffect(() => {
    alerts.forEach(alert => {
      switch (alert.alertType) {
        case 'info':
          NotificationManager.info('Info message', alert.msg, 2000)
          break
        case 'success':
          NotificationManager.success('Success message', alert.msg, 2000)
          break
        case 'warning':
          NotificationManager.warning('Warning message', alert.msg, 2000)
          break
        case 'danger':
          NotificationManager.warning('Warning message', alert.msg, 2000)
          break
        case 'error':
          NotificationManager.error('Error message', alert.msg, 2000)
          break
        default:
          break
      }
    })
  }, [alerts])

  return (
    <div>
      <NotificationContainer />
    </div>
  )
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alert)