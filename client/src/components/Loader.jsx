const Loader = () => {
  return (
    <div className="preloader-wrapper active loader">
      <div className="spinner-layer spinner-green-only">
        <div className="circle-clipper left">
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
