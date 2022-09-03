import './Notification.css'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  const errorClass = isError ? 'error' : ''

  return (
    <div className={`notification ${errorClass}`}>
      {message}
    </div>
  )
}

export default Notification