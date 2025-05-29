export function AlertSuccess({ message }) {
  return (
    <>
      <div className="alert-success">
        <img src="/success.svg" alt="icon function" />
        <span>
          <h6>Success</h6>
          <p>{message}</p>
        </span>
      </div>
    </>
  );
}

export function AlertFailed({ message }) {
  return (
    <>
      <div className="alert-failed">
        <img src="/failed.svg" alt="icon function" />
        <span>
          <h6>Failed</h6>
          <p>{message}</p>
        </span>
      </div>
    </>
  );
}
