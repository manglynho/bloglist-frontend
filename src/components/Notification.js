import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notif }) => {
  if (notif.message === null) {
    return null
  }
  return (
    <div className={notif.style}>
      {notif.message}
    </div>
  )
}

Notification.propTypes = {
  notif: PropTypes.object.isRequired,
}

export default Notification