import React from 'react'

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
export default Notification