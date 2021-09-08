const MapTime = ({ timestamp }) => {
  const seconds = Math.floor((new Date() - timestamp * 1000) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return <span>{`${interval} years ago`}</span>;
  }
  interval = Math.floor(seconds / 2592000);

  if (interval > 1) {
    return <span>{`${interval} months ago`}</span>;
  }
  interval = Math.floor(seconds / 86400);

  if (interval > 1) {
    return <span>{`${interval} days ago`}</span>;
  }
  interval = Math.floor(seconds / 3600);

  if (interval > 1) {
    return <span>{`${interval} hours ago`}</span>;
  }
  interval = Math.floor(seconds / 60);

  if (interval > 1) {
    return <span>{`${interval} minutes ago`}</span>;
  }

  return <span>{`${Math.floor(seconds)} seconds ago`}</span>;
};

export default MapTime;
