const LinkCard = ({ link }) => {
  return (
    <div>
      <h2>Link</h2>
      <p>
        Your shorten link:{' '}
        <a href={link.to} target="_blank" rel="noreferrer noopener">
          {link.to}
        </a>
      </p>
      <p>
        From:{' '}
        <a href={link.from} target="_blank" rel="noreferrer noopener">
          {link.from}
        </a>
      </p>
      <p>
        Number of clicks: <strong>{link.clicks}</strong>
      </p>
      <p>
        Creation date:{' '}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </div>
  );
};

export default LinkCard;
